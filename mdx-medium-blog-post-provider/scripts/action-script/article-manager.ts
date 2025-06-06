import deleteArticle from '../../src/utils/functions/crud/deleteArticle';
import fetchArticle from '../../src/utils/functions/crud/fetchArticle';
import fetchAllArticles from '../../src/utils/functions/crud/fetchAllArticles';
import insertArticle from '../../src/utils/functions/crud/insertArticle';
import updateArticle from '../../src/utils/functions/crud/updateArticle';

// Instructions to run this script
/*
    # Insert an article
    npx tsx article-manager.ts insert article-slug

    # Delete an article
    npx tsx article-manager.ts delete article-slug

    # Update an article
    npx tsx article-manager.ts update article-slug new-article-file

    # Fetch a single article
    npx tsx article-manager.ts fetch article-slug

    # Fetch all articles
    npx tsx article-manager.ts fetchAll
*/

// Get command line arguments
const articleActionFileName = String(process.argv[1])?.trim();
const operation = String(process.argv[2])?.trim();
const articleName = String(process.argv[3])?.trim();
const newArticleFile = String(process.argv[4])?.trim();

if (!articleActionFileName || !operation) {
    console.error('Please provide an operation');
    console.error('Usage: npx tsx article-manager.ts <operation> [fileName] [articleSlug]');
    console.error('Operations: insert, delete, update, fetch, fetchAll');
    process.exit(1);
}

// Article action function for working with blog articles
async function articleActionHandler() {
    try {
        switch (operation) {
            case 'insert':
                if (!articleName) {
                    throw new Error('Please provide a filename for insert operation');
                }
                
                console.log(`Inserting article with filename: ${articleName}`);
                await insertArticle(articleName);
                console.log('Article successfully inserted!');
                break;

            case 'delete':
                if (!articleName) {
                    throw new Error('Please provide an article name for delete operation');
                }

                console.log(`Deleting article: ${articleName}`);
                await deleteArticle(articleName);
                console.log('Article successfully deleted!');
                break;

            case 'update':
                if (!articleName || !newArticleFile) {
                    throw new Error('Please provide both filename and article slug for update operation');
                }

                console.log(`Updating article ${articleName} with content from ${newArticleFile}`);
                await updateArticle(articleName, newArticleFile);
                console.log('Article successfully updated!');
                break;

            case 'fetch':
                if (!articleName) {
                    throw new Error('Please provide an article name for fetch operation');
                }

                console.log(`Fetching article: ${articleName}`);
                const article = await fetchArticle(articleName);
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

articleActionHandler();