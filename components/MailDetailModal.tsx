'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, Copy, Check, CheckCircle, Clock, Monitor, Smartphone, Globe, Link as LinkIcon, Code, Image as ImageIcon, Mail as MailIcon, Eye } from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale/tr'

type CopyFormat = 'url' | 'img' | 'html' | 'gmail'

interface MailDetailModalProps {
  mail: any
  onClose: () => void
}

interface ReadLog {
  id: string
  created_at: string
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
  const supabase = createClient()

  useEffect(() => {
    fetchReadLogs()
  }, [mail.id])

  const fetchReadLogs = async () => {
    // Get pixel ID first
    const pixelId = mail.mailtrack_tracking_pixels?.[0]?.id
    
    if (!pixelId) return

    const { data } = await supabase
      .from('mailtrack_read_logs')
      .select('*')
      .eq('pixel_id', pixelId)
      .order('created_at', { ascending: false })

    if (data) {
      setReadLogs(data)
    }
  }

  const pixelUrl = mail.mailtrack_tracking_pixels?.[0]?.pixel_url || ''
  
  const getTrackingCode = (format: CopyFormat): string => {
    if (!pixelUrl) return ''
    
    switch (format) {
      case 'url':
        // Sadece URL - Gmail resim URL ile ekle için
        return pixelUrl
        
      case 'img':
        // Basit IMG tag - Gmail için EN İYİ
        return `<img src="${pixelUrl}" width="1" height="1" alt="" />`
        
      case 'html':
        // Gizli stil ile IMG tag
        return `<img src="${pixelUrl}" width="1" height="1" style="display:none;opacity:0;position:absolute;" alt="" />`
        
      case 'gmail':
        // Gmail optimize edilmiş format
        return `<img src="${pixelUrl}" width="1" height="1" border="0" style="border:0;outline:0;display:inline;margin:0;padding:0;" alt="" />`
        
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

  const getInstructions = (format: CopyFormat): string => {
    switch (format) {
      case 'url':
        return 'Gmail\'de: İmza ekle → Resim ekle → URL ile ekle → Bu linki yapıştır'
      case 'img':
        return 'Gmail\'de mail yazarken: Ctrl+V ile doğrudan yapıştır (ÖNERİLEN)'
      case 'html':
        return 'HTML destekleyen mail istemcileri için (Outlook, Thunderbird)'
      case 'gmail':
        return 'Gmail optimize edilmiş - En iyi uyumluluk'
      default:
        return ''
    }
  }

  const getDeviceIcon = (deviceType: string | null) => {
    if (deviceType === 'mobile') return <Smartphone className="w-4 h-4" />
    if (deviceType === 'desktop') return <Monitor className="w-4 h-4" />
    return <Globe className="w-4 h-4" />
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full p-6 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-2">{mail.title}</h2>
        
        {/* Mail Details Grid */}
        {(mail.recipient_email || mail.mail_subject) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
            {mail.recipient_email && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MailIcon className="w-4 h-4" />
                <span className="font-medium">Alıcı:</span>
                <span>{mail.recipient_name ? `${mail.recipient_name} (${mail.recipient_email})` : mail.recipient_email}</span>
              </div>
            )}
            {mail.mail_subject && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Eye className="w-4 h-4" />
                <span className="font-medium">Konu:</span>
                <span>{mail.mail_subject}</span>
              </div>
            )}
          </div>
        )}

