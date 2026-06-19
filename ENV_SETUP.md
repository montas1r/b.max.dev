# 🔑 Environment Variables Checklist for Supabase

Complete this checklist and update `.env.local` in the project root.

## Required Environment Variables

### Supabase API Configuration
- [ ] `NEXT_PUBLIC_SUPABASE_URL` = YOUR_SUPABASE_PROJECT_URL
  - **Location**: Supabase Dashboard → Settings → API → Project URL
  - **Example**: `https://xyzabc.supabase.co`
  - **Public**: Yes (safe to expose in frontend code)

- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = YOUR_SUPABASE_ANON_KEY
  - **Location**: Supabase Dashboard → Settings → API → anon public
  - **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - **Public**: Yes (limited scope, only for public operations)

- [ ] `SUPABASE_SERVICE_ROLE_KEY` = YOUR_SUPABASE_SERVICE_ROLE_KEY
  - **Location**: Supabase Dashboard → Settings → API → service_role secret
  - **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - **Public**: NO - Keep this secret! Only use on server-side code
  - **⚠️ WARNING**: Never commit this to version control or expose to frontend

---

## File Locations Reference

### Where to Change These Keys Locally:

1. **Main Configuration**
   - `src/supabase/config.ts` - Default placeholders pointing to environment variables

2. **Local Environment File** (Create if it doesn't exist)
   - `.env.local` - Add your actual keys here
   - **This file is in `.gitignore` and will NOT be committed**

3. **Frontend Client**
   - `src/supabase/client.ts` - Uses only public keys (SAFE)

4. **Do NOT Put Secrets In**:
   - ❌ `src/supabase/config.ts` (shared with team)
   - ❌ `.env.production` (potentially exposed)
   - ❌ Version control commits
   - ❌ Frontend code

---

## Setup Instructions

### 1. Create `.env.local` File
```bash
touch .env.local
```

### 2. Add Your Supabase Keys
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Verify `.env.local` is in `.gitignore`
```bash
# Check if .env.local is already ignored
grep ".env.local" .gitignore
```

If not present, it's already in the default `.gitignore`.

### 4. Restart Dev Server
```bash
npm run dev
```

---

## Finding Your Keys in Supabase Dashboard

### Step-by-Step:
1. Go to https://app.supabase.com
2. Select your project
3. Click **Settings** (gear icon, bottom left)
4. Click **API**
5. Under **Project API keys**:
   - Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

---

## Testing Your Setup

### Verify Keys are Loaded
Create a test component to check:

```tsx
// pages/test-env.tsx
export default function TestEnv() {
  return (
    <div>
      <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
      <p>Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20)}...</p>
      <p>Service Role: {process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Loaded' : '❌ Missing'}</p>
    </div>
  );
}
```

---

## Troubleshooting

### "YOUR_SUPABASE_PROJECT_URL" Error
- ❌ Means `.env.local` is not being read
- ✅ Verify `.env.local` exists in project root
- ✅ Restart dev server with `npm run dev`

### "Invalid API key" Error
- ❌ Means key format is wrong
- ✅ Copy entire key string from Supabase Dashboard
- ✅ Make sure no extra spaces/quotes

### Authentication Not Working
- ❌ Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- ✅ Verify URL is complete with `https://` and `.supabase.co`

### Database Operations Fail
- ❌ Check RLS policies are created
- ✅ Verify tables exist in Supabase dashboard
- ✅ Check Row Level Security settings

---

## Security Best Practices

✅ **DO**:
- Keep `.env.local` in `.gitignore`
- Use `NEXT_PUBLIC_*` only for public keys
- Store service role key in backend environment only
- Rotate keys if accidentally exposed
- Use strong RLS policies in Supabase

❌ **DON'T**:
- Commit `.env.local` to version control
- Share service role key in chat/email
- Use service role key in frontend code
- Log or expose API keys
- Use same keys for multiple projects

---

## Next Steps

After setting up environment variables:

1. **Run the app**: `npm run dev`
2. **Visit migrations guide**: See `SUPABASE_MIGRATION.md`
3. **Create database schema**: Follow SQL setup in migration guide
4. **Test authentication**: Use auth functions from `src/supabase/auth.ts`
5. **Replace Firebase calls**: Follow component examples in migration guide

---

## Questions?

- Supabase Docs: https://supabase.com/docs
- API Reference: https://supabase.com/docs/reference/javascript
- Community: https://discord.supabase.com
