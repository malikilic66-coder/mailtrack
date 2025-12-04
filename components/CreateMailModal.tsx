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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl border border-gray-100 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-900">Yeni Mail İzleme Oluştur</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-700">
              İzleme Başlığı *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Örn: Müşteri Teklifi - Acme Corp"
              required
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Bu başlık sadece sizin için, alıcı görmez
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="recipientEmail" className="block text-sm font-medium mb-2 text-gray-700">
                Alıcı E-posta
              </label>
              <input
                id="recipientEmail"
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="ornek@email.com"
              />
            </div>
            <div>
              <label htmlFor="recipientName" className="block text-sm font-medium mb-2 text-gray-700">
                Alıcı Adı
              </label>
              <input
                id="recipientName"
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ahmet Yılmaz"
              />
            </div>
          </div>

          <div>
            <label htmlFor="mailSubject" className="block text-sm font-medium mb-2 text-gray-700">
              Mail Konusu
            </label>
            <input
              id="mailSubject"
              type="text"
              value={mailSubject}
              onChange={(e) => setMailSubject(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Teklif Sunumu Hakkında"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Gönderdiğiniz mail'in konusunu buraya yazın
            </p>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-2 text-gray-700">
              Notlar (Opsiyonel)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Bu mail hakkında notlarınız..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-all hover:scale-105"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-all hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  )
}
