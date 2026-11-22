import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import DeliveryMap from './DeliveryMap';
import { 
  ShieldCheck, 
  DollarSign, 
  Navigation, 
  Package, 
  MapPin, 
  Truck, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCw, 
  Building2, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  Layers,
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';

export default function AdminDashboard() {
  const { products, refreshProducts } = useProducts();

  const [activeTab, setActiveTab] = useState('prices'); // 'prices' | 'delivery' | 'orders' | 'hubs'
  const [settings, setSettings] = useState({
    officeLocation: {
      name: 'Vruksha HQ & Central Dispatch Hub',
      address: '100 Feet Road, Indiranagar, MG Road, Bengaluru, Karnataka 560038',
      city: 'Bengaluru',
      state: 'Karnataka',
      lat: 12.9716,
      lng: 77.5946,
      phone: '+91 80 4567 8900'
    },
    delivery: {
      baseFee: 30,
      perKmRate: 8,
      freeDeliveryThreshold: 499,
      maxFreeDeliveryKm: 10,
      plantationBaseFee: 100,
      plantationPerKmRate: 10
    },
    hubs: []
  });

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Editing state for Product prices & filter
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState('all');
  const [editingPrice, setEditingPrice] = useState({});
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'indoor-plants',
    price: 199,
    originalPrice: 299,
    nursery: 'Vruksha Main HQ Nursery',
    sunlight: 'Indirect Light',
    water: 'Once a week',
    description: 'Fresh quality healthy plant.'
  });

  // Selected Order for Route Map Modal
  const [selectedOrderForMap, setSelectedOrderForMap] = useState(null);

  // Fetch Settings & Orders
  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      const [resSet, resOrd] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/seller/orders')
      ]);
      const dataSet = await resSet.json();
      const dataOrd = await resOrd.json();

      if (dataSet && dataSet.delivery) {
        setSettings(dataSet);
      }
      if (Array.isArray(dataOrd)) {
        setOrders(dataOrd);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Handle Save Delivery Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaveStatus('Saving settings...');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus('Settings updated successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (err) {
      setSaveStatus('Error updating settings');
    }
  };

  // Handle Product Price Update
  const handleSaveProductPrice = async (productId) => {
    const edit = editingPrice[productId];
    if (!edit) return;

    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: Number(edit.price),
          originalPrice: Number(edit.originalPrice || edit.price * 1.3),
          inStock: edit.inStock !== undefined ? edit.inStock : true,
          stockCount: Number(edit.stockCount || 20)
        })
      });
      const data = await res.json();
      if (data.success) {
        refreshProducts();
        setSaveStatus(`Updated price for product ${productId}`);
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (err) {
      alert('Failed to update product price');
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' });
      if (res.ok) {
        refreshProducts();
      }
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  // Handle Add Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/seller/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      if (data.success) {
        refreshProducts();
        setShowAddProduct(false);
        setNewProduct({
          name: '',
          category: 'indoor-plants',
          price: 199,
          originalPrice: 299,
          nursery: 'Vruksha Main HQ Nursery',
          sunlight: 'Indirect Light',
          water: 'Once a week',
          description: 'Fresh quality healthy plant.'
        });
      }
    } catch (err) {
      alert('Failed to add product');
    }
  };

  // Handle Order Status Update
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/seller/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, detail: `Status changed to ${newStatus} by Admin` })
      });
      const data = await res.json();
      if (data.success) {
        loadAdminData();
      }
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-16">
      
      {/* Top Admin Header Bar */}
      <div className="bg-slate-950 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/50">
              Admin Access Control Center
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-serif mt-1 flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <span>Vruksha Platform Administration</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Control product pricing, delivery rate per KM, dispatch hubs & live order fulfillment routes.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-center min-w-[100px]">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Total Products</span>
              <p className="text-lg font-black text-emerald-400">{products.length}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-center min-w-[100px]">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Active Orders</span>
              <p className="text-lg font-black text-amber-400">{orders.length}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-center min-w-[110px]">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Per KM Rate</span>
              <p className="text-lg font-black text-blue-400">₹{settings.delivery?.perKmRate}/km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('prices')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'prices'
                ? 'bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Product Prices & Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('delivery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'delivery'
                ? 'bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>Delivery Rates (Per KM), UPI & COD Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Order Fulfillment ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'analytics'
                ? 'bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Revenue & Inventory Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('hubs')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'hubs'
                ? 'bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Dispatch Hubs</span>
          </button>
        </div>

        {saveStatus && (
          <div className="bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveStatus}</span>
          </div>
        )}

        {/* TAB 1: PRODUCT PRICES & CATALOG */}
        {activeTab === 'prices' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Product Catalog & Price Control ({products.length} Items)</h2>
                <p className="text-xs text-slate-400">Search products, edit prices, stock, or add new plants & seeds.</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search products by name..."
                  value={adminSearchQuery}
                  onChange={(e) => setAdminSearchQuery(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs px-3 py-2 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-64"
                />

                <select
                  value={adminCategoryFilter}
                  onChange={(e) => setAdminCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs font-bold text-emerald-400 px-3 py-2 rounded-xl focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="indoor-plants">Indoor Plants</option>
                  <option value="outdoor-plants">Outdoor Plants</option>
                  <option value="rare-species">Rare & Exotic (💎)</option>
                  <option value="seeds">Seeds</option>
                  <option value="fertilizers">Fertilizers</option>
                  <option value="tools-pots">Tools & Pots</option>
                </select>

                <button
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Add Product Drawer Form */}
            {showAddProduct && (
              <form onSubmit={handleCreateProduct} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-emerald-400">Add New Plant or Gardening Product</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="indoor-plants">Indoor Plants</option>
                      <option value="outdoor-plants">Outdoor Plants</option>
                      <option value="seeds">Seeds</option>
                      <option value="fertilizers">Fertilizers</option>
                      <option value="tools-pots">Tools & Pots</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>
                <button type="submit" className="bg-emerald-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl">
                  Save & Publish Product
                </button>
              </form>
            )}

            {/* Products Table */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 text-[11px] uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Selling Price (₹)</th>
                    <th className="p-3">Original Price (₹)</th>
                    <th className="p-3">Discount</th>
                    <th className="p-3">Stock Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {products
                    .filter(product => {
                      const q = adminSearchQuery.trim().toLowerCase();
                      const matchesSearch = !q || product.name.toLowerCase().includes(q) || product.id.toLowerCase().includes(q);
                      const matchesCategory = adminCategoryFilter === 'all' || product.category === adminCategoryFilter;
                      return matchesSearch && matchesCategory;
                    })
                    .map(product => {
                    const edit = editingPrice[product.id] || {
                      price: product.price,
                      originalPrice: product.originalPrice,
                      inStock: product.inStock
                    };

                    return (
                      <tr key={product.id} className="hover:bg-slate-900/50">
                        <td className="p-3 flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-10 h-10 object-cover rounded-xl border border-slate-800" 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                          <div>
                            <span className="font-bold text-white block">{product.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">ID: {product.id}</span>
                          </div>
                        </td>
                        <td className="p-3 capitalize font-medium text-emerald-400">{product.category}</td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={edit.price}
                            onChange={(e) => setEditingPrice({
                              ...editingPrice,
                              [product.id]: { ...edit, price: e.target.value }
                            })}
                            className="bg-slate-900 border border-slate-700 text-white font-bold px-2 py-1 rounded-lg w-24 text-xs"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="number"
                            value={edit.originalPrice}
                            onChange={(e) => setEditingPrice({
                              ...editingPrice,
                              [product.id]: { ...edit, originalPrice: e.target.value }
                            })}
                            className="bg-slate-900 border border-slate-700 text-slate-400 px-2 py-1 rounded-lg w-24 text-xs"
                          />
                        </td>
                        <td className="p-3 font-bold text-amber-400">{product.discount}% OFF</td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              const updatedInStock = !edit.inStock;
                              setEditingPrice({
                                ...editingPrice,
                                [product.id]: { ...edit, inStock: updatedInStock }
                              });
                            }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              edit.inStock
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-red-950 text-red-400 border border-red-800'
                            }`}
                          >
                            {edit.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handleSaveProductPrice(product.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold p-1.5 rounded-lg"
                            title="Save Changes"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-900 hover:bg-red-800 text-white text-xs p-1.5 rounded-lg"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: DELIVERY RATES PER KM & HQ OFFICE LOCATION */}
        {activeTab === 'delivery' && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Delivery Rates & Office HQ Origin Settings</h2>
                <p className="text-xs text-slate-400">Configure base delivery charges, rate per KM, and central office coordinates.</p>
              </div>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Delivery Settings</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Delivery Rates Form */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  <span>Dynamic Per-KM Pricing Rates</span>
                </h3>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Base Delivery Fee (₹)</label>
                    <input
                      type="number"
                      value={settings.delivery?.baseFee || 30}
                      onChange={(e) => setSettings({
                        ...settings,
                        delivery: { ...settings.delivery, baseFee: Number(e.target.value) }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Rate Per Kilometer (₹/KM)</label>
                    <input
                      type="number"
                      value={settings.delivery?.perKmRate || 8}
                      onChange={(e) => setSettings({
                        ...settings,
                        delivery: { ...settings.delivery, perKmRate: Number(e.target.value) }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Free Delivery Min Order (₹)</label>
                    <input
                      type="number"
                      value={settings.delivery?.freeDeliveryThreshold || 499}
                      onChange={(e) => setSettings({
                        ...settings,
                        delivery: { ...settings.delivery, freeDeliveryThreshold: Number(e.target.value) }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Free Delivery Max Distance (KM)</label>
                    <input
                      type="number"
                      value={settings.delivery?.maxFreeDeliveryKm || 10}
                      onChange={(e) => setSettings({
                        ...settings,
                        delivery: { ...settings.delivery, maxFreeDeliveryKm: Number(e.target.value) }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
                    />
                  </div>
                </div>

                {/* Rate Calculator Simulator */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Live Delivery Price Simulator</span>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-slate-950 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-500 block">3 KM</span>
                      <span className="font-extrabold text-emerald-400">₹{Number(settings.delivery?.baseFee || 30) + 3 * Number(settings.delivery?.perKmRate || 8)}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-500 block">5 KM</span>
                      <span className="font-extrabold text-emerald-400">₹{Number(settings.delivery?.baseFee || 30) + 5 * Number(settings.delivery?.perKmRate || 8)}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-500 block">10 KM</span>
                      <span className="font-extrabold text-emerald-400">₹{Number(settings.delivery?.baseFee || 30) + 10 * Number(settings.delivery?.perKmRate || 8)}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-500 block">25 KM</span>
                      <span className="font-extrabold text-emerald-400">₹{Number(settings.delivery?.baseFee || 30) + 25 * Number(settings.delivery?.perKmRate || 8)}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Office HQ Location Form */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Central Dispatch Office Origin</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Office Name / Branch Title</label>
                    <input
                      type="text"
                      value={settings.officeLocation?.name || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        officeLocation: { ...settings.officeLocation, name: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Address String</label>
                    <input
                      type="text"
                      value={settings.officeLocation?.address || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        officeLocation: { ...settings.officeLocation, address: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Latitude (e.g. 12.9716)</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={settings.officeLocation?.lat || 12.9716}
                        onChange={(e) => setSettings({
                          ...settings,
                          officeLocation: { ...settings.officeLocation, lat: Number(e.target.value) }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Longitude (e.g. 77.5946)</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={settings.officeLocation?.lng || 77.5946}
                        onChange={(e) => setSettings({
                          ...settings,
                          officeLocation: { ...settings.officeLocation, lng: Number(e.target.value) }
                        })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </form>
        )}

        {/* TAB 3: ORDERS & ROUTE MAPS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Order Fulfillment & Route Logistics</h2>
              <p className="text-xs text-slate-400">View customer orders, update statuses, and inspect route maps from HQ origin.</p>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 text-[11px] uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Distance KM</th>
                    <th className="p-3">Delivery Fee</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Route Map</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-900/50">
                      <td className="p-3 font-mono font-bold text-emerald-400">{order.id}</td>
                      <td className="p-3">
                        <span className="font-bold text-white block">{order.customerName}</span>
                        <span className="text-[10px] text-slate-500 truncate max-w-xs block">{order.shippingAddress}</span>
                      </td>
                      <td className="p-3 font-bold text-amber-400">{order.distanceKm || 5} KM</td>
                      <td className="p-3">₹{order.deliveryFee}</td>
                      <td className="p-3 font-black text-white">₹{order.total}</td>
                      <td className="p-3">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-xs font-bold text-white px-2 py-1 rounded-lg"
                        >
                          <option value="Placed">Placed</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedOrderForMap(order)}
                          className="bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 ml-auto"
                        >
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          <span>View Route</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS & REVENUE DASHBOARD */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Platform Revenue & Inventory Analytics</h2>
              <p className="text-xs text-slate-400">Live sales metrics, order performance, category distribution, and low stock warnings.</p>
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Platform Revenue</span>
                <p className="text-2xl font-black text-emerald-400 font-serif">
                  ₹{orders.reduce((sum, o) => sum + (o.total || 0), 0).toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-emerald-500 font-bold">↑ 18.5% growth this month</span>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Delivered Customer Orders</span>
                <p className="text-2xl font-black text-white font-serif">
                  {orders.filter(o => o.status === 'Delivered' || o.status === 'Placed' || o.status === 'Out for Delivery').length} Orders
                </p>
                <span className="text-[10px] text-slate-500 font-medium">Avg Order Value: ₹{Math.round(orders.reduce((sum, o) => sum + (o.total || 0), 0) / (orders.length || 1))}</span>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Active Catalog Items</span>
                <p className="text-2xl font-black text-amber-400 font-serif">
                  {products.length} Products
                </p>
                <span className="text-[10px] text-amber-500 font-bold">Across 6 Plant & Seed Categories</span>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Low Stock Warning (&lt;15 Units)</span>
                <p className="text-2xl font-black text-rose-400 font-serif">
                  {products.filter(p => (p.stockCount || 20) < 15).length} Items
                </p>
                <span className="text-[10px] text-rose-400 font-bold">Requires Nursery Restock</span>
              </div>
            </div>

            {/* Low Stock Items Alert Table */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>Low Inventory Restock Warnings</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {products
                  .filter(p => (p.stockCount || 20) < 15)
                  .map(p => (
                    <div key={p.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-bold text-white block truncate max-w-[160px]">{p.name}</span>
                        <span className="text-[10px] text-slate-400">Category: {p.category}</span>
                      </div>
                      <span className="bg-rose-950 text-rose-300 font-black px-2.5 py-1 rounded-full text-[11px] border border-rose-800">
                        {p.stockCount || 8} left
                      </span>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: REGIONAL DISPATCH HUBS */}
        {activeTab === 'hubs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Regional Dispatch Hubs</h2>
              <p className="text-xs text-slate-400">Manage city hubs and regional dispatch centers across India.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(settings.hubs || []).map(hub => (
                <div key={hub.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-emerald-400">{hub.name}</span>
                    <p className="text-xs text-slate-300">{hub.address}</p>
                    <p className="text-[10px] text-slate-500 font-mono">Coords: {hub.lat}, {hub.lng}</p>
                  </div>
                  <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-800">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ROUTE MAP POPUP MODAL FOR SELECTED ORDER */}
      {selectedOrderForMap && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 space-y-4 relative shadow-2xl">
            <button
              onClick={() => setSelectedOrderForMap(null)}
              className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Order Route Map: {selectedOrderForMap.id}
              </span>
              <h3 className="text-xl font-black text-white font-serif">
                Delivery Route from Office HQ to {selectedOrderForMap.customerName}
              </h3>
            </div>

            <DeliveryMap
              officeLocation={settings.officeLocation}
              deliveryLocation={{
                lat: 12.9352,
                lng: 77.6245,
                address: selectedOrderForMap.shippingAddress
              }}
              deliveryConfig={settings.delivery}
              height="340px"
              interactive={false}
              movingDriver={selectedOrderForMap.status === 'Out for Delivery'}
            />

            <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>Status: <b className="text-emerald-400">{selectedOrderForMap.status}</b></span>
              <span>Distance: <b className="text-amber-400">{selectedOrderForMap.distanceKm || 5} KM</b></span>
              <span>Delivery Charge: <b className="text-white">₹{selectedOrderForMap.deliveryFee}</b></span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
