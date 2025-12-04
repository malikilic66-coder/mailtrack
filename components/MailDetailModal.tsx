'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, Copy, CheckCircle, Clock, Monitor, Smartphone, Globe } from 'lucide-react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale/tr'

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
  country: string | null
  city: string | null
}

export default function MailDetailModal({ mail, onClose }: MailDetailModalProps) {
  const [copied, setCopied] = useState(false)
  const [readLogs, setReadLogs] = useState<ReadLog[]>([])
  const supabase = createClient()

  useEffect(() => {
    fetchReadLogs()
  }, [mail.id])

  const fetchReadLogs = async () => {
    const { data } = await supabase
      .from('mailtrack_read_logs')
      .select('*')
      .eq('mail_id', mail.id)
      .order('read_at', { ascending: false })

    if (data) {
      setReadLogs(data)
    }
  }

  const pixelUrl = mail.mailtrack_tracking_pixels?.[0]?.pixel_url || ''
  
  const pixelHtmlCode = `<img src="${pixelUrl}" width="1" height="1" style="display:none" alt="" />`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pixelHtmlCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
        {mail.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-6">{mail.description}</p>
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
          <label className="block text-sm font-medium mb-2">
            Tracking Pixel Kodu
          </label>
          <div className="relative">
            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-xs overflow-x-auto border border-gray-200 dark:border-gray-700">
              {pixelHtmlCode}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Bu kodu mailinizin en altına HTML olarak yapıştırın
          </p>
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
                          {format(new Date(log.read_at), "d MMMM yyyy, HH:mm", { locale: tr })}
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
                          {log.country && (
                            <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded">
                              {log.country}
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
