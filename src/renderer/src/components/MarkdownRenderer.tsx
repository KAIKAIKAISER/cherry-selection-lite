import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, isStreaming }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    if (window.electronAPI) {
      window.electronAPI.copyText(code);
    } else {
      navigator.clipboard.writeText(code);
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Simple and fast markdown parser tailored for LLM responses
  const renderFormattedText = () => {
    if (!content) return null;

    // Split by code blocks ```
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let blockIndex = 0;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      const matchIndex = match.index;
      // Preceding markdown text
      if (matchIndex > lastIndex) {
        const textSegment = content.slice(lastIndex, matchIndex);
        parts.push(
          <div key={`text-${lastIndex}`} className="space-y-2">
            {renderMarkdownParagraphs(textSegment)}
          </div>
        );
      }

      const lang = match[1] || 'code';
      const code = match[2];
      const currentBlock = blockIndex++;

      parts.push(
        <div key={`code-${matchIndex}`} className="my-3 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-zinc-100 font-mono text-xs shadow-sm">
          <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-800/80 border-b border-zinc-700/50 text-zinc-400">
            <span className="font-semibold uppercase tracking-wider">{lang}</span>
            <button
              onClick={() => handleCopyCode(code, currentBlock)}
              className="flex items-center gap-1 text-[11px] hover:text-zinc-200 transition-colors py-0.5 px-1.5 rounded hover:bg-zinc-700/50"
              title="复制代码"
            >
              {copiedIndex === currentBlock ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">已复制</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>复制</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3 overflow-x-auto leading-relaxed select-text font-mono">
            <code>{code}</code>
          </pre>
        </div>
      );

      lastIndex = matchIndex + match[0].length;
    }

    // Remaining text after last code block
    if (lastIndex < content.length) {
      const remainingText = content.slice(lastIndex);
      parts.push(
        <div key={`text-${lastIndex}`} className="space-y-2">
          {renderMarkdownParagraphs(remainingText)}
        </div>
      );
    }

    return parts;
  };

  const renderMarkdownParagraphs = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={idx} className="h-1.5" />;
      }

      // Headers
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mt-2 mb-1">
            {formatInline(line.slice(4))}
          </h3>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-base font-bold text-zinc-900 dark:text-zinc-50 mt-2.5 mb-1.5">
            {formatInline(line.slice(3))}
          </h2>
        );
      }
      if (line.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-lg font-bold text-zinc-900 dark:text-white mt-3 mb-2">
            {formatInline(line.slice(2))}
          </h1>
        );
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        return (
          <blockquote key={idx} className="border-l-2 border-cherry-500/70 pl-3 py-0.5 text-zinc-600 dark:text-zinc-400 italic text-xs">
            {formatInline(line.slice(2))}
          </blockquote>
        );
      }

      // Unordered list
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {formatInline(line.slice(2))}
          </li>
        );
      }

      // Ordered list
      const orderedMatch = line.match(/^(\d+)\.\s(.*)$/);
      if (orderedMatch) {
        return (
          <li key={idx} className="ml-4 list-decimal text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {formatInline(orderedMatch[2])}
          </li>
        );
      }

      // Regular paragraph
      return (
        <p key={idx} className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed select-text">
          {formatInline(line)}
        </p>
      );
    });
  };

  const formatInline = (str: string) => {
    // Simple inline parser for bold **text**, inline code `code`, and italic *text*
    const segments = str.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);
    return segments.map((seg, i) => {
      if (seg.startsWith('**') && seg.endsWith('**')) {
        return <strong key={i} className="font-semibold text-zinc-900 dark:text-zinc-100">{seg.slice(2, -2)}</strong>;
      }
      if (seg.startsWith('`') && seg.endsWith('`')) {
        return (
          <code key={i} className="px-1 py-0.5 mx-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-cherry-600 dark:text-cherry-400 font-mono text-[11px]">
            {seg.slice(1, -1)}
          </code>
        );
      }
      if (seg.startsWith('*') && seg.endsWith('*')) {
        return <em key={i} className="italic text-zinc-600 dark:text-zinc-400">{seg.slice(1, -1)}</em>;
      }
      return seg;
    });
  };

  return (
    <div className="markdown-body font-sans text-xs select-text">
      {renderFormattedText()}
      {isStreaming && (
        <span className="inline-block w-1.5 h-3.5 bg-cherry-500 animate-pulse ml-0.5 align-middle rounded-sm" />
      )}
    </div>
  );
};
