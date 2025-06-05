import getSupabaseClient from "../supabase_client/SupabaseClient";

// Fetch all articles from Supabase
export default async function fetchAllArticles() {
  const { data, error } = await getSupabaseClient()
    .from('Article')
    .select('*'); // Fetch all article posts

    // Conditionally return to the client, the result
    if (error) {
        throw new Error("Could not fetch articles");
    }
    else {
        return data;
    }
}