-- Insert sample pets
-- Updated all prices from USD to INR (multiplied by 83)
INSERT INTO public.pets (name, category, breed, age, gender, price, rating, description, image_url, featured) VALUES
('Buddy', 'dog', 'Golden Retriever', 2, 'male', 41500.00, 5.0, 'Friendly and energetic golden retriever looking for a loving home.', '/placeholder.svg?height=300&width=300', true),
('Luna', 'cat', 'Persian', 1, 'female', 29050.00, 4.8, 'Beautiful white Persian cat with blue eyes.', '/placeholder.svg?height=300&width=300', true),
('Charlie', 'bird', 'Parrot', 3, 'male', 16600.00, 4.5, 'Colorful parrot that loves to talk and play.', '/placeholder.svg?height=300&width=300', false),
('Hoppy', 'rabbit', 'Holland Lop', 1, 'male', 6225.00, 4.0, 'Adorable fluffy rabbit perfect for families.', '/placeholder.svg?height=300&width=300', false),
('Max', 'dog', 'German Shepherd', 3, 'male', 49800.00, 5.0, 'Loyal and protective German Shepherd.', '/placeholder.svg?height=300&width=300', true),
('Bella', 'cat', 'Siamese', 2, 'female', 33200.00, 4.9, 'Elegant Siamese cat with striking blue eyes.', '/placeholder.svg?height=300&width=300', false),
('Tweety', 'bird', 'Canary', 1, 'female', 8300.00, 4.3, 'Sweet singing canary with yellow feathers.', '/placeholder.svg?height=300&width=300', false),
('Cotton', 'rabbit', 'Lionhead', 1, 'female', 7055.00, 4.6, 'Soft and cuddly lionhead rabbit with a lovely mane.', '/placeholder.svg?height=300&width=300', false);

-- Insert sample accessories
-- Updated all accessory prices from USD to INR
INSERT INTO public.accessories (name, description, price, rating, image_url, category) VALUES
('Squeaky Bone Toy', 'Durable rubber bone toy that squeaks', 1078.17, 4.7, '/placeholder.svg?height=200&width=200', 'toy'),
('Cozy Pet Bed', 'Soft and comfortable pet bed for small to medium pets', 3735.00, 4.9, '/placeholder.svg?height=200&width=200', 'bed'),
('Designer Collar', 'Stylish leather collar with custom name tag', 2074.17, 4.5, '/placeholder.svg?height=200&width=200', 'collar'),
('Pet Shampoo Set', 'Natural and gentle pet shampoo and conditioner', 1535.50, 4.8, '/placeholder.svg?height=200&width=200', 'cleaning'),
('Grooming Brush', 'Professional-grade grooming brush for all coat types', 1327.17, 4.6, '/placeholder.svg?height=200&width=200', 'grooming'),
('Catnip Mouse', 'Adorable plush mouse filled with organic catnip', 746.17, 4.4, '/placeholder.svg?height=200&width=200', 'toy'),
('Luxury Pet Carrier', 'Comfortable and secure travel carrier', 5395.00, 4.9, '/placeholder.svg?height=200&width=200', 'other'),
('Feather Wand Toy', 'Interactive feather toy for cats', 995.17, 4.5, '/placeholder.svg?height=200&width=200', 'toy');

-- Insert sample foods
-- Updated all food prices from USD to INR
INSERT INTO public.foods (name, description, price, rating, image_url, age_group, pet_type) VALUES
('Premium Puppy Food', 'Nutritious food specially formulated for puppies', 2987.17, 4.8, '/placeholder.svg?height=200&width=200', 'puppy', 'dog'),
('Adult Cat Kibble', 'Balanced nutrition for adult cats', 2406.17, 4.7, '/placeholder.svg?height=200&width=200', 'adult', 'cat'),
('Senior Dog Formula', 'Easy-to-digest food for senior dogs', 3486.00, 4.9, '/placeholder.svg?height=200&width=200', 'senior', 'dog'),
('Bird Seed Mix', 'Premium seed blend for all bird types', 1327.17, 4.5, '/placeholder.svg?height=200&width=200', 'all', 'bird'),
('Kitten Milk Replacer', 'Essential nutrition for young kittens', 1867.50, 4.6, '/placeholder.svg?height=200&width=200', 'kitten', 'cat'),
('Rabbit Pellets', 'High-quality timothy hay pellets for rabbits', 1576.17, 4.4, '/placeholder.svg?height=200&width=200', 'all', 'rabbit'),
('Dog Treats Variety Pack', 'Delicious and healthy treats for dogs', 1659.17, 4.8, '/placeholder.svg?height=200&width=200', 'all', 'dog'),
('Dental Cat Treats', 'Treats that help clean teeth and freshen breath', 1244.17, 4.7, '/placeholder.svg?height=200&width=200', 'all', 'cat');

-- Insert sample reviews
INSERT INTO public.reviews (name, rating, comment, avatar_url) VALUES
('Jessica M.', 5, 'Found the perfect puppy here! The staff was so helpful and knowledgeable. Buddy has brought so much joy to our family.', '/placeholder.svg?height=100&width=100'),
('David R.', 5, 'Great selection of pet supplies at reasonable prices. My cat loves all the toys we bought!', '/placeholder.svg?height=100&width=100'),
('Amanda K.', 4, 'Wonderful experience adopting our kitten. Very professional and caring service.', '/placeholder.svg?height=100&width=100'),
('Tom S.', 5, 'Best pet shop in town! They have everything you need and more. Highly recommend!', '/placeholder.svg?height=100&width=100');
