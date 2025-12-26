-- Create storage buckets for different product categories
-- Note: Storage buckets must be created via Supabase UI or API
-- This script documents the bucket structure needed

-- Run these SQL statements to create storage buckets:
-- 
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES 
--   ('pet-shop', 'pet-shop', true),
--   ('accessories', 'accessories', true),
--   ('foods', 'foods', true),
--   ('adopt', 'adopt', true),
--   ('reviews', 'reviews', true),
--   ('user-uploads', 'user-uploads', true);
--
-- <CHANGE> removed blog-images bucket

-- Allow public access to all buckets:
CREATE POLICY "Allow public read pet-shop bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'pet-shop');

CREATE POLICY "Allow public read accessories bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'accessories');

CREATE POLICY "Allow public read foods bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'foods');

CREATE POLICY "Allow public read adopt bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'adopt');

-- <CHANGE> removed blog-images bucket policy

CREATE POLICY "Allow public read reviews bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'reviews');

CREATE POLICY "Allow public read user-uploads bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'user-uploads');

-- Allow public uploads to reviews bucket
CREATE POLICY "Allow public upload to reviews bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'reviews');
