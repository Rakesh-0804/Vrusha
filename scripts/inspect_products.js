const fs = require('fs');
const path = require('path');
const http = require('https');

const dataPath = path.join(__dirname, '..', 'backend', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log(`Total Products: ${data.products.length}`);
data.products.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.id}] (${p.category}) ${p.name}`);
});
