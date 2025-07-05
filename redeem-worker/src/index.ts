import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  REDEEM_KV: KVNamespace
  ADMIN_USERNAME?: string
  ADMIN_PASSWORD?: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors({
  origin: ['https://julianbeck.com', 'https://juli.sh', 'http://localhost:4321'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Rate limiting helper
async function checkRateLimit(c: any, ip: string): Promise<boolean> {
  const key = `rate_limit:${ip}`
  const lastRedeem = await c.env.REDEEM_KV.get(key)
  
  if (lastRedeem) {
    const timeSinceLastRedeem = Date.now() - parseInt(lastRedeem)
    const twelveHoursInMs = 12 * 60 * 60 * 1000
    
    if (timeSinceLastRedeem < twelveHoursInMs) {
      return false
    }
  }
  
  await c.env.REDEEM_KV.put(key, Date.now().toString())
  return true
}

// Get client IP
function getClientIP(c: any): string {
  return c.req.header('CF-Connecting-IP') || 
         c.req.header('X-Forwarded-For') || 
         c.req.header('X-Real-IP') || 
         '127.0.0.1'
}

// Basic auth middleware
function basicAuth(c: any) {
  const auth = c.req.header('Authorization')
  
  if (!auth || !auth.startsWith('Basic ')) {
    return c.text('Unauthorized', 401, {
      'WWW-Authenticate': 'Basic realm="Admin Area"'
    })
  }
  
  const credentials = atob(auth.slice(6))
  const [username, password] = credentials.split(':')
  
  const adminUsername = c.env.ADMIN_USERNAME || 'admin'
  const adminPassword = c.env.ADMIN_PASSWORD || 'admin123'
  
  if (username !== adminUsername || password !== adminPassword) {
    return c.text('Unauthorized', 401, {
      'WWW-Authenticate': 'Basic realm="Admin Area"'
    })
  }
  
  return null
}

// Admin page to insert codes
app.get('/admin', (c) => {
  const authResult = basicAuth(c)
  if (authResult) return authResult
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Redeem Code Admin</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #005a8b; }
        .success { color: green; margin-top: 10px; }
        .error { color: red; margin-top: 10px; }
      </style>
    </head>
    <body>
      <h1>Redeem Code Admin</h1>
      
      <h2>Add Codes</h2>
      <form id="addCodesForm">
        <div class="form-group">
          <label for="codeSlug">Code Slug (e.g., x1sr114y):</label>
          <input type="text" id="codeSlug" name="codeSlug" required>
        </div>
        <div class="form-group">
          <label for="codes">Codes (one per line):</label>
          <textarea id="codes" name="codes" rows="10" required></textarea>
        </div>
        <button type="submit">Add Codes</button>
      </form>
      
      <div id="result"></div>
      
      <h2>Check Codes</h2>
      <form id="checkCodesForm">
        <div class="form-group">
          <label for="checkSlug">Code Slug:</label>
          <input type="text" id="checkSlug" name="checkSlug" required>
        </div>
        <button type="submit">Check Available Codes</button>
      </form>
      
      <div id="checkResult"></div>

      <script>
        document.getElementById('addCodesForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const codeSlug = formData.get('codeSlug');
          const codes = formData.get('codes').split('\\n').filter(code => code.trim());
          
          try {
            const response = await fetch('/admin/add-codes', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ codeSlug, codes })
            });
            
            const result = await response.json();
            document.getElementById('result').innerHTML = response.ok ? 
              '<div class="success">Codes added successfully!</div>' : 
              '<div class="error">' + result.error + '</div>';
          } catch (error) {
            document.getElementById('result').innerHTML = '<div class="error">Error: ' + error.message + '</div>';
          }
        });
        
        document.getElementById('checkCodesForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const codeSlug = formData.get('checkSlug');
          
          try {
            const response = await fetch('/admin/check-codes/' + codeSlug);
            const result = await response.json();
            document.getElementById('checkResult').innerHTML = response.ok ? 
              '<div class="success">Available codes: ' + result.count + '</div>' : 
              '<div class="error">' + result.error + '</div>';
          } catch (error) {
            document.getElementById('checkResult').innerHTML = '<div class="error">Error: ' + error.message + '</div>';
          }
        });
      </script>
    </body>
    </html>
  `
  return c.html(html)
})

// Add codes endpoint
app.post('/admin/add-codes', async (c) => {
  const authResult = basicAuth(c)
  if (authResult) return authResult
  try {
    const { codeSlug, codes } = await c.req.json()
    
    if (!codeSlug || !codes || !Array.isArray(codes)) {
      return c.json({ error: 'Invalid input' }, 400)
    }
    
    // Get existing codes
    const existingCodesJson = await c.env.REDEEM_KV.get(`codes:${codeSlug}`)
    let existingCodes = []
    if (existingCodesJson) {
      existingCodes = JSON.parse(existingCodesJson)
    }
    
    // Add new codes
    const allCodes = [...existingCodes, ...codes.filter(code => code.trim())]
    
    await c.env.REDEEM_KV.put(`codes:${codeSlug}`, JSON.stringify(allCodes))
    
    return c.json({ success: true, totalCodes: allCodes.length })
  } catch (error) {
    return c.json({ error: 'Server error' }, 500)
  }
})

// Check codes endpoint
app.get('/admin/check-codes/:slug', async (c) => {
  const authResult = basicAuth(c)
  if (authResult) return authResult
  try {
    const slug = c.req.param('slug')
    const codesJson = await c.env.REDEEM_KV.get(`codes:${slug}`)
    
    if (!codesJson) {
      return c.json({ error: 'No codes found for this slug' }, 404)
    }
    
    const codes = JSON.parse(codesJson)
    return c.json({ count: codes.length, codes })
  } catch (error) {
    return c.json({ error: 'Server error' }, 500)
  }
})

// Main redeem endpoint
app.post('/api/redeem', async (c) => {
  try {
    const { codeSlug } = await c.req.json()
    const clientIP = getClientIP(c)
    
    if (!codeSlug) {
      return c.json({ error: 'Code slug is required' }, 400)
    }
    
    // Check rate limit
    const canRedeem = await checkRateLimit(c, clientIP)
    if (!canRedeem) {
      return c.json({ error: 'Rate limit exceeded. You can only redeem one code per 12 hours.' }, 429)
    }
    
    // Get available codes
    const codesJson = await c.env.REDEEM_KV.get(`codes:${codeSlug}`)
    if (!codesJson) {
      return c.json({ error: 'No codes available for this promotion' }, 404)
    }
    
    const codes = JSON.parse(codesJson)
    if (codes.length === 0) {
      return c.json({ error: 'All codes have been redeemed' }, 410)
    }
    
    // Get a random code
    const randomIndex = Math.floor(Math.random() * codes.length)
    const selectedCode = codes[randomIndex]
    
    // Remove code from available codes
    codes.splice(randomIndex, 1)
    await c.env.REDEEM_KV.put(`codes:${codeSlug}`, JSON.stringify(codes))
    
    // Add to spent codes
    const spentCodesJson = await c.env.REDEEM_KV.get(`spent:${codeSlug}`)
    let spentCodes = []
    if (spentCodesJson) {
      spentCodes = JSON.parse(spentCodesJson)
    }
    spentCodes.push({
      code: selectedCode,
      redeemedAt: new Date().toISOString(),
      redeemedBy: clientIP
    })
    await c.env.REDEEM_KV.put(`spent:${codeSlug}`, JSON.stringify(spentCodes))
    
    return c.json({ code: selectedCode })
  } catch (error) {
    return c.json({ error: 'Server error' }, 500)
  }
})

// Health check
app.get('/', (c) => {
  return c.json({ status: 'Redeem worker is running' })
})

export default app
