'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, Copy, Check, Clock, Monitor, Smartphone, Globe, ChevronDown, ChevronUp, Eye, Activity } from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale/tr'

type CopyFormat = 'gmail' | 'url' | 'optimized' | 'html'

interface MailDetailModalProps {
  mail: any
  onClose: () => void
}

interface ReadLog {
  id: string
  read_at: string
  ip_address: string | null
  user_agent: string | null
  device_type: string | null
  browser: string | null
  os: string | null
  referer: string | null
}

export default function MailDetailModal({ mail, onClose }: MailDetailModalProps) {
  const [copiedFormat, setCopiedFormat] = useState<CopyFormat | null>(null)
  const [readLogs, setReadLogs] = useState<ReadLog[]>([])
  const [showOtherFormats, setShowOtherFormats] = useState(false)
  const [expandedFormat, setExpandedFormat] = useState<CopyFormat | null>(null)
  const [showActivity, setShowActivity] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchReadLogs()
  }, [mail.id])

  const fetchReadLogs = async () => {
    const pixelId = mail.mailtrack_tracking_pixels?.[0]?.id
    
    if (!pixelId) return

    const { data, error } = await supabase
      .from('mailtrack_read_logs')
      .select('*')
      .eq('pixel_id', pixelId)
      .order('read_at', { ascending: false })

    if (error) {
      console.error('Error fetching read logs:', error)
    }

    if (data) {
      setReadLogs(data)
    }
  }

  const pixelUrl = mail.mailtrack_tracking_pixels?.[0]?.pixel_url || ''
  
  const getTrackingCode = (format: CopyFormat): string => {
    if (!pixelUrl) return ''
    
    switch (format) {
      case 'gmail':
        return `<img src="${pixelUrl}" width="1" height="1" border="0" style="border:0;outline:0;display:inline;margin:0;padding:0;pointer-events:none;user-select:none;" alt="" />`
      case 'url':
        return pixelUrl
      case 'optimized':
        return `<img src="${pixelUrl}" width="1" height="1" style="pointer-events:none;user-select:none;" alt="" />`
      case 'html':
        return `<img src="${pixelUrl}" width="1" height="1" style="display:none;opacity:0;position:absolute;pointer-events:none;" alt="" />`
      default:
        return pixelUrl
    }
  }

  const copyToClipboard = async (format: CopyFormat) => {
    const code = getTrackingCode(format)
    try {
      await navigator.clipboard.writeText(code)
      setCopiedFormat(format)
      setTimeout(() => setCopiedFormat(null), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const getDeviceIcon = (deviceType: string | null) => {
    if (deviceType === 'mobile') return <Smartphone className="w-4 h-4" />
    if (deviceType === 'desktop') return <Monitor className="w-4 h-4" />
    return <Globe className="w-4 h-4" />
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-[32px] border border-white/70 bg-white p-8 shadow-[0_40px_120px_rgba(15,23,42,0.3)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Minimal Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">{mail.title}</h2>
          <div className="flex flex-wrap gap-3 text-sm text-slate-500">
            {mail.recipient_email && (
              <span>Alıcı: <span className="text-slate-700">{mail.recipient_name || mail.recipient_email}</span></span>
            )}
            {mail.mail_subject && (
              <span>· Konu: <span className="text-slate-700">{mail.mail_subject}</span></span>
            )}
          </div>
        </div>

        {/* Recommended Code - Single Line */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="text-base">📧</span>
              Gmail için Önerilen Kod
            </h3>
            <button
              onClick={() => copyToClipboard('gmail')}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                copiedFormat === 'gmail'
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {copiedFormat === 'gmail' ? (
                <>
                  <Check className="h-4 w-4" />
                  Kopyalandı!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Kopyala
                </>
              )}
            </button>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <code className="block text-xs text-slate-700 break-all font-mono">
              {getTrackingCode('gmail')}
            </code>
          </div>
        </div>

        {/* Other Formats - Collapsible */}
        <div className="mb-8">
          <button
            onClick={() => setShowOtherFormats(!showOtherFormats)}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <span className="flex items-center gap-2">
              {showOtherFormats ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              Diğer Formatlar
            </span>
          </button>

          {showOtherFormats && (
            <div className="mt-3 space-y-2">
              {/* URL Only */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <button
                  onClick={() => setExpandedFormat(expandedFormat === 'url' ? null : 'url')}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition"
                >
                  <span>• Sadece URL</span>
                  {expandedFormat === 'url' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
                {expandedFormat === 'url' && (
                  <div className="border-t border-slate-100 p-4">
                    <div className="rounded-xl bg-slate-50 p-3 mb-3">
                      <code className="block text-xs text-slate-700 break-all font-mono">
                        {getTrackingCode('url')}
                      </code>
                    </div>
                    <button
                      onClick={() => copyToClipboard('url')}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      {copiedFormat === 'url' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      Kopyala
                    </button>
                  </div>
                )}
              </div>

              {/* Gmail Optimized */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <button
                  onClick={() => setExpandedFormat(expandedFormat === 'optimized' ? null : 'optimized')}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition"
                >
                  <span>• Gmail Optimize Edilmiş</span>
                  {expandedFormat === 'optimized' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
                {expandedFormat === 'optimized' && (
                  <div className="border-t border-slate-100 p-4">
                    <div className="rounded-xl bg-slate-50 p-3 mb-3">
                      <code className="block text-xs text-slate-700 break-all font-mono">
                        {getTrackingCode('optimized')}
                      </code>
                    </div>
                    <button
                      onClick={() => copyToClipboard('optimized')}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      {copiedFormat === 'optimized' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      Kopyala
                    </button>
                  </div>
                )}
              </div>

              {/* HTML Hidden */}
              <div className="rounded-xl border border-slate-200 bg-white">
                <button
                  onClick={() => setExpandedFormat(expandedFormat === 'html' ? null : 'html')}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition"
                >
                  <span>• HTML Gizli Stil</span>
                  {expandedFormat === 'html' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
                {expandedFormat === 'html' && (
                  <div className="border-t border-slate-100 p-4">
                    <div className="rounded-xl bg-slate-50 p-3 mb-3">
                      <code className="block text-xs text-slate-700 break-all font-mono">
                        {getTrackingCode('html')}
                      </code>
                    </div>
                    <button
                      onClick={() => copyToClipboard('html')}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      {copiedFormat === 'html' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      Kopyala
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Minimal Usage Guide */}
        <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-900">ℹ️ Nasıl Kullanılır?</p>
          <div className="space-y-1 text-sm text-slate-600">
            <p><strong>Gmail:</strong> Kodu mail sonuna yapıştırın</p>
            <p><strong>URL:</strong> İmzada görsel olarak ekleyin</p>
            <p><strong>HTML:</strong> Thunderbird/Outlook</p>
          </div>
        </div>

        {/* Footer - Minimal Icons */}
        <div className="flex items-center justify-center gap-8 border-t border-slate-100 pt-6">
          <button
            onClick={() => window.open(`/track/${mail.id}`, '_blank')}
            className="group flex flex-col items-center gap-2 text-slate-500 transition hover:text-slate-900"
            title="Görüntüle"
          >
            <Eye className="h-5 w-5" />
            <span className="text-xs font-medium">Görüntüle</span>
          </button>
          <button
            onClick={() => alert('Test özelliği yakında!')}
            className="group flex flex-col items-center gap-2 text-slate-500 transition hover:text-slate-900"
            title="Test Et"
          >
            <Monitor className="h-5 w-5" />
            <span className="text-xs font-medium">Test Et</span>
          </button>
          <button
            onClick={() => setShowActivity(!showActivity)}
            className={`group flex flex-col items-center gap-2 transition ${
              showActivity ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Aktivite"
          >
            <Activity className="h-5 w-5" />
            <span className="text-xs font-medium">Aktivite</span>
            {readLogs.length > 0 && (
              <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white">
                {readLogs.length}
              </span>
            )}
          </button>
        </div>

        {/* Read Logs - Clean List (Conditional) */}
        {showActivity && readLogs.length > 0 && (
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Son Aktiviteler</h3>
            <div className="space-y-2">
              {readLogs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 text-xs transition hover:border-slate-200"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                    {getDeviceIcon(log.device_type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">
                      {format(new Date(log.read_at), "d MMM, HH:mm", { locale: tr })}
                    </p>
                    <div className="flex gap-2 text-slate-500">
                      {log.browser && <span>{log.browser}</span>}
                      {log.ip_address && <span>· {log.ip_address}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
