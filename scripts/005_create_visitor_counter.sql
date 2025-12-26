-- Create visitor counter table
CREATE TABLE IF NOT EXISTS public.visitor_counter (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT UNIQUE NOT NULL,
  visit_count INTEGER NOT NULL DEFAULT 1,
  last_visited TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.visitor_counter ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read visitor counter" ON public.visitor_counter FOR SELECT USING (true);

-- Allow public update
CREATE POLICY "Allow public update visitor counter" ON public.visitor_counter FOR UPDATE WITH CHECK (true);

-- Allow public insert
CREATE POLICY "Allow public insert visitor counter" ON public.visitor_counter FOR INSERT WITH CHECK (true);

-- Create index for performance
CREATE INDEX idx_visitor_counter_page_path ON public.visitor_counter(page_path);
