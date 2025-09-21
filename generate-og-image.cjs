// This script generates an Open Graph image for social media sharing
// Run with: node generate-og-image.cjs

const fs = require('fs');
const path = require('path');

// Create a simple SVG-based OG image
function createSimpleOGImage() {
    const svgContent = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Background Pattern -->
  <circle cx="240" cy="504" r="120" fill="rgba(255,255,255,0.1)"/>
  <circle cx="960" cy="126" r="80" fill="rgba(255,255,255,0.1)"/>
  <circle cx="480" cy="252" r="60" fill="rgba(255,255,255,0.05)"/>
  
  <!-- Main Content -->
  <text x="600" y="280" font-family="Arial, sans-serif" font-size="120" font-weight="bold" text-anchor="middle" fill="white" text-shadow="0 4px 8px rgba(0,0,0,0.3)">🌤️ BGWeather</text>
  
  <text x="600" y="340" font-family="Arial, sans-serif" font-size="36" font-weight="300" text-anchor="middle" fill="rgba(255,255,255,0.9)">Professional Weather Service</text>
  
  <!-- Features -->
  <text x="300" y="420" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)">🌍 Global</text>
  <text x="500" y="420" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)">📱 Mobile Ready</text>
  <text x="700" y="420" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)">🌐 Multi-Language</text>
  
  <!-- URL -->
  <text x="1000" y="580" font-family="Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.7)">bgweathers.netlify.app</text>
</svg>`;

    fs.writeFileSync(path.join(__dirname, 'public', 'og-image.svg'), svgContent);
    console.log('✅ Simple SVG OG image created!');
    console.log('📁 Saved to: public/og-image.svg');
    console.log('💡 You can convert this to PNG using online tools or image editors');
}

// Run the simple version
createSimpleOGImage();
