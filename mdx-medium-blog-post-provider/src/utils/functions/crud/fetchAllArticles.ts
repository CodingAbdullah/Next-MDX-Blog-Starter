import getSupabaseClient from "../supabase_client/SupabaseClient";

// Fetch all articles from Supabase
export async function fetchAllArticles() {
  const { data, error } = await getSupabaseClient()
    .from('Article')
    .select('*'); // Fetch all article posts

    // Conditionally return to the client, the result
    if (error) {
        throw new Error();
    }
    else {
        return data;
    }
}