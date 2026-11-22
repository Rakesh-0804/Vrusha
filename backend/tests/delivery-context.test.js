const test = require('node:test');
const assert = require('node:assert/strict');

const { buildDeliveryContext } = require('../server.js');

test('buildDeliveryContext uses the user address and pincode for delivery routing', () => {
  const result = buildDeliveryContext({
    pincode: '560038',
    address: 'Flat 402, Green Valley Apartments, Indiranagar, Bengaluru'
  });

  assert.equal(result.state, 'Karnataka');
  assert.equal(result.district, 'Bengaluru');
  assert.match(result.googleMapsUrl, /Indiranagar|Bengaluru/i);
  assert.equal(result.branch.code.startsWith('VRK-'), true);
});

test('buildDeliveryContext falls back to a user-friendly address when pincode is missing', () => {
  const result = buildDeliveryContext({
    pincode: '',
    address: 'Mysuru, Karnataka'
  });

  assert.equal(result.serviceable, true);
  assert.match(result.googleMapsUrl, /Mysuru|Karnataka/i);
});
