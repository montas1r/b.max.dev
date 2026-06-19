# ✅ Supabase Migration Quick Setup Checklist

## Phase 1: Preparation
- [ ] Create a new Supabase project at https://app.supabase.com
- [ ] Note your Project ID and organization
- [ ] Verify you have npm/pnpm installed locally

## Phase 2: Installation
- [ ] Run: `npm install @supabase/supabase-js` (or pnpm equivalent)
- [ ] Verify new files created in `src/supabase/` directory
- [ ] Check that all 6 new files exist:
  - [ ] `src/supabase/config.ts`
  - [ ] `src/supabase/client.ts`
  - [ ] `src/supabase/provider.tsx`
  - [ ] `src/supabase/auth.ts`
  - [ ] `src/supabase/index.ts`
  - [ ] `src/supabase/database/queries.ts`
  - [ ] `src/supabase/database/crud.ts`

## Phase 3: Environment Setup
- [ ] Create `.env.local` in project root
- [ ] Go to Supabase Dashboard → Settings → API
- [ ] Copy and paste these 3 keys to `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
  ```
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Restart dev server: `npm run dev`

## Phase 4: Database Setup
- [ ] Open Supabase Dashboard → SQL Editor
- [ ] Create new query
- [ ] Copy SQL from `SUPABASE_MIGRATION.md` (Database Schema section)
- [ ] Run the SQL to create tables
- [ ] Verify tables appear in Supabase Dashboard

## Phase 5: Update Layout
- [ ] Open `src/app/layout.tsx`
- [ ] Replace: `import { FirebaseClientProvider }` with `import { SupabaseProvider }`
- [ ] Replace: `<FirebaseClientProvider>` with `<SupabaseProvider>`
- [ ] Save and verify no errors

## Phase 6: Test Authentication
- [ ] Create a test page or use existing component
- [ ] Import: `import { useUser } from '@/supabase/provider';`
- [ ] Try to sign up with: `import { signUp } from '@/supabase/auth';`
- [ ] Check browser console for errors
- [ ] Verify auth state updates

## Phase 7: Migrate Data
- [ ] Export Firebase data (if applicable)
- [ ] Insert into Supabase tables using CRUD functions
- [ ] Verify data appears in Supabase Dashboard

## Phase 8: Replace Firebase Calls
- [ ] Find all Firebase imports in your components
- [ ] Replace with Supabase equivalents (see migration guide)
- [ ] Test each page/feature
- [ ] Fix any TypeScript errors

## Phase 9: Testing
- [ ] Test sign up flow
- [ ] Test sign in flow
- [ ] Test sign out flow
- [ ] Test data fetching (read)
- [ ] Test data creation (write)
- [ ] Test data updates
- [ ] Test data deletion
- [ ] Check RLS policies are working
- [ ] Verify no Firebase code remains

## Phase 10: Cleanup (Optional)
- [ ] Remove Firebase package: `npm uninstall firebase`
- [ ] Delete `src/firebase/` directory (backup first!)
- [ ] Delete `.firebaserc` file
- [ ] Commit changes to Git

## Phase 11: Deployment
- [ ] Update production environment variables in deployment platform
- [ ] Set same keys on hosting provider (Vercel, etc.)
- [ ] Deploy to production
- [ ] Test in production environment

---

## 🔑 Key Files to Edit Locally

### You must update these with YOUR values:
1. **`.env.local`** (create this file)
   - Add your 3 Supabase keys
   - This file is in `.gitignore` and won't be shared

### Reference only (no secrets):
2. **`src/supabase/config.ts`**
   - Contains placeholders for keys
   - Reads from `.env.local`
   - Safe to share (no actual keys)

3. **`src/supabase/client.ts`**
   - Initializes Supabase client
   - Uses public keys only
   - Safe to share

---

## 📝 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "Cannot find module @supabase/supabase-js" | Run `npm install @supabase/supabase-js` |
| "YOUR_SUPABASE_PROJECT_URL is not a valid URL" | Add values to `.env.local`, restart dev server |
| Auth not working | Verify keys in `.env.local`, check URL format |
| Database queries fail | Check table names, verify RLS policies |
| RLS denies all access | Create proper RLS policies for your tables |

---

## 📚 Documentation Files Created

1. **`SUPABASE_MIGRATION.md`** - Complete migration guide with code examples
2. **`ENV_SETUP.md`** - Environment variables setup and troubleshooting
3. **This file** - Quick checklist for completing migration

---

## ✨ You're All Set!

Once you complete all checkboxes, your app should be fully migrated from Firebase to Supabase. The new Supabase infrastructure is ready to use!

Need help? Check:
- Migration guide: `SUPABASE_MIGRATION.md`
- Env setup: `ENV_SETUP.md`
- Supabase docs: https://supabase.com/docs
