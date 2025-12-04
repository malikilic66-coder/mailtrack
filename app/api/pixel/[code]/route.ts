import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// 1x1 transparent GIF in base64
const PIXEL_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params
  const pixelCode = code.replace('.gif', '')
  
  // Create Supabase client with service role key for bypassing RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  try {
    // Find tracking pixel by code
    const { data: pixel, error: pixelError } = await supabase
      .from('mailtrack_tracking_pixels')
      .select('*, mailtrack_mail_items(user_id)')
      .eq('pixel_code', pixelCode)
      .single()

    if (pixelError || !pixel) {
      console.error('Pixel not found:', pixelCode)
      return new NextResponse(PIXEL_GIF, {
        status: 200,
        headers: {
          'Content-Type': 'image/gif',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
    }

    // Extract metadata from request
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const referer = request.headers.get('referer') || null
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'Unknown'

    // Parse user agent to detect device type
    const deviceType = detectDeviceType(userAgent)
    const browser = detectBrowser(userAgent)
    const os = detectOS(userAgent)

    // Log the read event
    const { error: logError } = await supabase
      .from('mailtrack_read_logs')
      .insert({
        pixel_id: pixel.id,
        mail_id: pixel.mail_id,
        user_id: (pixel.mailtrack_mail_items as any).user_id,
        ip_address: ip.split(',')[0].trim(), // First IP in case of multiple
        user_agent: userAgent,
        device_type: deviceType,
        browser: browser,
        os: os,
        referer: referer,
      })

    if (logError) {
      console.error('Error logging read event:', logError)
    }

  } catch (error) {
    console.error('Error processing pixel:', error)
  }

  // Always return the pixel image
  return new NextResponse(PIXEL_GIF, {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  })
}

function detectDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

function detectBrowser(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  if (ua.includes('edg/')) return 'Edge'
  if (ua.includes('chrome/')) return 'Chrome'
  if (ua.includes('firefox/')) return 'Firefox'
  if (ua.includes('safari/') && !ua.includes('chrome')) return 'Safari'
  if (ua.includes('opera/') || ua.includes('opr/')) return 'Opera'
  return 'Unknown'
}

function detectOS(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  if (ua.includes('windows')) return 'Windows'
  if (ua.includes('mac os')) return 'macOS'
  if (ua.includes('linux')) return 'Linux'
  if (ua.includes('android')) return 'Android'
  if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) return 'iOS'
  return 'Unknown'
}
