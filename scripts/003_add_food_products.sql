-- Update product_type enum to include 'food'
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_product_type_check;
ALTER TABLE products ADD CONSTRAINT products_product_type_check 
  CHECK (product_type IN ('pet', 'accessory', 'pet_care', 'supplement', 'food'));

-- Insert sample food products with various categories
INSERT INTO products (name, slug, description, price, product_type, sub_category, size, stock_quantity, is_featured) VALUES
  -- Dog Food
  ('Premium Adult Dog Food', 'premium-adult-dog-food', 'High-protein formula for adult dogs with real chicken', 2499.00, 'food', 'dog_food', '10kg', 100, true),
  ('Puppy Growth Formula', 'puppy-growth-formula', 'Specially formulated nutrition for growing puppies', 2799.00, 'food', 'dog_food', '5kg', 80, true),
  ('Senior Dog Food', 'senior-dog-food', 'Easy-to-digest formula for senior dogs with joint support', 2299.00, 'food', 'dog_food', '8kg', 60, false),
  ('Large Breed Dog Food', 'large-breed-dog-food', 'Balanced nutrition for large breed dogs', 3299.00, 'food', 'dog_food', '15kg', 45, false),
  ('Grain-Free Dog Food', 'grain-free-dog-food', 'Grain-free recipe with salmon and sweet potato', 3499.00, 'food', 'dog_food', '12kg', 70, true),
  
  -- Cat Food
  ('Indoor Cat Formula', 'indoor-cat-formula', 'Complete nutrition for indoor cats with hairball control', 1899.00, 'food', 'cat_food', '7kg', 90, true),
  ('Kitten Growth Food', 'kitten-growth-food', 'Nutrient-rich food for growing kittens', 1999.00, 'food', 'cat_food', '4kg', 75, false),
  ('Senior Cat Food', 'senior-cat-food', 'Gentle formula for senior cats with kidney support', 1799.00, 'food', 'cat_food', '5kg', 55, false),
  ('Grain-Free Cat Food', 'grain-free-cat-food', 'Premium grain-free recipe with real fish', 2299.00, 'food', 'cat_food', '6kg', 65, true),
  ('Hairball Control Cat Food', 'hairball-control-cat-food', 'Special formula to reduce hairballs', 1699.00, 'food', 'cat_food', '5kg', 80, false),
  
  -- Bird Food
  ('Premium Parrot Mix', 'premium-parrot-mix', 'Nutritious seed and nut mix for parrots', 899.00, 'food', 'bird_food', '2kg', 100, false),
  ('Canary Bird Food', 'canary-bird-food', 'Specially blended seeds for canaries', 499.00, 'food', 'bird_food', '1kg', 120, false),
  ('Finch Food Mix', 'finch-food-mix', 'Complete nutrition for finches', 399.00, 'food', 'bird_food', '1kg', 110, false),
  ('Budgie Food', 'budgie-food', 'Balanced diet for budgerigars', 349.00, 'food', 'bird_food', '1kg', 130, false),
  
  -- Small Pet Food
  ('Rabbit Food Pellets', 'rabbit-food-pellets', 'High-fiber pellets for adult rabbits', 699.00, 'food', 'small_pet_food', '3kg', 85, false),
  ('Hamster Food Mix', 'hamster-food-mix', 'Complete nutrition for hamsters', 299.00, 'food', 'small_pet_food', '500g', 95, false),
  ('Guinea Pig Food', 'guinea-pig-food', 'Vitamin C enriched food for guinea pigs', 599.00, 'food', 'small_pet_food', '2kg', 70, false),
  
  -- Treats
  ('Dog Training Treats', 'dog-training-treats', 'Healthy training treats for dogs', 349.00, 'food', 'treats', '500g', 150, false),
  ('Cat Dental Treats', 'cat-dental-treats', 'Crunchy treats for dental health', 299.00, 'food', 'treats', '200g', 140, false),
  ('Chicken Jerky Dog Treats', 'chicken-jerky-dog-treats', 'Natural chicken jerky strips', 499.00, 'food', 'treats', '300g', 120, false)
ON CONFLICT (slug) DO NOTHING;
