# Firebase to Supabase Migration Guide

## 📋 Overview

This guide covers migrating your Next.js 15 application from Firebase (Firestore + Auth) to Supabase (PostgreSQL + Auth).

---

## 🗂️ File Structure

### New Supabase Files Created:
```
src/supabase/
├── config.ts              # Configuration (API keys as placeholders)
├── client.ts              # Supabase client initialization
├── provider.tsx           # React Context Provider for Auth State
├── auth.ts                # Authentication functions (signUp, signIn, etc.)
├── index.ts               # Barrel export
└── database/
    ├── queries.ts         # Hook equivalents: useQuery(), useTable()
    └── crud.ts            # CRUD operations: insert, update, delete, get
```

---

## 🔑 Environment Variables Needed

Update your `.env.local` file with these keys:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

### Where to find these values:
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings → API**
4. Copy the values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

---

## 🗄️ Database Schema

### Create Tables in Supabase SQL Editor

Run this SQL to set up your database:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a basic auth_user table (linked to Supabase Auth)
CREATE TABLE auth_user (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE auth_user ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own record
CREATE POLICY "Users can view own record"
    ON auth_user FOR SELECT
    USING (auth.uid() = id);

-- Policy: Users can only update their own record
CREATE POLICY "Users can update own record"
    ON auth_user FOR UPDATE
    USING (auth.uid() = id);
```

---

## 🔄 Migration Steps

### Step 1: Install Dependencies
```bash
npm install @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
```

### Step 2: Update Environment Variables
Create/update `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### Step 3: Update Root Layout

Replace `FirebaseClientProvider` with `SupabaseProvider` in `src/app/layout.tsx`:

**Before (Firebase):**
```tsx
import { FirebaseClientProvider } from '@/firebase/client-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
```

**After (Supabase):**
```tsx
import { SupabaseProvider } from '@/supabase/provider';

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

### Step 4: Replace Firebase Auth Calls

**Before (Firebase):**
```tsx
import { signInAnonymously } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';

export function MyComponent() {
  const auth = useAuth();
  
  const handleLogin = () => {
    signInAnonymously(auth);
  };
}
```

**After (Supabase):**
```tsx
import { signUp, signIn, signOut } from '@/supabase/auth';
import { useUser } from '@/supabase/provider';

export function MyComponent() {
  const { user, isLoading } = useUser();
  
  const handleSignUp = async () => {
    try {
      await signUp('user@example.com', 'password');
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };
  
  const handleSignIn = async () => {
    try {
      await signIn('user@example.com', 'password');
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };
}
```

### Step 5: Replace Firestore Queries

**Before (Firebase - useDoc):**
```tsx
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { useFirestore } from '@/firebase/provider';

export function MyComponent() {
  const firestore = useFirestore();
  const docRef = useMemo(() => doc(firestore, 'users', userId), [userId]);
  const { data: user, isLoading, error } = useDoc(docRef);
  
  return <div>{user?.name}</div>;
}
```

**After (Supabase - useQuery):**
```tsx
import { useQuery } from '@/supabase/database/queries';

export function MyComponent({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useQuery<any>(
    'auth_user',
    'id',
    userId
  );
  
  return <div>{user?.email}</div>;
}
```

**Before (Firebase - useCollection):**
```tsx
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore } from '@/firebase/provider';

export function MyComponent({ userId }: { userId: string }) {
  const firestore = useFirestore();
  const targetRef = useMemo(
    () => query(collection(firestore, 'posts'), where('user_id', '==', userId)),
    [userId]
  );
  const { data: posts, isLoading, error } = useCollection(targetRef);
  
  return <div>{posts?.length} posts</div>;
}
```

**After (Supabase - useTable):**
```tsx
import { useTable } from '@/supabase/database/queries';

export function MyComponent({ userId }: { userId: string }) {
  const { data: posts, isLoading, error } = useTable<any>(
    'posts',
    { user_id: userId },
    { column: 'created_at', ascending: false }
  );
  
  return <div>{posts?.length} posts</div>;
}
```

### Step 6: Replace Firestore Write Operations

**Before (Firebase):**
```tsx
import { addDoc, collection, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';

export function MyComponent() {
  const firestore = useFirestore();
  
  const handleCreate = async () => {
    await addDoc(collection(firestore, 'posts'), {
      title: 'My Post',
      body: 'Content here',
      user_id: userId,
      created_at: new Date(),
    });
  };
  
  const handleUpdate = async () => {
    await updateDoc(doc(firestore, 'posts', postId), {
      title: 'Updated Title',
    });
  };
  
  const handleDelete = async () => {
    await deleteDoc(doc(firestore, 'posts', postId));
  };
}
```

**After (Supabase):**
```tsx
import { insertRecord, updateRecord, deleteRecord } from '@/supabase/database/crud';

export function MyComponent() {
  const handleCreate = async () => {
    await insertRecord('posts', {
      title: 'My Post',
      body: 'Content here',
      user_id: userId,
      created_at: new Date().toISOString(),
    });
  };
  
  const handleUpdate = async () => {
    await updateRecord('posts', postId, {
      title: 'Updated Title',
    });
  };
  
  const handleDelete = async () => {
    await deleteRecord('posts', postId);
  };
}
```

---

## 🧹 Cleanup

Once everything is working:

1. Remove Firebase dependency:
```bash
npm uninstall firebase
```

2. Delete Firebase files (when no longer needed):
```bash
rm -rf src/firebase
```

3. Remove Firebase config:
```bash
rm .firebaserc
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"
- Run: `npm install @supabase/supabase-js`

### Error: "YOUR_SUPABASE_PROJECT_URL is not a valid URL"
- Make sure `.env.local` has the correct values
- Restart your dev server: `npm run dev`

### Error: "ANON_KEY is invalid"
- Check that `NEXT_PUBLIC_SUPABASE_ANON_KEY` is copied correctly from Supabase console
- Make sure it's in `.env.local`, not `.env`

### RLS Policy Errors
- Enable RLS on all tables: `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;`
- Create appropriate policies for your use case

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
