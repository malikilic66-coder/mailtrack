import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3001

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'your-service-key'
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

// 1x1 transparent GIF pixel (base64 decoded)
const TRANSPARENT_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Tracking pixel endpoint
app.get('/track/:emailId', async (req, res) => {
  const { emailId } = req.params
  
  // Validate UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(emailId)) {
    return res.status(400).send('Invalid email ID')
  }

  // Get client IP address
  // Note: x-forwarded-for can be spoofed. In production, use a trusted proxy 
  // and configure Express to trust the proxy (app.set('trust proxy', true))
  // This IP is for analytics only and not used for security decisions
  const ipAddress = req.headers['x-forwarded-for']?.split(',')[0]?.trim() 
    || req.socket?.remoteAddress 
    || 'unknown'

  // Get user agent
  const userAgent = req.headers['user-agent'] || 'unknown'

  try {
    // Check if email exists before logging - this validates the email_id
    const { data: email, error: emailError } = await supabase
      .from('emails')
      .select('id')
      .eq('id', emailId)
      .single()

    if (emailError || !email) {
      console.log(`Email not found: ${emailId}`)
      // Still return the pixel to not reveal tracking
      res.set({
        'Content-Type': 'image/gif',
        'Content-Length': TRANSPARENT_GIF.length,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      })
      return res.send(TRANSPARENT_GIF)
    }

    // Log the email open
    const { error: logError } = await supabase
      .from('tracking_logs')
      .insert({
        email_id: emailId,
        ip_address: ipAddress,
        user_agent: userAgent,
        opened_at: new Date().toISOString(),
      })

    if (logError) {
      console.error('Error logging tracking:', logError)
    } else {
      console.log(`Email opened: ${emailId} from ${ipAddress}`)
    }
  } catch (error) {
    console.error('Tracking error:', error)
  }

  // Always return the transparent GIF
  res.set({
    'Content-Type': 'image/gif',
    'Content-Length': TRANSPARENT_GIF.length,
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  })
  res.send(TRANSPARENT_GIF)
})

// API endpoint to get tracking stats for an email
app.get('/api/stats/:emailId', async (req, res) => {
  const { emailId } = req.params
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(emailId)) {
    return res.status(400).json({ error: 'Invalid email ID' })
  }

  try {
    const { data, error } = await supabase
      .from('tracking_logs')
      .select('*')
      .eq('email_id', emailId)
      .order('opened_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json({
      emailId,
      openCount: data.length,
      logs: data,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`MailTrack backend running on port ${PORT}`)
  console.log(`Tracking endpoint: http://localhost:${PORT}/track/:emailId`)
})
