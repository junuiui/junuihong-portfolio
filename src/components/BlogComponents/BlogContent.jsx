import ReactMarkdown from "react-markdown";

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
    <div className="w-full max-w-none mx-auto bg-[#121212]/30 border border-main/10 rounded-xl p-8 md:p-12 shadow-2xl">
      <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-main/10 pb-4 mb-6">
        <span>SYSTEM_LOG</span>
        <span>/</span>
        <span>{selectedContent.type}</span>
        <span>/</span>
        <span className="text-main/50">{selectedContent.slug}</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-main mb-8">
        {selectedContent.id.replace(".md", "").replace(/_/g, " ")}
      </h1>

      <div className="prose prose-invert max-w-none text-main/80 text-sm md:text-base leading-relaxed space-y-4">
        {selectedContent.content ? (
          <ReactMarkdown>{selectedContent.content}</ReactMarkdown>
        ) : (
          <p className="italic text-main/40 animate-pulse">
            // LOADING_MARKDOWN_STREAM...
          </p>
        )}
      </div>
    </div>
  );
}