        {mail.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">{mail.description}</p>
        )}
        
        {mail.notes && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
            <p className="text-gray-700 dark:text-gray-300"><strong>Notlar:</strong> {mail.notes}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Durum</p>
            <div className="flex items-center gap-2 mt-1">
              {mail.status === 'opened' ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-600 dark:text-green-400">Okundu</span>
                </>
              ) : (
                <>
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-orange-600 dark:text-orange-400">Bekliyor</span>
                </>
              )}
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Okuma Sayısı</p>
            <p className="text-2xl font-bold mt-1">{mail.open_count}</p>
          </div>

          {mail.first_opened_at && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg col-span-2 md:col-span-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">İlk Okuma</p>
              <p className="font-medium mt-1">
                {format(new Date(mail.first_opened_at), "d MMMM yyyy", { locale: tr })}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(mail.first_opened_at), "HH:mm", { locale: tr })}
              </p>
            </div>
          )}
        </div>

        {/* Tracking Code */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" />
            İzleme Kodu - Farklı Formatlar
          </h3>
          
          <div className="space-y-3">
            {/* Gmail Direct Paste - RECOMMENDED */}
            <div className="border-2 border-green-500 dark:border-green-600 rounded-lg p-4 bg-green-50 dark:bg-green-900/10">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-bold text-green-800 dark:text-green-400">Gmail İçin Basit Format (ÖNERİLEN) ✓</h4>
                    <p className="text-xs text-green-700 dark:text-green-500 mt-1">{getInstructions('img')}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('img')}
                  className="btn-primary flex items-center gap-2 text-sm shrink-0"
                >
                  {copiedFormat === 'img' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Kopyalandı!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Kopyala
                    </>
                  )}
                </button>
              </div>
              <code className="block bg-white dark:bg-gray-900 p-3 rounded text-xs overflow-x-auto border border-green-300 dark:border-green-700">
                {getTrackingCode('img')}
              </code>
            </div>

            {/* URL Only - For Image Insert */}
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-bold">Sadece URL (Resim URL olarak ekle)</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{getInstructions('url')}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('url')}
                  className="btn-secondary flex items-center gap-2 text-sm shrink-0"
                >
                  {copiedFormat === 'url' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Kopyalandı!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Kopyala
                    </>
                  )}
                </button>
              </div>
              <code className="block bg-gray-50 dark:bg-gray-900 p-3 rounded text-xs overflow-x-auto">
                {getTrackingCode('url')}
              </code>
            </div>

            {/* Gmail Optimized */}
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MailIcon className="w-5 h-5 text-purple-600" />
                  <div>
                    <h4 className="font-bold">Gmail Optimize Edilmiş</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{getInstructions('gmail')}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('gmail')}
                  className="btn-secondary flex items-center gap-2 text-sm shrink-0"
                >
                  {copiedFormat === 'gmail' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Kopyalandı!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Kopyala
                    </>
                  )}
                </button>
              </div>
              <code className="block bg-gray-50 dark:bg-gray-900 p-3 rounded text-xs overflow-x-auto">
                {getTrackingCode('gmail')}
              </code>
            </div>

            {/* HTML with Hidden Style */}
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-600" />
                  <div>
                    <h4 className="font-bold">HTML Gizli Stil (Diğer İstemciler)</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{getInstructions('html')}</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard('html')}
                  className="btn-secondary flex items-center gap-2 text-sm shrink-0"
                >
                  {copiedFormat === 'html' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Kopyalandı!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Kopyala
                    </>
                  )}
                </button>
              </div>
              <code className="block bg-gray-50 dark:bg-gray-900 p-3 rounded text-xs overflow-x-auto">
                {getTrackingCode('html')}
              </code>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2">📌 Nasıl Kullanılır?</h4>
            <ol className="text-sm text-blue-800 dark:text-blue-400 space-y-2 list-decimal list-inside">
              <li><strong>Gmail için</strong>: Yeşil kutudaki kodu kopyala → Gmail'de mail yazarken mail sonuna yapıştır → Gönder</li>
              <li><strong>Resim URL ile</strong>: "Sadece URL" kodu kopyala → Gmail'de imza ekle → Resim ekle → URL ile → Yapıştır</li>
              <li><strong>Outlook/Thunderbird</strong>: HTML formatını kopyala → Mail'e yapıştır</li>
            </ol>
          </div>
        </div>

        {/* Read Logs */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Okuma Geçmişi</h3>
          
          {readLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Henüz okuma kaydı yok
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {readLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getDeviceIcon(log.device_type)}
                      <div>
                        <p className="font-medium text-sm">
                          {format(new Date(log.created_at), "d MMMM yyyy, HH:mm", { locale: tr })}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-600 dark:text-gray-400">
                          {log.device_type && (
                            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded">
                              {log.device_type}
                            </span>
                          )}
                          {log.browser && (
                            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded">
                              {log.browser}
                            </span>
                          )}
                          {log.os && (
                            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded">
                              {log.os}
                            </span>
                          )}
                          {log.ip_address && (
                            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">
                              IP: {log.ip_address}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
