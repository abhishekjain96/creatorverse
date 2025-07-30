// File: src/lib/supabase.js (New Updated Code)

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// We create a single instance of the supabase client
const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// This function will now just return the single instance
export function createClient() {
  return supabase
}