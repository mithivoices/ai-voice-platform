import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isPlaceholder = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase_project_url');

if (isPlaceholder) {
    console.warn('Supabase environment variables are using placeholders or are missing. Authentication will not work until real values are provided in .env');
}

// Ensure we pass a valid-looking URL to avoid createClient throwing immediately
const validUrl = (supabaseUrl && supabaseUrl.startsWith('http')) ? supabaseUrl : 'https://placeholder.supabase.co';
const validKey = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(validUrl, validKey);
