import ReactMarkdown from 'react-markdown';

export default function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
