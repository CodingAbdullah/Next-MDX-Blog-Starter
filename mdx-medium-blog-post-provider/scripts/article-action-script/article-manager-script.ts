import deleteArticle from '@/utils/functions/crud/deleteArticle';
import fetchArticle from '@/utils/functions/crud/fetchArticle';
import fetchAllArticles from '@/utils/functions/crud/fetchAllArticles';
import insertArticle from '@/utils/functions/crud/insertArticle';
import updateArticle from '@/utils/functions/crud/updateArticle';

// Instructions to run this script
/*
    # Insert an article
    ts-node article-manager.ts insert your-article-filename

    # Delete an article
    ts-node article-manager.ts delete article-slug

    # Update an article
    ts-node article-manager.ts update new-content-filename article-slug

    # Fetch a single article
    ts-node article-manager.ts fetch article-slug

    # Fetch all articles
    ts-node article-manager.ts fetchAll
*/

// Get command line arguments
const operation = process.argv[2] as 'insert' | 'delete' | 'update' | 'fetch' | 'fetchAll';
const fileName = process.argv[3];
const articleSlug = process.argv[4]; // For update operation

if (!operation) {
    console.error('Please provide an operation');
    console.error('Usage: ts-node article-manager.ts <operation> [fileName] [articleSlug]');
    console.error('Operations: insert, delete, update, fetch, fetchAll');
    process.exit(1);
}

// Article action function for working with blog articles
async function articleAction(): Promise<void> {
    try {
        switch (operation) {
            case 'insert':
                if (!fileName) {
                    throw new Error('Please provide a filename for insert operation');
                }
                console.log(`Inserting article with filename: ${fileName}`);
                await insertArticle(fileName);
                console.log('Article successfully inserted!');
                break;

            case 'delete':
                if (!fileName) {
                    throw new Error('Please provide an article name for delete operation');
                }
                console.log(`Deleting article: ${fileName}`);
                await deleteArticle(fileName);
                console.log('Article successfully deleted!');
                break;

            case 'update':
                if (!fileName || !articleSlug) {
                    throw new Error('Please provide both filename and article slug for update operation');
                }
                console.log(`Updating article ${articleSlug} with content from ${fileName}`);
                await updateArticle(articleSlug, fileName);
                console.log('Article successfully updated!');
                break;

            case 'fetch':
                if (!fileName) {
                    throw new Error('Please provide an article name for fetch operation');
                }
                console.log(`Fetching article: ${fileName}`);
                const article = await fetchArticle(fileName);
                console.log('Article fetched:', article);
                break;

            case 'fetchAll':
                console.log('Fetching all articles...');
                const articles = await fetchAllArticles();
                console.log('All articles:', articles);
                break;

            default:
                console.error('Invalid operation');
                process.exit(1);
        }
    } 
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

articleAction();