import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import CareGuideBadge from './CareGuideBadge';
import { Star, Heart, ShoppingBag, Eye, Store, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { setSelectedProduct } = useProducts();

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-emerald-500/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group card-hover-lift">
      <div>
        {/* Product Image & Badges */}
        <div 
          className="relative aspect-[4/3.8] overflow-hidden bg-slate-50 cursor-pointer" 
          onClick={() => setSelectedProduct(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80';
            }}
          />

          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-3.5 left-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
              {product.discount}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            className={`absolute top-3.5 right-3.5 p-2 rounded-xl backdrop-blur-md transition-all duration-200 ${
              isWishlisted 
                ? 'bg-rose-50 text-rose-600 shadow-sm border border-rose-200' 
                : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-500 border border-white/40'
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          {/* Quick View Hover Overlay */}
          <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/95 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-200">
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              Quick Specs
            </span>
          </div>
        </div>

        {/* Product Details Body */}
        <div className="p-4 sm:p-5 space-y-2.5">
          
          {/* Nursery Origin Tag */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Store className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate font-medium">{product.nursery || 'Certified Local Nursery'}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-slate-900 text-sm leading-snug hover:text-emerald-700 cursor-pointer line-clamp-2 transition-colors"
          >
            {product.name}
          </h3>

          {/* Care Requirements (Sunlight & Water) */}
          <div className="pt-0.5">
            <CareGuideBadge sunlight={product.sunlight} water={product.water} compact={true} />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs pt-1">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-slate-800 ml-1">{product.rating || '4.8'}</span>
            </div>
            <span className="text-slate-400 text-[11px]">({product.reviewCount || 12} reviews)</span>
          </div>
        </div>
      </div>

      {/* Pricing & Add to Cart Footer */}
      <div className="p-4 sm:p-5 pt-0 border-t border-slate-100/80 flex items-center justify-between mt-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg sm:text-xl font-black text-slate-950 font-serif">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Transit Guaranteed</span>
          </p>
        </div>

        <button
          onClick={() => addToCart(product, 1)}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-3.5 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-95 flex items-center gap-1.5 text-xs font-bold"
          title="Add to shopping bag"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
