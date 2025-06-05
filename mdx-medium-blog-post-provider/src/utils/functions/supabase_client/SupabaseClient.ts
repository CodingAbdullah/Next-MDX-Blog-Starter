import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Creating and exporting a Supabase client instance
const getSupabaseClient = (): SupabaseClient => {
    const supabase: SupabaseClient = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    );

    return supabase;
};

export default getSupabaseClient;