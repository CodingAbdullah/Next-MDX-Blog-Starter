// components/customMDXComponents/GitHubGist.tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import GitHubGistType from '@/utils/types/GitHubGistType';

// GitHub Gist custom component
// Perform the GET request to retrieve the requested GitHub Gist using its ID
export async function GitHubGist({ id, figCaptionText }: GitHubGistType) {
  let content = '';
  let error = null;

  // Run a try-catch to ensure errors are caught and handled gracefully
  try {
    const response = await fetch(`https://api.github.com/gists/${id}`);
    const data = await response.json();

    if (response.ok) {
      const files = data.files;
      const rawFileUrl = files[Object.keys(files)[0]].raw_url;

      const fileResponse = await fetch(rawFileUrl);
      content = await fileResponse.text();
    } 
    else {
      throw new Error("Could not load GitHub Gist");
    }
  } 
  catch (err) {
    throw new Error("Could not load GitHub Gist");
  }

  // Show error state
  if (error) {
    return <div className="text-red-600 bg-red-100 p-4 rounded-lg">{error}</div>;
  }

  // Render the GitHub Gist component using React-Syntax-Highlighting
  return (
    <figure className='text-center'>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
        {content}
      </SyntaxHighlighter>
      <figcaption className="mb-4 leading-relaxed text-green-200/90">{figCaptionText}</figcaption>
    </figure>
  );
}