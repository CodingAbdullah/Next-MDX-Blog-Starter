import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Custom code block component for handling code in MDX files
// Visual Studio Code Dark Plus theme
const CodeBlock = ({ className = '', children }: { className?: string; children: string }) => {
  const match = /language-(\w+)/.exec(className || '')
  return (
    <SyntaxHighlighter 
      language={match?.[1] || 'text'} 
      style={vscDarkPlus}
      className="rounded-lg"
    >
      {String(children).trim()}
    </SyntaxHighlighter>
  )
}

export default CodeBlock;