import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase configuration keys are missing in the current environment.");
}

export const supabase = createClient(
  supabaseUrl || "https://rerzniooaqprqrylnnob.supabase.co", 
  supabaseAnonKey || "sb_publishable_OYQv9tdeLrbt4Rj2yJjI7w_nY142S0-"
)