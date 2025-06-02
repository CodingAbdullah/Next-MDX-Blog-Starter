import { createClient } from '@supabase/supabase-js';

// Creating and exporting a Supabase client instance
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);