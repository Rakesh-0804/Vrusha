import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { 
  Sprout, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Heart, 
  BookOpen, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  Send, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function Footer() {
  const { setActiveCategory, setActiveView } = useProducts();
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscribedEmail && subscribedEmail.includes('@')) {
      setSubscribed(true);
      setSubscribedEmail('');
    }
  };

  return (
    <footer className="bg-[#050b10] text-slate-300 border-t border-emerald-950 text-xs">
      
      {/* Top Value Assurance Banner */}
      <div className="border-b border-emerald-950/80 bg-[#070e14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Express Airway Transit</h5>
              <p className="text-[11px] text-slate-400">Protective ventilated plant crates</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">7-Day Transit Health Guarantee</h5>
              <p className="text-[11px] text-slate-400">Zero-risk live arrival guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">100% Organic certified</h5>
              <p className="text-[11px] text-slate-400">Natural vermicompost & seeds</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Direct Nursery Fair Pricing</h5>
              <p className="text-[11px] text-slate-400">Supporting local nursery growers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Col 1: Brand Info (Col span 4) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-slate-950 shadow-md">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-white font-serif tracking-tight">VRUKSHA</span>
            <span className="bg-emerald-950 border border-emerald-700/50 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
              AIRWAY
            </span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            India's dedicated botanical e-commerce and real-time nursery logistics platform. Bringing healthy air-purifying specimens, heirloom organic seeds, and customized plant care directly to modern homes.
          </p>

          {/* Newsletter Box */}
          <div className="pt-2 space-y-2">
            <h5 className="font-bold text-white text-xs">Botanical Care Bulletin</h5>
            {subscribed ? (
              <div className="bg-emerald-950/80 border border-emerald-800/60 p-2.5 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed! Weekly seasonal watering & sowing guides incoming.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email for plant care tips"
                  value={subscribedEmail}
                  onChange={(e) => setSubscribedEmail(e.target.value)}
                  className="flex-1 bg-[#09131c] border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Col 2: Categories (Col span 3) */}
        <div className="md:col-span-3 space-y-3.5">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-emerald-400">
            Botanical Catalog
          </h4>
          <ul className="space-y-2.5 text-slate-400">
            <li>
              <button 
                onClick={() => { setActiveView('shop'); setActiveCategory('indoor-plants'); }} 
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>🪴</span> Indoor Air Purifiers
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveView('shop'); setActiveCategory('outdoor-plants'); }} 
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>🌺</span> Outdoor Flowering Flora
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveView('shop'); setActiveCategory('seeds'); }} 
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>🌱</span> Heirloom Vegetable & Flower Seeds
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveView('shop'); setActiveCategory('fertilizers'); }} 
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>🌾</span> Organic Vermicompost & Bio-Fertilizers
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setActiveView('shop'); setActiveCategory('tools-pots'); }} 
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>🏺</span> Self-Watering Planters & Tools
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Architecture & Project Presentation (Col span 2) */}
        <div className="md:col-span-2 space-y-3.5">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-emerald-400">
            Platform Specs
          </h4>
          <ul className="space-y-2.5 text-slate-400">
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Passwordless OTP</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>GIS Route Matrix</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Care Guide Matrix</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Real-Time Tracking</span>
            </li>
            <li className="pt-1">
              <button 
                onClick={() => setActiveView('viva')} 
                className="text-amber-400 font-bold hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>BCA Architecture Viva</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Central Support & Dispatch Hub (Col span 3) */}
        <div className="md:col-span-3 space-y-3.5">
          <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-emerald-400">
            Central Dispatch Hub
          </h4>
          <div className="space-y-2.5 text-slate-400">
            <p className="flex items-start gap-2 leading-relaxed">
              <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span>Vruksha HQ & Central Dispatch Hub, 100 Feet Road, Indiranagar, Bengaluru 560038</span>
            </p>
            <p className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>1800-VRUKSHA (Toll Free Support)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>support@vruksha-nursery.in</span>
            </p>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="bg-[#020508] border-t border-emerald-950/60 py-5 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 <strong>VRUKSHA Botanical Platform</strong> — Built with React & Node.js.</p>
          <p className="text-emerald-500/80 font-medium">Certified Airway Botanical Dispatch & Urban Horticulture Network</p>
        </div>
      </div>
    </footer>
  );
}
