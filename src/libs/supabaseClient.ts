// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Ambil URL dan ANON_KEY dari environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Inisialisasi Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);