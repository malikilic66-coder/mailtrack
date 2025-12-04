-- ========================================
-- MailSight Database Schema UPDATE
-- Gmail-Compatible Tracking Enhancement
-- ========================================

-- 1. Add new columns to mailtrack_mail_items
ALTER TABLE mailtrack_mail_items 
ADD COLUMN IF NOT EXISTS recipient_email TEXT,
ADD COLUMN IF NOT EXISTS recipient_name TEXT,
ADD COLUMN IF NOT EXISTS mail_subject TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[];

-- 2. Create index for searching
CREATE INDEX IF NOT EXISTS idx_mail_items_recipient ON mailtrack_mail_items(recipient_email);
CREATE INDEX IF NOT EXISTS idx_mail_items_subject ON mailtrack_mail_items(mail_subject);
CREATE INDEX IF NOT EXISTS idx_mail_items_tags ON mailtrack_mail_items USING GIN(tags);

-- 3. Update mail_stats view to include new fields
DROP VIEW IF EXISTS mailtrack_mail_stats;
CREATE OR REPLACE VIEW mailtrack_mail_stats AS
SELECT 
    m.id,
    m.user_id,
    m.title,
    m.description,
    m.recipient_email,
    m.recipient_name,
    m.mail_subject,
    m.notes,
    m.tags,
    m.status,
    m.first_opened_at,
    m.open_count,
    m.created_at,
    m.updated_at,
    p.pixel_url,
    p.pixel_code,
    COUNT(DISTINCT r.id) as read_count,
    COUNT(DISTINCT r.ip_address) as unique_readers,
    MAX(r.read_at) as last_read_at,
    ARRAY_AGG(DISTINCT r.device_type) FILTER (WHERE r.device_type IS NOT NULL) as devices_used,
    ARRAY_AGG(DISTINCT r.browser) FILTER (WHERE r.browser IS NOT NULL) as browsers_used
FROM mailtrack_mail_items m
LEFT JOIN mailtrack_tracking_pixels p ON m.id = p.mail_id
LEFT JOIN mailtrack_read_logs r ON p.id = r.pixel_id
GROUP BY m.id, p.id, p.pixel_url, p.pixel_code;

-- 4. Update user dashboard view
DROP VIEW IF EXISTS mailtrack_user_dashboard;
CREATE OR REPLACE VIEW mailtrack_user_dashboard AS
SELECT 
    user_id,
    COUNT(*) as total_mails,
    COUNT(*) FILTER (WHERE status = 'opened') as opened_mails,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_mails,
    SUM(open_count) as total_opens,
    COUNT(DISTINCT recipient_email) FILTER (WHERE recipient_email IS NOT NULL) as unique_recipients,
    MAX(created_at) as last_mail_created,
    MAX(first_opened_at) as last_mail_opened
FROM mailtrack_mail_items
GROUP BY user_id;

COMMENT ON TABLE mailtrack_mail_items IS 'Enhanced mail tracking with recipient and subject information';
COMMENT ON COLUMN mailtrack_mail_items.recipient_email IS 'Email address of the recipient';
COMMENT ON COLUMN mailtrack_mail_items.recipient_name IS 'Name of the recipient (optional)';
COMMENT ON COLUMN mailtrack_mail_items.mail_subject IS 'Subject line of the email for reference';
COMMENT ON COLUMN mailtrack_mail_items.notes IS 'Additional notes about this email';
COMMENT ON COLUMN mailtrack_mail_items.tags IS 'Tags for organizing emails (e.g., client, proposal, follow-up)';
