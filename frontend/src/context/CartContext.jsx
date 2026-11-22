import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('vruksha_cart');
    return saved ? JSON.parse(saved) : [
      {
        product: {
          id: "p1",
          name: "Money Plant (Golden Pothos)",
          price: 149,
          originalPrice: 249,
          category: "indoor-plants",
          image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
          nursery: "Green Thumb Nursery, Bangalore"
        },
        quantity: 1
      }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('vruksha_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [distanceKm, setDistanceKm] = useState(5);
  const [isPlantationRequested, setIsPlantationRequested] = useState(false);

  useEffect(() => {
    localStorage.setItem('vruksha_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('vruksha_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  // Calculate plant count and itemized per-product handling
  let plantItemCount = 0;
  let seedItemCount = 0;
  let fertilizerItemCount = 0;
  let potItemCount = 0;
  let itemizedHandlingFee = 0;

  cartItems.forEach(({ product, quantity }) => {
    const qty = quantity || 1;
    const cat = (product.category || '').toLowerCase();
    const pName = (product.name || '').toLowerCase();

    if (cat.includes('plant') || pName.includes('plant')) {
      plantItemCount += qty;
      itemizedHandlingFee += qty * 20; // live plant safe packaging
    } else if (cat === 'seeds' || pName.includes('seed')) {
      seedItemCount += qty;
      itemizedHandlingFee += qty * 5; // seed pouch packaging
    } else if (cat === 'fertilizers' || pName.includes('fertilizer') || pName.includes('compost')) {
      fertilizerItemCount += qty;
      itemizedHandlingFee += qty * 15; // heavy compost handling
    } else if (cat === 'tools-pots' || pName.includes('pot')) {
      potItemCount += qty;
      itemizedHandlingFee += qty * 25; // fragile ceramic packaging
    } else {
      itemizedHandlingFee += qty * 10;
    }
  });

  const FREE_DELIVERY_THRESHOLD = 499;
  
  // Branch Distance Fee: Base ₹30 + ₹8 per KM from Vruksha Main Nursery Hub (Indiranagar)
  let deliveryFee = 0;
  if (cartItems.length > 0) {
    const branchTransitFee = 30 + (distanceKm * 8);
    deliveryFee = itemizedHandlingFee + branchTransitFee;

    if (subtotal >= FREE_DELIVERY_THRESHOLD && distanceKm <= 10) {
      deliveryFee = 0; // FREE Delivery unlock
    }
  }

  // Plantation Service Fee: Base ₹100 dispatch + ₹40/plant planting labor & soil mix + ₹10/KM gardener travel
  let plantationFee = 0;
  if (cartItems.length > 0 && isPlantationRequested && plantItemCount > 0) {
    plantationFee = 100 + (plantItemCount * 40) + (distanceKm * 10);
  }

  // Payment method calculations
  const upiDiscountAmount = Math.round(subtotal * 0.05); // 5% Instant UPI Discount
  const codSurchargeAmount = 30; // ₹30 COD Handling Surcharge

  // Address-to-KM Distance Estimator Helper
  const calculateDistanceFromAddress = (addressStr) => {
    if (!addressStr) return 5;
    const addr = addressStr.toLowerCase();
    if (addr.includes('indiranagar') || addr.includes('domlur') || addr.includes('hal')) return 2;
    if (addr.includes('koramangala') || addr.includes('mg road') || addr.includes('richmond')) return 6;
    if (addr.includes('whitefield') || addr.includes('marathahalli') || addr.includes('bellandur')) return 14;
    if (addr.includes('electronic city') || addr.includes('bannerghatta')) return 22;
    if (addr.includes('yelahanka') || addr.includes('hebbal') || addr.includes('airport')) return 28;
    return Math.min(50, Math.max(3, Math.floor(addr.length / 4)));
  };

  const totalAmount = subtotal + deliveryFee + plantationFee;

  return (
    <CartContext.Provider value={{
      cartItems,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      subtotal,
      distanceKm,
      setDistanceKm,
      isPlantationRequested,
      setIsPlantationRequested,
      plantItemCount,
      seedItemCount,
      fertilizerItemCount,
      potItemCount,
      calculateDistanceFromAddress,
      deliveryFee,
      plantationFee,
      totalAmount,
      upiDiscountAmount,
      codSurchargeAmount,
      FREE_DELIVERY_THRESHOLD,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
