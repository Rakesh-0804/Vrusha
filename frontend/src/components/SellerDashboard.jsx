import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { Store, Plus, Package, Truck, DollarSign, CheckCircle2, AlertCircle, Image, RefreshCw } from 'lucide-react';

export default function SellerDashboard() {
  const { products, refreshProducts, setTrackingOrderId } = useProducts();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'add'

  // Add Product Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('indoor-plants');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [nursery, setNursery] = useState('Green Paradise Nursery, Bengaluru');
  const [sunlight, setSunlight] = useState('Indirect Light');
  const [water, setWater] = useState('Twice a week');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/seller/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/seller/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          price,
          originalPrice,
          nursery,
          sunlight,
          water,
          description,
          image: image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80'
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Product added successfully to nursery catalog!');
        setName('');
        setPrice('');
        setOriginalPrice('');
        setDescription('');
        setImage('');
        refreshProducts();
        setActiveTab('products');
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to add product');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/seller/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          detail: `Status updated to ${newStatus} by Nursery Admin`
        })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Store className="w-6 h-6 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Partner Vendor Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif">Nursery & Seed Vendor Dashboard</h1>
            <p className="text-emerald-200 text-xs sm:text-sm max-w-xl">
              List plants, manage organic seed inventory, process customer dispatches, and track daily sales analytics.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
            <div>
              <p className="text-[10px] text-emerald-200 uppercase font-bold">Catalog Items</p>
              <p className="text-xl font-black text-white">{products.length}</p>
            </div>
            <div className="border-x border-white/10 px-3">
              <p className="text-[10px] text-emerald-200 uppercase font-bold">Live Orders</p>
              <p className="text-xl font-black text-amber-300">{orders.length}</p>
            </div>
            <div>
              <p className="text-[10px] text-emerald-200 uppercase font-bold">Total Sales</p>
              <p className="text-xl font-black text-emerald-300">₹{totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 text-xs font-bold pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-1.5 pb-2 px-3 border-b-2 transition-colors ${
            activeTab === 'products'
              ? 'border-emerald-600 text-emerald-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Inventory ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-1.5 pb-2 px-3 border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-emerald-600 text-emerald-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`flex items-center gap-1.5 pb-2 px-3 border-b-2 transition-colors ${
            activeTab === 'add'
              ? 'border-emerald-600 text-emerald-700 font-extrabold'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Plus className="w-4 h-4 text-emerald-600" />
          <span>+ Add New Product</span>
        </button>
      </div>

      {/* TAB 1: Product Inventory */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-800 text-sm">Listed Nursery Products</h3>
            <button
              onClick={() => setActiveTab('add')}
              className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Nursery Partner</th>
                  <th className="p-3">Care Specs</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 flex items-center gap-3">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div>
                        <p className="font-bold text-slate-900">{p.name}</p>
                        <p className="text-[10px] text-slate-400">ID: {p.id}</p>
                      </div>
                    </td>
                    <td className="p-3 capitalize font-semibold text-emerald-700">{p.category}</td>
                    <td className="p-3 font-bold font-serif text-slate-900">₹{p.price}</td>
                    <td className="p-3 text-slate-600">{p.nursery}</td>
                    <td className="p-3 text-[11px] text-slate-500">{p.sunlight} | {p.water}</td>
                    <td className="p-3 text-right">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        In Stock ({p.stockCount || 50})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Customer Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800 text-sm">Incoming Customer Orders</h3>
            <button 
              onClick={fetchOrders}
              className="text-xs text-emerald-700 font-bold flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Orders</span>
            </button>
          </div>

          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Order ID</span>
                    <h4 className="font-black text-slate-900 font-mono text-sm">{order.id}</h4>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Customer</span>
                    <p className="font-bold text-slate-800">{order.customerName} ({order.phone})</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Distance</span>
                    <p className="font-bold text-emerald-800">{order.distanceKm || 5} KM</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Plantation Service</span>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      order.isPlantationRequested 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {order.isPlantationRequested ? 'Requested (₹' + (order.plantationFee || 0) + ')' : 'No'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Total Bill</span>
                    <p className="font-black text-emerald-950 font-serif text-sm">₹{order.total}</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Update Status</span>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-slate-100 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none"
                    >
                      <option value="Placed">Placed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-bold text-slate-700 mb-1">Items Ordered:</p>
                    <ul className="space-y-1 text-slate-600">
                      {order.items?.map((item, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{item.name} x {item.quantity}</span>
                          <span className="font-bold">₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-700 mb-1">Shipping Address:</p>
                    <p className="text-slate-600 leading-tight text-[11px]">{order.shippingAddress}</p>
                    <button
                      onClick={() => setTrackingOrderId(order.id)}
                      className="mt-2 text-emerald-700 font-bold text-[11px] underline"
                    >
                      Open Live Tracking View ➔
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Add New Product Form */}
      {activeTab === 'add' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-black text-slate-900 text-base font-serif">Add New Product to Vruksha Catalog</h3>
            <p className="text-xs text-slate-500">List plants, seeds, fertilizers, or pots with care guidelines.</p>
          </div>

          {message && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl font-bold text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Product Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Organic Neem Oil Spray (500 ml)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="indoor-plants">Indoor Plants</option>
                  <option value="outdoor-plants">Outdoor Plants</option>
                  <option value="rare-species">Rare & Exotic Species</option>
                  <option value="seeds">Seeds</option>
                  <option value="fertilizers">Fertilizers</option>
                  <option value="tools-pots">Tools & Pots</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="199"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Sunlight Requirement</label>
                <input
                  type="text"
                  placeholder="e.g. Direct Sun (5-6 hrs)"
                  value={sunlight}
                  onChange={(e) => setSunlight(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Watering Frequency</label>
                <input
                  type="text"
                  placeholder="e.g. Daily / Alternate days"
                  value={water}
                  onChange={(e) => setWater(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Product Image URL</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Description & Care Details</label>
              <textarea
                rows={3}
                placeholder="Enter plant features, germination tips, or fertilizer application..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-3 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-emerald-200"
            >
              Save & List Product
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
