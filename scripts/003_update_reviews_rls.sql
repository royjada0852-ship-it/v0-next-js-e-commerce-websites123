-- Add RLS policy to allow public inserts on reviews table
ALTER TABLE reviews DROP POLICY IF EXISTS "Allow public insert on reviews";

CREATE POLICY "Allow public insert on reviews"
ON reviews
FOR INSERT
TO public
WITH CHECK (true);
