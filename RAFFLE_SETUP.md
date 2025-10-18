# Portfolio Raffle System - Complete Setup Guide

## Overview
A complete, production-ready raffle system for giving away free portfolio websites to local job seekers and professionals. Winners get a custom-built portfolio site that helps them stand out to employers.

## ✅ What's Complete

### Database (SQLite)
- **File**: `src/lib/db.ts`
- Two main tables with full query functions:
  - `raffle_entries`: All participant submissions
  - `raffle_winners`: Winner tracking and portfolio status
- Auto-initializes schema on startup
- Stored at: `data/raffle.db` (in .gitignore)

### Frontend Components
1. **RaffleForm** (`src/components/RaffleForm.tsx`)
   - Entry form with validation (React Hook Form + Zod)
   - Fields: name, email, profession, skills, portfolio URL, LinkedIn, bio
   - Success/error messaging

2. **RaffleSection** (`src/components/sections/RaffleSection.tsx`)
   - Full-featured homepage section
   - Prize description and rules
   - Already added to homepage (`src/app/page.tsx`)

3. **PortfolioTemplate** (`src/components/PortfolioTemplate.tsx`)
   - Professional portfolio display for winners
   - Shows name, profession, skills, bio
   - Contact buttons and social links
   - Mobile responsive

### API Endpoints
All located in `src/app/api/raffle/`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/raffle/entry` | POST | Submit new raffle entry |
| `/api/raffle/entries` | GET | Get all entries + stats (admin) |
| `/api/raffle/winner` | GET | List all winners |
| `/api/raffle/winner` | POST | Draw random winner |
| `/api/raffle/notify-winner` | POST | Email winner notification |

### Admin Dashboard
- **File**: `src/app/admin/raffle/page.tsx`
- URL: `/admin/raffle`
- Features:
  - Real-time statistics (entries, winners, pending)
  - Draw random winner with one click
  - Tab view: Winners vs All Entries
  - Email notifications to winners
  - Direct portfolio links
  - Status tracking (pending/contacted/completed)

### Winner Portfolio Pages
- **File**: `src/app/portfolio/[id]/page.tsx`
- URL: `/portfolio/{winnerId}`
- Displays winner's custom portfolio site
- Accessible from admin dashboard

### Utilities & Helpers
- **File**: `src/lib/raffle.ts`
- Email notifications (requires Nodemailer setup)
- Portfolio URL generation
- Stats calculations
- Winner notification templates

## 🚀 Quick Start

### 1. Raffle is Already on Homepage
The RaffleSection is already integrated into `src/app/page.tsx` - users can enter immediately.

### 2. Access Admin Dashboard
Visit: `http://localhost:3000/admin/raffle`

Functions:
- **Draw Random Winner**: Randomly selects from pool
- **Notify Winner**: Sends email notification
- **View Portfolios**: Preview each winner's site
- **Tabs**: Switch between winners and all entries

### 3. Manage Winners
1. Click "Draw Random Winner" 
2. Click "Email" to notify the winner
3. Click "View" to see their portfolio
4. Customize their portfolio via database

## 📧 Email Setup (Optional)

To enable winner notifications, add to `.env.local`:

```env
SMTP_HOST=your-email-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
SMTP_FROM=noreply@cherrycapitalweb.com
NEXT_PUBLIC_BASE_URL=https://yoursite.com
```

Then the `/api/raffle/notify-winner` endpoint will send emails automatically.

## 📊 Database Schema

### raffle_entries
```sql
- id (primary key)
- email (unique)
- firstName
- lastName
- profession
- skills (text)
- portfolioUrl (optional)
- linkedinUrl (optional)
- bio (optional)
- createdAt
- updatedAt
```

### raffle_winners
```sql
- id (primary key)
- entryId (foreign key)
- wonAt
- portfolioUrl
- status (pending/contacted/completed)
- hostingExpiresAt (3 months from win date)
- supportExpiresAt (3 months from win date)
```

## 🔧 Customization

### Modify Portfolio Template
Edit `src/components/PortfolioTemplate.tsx` to change:
- Colors and styling
- Layout and sections
- Content areas
- Call-to-action buttons

### Add Winner Requirements
Edit `src/components/RaffleForm.tsx` to:
- Add/remove form fields
- Change validation rules
- Update error messages

### Customize Admin Dashboard
Edit `src/app/admin/raffle/page.tsx` to:
- Add filtering/sorting
- Export data
- Bulk actions
- Custom status labels

## 📁 File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx
│   │   └── raffle/
│   │       └── page.tsx
│   ├── api/raffle/
│   │   ├── entry/route.ts
│   │   ├── entries/route.ts
│   │   ├── winner/route.ts
│   │   └── notify-winner/route.ts
│   ├── portfolio/
│   │   └── [id]/page.tsx
│   └── page.tsx (includes RaffleSection)
├── components/
│   ├── RaffleForm.tsx
│   ├── PortfolioTemplate.tsx
│   └── sections/
│       └── RaffleSection.tsx
└── lib/
    ├── db.ts (database)
    └── raffle.ts (utilities)
```

## ✨ Features

- ✅ SQLite persistent storage
- ✅ Raffle entry form with validation
- ✅ Random winner selection algorithm
- ✅ Admin dashboard with statistics
- ✅ Professional portfolio templates
- ✅ Email notifications (optional)
- ✅ Mobile responsive design
- ✅ Dark mode support
- ✅ Type-safe API routes
- ✅ Error handling
- ✅ Already integrated into homepage

## 🔐 Security Notes

- Admin dashboard currently public (add authentication if needed)
- Email credentials in .env.local (never commit)
- Database file in data/ folder (ignored from git)
- Form validation prevents duplicate entries

## 🎯 Workflow Example

1. **User**: Visits homepage, enters raffle
2. **Database**: Entry stored with submission timestamp
3. **Admin**: Visits `/admin/raffle`, reviews entries
4. **Admin**: Clicks "Draw Random Winner"
5. **Admin**: Clicks "Email" to notify winner
6. **Winner**: Receives email with portfolio URL
7. **Winner**: Visits `/portfolio/{id}` to see site
8. **Admin**: Updates status to "completed" when portfolio is built

## 📈 Analytics
Admin dashboard shows:
- Total entries received
- Total winners drawn
- Pending onboarding
- Available entries remaining

## 🆘 Troubleshooting

**No entries showing up?**
- Check `data/raffle.db` exists
- Verify form submissions succeeded (check browser console)
- Check API response in Network tab

**Email not sending?**
- Verify SMTP credentials in .env.local
- Check email provider allows SMTP connections
- Review server logs for errors

**Admin dashboard blank?**
- Clear browser cache
- Check `/api/raffle/entries` response
- Verify database permissions

## 📝 Next Steps (Optional)
1. Add authentication to admin dashboard
2. Create custom email templates
3. Add more portfolio customization options
4. Set up monthly winner notifications
5. Create public winners gallery
6. Add winner testimonials section
