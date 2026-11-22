import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { 
  BookOpen, 
  X, 
  Layers, 
  Database, 
  Code, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  Server, 
  Layout, 
  Globe 
} from 'lucide-react';

export default function VivaGuideModal() {
  const { activeView, setActiveView } = useProducts();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'arch' | 'dfd' | 'er' | 'qa'

  if (activeView !== 'viva') return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-600 text-white p-6 rounded-t-3xl flex items-center justify-between sticky top-0 z-20 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="bg-amber-900/60 text-amber-200 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                BCA Final Year Project Presentation
              </span>
              <h2 className="text-xl font-black font-serif leading-tight">VRUKSHA — Project Documentation & Viva Guide</h2>
            </div>
          </div>

          <button
            onClick={() => setActiveView('shop')}
            className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viva Sub-navbar */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 flex items-center gap-2 overflow-x-auto text-xs font-bold text-amber-900">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'overview' ? 'bg-amber-600 text-white shadow-sm' : 'hover:bg-amber-100'
            }`}
          >
            📋 Project Abstract & Objectives
          </button>

          <button
            onClick={() => setActiveTab('arch')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'arch' ? 'bg-amber-600 text-white shadow-sm' : 'hover:bg-amber-100'
            }`}
          >
            🏗️ System Architecture & Tech Stack
          </button>

          <button
            onClick={() => setActiveTab('dfd')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'dfd' ? 'bg-amber-600 text-white shadow-sm' : 'hover:bg-amber-100'
            }`}
          >
            🔄 DFD (Data Flow Diagram)
          </button>

          <button
            onClick={() => setActiveTab('er')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'er' ? 'bg-amber-600 text-white shadow-sm' : 'hover:bg-amber-100'
            }`}
          >
            🗄️ ER Diagram & Database Schema
          </button>

          <button
            onClick={() => setActiveTab('qa')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'qa' ? 'bg-amber-600 text-white shadow-sm' : 'hover:bg-amber-100'
            }`}
          >
            🎯 Examiner Viva Q&A Prep
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-xs text-slate-700">
          
          {/* TAB 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-base font-black text-slate-900 font-serif">1. Executive Project Summary</h3>
                <p className="leading-relaxed">
                  <strong>VRUKSHA</strong> (meaning <em>"tree/plant"</em> in Sanskrit) is an specialized Agri-Tech E-Commerce web platform designed for selling and delivering plants, authentic seeds, organic fertilizers, and gardening tools directly from local nurseries to doorstep customers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100 space-y-2">
                  <h4 className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
                    ❌ Existing System Problem
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-rose-800 text-[11px] leading-relaxed">
                    <li>Lack of price transparency across local offline nurseries.</li>
                    <li>No doorstep delivery for fragile living plants and bulky fertilizer bags.</li>
                    <li>Generic e-commerce stores (Amazon/Flipkart) lack specific plant care specs (sunlight, watering, soil, sowing season).</li>
                  </ul>
                </div>

                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 space-y-2">
                  <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                    ✅ Vruksha Proposed Solution
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-emerald-800 text-[11px] leading-relaxed">
                    <li>Centralized catalog linking verified local nurseries directly to buyers.</li>
                    <li>Passwordless OTP sign-in, smart filters (Sunlight, Water, Price), itemized delivery fee logic.</li>
                    <li>Real-time order status tracking timeline (Placed ➔ Packed ➔ Shipped ➔ Delivered).</li>
                    <li>Nursery Admin dashboard for stock and dispatch management.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Architecture */}
          {activeTab === 'arch' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
                <h3 className="text-base font-black text-amber-400 font-serif">System Architecture Diagram</h3>

                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 font-mono text-[11px] text-emerald-300 space-y-3">
                  <div className="text-center font-bold text-amber-300">Client Layer (React.js + Vite + Tailwind CSS)</div>
                  <div className="text-center text-slate-400">⬇ REST API Calls (JSON via HTTP fetch)</div>
                  <div className="border border-emerald-500/50 p-3 rounded-xl bg-slate-900 text-center space-y-1">
                    <p className="font-bold text-white">Express.js API Server (Port 5000)</p>
                    <p className="text-[10px] text-slate-400">Routes: /api/products | /api/orders | /api/auth | /api/seller</p>
                  </div>
                  <div className="text-center text-slate-400">⬇ File I/O Persistence</div>
                  <div className="text-center font-bold text-amber-300 bg-amber-950/40 p-2 rounded-xl border border-amber-500/30">
                    JSON Database Storage (data.json)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-800">Frontend</p>
                  <p className="text-[11px] text-slate-600">React 18, Vite, Tailwind CSS 4, Lucide React Icons</p>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-800">Backend</p>
                  <p className="text-[11px] text-slate-600">Node.js, Express.js REST Framework, CORS middleware</p>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-800">State Management</p>
                  <p className="text-[11px] text-slate-600">React Context API (AuthContext, CartContext, ProductContext)</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DFD */}
          {activeTab === 'dfd' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-900 font-serif">Data Flow Diagram (DFD Level 0 & Level 1)</h3>
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-[11px] space-y-3">
                <p className="font-bold text-emerald-900">DFD Level 0 (Context Diagram):</p>
                <div className="bg-white p-3 rounded-xl border border-slate-300">
                  [ Customer / User ]  ───►  ( 1.0 VRUKSHA PLATFORM )  ◄───  [ Nursery Vendor ]<br />
                                       ◄───  ( Product / Order Info )   ───►
                </div>

                <p className="font-bold text-emerald-900 pt-2">DFD Level 1 (Process Breakdown):</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  <li><strong>Process 1.1 (User Auth):</strong> Receives phone/email ➔ Generates OTP ➔ Returns auth token.</li>
                  <li><strong>Process 1.2 (Product Search & Care Filter):</strong> Queries data.json by Category, Sunlight, Water, Price ➔ Returns matching products.</li>
                  <li><strong>Process 1.3 (Order Placement):</strong> Receives cart items & address ➔ Calculates delivery fee ➔ Generates Order ID.</li>
                  <li><strong>Process 1.4 (Order Tracking & Dispatch):</strong> Nursery updates order status ➔ Pushes timeline update.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: ER Diagram */}
          {activeTab === 'er' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-900 font-serif">Entity-Relationship (ER) Schema</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[11px]">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <p className="font-bold text-emerald-900">1. Product Entity</p>
                  <p className="text-slate-600">
                    <strong>Fields:</strong> id (PK), name, category (FK), price, originalPrice, discount, rating, reviewCount, sunlight, water, potSize, description, nursery, image.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <p className="font-bold text-emerald-900">2. Order Entity</p>
                  <p className="text-slate-600">
                    <strong>Fields:</strong> id (PK), customerName, phone, email, shippingAddress, items (JSON array), subtotal, deliveryFee, total, paymentMethod, status, trackingHistory.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <p className="font-bold text-emerald-900">3. Category Entity</p>
                  <p className="text-slate-600">
                    <strong>Fields:</strong> id (PK), name, icon, description.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <p className="font-bold text-emerald-900">4. Review Entity</p>
                  <p className="text-slate-600">
                    <strong>Fields:</strong> id (PK), productId (FK), userName, rating, comment, date.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Viva Q&A */}
          {activeTab === 'qa' && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-slate-900 font-serif">Common Examiner Viva Questions & Model Answers</h3>

              <div className="space-y-3">
                <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 space-y-1">
                  <p className="font-bold text-amber-950">Q1: Why did you choose React & Node.js (MERN/Node architecture) for Vruksha?</p>
                  <p className="text-amber-900 text-[11px] leading-relaxed">
                    <strong>Answer:</strong> Node.js provides a high-performance asynchronous event-driven backend for handling fast REST API requests. React's component-driven architecture enables smooth state updates (e.g. instant cart drawer calculations, live order tracking) without full page reloads.
                  </p>
                </div>

                <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 space-y-1">
                  <p className="font-bold text-amber-950">Q2: How is the Delivery Fee rule implemented?</p>
                  <p className="text-amber-900 text-[11px] leading-relaxed">
                    <strong>Answer:</strong> Vruksha enforces a business logic rule: Orders with subtotal &ge; ₹399 receive FREE express delivery. Orders under ₹399 incur a standard ₹40 nursery delivery fee.
                  </p>
                </div>

                <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 space-y-1">
                  <p className="font-bold text-amber-950">Q3: How does the Order Status tracking progression work?</p>
                  <p className="text-amber-900 text-[11px] leading-relaxed">
                    <strong>Answer:</strong> Orders follow a 5-stage state machine: <code>Placed ➔ Packed ➔ Shipped ➔ Out for Delivery ➔ Delivered</code>. When a nursery admin updates the status via <code>PUT /api/seller/orders/:id/status</code>, an audit timestamp is appended to the order's tracking array.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
