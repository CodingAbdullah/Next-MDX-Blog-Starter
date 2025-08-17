// components/customMDXComponents/GitHubGist.tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import GitHubGistType from '@/utils/types/GitHubGistType';
import fs from 'fs';
import path from 'path';

// GitHub Gist custom component
// Read the requested GitHub Gist content from local file using its ID
async function GitHubGist({ id, figCaptionText }: GitHubGistType) {
  let content = '';
  let error = null;

  // Run a try-catch to ensure errors are caught and handled gracefully
  try {
    const filePath = path.join(process.cwd(), 'src', 'github_gists', `${id}.txt`);
    
    if (!fs.existsSync(filePath)) {
      throw new Error("GitHub gist could not load");
    }
    
    content = fs.readFileSync(filePath, 'utf8');
  } 
  catch {
    error = "GitHub gist could not load";
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

export default GitHubGist;