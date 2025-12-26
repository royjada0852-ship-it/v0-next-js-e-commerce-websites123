-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
  ('Dogs', 'dogs', 'All breeds of dogs'),
  ('Cats', 'cats', 'All breeds of cats'),
  ('Birds', 'birds', 'Various bird species'),
  ('Small Pets', 'small-pets', 'Rabbits, hamsters, guinea pigs, etc.'),
  ('Pet Accessories', 'pet-accessories', 'Collars, leashes, toys, and more'),
  ('Pet Care Products', 'pet-care-products', 'Shampoos, grooming supplies, health products'),
  ('Pet Supplements', 'pet-supplements', 'Vitamins and nutritional supplements')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products - Pets
INSERT INTO products (name, slug, description, price, product_type, breed, age, size, is_featured, stock_quantity) VALUES
  ('Golden Retriever Puppy', 'golden-retriever-puppy', 'Friendly and energetic golden retriever puppy, perfect for families', 45000.00, 'pet', 'Golden Retriever', '3 months', 'Medium', true, 3),
  ('Persian Cat', 'persian-cat', 'Beautiful long-haired Persian cat with a gentle temperament', 25000.00, 'pet', 'Persian', '6 months', 'Small', true, 2),
  ('Labrador Puppy', 'labrador-puppy', 'Playful and loyal Labrador puppy, great with children', 35000.00, 'pet', 'Labrador', '4 months', 'Medium', true, 4),
  ('Bengal Cat', 'bengal-cat', 'Active and intelligent Bengal cat with distinctive markings', 30000.00, 'pet', 'Bengal', '5 months', 'Small', false, 2),
  ('German Shepherd Puppy', 'german-shepherd-puppy', 'Intelligent and protective German Shepherd puppy', 40000.00, 'pet', 'German Shepherd', '3 months', 'Large', true, 3),
  ('British Shorthair Cat', 'british-shorthair-cat', 'Calm and easygoing British Shorthair with a plush coat', 28000.00, 'pet', 'British Shorthair', '7 months', 'Medium', false, 2),
  ('Beagle Puppy', 'beagle-puppy', 'Curious and friendly Beagle puppy with excellent temperament', 32000.00, 'pet', 'Beagle', '3 months', 'Small', false, 5),
  ('Siamese Cat', 'siamese-cat', 'Vocal and affectionate Siamese cat with striking blue eyes', 22000.00, 'pet', 'Siamese', '6 months', 'Small', false, 3)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products - Accessories
INSERT INTO products (name, slug, description, price, product_type, size, color, stock_quantity) VALUES
  ('Premium Leather Dog Collar', 'premium-leather-collar', 'Durable leather collar with adjustable sizing', 899.00, 'accessory', 'Medium', 'Brown', 50),
  ('Retractable Dog Leash', 'retractable-dog-leash', '5-meter retractable leash with comfortable grip', 1299.00, 'accessory', 'One Size', 'Black', 40),
  ('Cat Scratching Post', 'cat-scratching-post', 'Multi-level scratching post with toys', 2499.00, 'accessory', 'Large', 'Beige', 20),
  ('Pet Travel Carrier', 'pet-travel-carrier', 'Airline-approved pet carrier with ventilation', 3499.00, 'accessory', 'Medium', 'Gray', 15),
  ('Automatic Pet Feeder', 'automatic-pet-feeder', 'Programmable feeder with timer and portion control', 4999.00, 'accessory', 'One Size', 'White', 25),
  ('Orthopedic Pet Bed', 'orthopedic-pet-bed', 'Memory foam bed for ultimate comfort', 3999.00, 'accessory', 'Large', 'Blue', 30),
  ('Interactive Dog Toy Set', 'interactive-dog-toy-set', 'Set of 5 durable toys for active play', 1499.00, 'accessory', 'One Size', 'Multi', 60),
  ('Cat Water Fountain', 'cat-water-fountain', 'Automatic water fountain with filtration system', 2799.00, 'accessory', 'One Size', 'White', 18)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products - Pet Care (with sub-categories)
INSERT INTO products (name, slug, description, price, product_type, sub_category, size, stock_quantity) VALUES
  ('Oatmeal Pet Shampoo', 'oatmeal-pet-shampoo', 'Gentle oatmeal shampoo for sensitive skin', 599.00, 'pet_care', 'shampoo', '500ml', 100),
  ('Anti-Tick & Flea Shampoo', 'anti-tick-flea-shampoo', 'Effective protection against ticks and fleas', 799.00, 'pet_care', 'shampoo', '400ml', 80),
  ('Whitening Pet Shampoo', 'whitening-pet-shampoo', 'Brightening shampoo for white and light-colored coats', 699.00, 'pet_care', 'shampoo', '500ml', 70),
  ('Medicated Skin Powder', 'medicated-skin-powder', 'Anti-fungal and antibacterial powder', 499.00, 'pet_care', 'powder', '100g', 60),
  ('Paw Care Powder', 'paw-care-powder', 'Soothing powder for paw protection', 399.00, 'pet_care', 'powder', '75g', 50),
  ('Antiseptic Cream', 'antiseptic-cream', 'First-aid cream for minor cuts and wounds', 349.00, 'pet_care', 'cream', '50g', 90),
  ('Skin Moisturizing Cream', 'skin-moisturizing-cream', 'Hydrating cream for dry skin', 449.00, 'pet_care', 'cream', '75g', 70),
  ('Ear Cleaning Solution', 'ear-cleaning-solution', 'Gentle ear cleaner for regular grooming', 299.00, 'pet_care', 'solution', '100ml', 85),
  ('Dental Care Spray', 'dental-care-spray', 'Fresh breath spray with antibacterial properties', 399.00, 'pet_care', 'spray', '100ml', 65),
  ('Coat Conditioner Spray', 'coat-conditioner-spray', 'Leave-in conditioner for shiny coat', 549.00, 'pet_care', 'spray', '200ml', 55)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products - Supplements
INSERT INTO products (name, slug, description, price, product_type, weight, stock_quantity) VALUES
  ('Multi-Vitamin Tablets', 'multi-vitamin-tablets', 'Complete daily vitamins for optimal health', 899.00, 'supplement', '60 tablets', 100),
  ('Joint Support Supplement', 'joint-support-supplement', 'Glucosamine and chondroitin for joint health', 1299.00, 'supplement', '90 tablets', 75),
  ('Omega-3 Fish Oil', 'omega-3-fish-oil', 'Rich in EPA and DHA for healthy skin and coat', 1099.00, 'supplement', '120 capsules', 80),
  ('Probiotic Digestive Support', 'probiotic-digestive-support', 'Supports digestive health and immunity', 999.00, 'supplement', '60 chewables', 65),
  ('Calcium & Vitamin D', 'calcium-vitamin-d', 'Promotes strong bones and teeth', 799.00, 'supplement', '90 tablets', 70),
  ('Hip & Joint Mobility', 'hip-joint-mobility', 'Advanced formula for senior pets', 1499.00, 'supplement', '120 chewables', 55),
  ('Skin & Coat Support', 'skin-coat-support', 'Biotin and omega fatty acids for healthy skin', 899.00, 'supplement', '60 soft chews', 60),
  ('Immune System Booster', 'immune-system-booster', 'Antioxidants and vitamins for strong immunity', 1199.00, 'supplement', '90 tablets', 50)
ON CONFLICT (slug) DO NOTHING;
