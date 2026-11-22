import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider, useProducts } from './context/ProductContext';

import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import OrderTrackingModal from './components/OrderTrackingModal';
import AdminDashboard from './components/AdminDashboard';
import SellerDashboard from './components/SellerDashboard';
import VivaGuideModal from './components/VivaGuideModal';
import Footer from './components/Footer';

import { 
  SlidersHorizontal, 
  Sun, 
  Droplets, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  Package, 
  ArrowRight,
  Filter
} from 'lucide-react';

function ShopContent() {
  const { 
    products, 
    loading, 
    activeCategory, 
    setActiveCategory, 
    categories, 
    filters, 
    setFilters 
  } = useProducts();

  const currentCategoryObj = categories.find(c => c.id === activeCategory);

  return (
    <main className="min-h-screen pb-20 bg-[#f8faf8]">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Main Catalog & Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        
        {/* Section Header: Title, Department Pill & Modern Sorting */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/90 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 border border-emerald-300/60 px-3 py-1 rounded-full">
                {activeCategory === 'all' ? 'All Botanical Products' : currentCategoryObj?.name}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                ({products.length} {products.length === 1 ? 'Specimen' : 'Specimens'} Available)
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
              {activeCategory === 'all' 
                ? 'Certified Plants, Seeds & Organic Nutrients' 
                : currentCategoryObj?.description}
            </h2>
          </div>

          {/* Sort & Filter Controls */}
          <div className="flex items-center gap-3 text-xs font-semibold self-start md:self-end">
            <span className="text-slate-500 font-medium">Sort Order:</span>
            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="bg-white border border-slate-300 hover:border-emerald-500 rounded-2xl px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold transition-all shadow-xs cursor-pointer"
              >
                <option value="popular">Curated Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated Only (4.5★+)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Layout: Filter Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Smart Filters */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                  <span>Precision Filters</span>
                </h3>
                <button
                  onClick={() => setFilters({ maxPrice: 500, sunlight: 'all', water: 'all', sortBy: 'popular' })}
                  className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Price Filter Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-baseline text-xs font-bold text-slate-700">
                  <span>Price Range</span>
                  <span className="text-emerald-800 font-serif text-sm font-black bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    Up to ₹{filters.maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="500"
                  step="10"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>₹30</span>
                  <span>₹250</span>
                  <span>₹500</span>
                </div>
              </div>

              {/* Sunlight Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sunlight Requirement</span>
                </label>
                <select
                  value={filters.sunlight}
                  onChange={(e) => setFilters(prev => ({ ...prev, sunlight: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-emerald-500 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
                >
                  <option value="all">All Sunlight Conditions</option>
                  <option value="Indirect Light">Indirect Light / Shaded</option>
                  <option value="Low to Bright Light">Low Light Resilient</option>
                  <option value="Full Sunlight">Full Direct Sun (6+ hrs)</option>
                </select>
              </div>

              {/* Water Requirement Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-sky-500" />
                  <span>Watering Schedule</span>
                </label>
                <select
                  value={filters.water}
                  onChange={(e) => setFilters(prev => ({ ...prev, water: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-emerald-500 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-colors"
                >
                  <option value="all">All Water Schedules</option>
                  <option value="Once a week">Low (Once a week)</option>
                  <option value="Alternate days">Moderate (Alternate days)</option>
                  <option value="Daily">Daily Moisture</option>
                </select>
              </div>

              {/* Trust Tag */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px]">100% Transit Health Guaranteed</span>
              </div>
            </div>

            {/* Sowing Season Feature Banner */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-6 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Monsoon Sowing Guide</span>
              </div>
              <h4 className="font-extrabold text-sm leading-snug">Ideal Season for Seed Germination</h4>
              <p className="text-xs text-amber-50/90 leading-relaxed">
                August & September are prime months to sow organic Tomato, Basil, and Marigold seeds.
              </p>
              <button
                onClick={() => setActiveCategory('seeds')}
                className="bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md mt-1 inline-flex items-center gap-1.5"
              >
                <span>Browse Seeds</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </aside>

          {/* Right Area: Products Grid */}
          <div className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="bg-white rounded-3xl p-5 border border-slate-200/90 h-96 animate-pulse space-y-4">
                    <div className="bg-slate-200 rounded-2xl h-48 w-full"></div>
                    <div className="bg-slate-200 h-4 rounded-md w-3/4"></div>
                    <div className="bg-slate-200 h-3 rounded-md w-1/2"></div>
                    <div className="bg-slate-200 h-8 rounded-xl w-full mt-4"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/90 space-y-4 shadow-xs">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                  <Filter className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800 text-base">No botanical products match your filters</h3>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto">Try broadening your price slider or resetting the sunlight and water requirement filters.</p>
                </div>
                <button
                  onClick={() => { setActiveCategory('all'); setFilters({ maxPrice: 500, sunlight: 'all', water: 'all', sortBy: 'popular' }); }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-800/20"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}

function MainContent() {
  const { user } = useAuth();
  const { activeView } = useProducts();

  // 1. If not authenticated, force redirect to LoginPage first
  if (!user) {
    return <LoginPage />;
  }

  // 2. If user is logged in, show requested view or role view
  const renderView = () => {
    if (activeView === 'admin' || (user.role === 'admin' && activeView !== 'shop' && activeView !== 'seller')) {
      return <AdminDashboard />;
    }
    if (activeView === 'seller') {
      return <SellerDashboard />;
    }
    return <ShopContent />;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f8faf8]">
      <Navbar />

      {renderView()}

      <Footer />

      {/* Global Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <VivaGuideModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <MainContent />
          <OrderTrackingModal />
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}
