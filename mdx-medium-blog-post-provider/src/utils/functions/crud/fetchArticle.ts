import getSupabaseClient from "../supabase_client/SupabaseClient";

// Fetch an article from Supabase
// Utilize a parameterized URL to pass in values for the GET request
export default async function fetchArticle(articleName: string) {
  console.log('Fetching article with slug:', articleName);
  
  const { data, error } = await getSupabaseClient()
    .from('Article')
    .select('*')
    .eq('slug', articleName.trim())
    .single(); // A single record should suffice, if the slug is valid

  // Add more detailed logging
  if (error) {
    console.log('Error details:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    });
    throw new Error("Could not fetch requested Article");
  }
  
  console.log('Query result:', data);
  return data;
}