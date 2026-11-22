import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Sprout, 
  Lock,
  Truck
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    distanceKm,
    setDistanceKm,
    isPlantationRequested,
    setIsPlantationRequested,
    plantItemCount,
    deliveryFee, 
    plantationFee,
    totalAmount, 
    FREE_DELIVERY_THRESHOLD,
    isCartOpen, 
    setIsCartOpen 
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  const freeDeliveryDiff = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
        <div className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 border-l border-slate-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-[#f8faf8]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-black text-slate-900 text-sm sm:text-base font-serif">Your Botanical Bag</h2>
                <p className="text-[10px] text-slate-500 font-medium">Direct Nursery Dispatch Order</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
              </span>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Delivery Goal Bar */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3.5 border-b border-emerald-100/80 text-xs space-y-2">
            <div className="flex items-center justify-between text-emerald-950 font-bold text-[11px]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {freeDeliveryDiff > 0 ? (
                  <span>Add <strong>₹{freeDeliveryDiff}</strong> more for <strong>FREE Airway Express Delivery</strong></span>
                ) : (
                  <span className="text-emerald-800 font-extrabold">🎉 You unlocked FREE Express Delivery (up to 10 KM)!</span>
                )}
              </span>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List & Delivery/Plantation Options */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800 text-sm">Your nursery cart is empty</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Explore our certified indoor air purifiers, organic heirloom seeds, and natural vermicompost.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-800/20"
                >
                  Explore Plants & Seeds
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map(({ product, quantity }) => (
                    <div 
                      key={product.id}
                      className="flex gap-3.5 p-3.5 bg-[#f8faf8] rounded-2xl border border-slate-200/80 items-center justify-between shadow-xs hover:border-emerald-300 transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80';
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 truncate">{product.name}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{product.nursery || 'Certified Local Nursery'}</p>
                        <p className="text-sm font-black text-slate-950 mt-1 font-serif">₹{product.price}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2.5">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white text-xs shadow-xs">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-2.5 py-1 hover:bg-slate-100 font-bold transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2.5 font-bold text-slate-900">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-2.5 py-1 hover:bg-slate-100 font-bold transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Plantation Service Addon Card */}
                <div className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                  isPlantationRequested 
                    ? 'bg-emerald-50/90 border-emerald-300 shadow-sm' 
                    : 'bg-[#f8faf8] border-slate-200'
                }`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPlantationRequested}
                      onChange={(e) => setIsPlantationRequested(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                    />
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Sprout className="w-4 h-4 text-emerald-700" />
                        <span className="text-xs font-bold text-slate-900">Add Professional Doorstep Planting</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Certified horticulturist arrives with potting mix to plant all {plantItemCount} specimen(s).
                      </p>
                    </div>
                  </label>

                  {isPlantationRequested && (
                    <div className="text-[11px] bg-white p-3 rounded-xl border border-emerald-200 text-emerald-950 font-medium space-y-1 shadow-xs">
                      <div className="flex justify-between">
                        <span>Base Horticulturist Setup:</span>
                        <span className="font-bold">₹100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Planting Service ({plantItemCount} plants × ₹40):</span>
                        <span className="font-bold">₹{plantItemCount * 40}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transit Distance ({distanceKm} KM × ₹10):</span>
                        <span className="font-bold">₹{distanceKm * 10}</span>
                      </div>
                      <div className="flex justify-between font-bold text-emerald-800 pt-1.5 border-t border-emerald-100">
                        <span>Total Professional Plantation Fee:</span>
                        <span>₹{plantationFee}</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3.5 shadow-lg">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Botanical Items Subtotal</span>
                  <span className="font-bold text-slate-900">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Airway Express Nursery Delivery</span>
                  <span className={`font-bold ${deliveryFee === 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                {isPlantationRequested && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Doorstep Horticulturist Planting</span>
                    <span className="font-bold">₹{plantationFee}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-900 font-black text-base pt-2.5 border-t border-slate-100 font-serif">
                  <span>Payable Amount</span>
                  <span className="text-emerald-950">₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black py-4 rounded-2xl text-xs transition-all shadow-xl shadow-emerald-700/20 flex items-center justify-center gap-2 active:scale-98"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Encrypted Checkout (₹{totalAmount})</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Transit Safe Guarantee • Direct Nursery Packaging</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </>
  );
}
