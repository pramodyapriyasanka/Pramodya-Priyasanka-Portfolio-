import { createClient } from "@supabase/supabase-js"


const supabaseUrl = "https://rerzniooaqprqrylnnob.supabase.co"
const supabaseAnonKey = "sb_publishable_OYQv9tdeLrbt4Rj2yJjI7w_nY142S0-"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)