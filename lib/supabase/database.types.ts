export type Database = {
  public: {
    Tables: {
      mailtrack_mail_items: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: 'pending' | 'opened' | 'unopened'
          first_opened_at: string | null
          open_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          status?: 'pending' | 'opened' | 'unopened'
          first_opened_at?: string | null
          open_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          status?: 'pending' | 'opened' | 'unopened'
          first_opened_at?: string | null
          open_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      mailtrack_tracking_pixels: {
        Row: {
          id: string
          mail_id: string
          pixel_url: string
          pixel_code: string
          created_at: string
        }
        Insert: {
          id?: string
          mail_id: string
          pixel_url: string
          pixel_code: string
          created_at?: string
        }
        Update: {
          id?: string
          mail_id?: string
          pixel_url?: string
          pixel_code?: string
          created_at?: string
        }
      }
      mailtrack_read_logs: {
        Row: {
          id: string
          pixel_id: string
          mail_id: string
          user_id: string
          read_at: string
          ip_address: string | null
          user_agent: string | null
          device_type: string | null
          browser: string | null
          os: string | null
          country: string | null
          city: string | null
          referer: string | null
        }
        Insert: {
          id?: string
          pixel_id: string
          mail_id: string
          user_id: string
          read_at?: string
          ip_address?: string | null
          user_agent?: string | null
          device_type?: string | null
          browser?: string | null
          os?: string | null
          country?: string | null
          city?: string | null
          referer?: string | null
        }
        Update: {
          id?: string
          pixel_id?: string
          mail_id?: string
          user_id?: string
          read_at?: string
          ip_address?: string | null
          user_agent?: string | null
          device_type?: string | null
          browser?: string | null
          os?: string | null
          country?: string | null
          city?: string | null
          referer?: string | null
        }
      }
    }
    Views: {
      mailtrack_mail_stats: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: string
          open_count: number
          first_opened_at: string | null
          created_at: string
          total_reads: number
          unique_readers: number
          last_read_at: string | null
        }
      }
      mailtrack_user_dashboard: {
        Row: {
          user_id: string
          total_mails: number
          opened_mails: number
          pending_mails: number
          total_opens: number
          last_mail_created: string
        }
      }
    }
    Functions: {
      generate_pixel_code: {
        Args: Record<string, never>
        Returns: string
      }
    }
  }
}
