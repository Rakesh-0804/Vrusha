const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

const dataPath = path.join(__dirname, '..', 'backend', 'data.json');
const db = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const demoUsers = [
  {
    id: 'u_admin',
    name: 'Vruksha Admin',
    email: 'admin@vruksha.com',
    phone: '9999999999',
    passwordHash: hashPassword('admin123'),
    role: 'admin',
    address: 'Vruksha HQ, Indiranagar, Bengaluru',
    pincode: '560038',
    createdAt: new Date().toISOString()
  },
  {
    id: 'u_customer',
    name: 'Rohan Sharma',
    email: 'user@vruksha.com',
    phone: '9876543210',
    passwordHash: hashPassword('user123'),
    role: 'customer',
    address: 'Flat 402, Green Valley Apartments, Indiranagar, Bengaluru',
    pincode: '560038',
    createdAt: new Date().toISOString()
  },
  {
    id: 'u_seller',
    name: 'Green Thumb Nursery',
    email: 'seller@vruksha.com',
    phone: '9876543211',
    passwordHash: hashPassword('seller123'),
    role: 'seller',
    address: 'Green Thumb Nursery, Bangalore',
    pincode: '560038',
    createdAt: new Date().toISOString()
  }
];

if (!db.users) db.users = [];

// Ensure all demo users exist in db.users
demoUsers.forEach(demo => {
  const idx = db.users.findIndex(u => u.email === demo.email);
  if (idx !== -1) {
    db.users[idx] = demo;
  } else {
    db.users.unshift(demo);
  }
});

fs.writeFileSync(dataPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully seeded demo users into data.json!');
console.log('Users list:', db.users.map(u => ({ id: u.id, email: u.email, role: u.role })));
