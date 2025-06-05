import getSupabaseClient from "../supabase_client/SupabaseClient";

// Fetch an article from Supabase
// Utilize a parameterized URL to pass in values for the GET request
export default async function fetchArticle(articleName: string) {
  
  const { data, error } = await getSupabaseClient()
  .from('Article')
  .select('*')
  .eq('slug', articleName)
  .single(); // A single record should suffice, if the slug is valid

  // Conditionally return to the client, the result
  if (error) {
    throw new Error("Could not fetch requested Article");
  }
  else {
    return data;
  }
}