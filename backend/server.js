const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data.json');
const otpStore = new Map();
const sessionStore = new Map();
const mailTransport = process.env.SMTP_HOST ? nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
}) : null;

function normalizeIdentifier(identifier) {
  const value = String(identifier || '').trim();
  return value.includes('@') ? value.toLowerCase() : value.replace(/\D/g, '').slice(-10);
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  if (!storedPassword) return false;
  if (!storedPassword.startsWith('scrypt:')) return storedPassword === password;
  const [, salt, expected] = storedPassword.split(':');
  const actual = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
}

function issueToken(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  sessionStore.set(token, { userId, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  return token;
}

function findUser(users, identifier) {
  const normalized = normalizeIdentifier(identifier);
  return users.find(user => normalizeIdentifier(user.email) === normalized || normalizeIdentifier(user.phone) === normalized);
}

function publicUser(user) {
  const { password: _, passwordHash: __, ...profile } = user;
  return profile;
}

const knownRegions = {
  '110': ['Delhi', 'New Delhi'], '400': ['Maharashtra', 'Mumbai'], '411': ['Maharashtra', 'Pune'],
  '500': ['Telangana', 'Hyderabad'], '560': ['Karnataka', 'Bengaluru'], '600': ['Tamil Nadu', 'Chennai'],
  '700': ['West Bengal', 'Kolkata'], '380': ['Gujarat', 'Ahmedabad'], '302': ['Rajasthan', 'Jaipur'],
  '226': ['Uttar Pradesh', 'Lucknow'], '201': ['Uttar Pradesh', 'Ghaziabad'], '682': ['Kerala', 'Kochi'],
  '751': ['Odisha', 'Bhubaneswar'], '781': ['Assam', 'Guwahati'], '800': ['Bihar', 'Patna'],
  '160': ['Chandigarh', 'Chandigarh'], '180': ['Jammu and Kashmir', 'Jammu'], '171': ['Himachal Pradesh', 'Shimla'],
  '530': ['Andhra Pradesh', 'Visakhapatnam'], '577': ['Karnataka', 'Mysuru']
};

function buildDeliveryContext({ pincode = '', address = '', fallbackAddress = '' } = {}) {
  const cleanedPincode = String(pincode || '').trim();
  const addressText = String(address || fallbackAddress || '').trim();
  const lowerAddress = addressText.toLowerCase();

  let state = 'India';
  let district = 'Your City';

  if (/^\d{6}$/.test(cleanedPincode)) {
    const prefix = cleanedPincode.slice(0, 3);
    const region = knownRegions[prefix] || ['India', `District ${prefix}`];
    state = region[0];
    district = region[1];
  } else {
    if (lowerAddress.includes('indiranagar') || lowerAddress.includes('domlur') || lowerAddress.includes('hal')) {
      state = 'Karnataka'; district = 'Bengaluru';
    } else if (lowerAddress.includes('koramangala') || lowerAddress.includes('mg road') || lowerAddress.includes('richmond')) {
      state = 'Karnataka'; district = 'Bengaluru';
    } else if (lowerAddress.includes('whitefield') || lowerAddress.includes('marathahalli') || lowerAddress.includes('bellandur')) {
      state = 'Karnataka'; district = 'Bengaluru';
    } else if (lowerAddress.includes('mysuru') || lowerAddress.includes('mysore')) {
      state = 'Karnataka'; district = 'Mysuru';
    } else if (lowerAddress.includes('mumbai') || lowerAddress.includes('pune')) {
      state = lowerAddress.includes('mumbai') ? 'Maharashtra' : 'Maharashtra'; district = lowerAddress.includes('mumbai') ? 'Mumbai' : 'Pune';
    } else if (lowerAddress.includes('hyderabad')) {
      state = 'Telangana'; district = 'Hyderabad';
    } else if (lowerAddress.includes('chennai')) {
      state = 'Tamil Nadu'; district = 'Chennai';
    } else if (lowerAddress.includes('delhi') || lowerAddress.includes('new delhi')) {
      state = 'Delhi'; district = 'New Delhi';
    }
  }

  const branchCode = `VRK-${state.replace(/[^A-Z]/gi, '').slice(0, 3).toUpperCase()}-${cleanedPincode || '000000'}`;
  const branchName = `${district} Branch`;
  const searchQuery = addressText || `${district}, ${state}, India`;

  return {
    serviceable: true,
    pincode: cleanedPincode || '000000',
    state,
    district,
    branch: { code: branchCode, name: `Vruksha ${branchName}`, address: `${district}, ${state}, India` },
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`,
    estimatedDays: state === 'India' ? '4-7 days' : '2-5 days'
  };
}

function getAuthenticatedUser(req, db) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const session = sessionStore.get(token);
  if (!session || session.expiresAt < Date.now()) return null;
  return (db.users || []).find(user => user.id === session.userId) || null;
}

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Helper function to read DB
function readDB() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed.users) parsed.users = [];
    if (!Array.isArray(parsed.orders)) parsed.orders = [];
    if (!Array.isArray(parsed.reviews)) parsed.reviews = [];
    if (!parsed.settings) {
      parsed.settings = {
        officeLocation: {
          name: "Vruksha HQ & Central Dispatch Hub",
          address: "100 Feet Road, Indiranagar, MG Road, Bengaluru, Karnataka 560038",
          city: "Bengaluru",
          state: "Karnataka",
          lat: 12.9716,
          lng: 77.5946,
          phone: "+91 80 4567 8900"
        },
        delivery: {
          baseFee: 30,
          perKmRate: 8,
          freeDeliveryThreshold: 499,
          maxFreeDeliveryKm: 10,
          plantationBaseFee: 100,
          plantationPerKmRate: 10
        },
        hubs: [
          { id: 'hub-blr', name: 'Bengaluru Main Hub (HQ)', city: 'Bengaluru', address: '100 Feet Road, Indiranagar, Bengaluru - 560038', lat: 12.9716, lng: 77.5946, active: true },
          { id: 'hub-hyd', name: 'Hyderabad Logistics Hub', city: 'Hyderabad', address: 'Hitech City Road, Madhapur, Hyderabad - 500081', lat: 17.4483, lng: 78.3741, active: true },
          { id: 'hub-mum', name: 'Mumbai Metro Hub', city: 'Mumbai', address: 'BKC Annexe, Bandra East, Mumbai - 400051', lat: 19.0607, lng: 72.8647, active: true },
          { id: 'hub-del', name: 'Delhi NCR Dispatch Center', city: 'Delhi', address: 'Connaught Place Outer Ring, New Delhi - 110001', lat: 28.6315, lng: 77.2167, active: true }
        ]
      };
    }
    return parsed;
  } catch (err) {
    console.error('Error reading database:', err);
    return { categories: [], products: [], orders: [], reviews: [], users: [], settings: {} };
  }
}

// Helper function to write DB
function writeDB(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing database:', err);
  }
}

// --- REST API ENDPOINTS ---

// Public/Admin Settings
app.get('/api/settings', (req, res) => {
  const db = readDB();
  res.json(db.settings || {});
});

// Admin Settings Update (Office Location, Delivery Pricing per KM, Hubs)
app.put('/api/admin/settings', (req, res) => {
  const db = readDB();
  const { officeLocation, delivery, hubs } = req.body;

  if (officeLocation) {
    db.settings.officeLocation = { ...db.settings.officeLocation, ...officeLocation };
  }
  if (delivery) {
    db.settings.delivery = { ...db.settings.delivery, ...delivery };
  }
  if (hubs) {
    db.settings.hubs = hubs;
  }

  writeDB(db);
  res.json({ success: true, message: 'Settings updated successfully', settings: db.settings });
});

// Admin Product Edit (Price, Original Price, Stock, Category, etc.)
app.put('/api/admin/products/:id', (req, res) => {
  const db = readDB();
  const index = (db.products || []).findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const existing = db.products[index];
  const updated = { ...existing, ...req.body };

  // Recalculate discount if price or originalPrice changed
  if (req.body.price || req.body.originalPrice) {
    const p = Number(updated.price);
    const op = Number(updated.originalPrice || p * 1.3);
    updated.price = p;
    updated.originalPrice = op;
    updated.discount = Math.max(0, Math.round(((op - p) / op) * 100));
  }

  db.products[index] = updated;
  writeDB(db);
  res.json({ success: true, product: updated });
});

// Admin Product Delete
app.delete('/api/admin/products/:id', (req, res) => {
  const db = readDB();
  const initialLen = db.products.length;
  db.products = db.products.filter(p => p.id !== req.params.id);
  if (db.products.length === initialLen) {
    return res.status(404).json({ error: 'Product not found' });
  }
  writeDB(db);
  res.json({ success: true, message: 'Product deleted successfully' });
});


// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Vruksha E-Commerce API is running running', timestamp: new Date().toISOString() });
});

// Categories
app.get('/api/categories', (req, res) => {
  const db = readDB();
  res.json(db.categories || []);
});

// Products (with filter & search)
app.get('/api/products', (req, res) => {
  const db = readDB();
  let products = db.products || [];
  const { category, search, minPrice, maxPrice, sunlight, water, sortBy } = req.query;

  if (category && category !== 'all') {
    products = products.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.nursery.toLowerCase().includes(q)
    );
  }

  if (minPrice) {
    products = products.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    products = products.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (sunlight && sunlight !== 'all') {
    products = products.filter(p => p.sunlight.toLowerCase().includes(sunlight.toLowerCase()));
  }

  if (water && water !== 'all') {
    products = products.filter(p => p.water.toLowerCase().includes(water.toLowerCase()));
  }

  if (sortBy) {
    if (sortBy === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    }
  }

  res.json(products);
});

// Single Product Details
app.get('/api/products/:id', (req, res) => {
  const db = readDB();
  const product = (db.products || []).find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Authentication - Register New User
app.post('/api/auth/register', (req, res) => {
  const db = readDB();
  const { name, email, phone, password, role, address, pincode } = req.body;

  if (!name || (!email && !phone) || !password) {
    return res.status(400).json({ error: 'Name, Password, and Email or Phone are required for registration.' });
  }

  // Check if user already exists
  const existing = (db.users || []).find(u => 
    (email && u.email && u.email.toLowerCase() === email.toLowerCase()) ||
    (phone && u.phone && u.phone === phone)
  );

  if (existing) {
    return res.status(400).json({ error: 'User already exists with this email or mobile number. Please Sign In.' });
  }

  const newUser = {
    id: 'u_' + Date.now(),
    name: name.trim(),
    email: email ? email.trim().toLowerCase() : '',
    phone: phone ? phone.trim() : '',
    passwordHash: hashPassword(password),
    role: role || 'customer',
    address: address || '',
    pincode: pincode || '',
    createdAt: new Date().toISOString()
  };

  db.users.unshift(newUser);
  writeDB(db);

  // Omit password in response profile
  const { password: _, ...userProfile } = newUser;
  const token = issueToken(newUser.id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully!',
    user: publicUser(newUser),
    token
  });
});

// Authentication - Sign In (Login) with Credentials
app.post('/api/auth/login', (req, res) => {
  const db = readDB();
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Email/Mobile number and password are required.' });
  }

  const user = findUser(db.users || [], identifier);

  if (!user) {
    return res.status(404).json({ error: 'Account not found. Please register as a new user first.' });
  }

  if (!verifyPassword(password, user.passwordHash || user.password)) {
    return res.status(401).json({ error: 'Incorrect password. Please try again.' });
  }

  if (!user.passwordHash) {
    user.passwordHash = hashPassword(password);
    delete user.password;
    writeDB(db);
  }
  const token = issueToken(user.id);

  res.json({
    success: true,
    message: 'Login successful!',
    user: publicUser(user),
    token
  });
});

// Authentication - Send Email OTP
app.post('/api/auth/send-otp', async (req, res) => {
  const { identifier, email } = req.body;
  const targetEmail = email || identifier;

  if (!targetEmail || !targetEmail.includes('@')) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const normalized = targetEmail.trim().toLowerCase();
  const otp = String(crypto.randomInt(100000, 1000000));
  otpStore.set(normalized, { otp, expiresAt: Date.now() + 10 * 60 * 1000, attempts: 0 });

  console.log(`[EMAIL OTP] Sent code ${otp} to ${normalized}`);

  if (mailTransport) {
    try {
      await mailTransport.sendMail({
        from: process.env.SMTP_FROM || '"Vruksha Verification" <noreply@vruksha.com>',
        to: normalized,
        subject: `Your Vruksha Email Verification Code: ${otp}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; background: #061712; color: #ffffff; border-radius: 16px;">
            <h2 style="color: #10b981; margin-top: 0;">🌿 Vruksha Nursery & Logistics</h2>
            <p style="color: #cbd5e1; font-size: 14px;">Your 6-digit email security verification code is:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #34d399; margin: 20px 0; padding: 12px; background: #0b261d; border-radius: 12px; text-align: center;">${otp}</div>
            <p style="font-size: 12px; color: #94a3b8;">This code expires in 10 minutes. If you did not request this code, please ignore this email.</p>
          </div>
        `
      });
    } catch (err) {
      console.error('SMTP Email dispatch failed:', err.message);
    }
  }

  res.json({
    success: true,
    message: `Verification code sent to ${normalized}! Check your inbox.`
  });
});

// Google Sign-In Endpoint
app.post('/api/auth/google/login', (req, res) => {
  const db = readDB();
  const { email, name, picture } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid Google email is required' });
  }

  const normalized = email.trim().toLowerCase();
  let user = findUser(db.users || [], normalized);

  if (!user) {
    user = {
      id: 'u_g_' + Date.now(),
      name: name || normalized.split('@')[0],
      email: normalized,
      phone: '',
      role: normalized.includes('admin') ? 'admin' : 'customer',
      address: 'Bengaluru, Karnataka',
      pincode: '560038',
      avatar: picture || '',
      createdAt: new Date().toISOString()
    };
    db.users.unshift(user);
    writeDB(db);
  }

  const token = issueToken(user.id);
  res.json({
    success: true,
    message: `Logged in with Google as ${user.name}!`,
    user: publicUser(user),
    token
  });
});

app.get('/api/auth/google/start', (req, res) => {
  if (!process.env.GOOGLE_AUTH_URL) {
    return res.status(503).json({ error: 'Google sign-in is not configured. Use email and password or OTP.' });
  }
  res.redirect(process.env.GOOGLE_AUTH_URL);
});

// Authentication - Verify OTP & auto-register a verified identifier.
app.post('/api/auth/verify-otp', (req, res) => {
  const db = readDB();
  const { identifier, email, otp, name, address, pincode } = req.body;
  const targetEmail = email || identifier;

  if (!targetEmail) {
    return res.status(400).json({ error: 'Email address is required' });
  }
  
  const normalized = targetEmail.trim().toLowerCase();
  const pending = otpStore.get(normalized);
  if (!pending || pending.expiresAt < Date.now()) {
    return res.status(400).json({ error: 'OTP expired. Please request a new verification code.' });
  }
  if (++pending.attempts > 5 || String(otp).trim() !== pending.otp) {
    return res.status(400).json({ error: 'Invalid OTP code. Please check the latest email code and try again.' });
  }
  otpStore.delete(normalized);

  let user = findUser(db.users || [], normalized);

  if (!user) {
    // Register new user via OTP automatically
    user = {
      id: 'u_' + Date.now(),
      name: name || normalized.split('@')[0],
      email: normalized,
      phone: '',
      role: 'customer',
      address: address || 'Indiranagar, Bengaluru',
      pincode: pincode || '560038',
      createdAt: new Date().toISOString()
    };
    db.users.unshift(user);
    writeDB(db);
  } else {
    if (address) user.address = address;
    if (pincode) user.pincode = pincode;
    writeDB(db);
  }

  const token = issueToken(user.id);

  res.json({ success: true, user: publicUser(user), token });
});

// Authentication - Get Current User Profile
app.get('/api/auth/me', (req, res) => {
  const db = readDB();
  const user = getAuthenticatedUser(req, db);
  if (!user) {
    return res.status(401).json({ error: 'No auth token provided' });
  }
  res.json({ success: true, user: publicUser(user) });
});

// Delivery serviceability. Every valid Indian pincode is assigned to one deterministic district branch.
app.get('/api/delivery/serviceability', (req, res) => {
  const pincode = String(req.query.pincode || '').trim();
  const address = String(req.query.address || '').trim();
  const label = buildDeliveryContext({ pincode, address });

  if (!/^\d{6}$/.test(pincode) && !address) {
    return res.status(400).json({ error: 'Enter a valid 6-digit Indian pincode or delivery address.' });
  }

  res.json(label);
});

// Create Order
app.post('/api/orders', (req, res) => {
  const db = readDB();
  const user = getAuthenticatedUser(req, db);
  const { customerName, phone, email, shippingAddress, items, paymentMethod, distanceKm, isPlantationRequested } = req.body;
  const latNum = Number(req.body.deliveryLat);
  const lngNum = Number(req.body.deliveryLng);
  const hasCoords = req.body.deliveryLat != null && req.body.deliveryLng != null && Number.isFinite(latNum) && Number.isFinite(lngNum);

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Cart items cannot be empty' });
  }

  const resolvedName = customerName || user?.name || 'Valued Customer';
  const resolvedPhone = phone || user?.phone || '+91 9876543210';
  const resolvedEmail = email || user?.email || 'customer@vruksha.com';
  const resolvedAddress = shippingAddress || user?.address || '123 Garden Lane, MG Road, Bengaluru';

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const distance = Number(distanceKm) > 0 ? Number(distanceKm) : 5;
  const isPlantation = Boolean(isPlantationRequested);

  // Per-Product Category Handling & Delivery Pricing
  let itemizedDeliveryFee = 0;
  let itemizedPlantationFee = 0;
  let plantItemCount = 0;

  items.forEach(item => {
    const qty = Number(item.quantity) || 1;
    const cat = (item.category || '').toLowerCase();

    if (cat.includes('plant') || item.name.toLowerCase().includes('plant')) {
      itemizedDeliveryFee += qty * 20; // Live plant protective transit box charge per item
      plantItemCount += qty;
      if (isPlantation) {
        itemizedPlantationFee += qty * 40; // Expert planting labor & organic potting soil mix
      }
    } else if (cat === 'seeds' || item.name.toLowerCase().includes('seed')) {
      itemizedDeliveryFee += qty * 5; // Compact seed pouch delivery
    } else if (cat === 'fertilizers' || item.name.toLowerCase().includes('fertilizer') || item.name.toLowerCase().includes('compost')) {
      itemizedDeliveryFee += qty * 15; // Heavy organic compost handling charge
    } else if (cat === 'tools-pots' || item.name.toLowerCase().includes('pot')) {
      itemizedDeliveryFee += qty * 25; // Fragile pot bubble-wrap packaging
    } else {
      itemizedDeliveryFee += qty * 10;
    }
  });

  // Admin Configurable Delivery Settings
  const deliveryConfig = db.settings?.delivery || {
    baseFee: 30,
    perKmRate: 8,
    freeDeliveryThreshold: 499,
    maxFreeDeliveryKm: 10,
    plantationBaseFee: 100,
    plantationPerKmRate: 10
  };

  // Branch Distance Transit Charge: Base + (Distance KM * Per KM Rate)
  const branchDistanceFee = Number(deliveryConfig.baseFee) + (distance * Number(deliveryConfig.perKmRate));
  let calculatedDeliveryFee = itemizedDeliveryFee + branchDistanceFee;

  if (subtotal >= Number(deliveryConfig.freeDeliveryThreshold || 499) && distance <= Number(deliveryConfig.maxFreeDeliveryKm || 10)) {
    calculatedDeliveryFee = 0; // FREE Delivery threshold met
  }

  // Plantation Service Fee: Base dispatch + per-plant planting fee + Per KM gardener travel
  let calculatedPlantationFee = 0;
  if (isPlantation && plantItemCount > 0) {
    calculatedPlantationFee = Number(deliveryConfig.plantationBaseFee || 100) + itemizedPlantationFee + (distance * Number(deliveryConfig.plantationPerKmRate || 10));
  }

  const deliveryFee = req.body.deliveryFee !== undefined ? Number(req.body.deliveryFee) : calculatedDeliveryFee;
  const plantationFee = req.body.plantationFee !== undefined ? Number(req.body.plantationFee) : calculatedPlantationFee;
  const total = subtotal + deliveryFee + plantationFee;

  const newOrder = {
    id: 'VRK-' + Math.floor(10000 + Math.random() * 90000),
    customerName: resolvedName,
    phone: resolvedPhone,
    email: resolvedEmail,
    shippingAddress: resolvedAddress,
    ...(hasCoords ? { deliveryLat: latNum, deliveryLng: lngNum } : {}),
    orderDate: new Date().toISOString(),
    items,
    subtotal,
    distanceKm: distance,
    isPlantationRequested: isPlantation,
    plantationFee,
    deliveryFee,
    total,
    paymentMethod: paymentMethod || 'COD',
    paymentStatus: paymentMethod === 'COD' ? 'Pending (COD)' : 'Paid',
    status: 'Placed',
    trackingHistory: [
      {
        status: 'Placed',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        detail: `Order placed successfully. Delivery distance: ${distance} KM. ${isPlantation ? 'Expert Plantation Service included!' : 'Standard delivery requested.'}`
      }
    ]
  };

  db.orders.unshift(newOrder);
  writeDB(db);

  res.status(201).json({ success: true, order: newOrder });
});

// Get Order details for tracking
app.get('/api/orders/:id', (req, res) => {
  const db = readDB();
  const order = (db.orders || []).find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// Get all orders (for Seller / Nursery Dashboard)
app.get('/api/seller/orders', (req, res) => {
  const db = readDB();
  res.json(db.orders || []);
});

// Update Order Status (Seller Dashboard)
app.put('/api/seller/orders/:id/status', (req, res) => {
  const db = readDB();
  const { status, detail } = req.body;
  const order = (db.orders || []).find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.status = status;
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  
  order.trackingHistory.push({
    status,
    time: timeStr,
    detail: detail || `Order status updated to ${status} by Nursery.`
  });

  writeDB(db);
  res.json({ success: true, order });
});

// Add New Product (Seller Dashboard)
app.post('/api/seller/products', (req, res) => {
  const db = readDB();
  const { name, category, price, originalPrice, nursery, sunlight, water, potSize, description, image } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ error: 'Name, Category, and Price are required' });
  }

  const newProduct = {
    id: 'p' + (db.products.length + 1) + '_' + Date.now().toString().slice(-4),
    name,
    category,
    price: Number(price),
    originalPrice: originalPrice ? Number(originalPrice) : Math.round(Number(price) * 1.3),
    discount: originalPrice ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100) : 25,
    rating: 5.0,
    reviewCount: 1,
    inStock: true,
    stockCount: 50,
    deliveryFee: 40,
    deliveryEstimate: '2-3 Days',
    image: image || 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
    nursery: nursery || 'Green Partner Nursery',
    sunlight: sunlight || 'Indirect Light',
    water: water || 'Twice a week',
    potSize: potSize || '6 inch pot',
    sowingSeason: 'All Season',
    description: description || 'Fresh high-grade plant directly from partner nursery.',
    careGuide: {
      light: 'Place in bright indirect light.',
      water: 'Water when top soil feels dry.',
      fertilizer: 'Add organic fertilizer once a month.',
      repotting: 'Repot as root grows.'
    }
  };

  db.products.unshift(newProduct);
  writeDB(db);
  res.status(201).json({ success: true, product: newProduct });
});

// Get Reviews for a Product
app.get('/api/reviews/:productId', (req, res) => {
  const db = readDB();
  const reviews = (db.reviews || []).filter(r => r.productId === req.params.productId);
  res.json(reviews);
});

// Submit Review
app.post('/api/reviews', (req, res) => {
  const db = readDB();
  const { productId, userName, rating, comment } = req.body;
  
  const newReview = {
    id: 'r_' + Date.now(),
    productId,
    userName: userName || 'Gardening Enthusiast',
    rating: Number(rating) || 5,
    date: new Date().toISOString().split('T')[0],
    comment: comment || 'Very good quality product!'
  };

  if (!Array.isArray(db.reviews)) db.reviews = [];
  db.reviews.unshift(newReview);
  writeDB(db);
  res.status(201).json({ success: true, review: newReview });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🌿 Vruksha Server running on http://localhost:${PORT}`);
  });
}

module.exports = {
  app,
  buildDeliveryContext
};
