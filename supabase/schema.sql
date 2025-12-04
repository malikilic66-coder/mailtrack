-- ========================================
-- MailSight Database Schema
-- Supabase PostgreSQL
-- ========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- Table: mailtrack_mail_items
-- Mail tracking items created by users
-- ========================================
CREATE TABLE IF NOT EXISTS mailtrack_mail_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'opened', 'unopened')),
    first_opened_at TIMESTAMPTZ,
    open_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- Table: mailtrack_tracking_pixels
-- Tracking pixel URLs for each mail item
-- ========================================
CREATE TABLE IF NOT EXISTS mailtrack_tracking_pixels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mail_id UUID NOT NULL REFERENCES mailtrack_mail_items(id) ON DELETE CASCADE,
    pixel_url TEXT NOT NULL UNIQUE,
    pixel_code TEXT NOT NULL UNIQUE, -- Short unique code for URL
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- Table: mailtrack_read_logs
-- Log every time a tracking pixel is loaded
-- ========================================
CREATE TABLE IF NOT EXISTS mailtrack_read_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pixel_id UUID NOT NULL REFERENCES mailtrack_tracking_pixels(id) ON DELETE CASCADE,
    mail_id UUID NOT NULL REFERENCES mailtrack_mail_items(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    read_at TIMESTAMPTZ DEFAULT NOW(),
    ip_address TEXT,
    user_agent TEXT,
    device_type TEXT, -- 'mobile', 'desktop', 'tablet', 'unknown'
    browser TEXT,
    os TEXT,
    country TEXT,
    city TEXT,
    referer TEXT
);

-- ========================================
-- Indexes for Performance
-- ========================================
CREATE INDEX IF NOT EXISTS idx_mail_items_user_id ON mailtrack_mail_items(user_id);
CREATE INDEX IF NOT EXISTS idx_mail_items_created_at ON mailtrack_mail_items(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tracking_pixels_mail_id ON mailtrack_tracking_pixels(mail_id);
CREATE INDEX IF NOT EXISTS idx_tracking_pixels_code ON mailtrack_tracking_pixels(pixel_code);
CREATE INDEX IF NOT EXISTS idx_read_logs_pixel_id ON mailtrack_read_logs(pixel_id);
CREATE INDEX IF NOT EXISTS idx_read_logs_mail_id ON mailtrack_read_logs(mail_id);
CREATE INDEX IF NOT EXISTS idx_read_logs_user_id ON mailtrack_read_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_read_logs_read_at ON mailtrack_read_logs(read_at DESC);

-- ========================================
-- Function: Update timestamp automatically
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for auto-updating updated_at
CREATE TRIGGER update_mail_items_updated_at 
    BEFORE UPDATE ON mailtrack_mail_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- Function: Update mail status on pixel read
-- ========================================
CREATE OR REPLACE FUNCTION update_mail_status_on_read()
RETURNS TRIGGER AS $$
BEGIN
    -- Update mail item status and counts
    UPDATE mailtrack_mail_items
    SET 
        status = 'opened',
        open_count = open_count + 1,
        first_opened_at = COALESCE(first_opened_at, NEW.read_at)
    WHERE id = NEW.mail_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger: Auto-update mail status when pixel is read
CREATE TRIGGER trigger_update_mail_on_read
    AFTER INSERT ON mailtrack_read_logs
    FOR EACH ROW
    EXECUTE FUNCTION update_mail_status_on_read();

-- ========================================
-- Row Level Security (RLS) Policies
-- ========================================

-- Enable RLS on all tables
ALTER TABLE mailtrack_mail_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE mailtrack_tracking_pixels ENABLE ROW LEVEL SECURITY;
ALTER TABLE mailtrack_read_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own mail items
CREATE POLICY "Users can view their own mail items"
    ON mailtrack_mail_items FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mail items"
    ON mailtrack_mail_items FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mail items"
    ON mailtrack_mail_items FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mail items"
    ON mailtrack_mail_items FOR DELETE
    USING (auth.uid() = user_id);

-- Policy: Users can view pixels for their mails
CREATE POLICY "Users can view their tracking pixels"
    ON mailtrack_tracking_pixels FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM mailtrack_mail_items
            WHERE mailtrack_mail_items.id = mailtrack_tracking_pixels.mail_id
            AND mailtrack_mail_items.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert tracking pixels for their mails"
    ON mailtrack_tracking_pixels FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM mailtrack_mail_items
            WHERE mailtrack_mail_items.id = mailtrack_tracking_pixels.mail_id
            AND mailtrack_mail_items.user_id = auth.uid()
        )
    );

-- Policy: Public can insert read logs (pixel tracking)
CREATE POLICY "Anyone can insert read logs"
    ON mailtrack_read_logs FOR INSERT
    WITH CHECK (true);

-- Policy: Users can view their own read logs
CREATE POLICY "Users can view their read logs"
    ON mailtrack_read_logs FOR SELECT
    USING (auth.uid() = user_id);

-- ========================================
-- Function: Generate unique pixel code
-- ========================================
CREATE OR REPLACE FUNCTION generate_pixel_code()
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result TEXT := '';
    i INTEGER := 0;
BEGIN
    FOR i IN 1..12 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- Realtime Publication for live updates
-- ========================================
-- Enable realtime for read_logs table
ALTER PUBLICATION supabase_realtime ADD TABLE mailtrack_read_logs;

-- ========================================
-- Sample Views for Analytics
-- ========================================

-- View: Mail items with stats
CREATE OR REPLACE VIEW mailtrack_mail_stats AS
SELECT 
    m.id,
    m.user_id,
    m.title,
    m.description,
    m.status,
    m.open_count,
    m.first_opened_at,
    m.created_at,
    COUNT(DISTINCT r.id) as total_reads,
    COUNT(DISTINCT r.ip_address) as unique_readers,
    MAX(r.read_at) as last_read_at
FROM mailtrack_mail_items m
LEFT JOIN mailtrack_read_logs r ON m.id = r.mail_id
GROUP BY m.id;

-- View: User dashboard stats
CREATE OR REPLACE VIEW mailtrack_user_dashboard AS
SELECT 
    user_id,
    COUNT(*) as total_mails,
    COUNT(*) FILTER (WHERE status = 'opened') as opened_mails,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_mails,
    SUM(open_count) as total_opens,
    MAX(created_at) as last_mail_created
FROM mailtrack_mail_items
GROUP BY user_id;

-- ========================================
-- Grant permissions
-- ========================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- ========================================
-- Comments for documentation
-- ========================================
COMMENT ON TABLE mailtrack_mail_items IS 'Stores mail tracking items created by users';
COMMENT ON TABLE mailtrack_tracking_pixels IS 'Stores tracking pixel URLs and codes';
COMMENT ON TABLE mailtrack_read_logs IS 'Logs every pixel load event with metadata';
COMMENT ON FUNCTION update_mail_status_on_read() IS 'Automatically updates mail status when pixel is read';
COMMENT ON FUNCTION generate_pixel_code() IS 'Generates random 12-character code for pixel URLs';
