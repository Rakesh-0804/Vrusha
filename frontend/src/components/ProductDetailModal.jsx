import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import CareGuideBadge from './CareGuideBadge';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Info,
  Clock,
  Heart
} from 'lucide-react';

export default function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct } = useProducts();
  const { addToCart, setIsCartOpen, wishlist, toggleWishlist } = useCart();

  const [pincode, setPincode] = useState('560038');
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('care'); // 'care' | 'reviews'

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.some(item => item.id === selectedProduct.id);

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200/80 relative">
        
        {/* Floating Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Imagery & Fast Dispatch Estimator */}
          <div className="p-6 sm:p-8 bg-[#f8faf8] border-r border-slate-200/80 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-xs border border-slate-200/90 group">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                
                {selectedProduct.discount > 0 && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black px-3 py-1 rounded-xl shadow-md">
                    {selectedProduct.discount}% OFF
                  </span>
                )}

                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-md transition-all ${
                    isWishlisted ? 'bg-rose-50 text-rose-600 shadow-sm' : 'bg-white/80 text-slate-700 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Nursery Provenance Badge */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-emerald-950">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="font-bold text-emerald-950">Partner Nursery Direct</p>
                  <p className="text-[11px] text-emerald-700 font-medium">{selectedProduct.nursery || 'Certified Local Nursery Hub'}</p>
                </div>
              </div>
            </div>

            {/* Pincode & Delivery Date Estimator */}
            <div className="pt-4 border-t border-slate-200/80 space-y-2.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Hyperlocal Nursery Delivery Availability</span>
              </label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => { setPincode(e.target.value); setPincodeChecked(false); }}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                />
                <button
                  onClick={() => setPincodeChecked(true)}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  Check
                </button>
              </div>

              {pincodeChecked && (
                <div className="bg-white border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Available for <strong>2-3 Day Express Transit</strong> in ventilated shockproof plant crates.</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Title, Specs, Tabs & Checkout */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs">
                <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                  {selectedProduct.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{selectedProduct.rating || '4.8'}</span>
                  <span className="text-slate-400 font-normal">({selectedProduct.reviewCount || 12} reviews)</span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="text-2xl font-black text-slate-900 font-serif leading-snug">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-baseline gap-3 mt-2.5">
                  <span className="text-3xl font-black text-slate-950 font-serif">₹{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">₹{selectedProduct.originalPrice}</span>
                  )}
                  {selectedProduct.originalPrice && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Save ₹{selectedProduct.originalPrice - selectedProduct.price}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Tax included. Free contactless express delivery over ₹499.</p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Tabs: Plant Care vs Reviews */}
              <div className="border-b border-slate-200 flex gap-6 text-xs font-bold pt-2">
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2.5 border-b-2 transition-all ${
                    activeTab === 'care' 
                      ? 'border-emerald-600 text-emerald-800 font-black' 
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  🌿 Botanical Care Guide
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2.5 border-b-2 transition-all ${
                    activeTab === 'reviews' 
                      ? 'border-emerald-600 text-emerald-800 font-black' 
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  ⭐ Verified Feedback
                </button>
              </div>

              {/* Tab Content: Care Instructions */}
              {activeTab === 'care' && (
                <div className="space-y-3 pt-1">
                  <CareGuideBadge sunlight={selectedProduct.sunlight} water={selectedProduct.water} />

                  {selectedProduct.careGuide && (
                    <div className="bg-slate-50 p-3.5 rounded-2xl text-xs space-y-1.5 border border-slate-200/80 text-slate-700">
                      <p><strong>💡 Light:</strong> {selectedProduct.careGuide.light}</p>
                      <p><strong>💧 Watering:</strong> {selectedProduct.careGuide.water}</p>
                      <p><strong>🌾 Nutrient Feed:</strong> {selectedProduct.careGuide.fertilizer}</p>
                      <p><strong>🪴 Soil & Repotting:</strong> {selectedProduct.careGuide.repotting}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab Content: Customer Reviews */}
              {activeTab === 'reviews' && (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  <div className="bg-[#f8faf8] p-3.5 rounded-2xl border border-slate-200/80 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>Ananya Rao (Verified Bengaluru Buyer)</span>
                      <span className="text-amber-500">★★★★★</span>
                    </div>
                    <p className="text-slate-600">"Arrived fresh with zero leaf damage. The root ball was moist and ready for immediate potting."</p>
                  </div>

                  <div className="bg-[#f8faf8] p-3.5 rounded-2xl border border-slate-200/80 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>Kavita Sharma</span>
                      <span className="text-amber-500">★★★★★</span>
                    </div>
                    <p className="text-slate-600">"Excellent plant quality. The included care card helped set up the right indirect sunlight corner."</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Stepper & Dual Action Buttons */}
            <div className="pt-5 border-t border-slate-200 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Select Order Quantity</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden text-xs bg-slate-50">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 hover:bg-slate-200 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 font-bold text-slate-900 bg-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-1.5 hover:bg-slate-200 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { addToCart(selectedProduct, quantity); setSelectedProduct(null); }}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold py-3.5 rounded-2xl text-xs transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black py-3.5 rounded-2xl text-xs transition-all shadow-lg shadow-emerald-700/20 active:scale-95"
                >
                  Express Checkout
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
