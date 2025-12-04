'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, Plus } from 'lucide-react'

interface CreateMailModalProps {
  userId: string
  onClose: () => void
  onMailCreated: (mail: any) => void
}

export default function CreateMailModal({ userId, onClose, onMailCreated }: CreateMailModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [mailSubject, setMailSubject] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const generatePixelCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Create mail item
      const { data: mailItem, error: mailError } = await supabase
        .from('mailtrack_mail_items')
        .insert({
          user_id: userId,
          title,
          description,
          recipient_email: recipientEmail || null,
          recipient_name: recipientName || null,
          mail_subject: mailSubject || null,
          notes: notes || null,
          status: 'pending'
        })
        .select()
        .single()

      if (mailError) throw mailError

      // Generate pixel code and URL
      const pixelCode = generatePixelCode()
      const pixelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/pixel/${pixelCode}.gif`

      // Create tracking pixel
      const { data: pixel, error: pixelError } = await supabase
        .from('mailtrack_tracking_pixels')
        .insert({
          mail_id: mailItem.id,
          pixel_url: pixelUrl,
          pixel_code: pixelCode
        })
        .select()
        .single()

      if (pixelError) throw pixelError

      // Return complete mail item with pixel
      onMailCreated({
        ...mailItem,
        mailtrack_tracking_pixels: [pixel]
      })

    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Yeni Mail İzleme Oluştur</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              İzleme Başlığı *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="Örn: Müşteri Teklifi - Acme Corp"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Bu başlık sadece sizin için, alıcı görmez
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="recipientEmail" className="block text-sm font-medium mb-2">
                Alıcı E-posta
              </label>
              <input
                id="recipientEmail"
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="input-field"
                placeholder="ornek@email.com"
              />
            </div>
            <div>
              <label htmlFor="recipientName" className="block text-sm font-medium mb-2">
                Alıcı Adı
              </label>
              <input
                id="recipientName"
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="input-field"
                placeholder="Ahmet Yılmaz"
              />
            </div>
          </div>

          <div>
            <label htmlFor="mailSubject" className="block text-sm font-medium mb-2">
              Mail Konusu
            </label>
            <input
              id="mailSubject"
              type="text"
              value={mailSubject}
              onChange={(e) => setMailSubject(e.target.value)}
              className="input-field"
              placeholder="Teklif Sunumu Hakkında"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Gönderdiğiniz mail'in konusunu buraya yazın
            </p>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-2">
              Notlar (Opsiyonel)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="input-field"
              placeholder="Bu mail hakkında notlarınız..."
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                'Oluşturuluyor...'
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Oluştur
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
