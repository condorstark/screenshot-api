/*
 * ═══════════════════════════════════════════════════════════════
 * SCREENSHOT API - Puppeteer on Railway
 * ═══════════════════════════════════════════════════════════════
 * 
 * Endpoint: POST /screenshot
 * Body: { "html": "your html here" }
 * Returns: JPG image (binary)
 * 
 * ═══════════════════════════════════════════════════════════════
 */

const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Per HTML grandi
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Screenshot endpoint
app.post('/screenshot', async (req, res) => {
  console.log('📸 Screenshot request received');
  
  const { html } = req.body;
  
  if (!html) {
    return res.status(400).json({ 
      error: 'Missing HTML in request body' 
    });
  }
  
  let browser;
  
  try {
    console.log('   → Launching browser...');
    
    // Launch Puppeteer con configurazione per Railway
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1080,1350'
      ]
    });
    
    const page = await browser.newPage();
    
    // Imposta viewport
    await page.setViewport({
      width: 1080,
      height: 1350,
      deviceScaleFactor: 2
    });
    
    console.log('   → Setting HTML content...');
    
    // Carica l'HTML
    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    console.log('   → Taking screenshot...');
    
    // Fai screenshot
    const screenshot = await page.screenshot({
      type: 'jpeg',
      quality: 95,
      fullPage: false
    });
    
    await browser.close();
    
    console.log('   ✓ Screenshot complete');
    
    // Ritorna immagine
    res.set('Content-Type', 'image/jpeg');
    res.send(screenshot);
    
  } catch (error) {
    console.error('❌ Screenshot error:', error);
    
    if (browser) {
      await browser.close();
    }
    
    res.status(500).json({ 
      error: 'Screenshot generation failed',
      message: error.message 
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(60));
  console.log(`🚀 Screenshot API running on port ${PORT}`);
  console.log(`📸 POST /screenshot - Generate screenshot from HTML`);
  console.log(`❤️  GET /health - Health check`);
  console.log('='.repeat(60));
});
