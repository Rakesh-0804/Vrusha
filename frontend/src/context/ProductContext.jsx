import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [activeView, setActiveView] = useState('shop'); // 'shop' | 'seller' | 'viva'

  const [filters, setFilters] = useState({
    maxPrice: 500,
    sunlight: 'all',
    water: 'all',
    sortBy: 'popular'
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/api/products?';
      if (activeCategory !== 'all') url += `category=${activeCategory}&`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
      if (filters.maxPrice) url += `maxPrice=${filters.maxPrice}&`;
      if (filters.sunlight !== 'all') url += `sunlight=${filters.sunlight}&`;
      if (filters.water !== 'all') url += `water=${filters.water}&`;
      if (filters.sortBy) url += `sortBy=${filters.sortBy}&`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, searchQuery, filters]);

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      activeCategory,
      setActiveCategory,
      searchQuery,
      setSearchQuery,
      selectedProduct,
      setSelectedProduct,
      trackingOrderId,
      setTrackingOrderId,
      activeView,
      setActiveView,
      filters,
      setFilters,
      refreshProducts: fetchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
