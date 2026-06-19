# 🚀 Firebase to Supabase Migration - Complete Setup

Welcome! This document provides a quick overview of your complete Supabase migration setup.

---

## 📁 What Was Created For You

### New Supabase Infrastructure Files:
```
src/supabase/
├── config.ts                    # Configuration with placeholder values
├── client.ts                    # Supabase client (uses environment variables)
├── provider.tsx                 # React Context for auth state
├── auth.ts                      # Authentication functions
├── index.ts                     # Barrel export
└── database/
    ├── queries.ts               # Hooks: useQuery(), useTable()
    └── crud.ts                  # CRUD: insert, update, delete, get
```

### Documentation Files:
- **`SUPABASE_MIGRATION.md`** - Step-by-step migration guide with code examples
- **`ENV_SETUP.md`** - Environment variables setup and troubleshooting
- **`SETUP_CHECKLIST.md`** - Quick checklist to track your progress
- **This file** - Overview and quick reference

---

## 🎯 Next Steps (In Order)

### 1️⃣ Create Supabase Project
Go to https://app.supabase.com and create a new project. You'll get credentials that look like:
- **URL**: `https://project-id.supabase.co`
- **Anon Key**: `eyJhbGc...` (long JWT-like string)
- **Service Role**: `eyJhbGc...` (another long string, keep secret!)

### 2️⃣ Install Supabase Package
```bash
npm install @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
```

### 3️⃣ Create `.env.local` File
Create this file in your project root with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ Important**: This file is in `.gitignore` - it won't be committed. Never share these keys!

### 4️⃣ Set Up Database Schema
1. Go to Supabase Dashboard
2. Click "SQL Editor"
3. Copy the SQL from `SUPABASE_MIGRATION.md` (section: "Database Schema")
4. Paste and run it
5. Tables will appear in your dashboard

### 5️⃣ Update Your App Layout
Edit `src/app/layout.tsx`:
```tsx
// Remove this:
import { FirebaseClientProvider } from '@/firebase/client-provider';

// Add this:
import { SupabaseProvider } from '@/supabase/provider';

// In your component:
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
```

### 6️⃣ Replace Firebase Calls with Supabase
See detailed examples in `SUPABASE_MIGRATION.md`:

**Simple example - Sign Up:**
```tsx
import { signUp } from '@/supabase/auth';

// Use it:
await signUp('user@example.com', 'password123');
```

**Simple example - Get User:**
```tsx
import { useUser } from '@/supabase/provider';

const { user, isLoading } = useUser();
```

**Simple example - Fetch Data:**
```tsx
import { useTable } from '@/supabase/database/queries';

const { data: posts, isLoading } = useTable('posts', { user_id });
```

### 7️⃣ Test Your Setup
```bash
npm run dev
```
Visit http://localhost:9002 and test:
- [ ] App loads without errors
- [ ] Can see auth state updates
- [ ] Database queries work

### 8️⃣ Optional: Remove Firebase
Once everything works:
```bash
npm uninstall firebase
rm -rf src/firebase
rm .firebaserc
```

---

## 🔑 Where to Update Your API Keys

### ✅ DO Update These (Local Only)
- **`.env.local`** - Create this file with your 3 Supabase keys
  - Never commit to Git
  - Never share publicly
  - Regenerate if accidentally exposed

### ❌ DON'T Put Keys In These
- ❌ `src/supabase/config.ts` - Already has placeholders, don't change
- ❌ `.env.production` - Use platform (Vercel) settings instead
- ❌ Version control / Git commits
- ❌ Frontend code / console logs

### 📋 Platform-Specific Setup

**If deploying to Vercel:**
1. Go to Project Settings → Environment Variables
2. Add your 3 Supabase keys
3. Deploy

**If deploying to Netlify:**
1. Go to Site Settings → Build & Deploy → Environment
2. Add your 3 Supabase keys

**If deploying to other platforms:**
- Follow their documentation for environment variables
- Add the same 3 keys

---

## 📚 Reference Files

| File | Purpose | When to Check |
|------|---------|--------------|
| `SUPABASE_MIGRATION.md` | Complete step-by-step guide with code examples | When replacing specific Firebase calls |
| `ENV_SETUP.md` | Environment variables reference and troubleshooting | When setting up `.env.local` or debugging config issues |
| `SETUP_CHECKLIST.md` | Quick checklist for migration progress | To track what's done and what's left |
| `src/supabase/config.ts` | Configuration file with placeholders | Reference only - uses env variables |
| `src/supabase/auth.ts` | Auth functions (signUp, signIn, etc.) | For authentication logic |
| `src/supabase/database/queries.ts` | Data fetching hooks (useQuery, useTable) | For reading data |
| `src/supabase/database/crud.ts` | CRUD operations | For creating, updating, deleting data |

---

## ⚡ Quick Reference: Firebase → Supabase

| Operation | Firebase | Supabase |
|-----------|----------|---------|
| **Sign Up** | `createUserWithEmailAndPassword()` | `signUp()` |
| **Sign In** | `signInWithEmailAndPassword()` | `signIn()` |
| **Sign Out** | `signOut()` | `signOut()` |
| **Get User** | `useUser()` hook | `useUser()` hook |
| **Fetch Data** | `useDoc()` or `useCollection()` | `useQuery()` or `useTable()` |
| **Create** | `addDoc()` | `insertRecord()` |
| **Update** | `updateDoc()` | `updateRecord()` |
| **Delete** | `deleteDoc()` | `deleteRecord()` |

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| "Cannot find module @supabase/supabase-js" | Run `npm install @supabase/supabase-js` |
| "YOUR_SUPABASE_PROJECT_URL is not a valid URL" | Create `.env.local` with real values, restart dev server |
| Auth not working | Verify `.env.local` keys are correct, check URL format |
| Database returns no data | Check table names, verify RLS policies allow access |
| "Permission denied" errors | Create RLS policies, ensure policies match your auth model |

See `ENV_SETUP.md` for more troubleshooting.

---

## 📊 Migration Progress

Track your progress using `SETUP_CHECKLIST.md` which has 11 phases:
1. Preparation (Supabase project setup)
2. Installation (npm package)
3. Environment Setup (`.env.local`)
4. Database Setup (SQL schema)
5. Update Layout (SupabaseProvider)
6. Test Authentication (sign up/in)
7. Migrate Data (Firebase → Supabase)
8. Replace Firebase Calls (in components)
9. Testing (all features)
10. Cleanup (remove Firebase)
11. Deployment (production)

---

## 💡 Pro Tips

1. **Keep Firebase during transition** - Both can run simultaneously
2. **Test incrementally** - Migrate one feature at a time
3. **Keep backups** - Export Firebase data before deleting
4. **Read RLS policies** - Understand how data access works
5. **Use TypeScript** - The new Supabase files are fully typed

---

## 📞 Support

- **Supabase Docs**: https://supabase.com/docs
- **API Reference**: https://supabase.com/docs/reference/javascript
- **Community**: https://discord.supabase.com
- **Issues**: Check `SUPABASE_MIGRATION.md` troubleshooting section

---

## 🎉 You're Ready!

Your Supabase infrastructure is fully set up and ready to use. Follow the "Next Steps" section above to complete the migration.

Start with: **`SETUP_CHECKLIST.md`** for a quick overview of what to do next.

Happy migrating! 🚀
