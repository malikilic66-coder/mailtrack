-- MailTrack Database Schema for Supabase
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Emails table
CREATE TABLE IF NOT EXISTS emails (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    recipient TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracking logs table
CREATE TABLE IF NOT EXISTS tracking_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email_id UUID NOT NULL REFERENCES emails(id) ON DELETE CASCADE,
    ip_address TEXT,
    user_agent TEXT,
    opened_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_emails_user_id ON emails(user_id);
CREATE INDEX IF NOT EXISTS idx_emails_created_at ON emails(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tracking_logs_email_id ON tracking_logs(email_id);
CREATE INDEX IF NOT EXISTS idx_tracking_logs_opened_at ON tracking_logs(opened_at DESC);

-- Enable Row Level Security
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for emails table
CREATE POLICY "Users can view their own emails"
    ON emails FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own emails"
    ON emails FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own emails"
    ON emails FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own emails"
    ON emails FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for tracking_logs table
-- Users can view tracking logs for their own emails
CREATE POLICY "Users can view tracking logs for their emails"
    ON tracking_logs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM emails
            WHERE emails.id = tracking_logs.email_id
            AND emails.user_id = auth.uid()
        )
    );

-- Allow the service role to insert tracking logs (for the backend)
-- The backend validates that email_id exists before inserting
-- This policy requires that the email_id references a valid email
CREATE POLICY "Service role can insert tracking logs"
    ON tracking_logs FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM emails
            WHERE emails.id = email_id
        )
    );

-- Enable realtime for tracking_logs
ALTER PUBLICATION supabase_realtime ADD TABLE tracking_logs;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for emails table
CREATE TRIGGER update_emails_updated_at
    BEFORE UPDATE ON emails
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
