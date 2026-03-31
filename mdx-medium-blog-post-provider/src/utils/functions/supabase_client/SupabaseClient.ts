import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Creating and exporting a Supabase client instance
const getSupabaseClient = (): SupabaseClient => {
    const supabase: SupabaseClient = createClient(
        "https://vssfecrjoeeinwredhfj.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzc2ZlY3Jqb2VlaW53cmVkaGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTM3ODAsImV4cCI6MjA2MTQ4OTc4MH0.d8k2y9NQL313D8DS53_DI3tLgxYpBnyRAX7jouVaENo"
    );

    return supabase;
};

export default getSupabaseClient;