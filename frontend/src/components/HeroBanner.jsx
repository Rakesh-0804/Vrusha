import React from 'react';
import { useProducts } from '../context/ProductContext';
import { 
  ShieldCheck, 
  Truck, 
  Sun, 
  HeartHandshake, 
  ArrowRight, 
  Leaf, 
  Sprout, 
  Sparkles, 
  Award,
  CheckCircle2,
  Compass
} from 'lucide-react';

export default function HeroBanner() {
  const { categories, setActiveCategory, setActiveView } = useProducts();

  return (
    <div className="relative bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#042f2e] text-white overflow-hidden py-14 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/40">
      
      {/* Background Decorative Mesh & Glowing Spheres */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-[420px] h-[420px] rounded-full bg-teal-400/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Heading, Value Props & CTAs */}
        <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
          
          {/* Status pill */}
          <div className="inline-flex items-center gap-2.5 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-md shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="tracking-wide uppercase text-[11px] font-bold">Premium Nursery Direct Delivery</span>
            <span className="text-emerald-500/60 hidden sm:inline">•</span>
            <span className="text-emerald-200/80 hidden sm:inline">Certified Fresh Arrivals</span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.12] text-white">
              Bringing Living Greenery <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-green-100 to-amber-200">
                Direct To Your Living Space
              </span>
            </h1>
            <p className="text-emerald-100/85 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Curated air-purifying indoor specimens, heirloom vegetable seeds, organic vermicompost, and handcrafted planters sourced directly from local partner nurseries in climate-controlled protective transit.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
            <button
              onClick={() => { setActiveView('shop'); setActiveCategory('all'); }}
              className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-slate-950 font-extrabold px-7 py-3.5 rounded-2xl text-sm transition-all transform hover:-translate-y-0.5 shadow-xl shadow-emerald-950/60 group"
            >
              <span>Explore Full Nursery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => { setActiveView('shop'); setActiveCategory('indoor-plants'); }}
              className="flex items-center gap-2 bg-emerald-900/60 hover:bg-emerald-900/90 text-emerald-200 border border-emerald-600/40 font-bold px-6 py-3.5 rounded-2xl text-sm transition-all backdrop-blur-sm"
            >
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Indoor Air Purifiers</span>
            </button>
          </div>

          {/* Live Trust Statistics & Guarantees */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-emerald-800/40">
            <div className="text-left bg-emerald-950/30 border border-emerald-800/20 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-white font-serif">4.9 ★</div>
              <p className="text-[11px] text-emerald-300/80 font-medium">12,000+ Gardeners</p>
            </div>

            <div className="text-left bg-emerald-950/30 border border-emerald-800/20 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-emerald-300 font-serif">100%</div>
              <p className="text-[11px] text-emerald-300/80 font-medium">Transit Safe Guarantee</p>
            </div>

            <div className="text-left bg-emerald-950/30 border border-emerald-800/20 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-white font-serif">45+</div>
              <p className="text-[11px] text-emerald-300/80 font-medium">Certified Nurseries</p>
            </div>

            <div className="text-left bg-emerald-950/30 border border-emerald-800/20 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-serif">45 Min</div>
              <p className="text-[11px] text-emerald-300/80 font-medium">Dispatch Routing</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Category Grid Card */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900/60 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-emerald-500/20 shadow-2xl space-y-5 relative overflow-hidden">
            
            {/* Top Header of Category Box */}
            <div className="flex items-center justify-between border-b border-emerald-800/30 pb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-800/60 border border-emerald-600/40 flex items-center justify-center text-emerald-300">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Botanical Catalog</h3>
                  <p className="text-[10px] text-emerald-400">Direct Farm-To-Doorstep Categories</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-900/80 border border-emerald-700/50 px-2.5 py-0.5 rounded-full">
                5 Departments
              </span>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => { setActiveView('shop'); setActiveCategory(cat.id); }}
                  className="bg-emerald-950/60 hover:bg-emerald-800/60 border border-emerald-700/30 hover:border-emerald-400/50 text-white p-3.5 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-sm group flex items-center gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/80 group-hover:bg-emerald-700/80 border border-emerald-600/30 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-200 transition-colors truncate">
                      {cat.name}
                    </h4>
                    <p className="text-[10px] text-emerald-400/80 truncate">Browse Collection</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Sowing Callout Banner Inside Category Widget */}
            <div className="bg-gradient-to-r from-emerald-900/80 to-teal-900/80 border border-emerald-500/30 rounded-2xl p-3.5 flex items-center gap-3 text-xs">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-emerald-100 truncate">Free Personalized Plant Care Consultation</p>
                <p className="text-[10px] text-emerald-300/80">Included with every confirmed plant delivery order.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
