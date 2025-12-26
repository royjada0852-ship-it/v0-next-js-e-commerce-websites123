# Dogify - Setup Instructions

## Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager
- Supabase account

## Installation Steps

### 1. Install Dependencies
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

### 2. Environment Variables
Create a `.env.local` file in the root directory with your Supabase credentials:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

### 3. Database Setup
Run the SQL migration scripts in order:

1. **scripts/001_create_database_schema.sql** - Creates all tables
2. **scripts/002_seed_sample_data.sql** - Adds sample data (optional)
3. **scripts/003_update_reviews_rls.sql** - Sets up Row Level Security policies for reviews
4. **scripts/004_create_storage_buckets.sql** - Sets up storage bucket policies
5. **scripts/005_create_visitor_counter.sql** - Creates visitor counter table and policies

### 4. Create Storage Buckets
Log into Supabase dashboard and create these storage buckets:
- `pet-shop` - Pet product images (public)
- `accessories` - Accessory product images (public)
- `foods` - Pet food product images (public)
- `adopt` - Adoption program images (public)
- `blog-images` - Blog post images (public)
- `reviews` - User review images (public)
- `user-uploads` - General user uploads (public)

### 5. Run Development Server
\`\`\`bash
npm run dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deployment to Vercel

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Vercel will automatically build and deploy

## Features

### Storage Buckets
- Separate buckets for different product categories
- Public read access for product images
- Optimized for fast image delivery

### Visitor Counter
- Real-time visitor tracking on homepage
- Data stored in Supabase
- Updates dynamically as visitors arrive

### Review System
- Users can submit reviews with ratings
- Reviews stored in Supabase database
- Real-time updates to review display

### Newsletter
- Subscribe to newsletters
- Contact form for inquiries
- All data securely stored in database

## Troubleshooting

### Build Error: "Supabase credentials not available"
- Ensure environment variables are set in `.env.local`
- For production deployment, verify variables in Vercel settings

### Reviews not loading
- Check Row Level Security policies are correctly set
- Verify `reviews` table exists and has data

### Visitor counter not updating
- Ensure `visitor_counter` table exists
- Check Supabase connection and credentials

## Support
For issues or questions, please open a GitHub issue or contact support.
