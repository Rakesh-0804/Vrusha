const http = require('https');

const candidateUrls = [
  'https://images.unsplash.com/photo-1598170845058-12ef4a457939?auto=format&fit=crop&w=600&q=80', // Carrot
  'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80', // Foliage
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80', // Indoor pot
  'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80', // Seeds
  'https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?auto=format&fit=crop&w=600&q=80', // Sprout
  'https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&w=600&q=80', // Seeds pack
  'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80'  // Garden produce
];

let checked = 0;
let failed = [];

candidateUrls.forEach(url => {
  http.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    if (res.statusCode !== 200) failed.push({ url, status: res.statusCode });
    checked++;
    if (checked === candidateUrls.length) console.log('Checked:', checked, 'Failed:', failed);
  });
});
