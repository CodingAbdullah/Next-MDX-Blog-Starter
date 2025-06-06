import getSupabaseClient from "../supabase_client/SupabaseClient";
import fs from 'fs';
import path from 'path';

// Delete an article from Supabase
export default async function updateArticle(articleSlug: string, mdxFileName: string) {
    // Absolute or relative path to your MDX file
    const filePath = path.join(__dirname.split('src')[0], 'src', 'markdown', `${mdxFileName}.mdx`);

    // Read the MDX file as a UTF-8 string
    const mdxContent = fs.readFileSync(filePath, 'utf-8');
    
    // Be sure to modify this if need be, according to your needs
    const { data, error } = await getSupabaseClient()
        .from('Article')
        .update({ content: mdxContent })
        .eq('slug', articleSlug.trim());

    // Conditionally return to the client, the result
    if (error) {
        throw new Error("Could not update article");
    }
    else {
        return data;
    }
}