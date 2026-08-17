import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;
let warnedAboutFallback = false;

export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function getSupabaseClient() {
  if (!hasSupabaseConfig()) return null;
  if (!cachedClient) {
    cachedClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );
  }
  return cachedClient;
}

export function warnAboutLocalFallback() {
  if (warnedAboutFallback || hasSupabaseConfig() || typeof window === "undefined") return;
  warnedAboutFallback = true;
  console.warn(
    "GTA FREE STEM Opportunities is using local browser fallback storage because Supabase env vars are not configured."
  );
}
