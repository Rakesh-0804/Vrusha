const fs = require('fs');
const path = require('path');
const http = require('https');

const dataPath = path.join(__dirname, '..', 'backend', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

let checked = 0;
let valid = 0;
let invalid = [];

console.log(`--- DOUBLE CHECK PASS FOR ${data.products.length} PRODUCTS ---`);

data.products.forEach((p) => {
  const req = http.get(p.image, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    if (res.statusCode === 200) {
      valid++;
    } else {
      invalid.push({ id: p.id, name: p.name, url: p.image, status: res.statusCode });
    }
    checked++;
    if (checked === data.products.length) {
      console.log(`Double Check Complete! Total Checked: ${checked}, Valid (HTTP 200): ${valid}, Invalid: ${invalid.length}`);
      if (invalid.length > 0) {
        console.log('Invalid Image List:', invalid);
      } else {
        console.log('🎉 100% VERIFIED! All product images are working perfectly!');
      }
    }
  });

  req.on('error', (err) => {
    invalid.push({ id: p.id, name: p.name, url: p.image, error: err.message });
    checked++;
    if (checked === data.products.length) {
      console.log(`Double Check Complete! Total Checked: ${checked}, Valid (HTTP 200): ${valid}, Invalid: ${invalid.length}`);
    }
  });
});
