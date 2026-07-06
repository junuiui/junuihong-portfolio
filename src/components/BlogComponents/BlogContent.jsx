import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function BlogContent({ selectedContent }) {
  if (!selectedContent) {
    return (
      <div className="h-full flex flex-col items-center justify-center opacity-25 select-none">
        <span className="text-5xl mb-4 animate-pulse">📡</span>
        <p className="text-xs tracking-[0.3em] font-bold">
          AWAITING_SELECTION_INITIALIZATION
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none mx-auto bg-[#0d1117] border border-main/10 rounded-xl p-6 md:p-10 shadow-2xl text-left">
      <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-gray-700 pb-4 mb-6">
        <span>SYSTEM_LOG</span>
        <span>/</span>
        <span>{selectedContent.type}</span>
        <span>/</span>
        <span className="text-main/50">{selectedContent.slug}</span>
      </div>

      <div className="markdown-body text-base leading-relaxed">
        {selectedContent.content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");

                if (!inline && match) {
                  return (
                    <SyntaxHighlighter
                      {...props}
                      PreTag="div"
                      language={match[1]}
                      style={oneDark}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  );
                }

                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {selectedContent.content}
          </ReactMarkdown>
        ) : (
          <p className="italic text-main/40 animate-pulse">
            // LOADING_MARKDOWN_STREAM...
          </p>
        )}
      </div>
    </div>
  );
}