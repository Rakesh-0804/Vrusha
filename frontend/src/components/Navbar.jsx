import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import LocationPickerModal from './LocationPickerModal';
import { 
  Sprout, 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Store, 
  BookOpen, 
  Truck, 
  LogOut,
  Sparkles,
  MapPin,
  ShieldCheck,
  Compass,
  ChevronDown,
  PhoneCall,
  Clock
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, setIsLoginModalOpen } = useAuth();
  const { cartItems, wishlist, setIsCartOpen, distanceKm } = useCart();
  const { 
    categories, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery,
    setTrackingOrderId,
    activeView,
    setActiveView 
  } = useProducts();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isAdmin = user?.role === 'admin';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border-b border-emerald-900/10 transition-all">
        
        {/* Top Executive Announcement & Hyperlocal Dispatch Ticker */}
        <div className="bg-[#091512] text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 font-medium">
            <span className="flex items-center gap-1.5 bg-emerald-900/70 border border-emerald-700/50 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Express Dispatch
            </span>
            <span className="text-slate-300">
              Guaranteed Fresh Transit: Free Nursery Delivery on orders over <strong className="text-emerald-400">₹499</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 text-emerald-300 hover:text-white bg-emerald-950/90 hover:bg-emerald-900/90 px-3 py-0.5 rounded-full border border-emerald-700/40 transition-all text-[11px] font-semibold"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Route Distance: <strong>{distanceKm || 5.2} KM</strong></span>
            </button>

            {isAdmin && (
              <span className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider shadow-sm">
                System Admin
              </span>
            )}
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo & Brand Identity */}
            <div 
              onClick={() => { setActiveView('shop'); setActiveCategory('all'); }}
              className="flex items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#10b981] flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover:scale-105 transition-all duration-300">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black tracking-tight text-[#064e3b] font-serif">VRUKSHA</span>
                  <span className="bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md tracking-wider">
                    AIRWAY
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium -mt-0.5">
                  Direct Nursery Network & Living Botanicals
                </p>
              </div>
            </div>

            {/* Centered Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search botanical plants, vegetable seeds, organic NPK fertilizers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 pl-11 pr-16 py-2.5 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all border border-slate-200 shadow-xs"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
                {searchQuery ? (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-2.5 text-xs text-slate-400 hover:text-slate-700 font-semibold px-1.5 py-0.5 rounded bg-slate-200/60"
                  >
                    Clear
                  </button>
                ) : (
                  <span className="absolute right-3.5 top-2.5 text-[10px] text-slate-400 font-mono border border-slate-200 px-1.5 py-0.5 rounded bg-white">
                    ⌘K
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons Cluster */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              
              {/* Admin Dashboard Toggle */}
              {isAdmin && (
                <button
                  onClick={() => setActiveView(activeView === 'admin' ? 'shop' : 'admin')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeView === 'admin' 
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' 
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">{activeView === 'admin' ? 'Store Front' : 'Admin Console'}</span>
                </button>
              )}

              {/* Delivery Route Map Modal Trigger */}
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition-colors border border-slate-200/80"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Live Route</span>
              </button>

              {/* Order Tracking */}
              <button
                onClick={() => {
                  const latestId = localStorage.getItem('vruksha_latest_order_id') || trackingOrderId || 'VRK-80921';
                  setTrackingOrderId(latestId);
                }}
                className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                title="Track order status"
              >
                <Truck className="w-4 h-4 text-emerald-600" />
                <span className="hidden md:inline">Track Order</span>
              </button>

              {/* Shopping Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-700/20 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Bag</span>
                {totalCartCount > 0 && (
                  <span className="bg-white text-emerald-900 text-[11px] font-black px-1.5 py-0.5 rounded-full min-w-5 text-center shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* User Account / Logout */}
              {user ? (
                <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-100 to-green-50 border border-emerald-300 flex items-center justify-center text-emerald-900 font-extrabold text-xs shadow-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden xl:block text-left text-xs">
                    <p className="font-bold text-slate-900 leading-tight truncate max-w-[110px]">{user.name}</p>
                    <p className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">{user.role || 'customer'}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-1.5 border border-slate-300 hover:border-emerald-600 text-slate-800 hover:text-emerald-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Sign In</span>
                </button>
              )}

            </div>
          </div>
        </div>

        {/* Sub-navbar Category Navigation Pills */}
        <div className="bg-[#f8faf8] border-t border-slate-200/80 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-4 overflow-x-auto py-2.5 text-xs font-semibold text-slate-600 no-scrollbar">
            <button
              onClick={() => { setActiveView('shop'); setActiveCategory('all'); }}
              className={`px-4 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                activeCategory === 'all' && activeView === 'shop'
                  ? 'bg-emerald-800 text-white font-bold shadow-sm shadow-emerald-900/20'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
              }`}
            >
              <span>🌿</span>
              <span>All Catalog</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveView('shop'); setActiveCategory(cat.id); }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.id && activeView === 'shop'
                    ? 'bg-emerald-800 text-white font-bold shadow-sm shadow-emerald-900/20'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Location Picker Modal */}
      <LocationPickerModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
}
