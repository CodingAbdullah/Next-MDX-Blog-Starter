import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface GistCodeBlockProps {
  content: string;
  language: string;
}

export default function GistCodeBlock({ content, language }: GistCodeBlockProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{ margin: 0, background: 'transparent', fontSize: '0.875rem' }}
    >
      {content}
    </SyntaxHighlighter>
  );
}
