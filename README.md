# Apartment Funds

A free-tier friendly apartment maintenance/funds management MVP built with Next.js + Supabase.

## Features
- Email/password authentication
- Apartment flat register
- Monthly maintenance payments
- Expense register
- Multiple apartment funds
- Dashboard
- Basic financial reports
- Supabase Row Level Security

## 1. Create Supabase project
Create a project at https://database.new

Open SQL Editor and run `supabase/schema.sql`.

The current Supabase Next.js guidance uses `@supabase/ssr`, cookie-based auth, and the public publishable key for browser/server clients. Keep credentials in environment variables and review RLS before production.

## 2. Configure environment
Copy `.env.example` to `.env.local`:

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...

Get these from Supabase Project Settings / Connect.

## 3. Install and run
```bash
npm install
npm run dev
```

Open http://localhost:3000

## 4. Deploy to Vercel
Push this project to GitHub.

Then import the repository in Vercel and add:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

Deploy.

## Production hardening before using with real money
- Add apartment/society tenant isolation
- Add admin/treasurer/owner roles
- Add audit logs
- Add payment gateway/UPI integration
- Add receipt generation
- Add backups
- Add storage policies for bills/receipts
- Review every RLS policy
- Add input validation and rate limiting
- Add database migrations instead of editing production schema manually

## Suggested next modules
Water billing, complaints, announcements, visitor management, UPI payments, WhatsApp notifications, PDF receipts, Excel export, and multi-apartment support.
