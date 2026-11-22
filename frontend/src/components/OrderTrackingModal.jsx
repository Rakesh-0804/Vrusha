import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import DeliveryMap from './DeliveryMap';
import { X, Truck, MapPin, PhoneCall, Sprout, Navigation } from 'lucide-react';

const STATUS_STEPS = ["Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

const STEP_DETAILS = {
  "Placed": "Order placed successfully. Nursery team notified.",
  "Packed": "Packed with eco-friendly protective plant wrap.",
  "Shipped": "Handed over to Express Agri Delivery partner.",
  "Out for Delivery": "Delivery executive Sunil Kumar & Expert Gardener are out for delivery.",
  "Delivered": "Order successfully delivered & plantation completed!"
};

export default function OrderTrackingModal() {
  const { trackingOrderId, setTrackingOrderId } = useProducts();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch or initialize order details
  useEffect(() => {
    if (!trackingOrderId) return;

    let isMounted = true;
    setLoading(true);

    fetch(`/api/orders/${trackingOrderId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!isMounted) return;
        if (data && data.id) {
          setOrder(data);
        } else {
          // Default fallback order data starting from "Placed" for auto simulation
          setOrder({
            id: trackingOrderId,
            customerName: "Rohan Sharma",
            phone: "+91 9876543210",
            shippingAddress: "#42, 4th Cross, Indiranagar, Bengaluru - 560038",
            orderDate: new Date().toISOString(),
            distanceKm: 5.4,
            isPlantationRequested: true,
            total: 597,
            status: "Placed",
            trackingHistory: [
              { 
                status: "Placed", 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
                detail: STEP_DETAILS["Placed"]
              }
            ]
          });
        }
      })
      .catch(() => {
        if (isMounted) {
          setOrder({
            id: trackingOrderId,
            customerName: "Rohan Sharma",
            phone: "+91 9876543210",
            shippingAddress: "#42, 4th Cross, Indiranagar, Bengaluru - 560038",
            orderDate: new Date().toISOString(),
            distanceKm: 5.4,
            isPlantationRequested: true,
            total: 597,
            status: "Placed",
            trackingHistory: [
              { 
                status: "Placed", 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
                detail: STEP_DETAILS["Placed"]
              }
            ]
          });
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [trackingOrderId]);

  // 2. Automated status transition timer: Advances to next status step every 4 seconds
  useEffect(() => {
    if (!order || !order.status) return;

    const currentIdx = STATUS_STEPS.indexOf(order.status);
    if (currentIdx >= 0 && currentIdx < STATUS_STEPS.length - 1) {
      const nextStatus = STATUS_STEPS[currentIdx + 1];
      const timer = setTimeout(() => {
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const detailText = STEP_DETAILS[nextStatus] || `Order is now ${nextStatus}.`;

        setOrder(prev => {
          if (!prev) return prev;
          const currentHistory = prev.trackingHistory || [];
          const exists = currentHistory.some(h => h.status === nextStatus);

          return {
            ...prev,
            status: nextStatus,
            trackingHistory: exists 
              ? currentHistory 
              : [...currentHistory, { status: nextStatus, time: timeNow, detail: detailText }]
          };
        });

        // Optionally inform backend about status update
        if (order.id) {
          fetch(`/api/seller/orders/${order.id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: nextStatus, detail: detailText })
          }).catch(() => {});
        }
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [order?.status, order?.id]);

  if (!trackingOrderId) return null;

  const currentIdx = order ? Math.max(0, STATUS_STEPS.indexOf(order.status)) : 0;
  const isDelivered = order?.status === 'Delivered';

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-600" />
            <h2 className="font-black text-slate-900 text-base font-serif">Order Tracking</h2>
          </div>
          <button 
            onClick={() => setTrackingOrderId(null)} 
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500 text-xs font-medium">
            Loading order details...
          </div>
        ) : order ? (
          <div className="py-4 space-y-5">
            
            {/* Order Brief Box */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Order ID</span>
                <h3 className="font-black text-emerald-400 text-sm font-mono">{order.id}</h3>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Distance</span>
                <p className="font-extrabold text-amber-400">{order.distanceKm || 5.4} KM</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Plantation</span>
                <p className="font-bold text-emerald-300">{order.isPlantationRequested ? 'Requested' : 'No'}</p>
              </div>
              <div className={`font-black px-3 py-1 rounded-full text-[11px] transition-colors ${
                isDelivered ? 'bg-emerald-500 text-slate-950' : 'bg-amber-400 text-slate-950'
              }`}>
                Status: {order.status}
              </div>
            </div>

            {/* Live Animated Map */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-700 font-bold mb-1">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <Navigation className="w-4 h-4 text-emerald-600" />
                  <span>Real-Time Route Map</span>
                </span>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border transition-all ${
                  isDelivered 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {isDelivered ? '✅ Order Delivered' : '🚚 Vehicle In Transit (Live)'}
                </span>
              </div>

              <DeliveryMap
                officeLocation={{ lat: 12.9716, lng: 77.5946, name: 'Vruksha Main HQ' }}
                deliveryLocation={{
                  lat: 12.9352,
                  lng: 77.6245,
                  address: order.shippingAddress
                }}
                height="240px"
                interactive={false}
                movingDriver={!isDelivered}
              />
            </div>

            {/* Timeline */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Delivery Status</h3>
                {!isDelivered && (
                  <span className="text-[10px] font-semibold text-emerald-600 animate-pulse">
                    Auto-advancing stages...
                  </span>
                )}
              </div>
              
              <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-4 py-1">
                {STATUS_STEPS.map((step, idx) => {
                  const isDone = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={step} className="relative group">
                      <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isDone 
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' 
                          : 'bg-slate-200 text-slate-400'
                      }`}>
                        {isDone ? '✓' : idx + 1}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`text-xs font-bold ${isCurrent ? 'text-emerald-950 font-black' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                            {step}
                          </h4>
                          {isCurrent && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                              Active Step
                            </span>
                          )}
                        </div>

                        {isDone && (
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {order.trackingHistory?.find(h => h.status === step)?.detail || STEP_DETAILS[step] || `Step ${step} completed.`}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Agent & Address Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Destination Address</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">{order.shippingAddress}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Logistics Partner</span>
                </div>
                <p className="text-[11px] text-slate-600">Sunil Kumar (+91 9811223344)</p>
                <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  {order.isPlantationRequested ? (
                    <>
                      <Sprout className="w-3 h-3 text-emerald-600" />
                      <span>Gardener Ramesh assigned for plantation</span>
                    </>
                  ) : (
                    <span>Green Express Delivery Partner</span>
                  )}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setTrackingOrderId(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-xl text-xs transition-colors shadow-md flex items-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
}
