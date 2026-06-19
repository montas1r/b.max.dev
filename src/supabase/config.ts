export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "YOUR_SUPABASE_PROJECT_URL",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY",
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "YOUR_SUPABASE_SERVICE_ROLE_KEY",
};
