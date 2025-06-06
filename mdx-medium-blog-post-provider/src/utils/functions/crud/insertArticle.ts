import fs from 'fs';
import path from 'path';
import getSupabaseClient from '../supabase_client/SupabaseClient';

// Use this function to insert an article locally into the Supabase database
// Read the file content of the MDX file using the fs built-in module
// Pass the content into the content field as a text value
// Run this from your Postman client to successfully insert an Article into Supabase
// The following is an example that illustrates how to do this
// Modify the content and adjust this function according to your needs
export default async function insertArticle(fileName: string) {
    // Absolute or relative path to your MDX file
    const filePath = path.join(__dirname.split('src')[0], 'src', 'markdown', `${fileName}.mdx`);
    
    // Read the MDX file as a UTF-8 string
    const mdxContent = fs.readFileSync(filePath, 'utf-8');

    // Insert into Supabase
    // Inserting file document into Supabase database
    const { data, error } = await getSupabaseClient()
        .from('Article')
        .insert([
            {
                slug: fileName.trim(),
                title: "Dynamic Article Content",
                description: 'Learn how to upload an MDX article to Supabase',
                cover_image_url: 'https://mdx-blog-bucket.s3.us-east-2.amazonaws.com/article-image-cover.PNG',
                tags: ['Test Category', 'AI', "DevOps"],
                github_gists: [],
                content: mdxContent,
                date: new Date().toISOString(),
                articleAuthorName: 'Abdullah Muhammad',
                articleAuthorDescription: 'Blogger. Software Developer.',
                articleAuthorProfileImageURL: "https://mdx-blog-bucket.s3.us-east-2.amazonaws.com/user.PNG",
                reading_time: '5 min read'
            }
        ]);

    // Conditionally return data based on Supabase query result    
    if (error) {
        throw error;
    }
    
    return data;
}