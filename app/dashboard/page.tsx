import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user's mail items
  const { data: mailItems } = await supabase
    .from('mailtrack_mail_items')
    .select('*, mailtrack_tracking_pixels(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch dashboard stats
  const { data: stats } = await supabase
    .from('mailtrack_user_dashboard')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <DashboardClient 
      user={user} 
      initialMailItems={mailItems || []}
      stats={stats}
    />
  )
}
