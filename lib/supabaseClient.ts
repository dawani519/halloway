import { createServerClient, createBrowserClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * ✅ Create a Supabase client for Server Components & API routes
 */
export const createSupabaseServerClient = () => {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value;
      },
      set(name: string, value: string, options?: any) {
        cookies().set({ name, value, ...options });
      },
      remove(name: string, options?: any) {
        cookies().set({ name, value: "", ...options, maxAge: -1 });
      },
    },
  });
};

/**
 * ✅ Create a Supabase client for Client Components (useEffect, hooks, etc.)
 */
export const createSupabaseBrowserClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};
