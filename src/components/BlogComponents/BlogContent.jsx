import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // 1. GFM 플러그인 임포트
import "github-markdown-css/github-markdown.css"; // 2. GitHub CSS 임포트

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
    // 3. 배경색을 GitHub Dark 테마와 맞추거나 어두운 톤을 유지합니다.
    <div className="w-full max-w-none mx-auto bg-[#0d1117] border border-main/10 rounded-xl p-6 md:p-10 shadow-2xl text-left">
      {/* 상단 메타데이터 로그 레일 */}
      <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest border-b border-gray-700 pb-4 mb-6">
        <span>SYSTEM_LOG</span>
        <span>/</span>
        <span>{selectedContent.type}</span>
        <span>/</span>
        <span className="text-main/50">{selectedContent.slug}</span>
      </div>

      {/* 4. 핵심: 'markdown-body' 클래스를 주입하여 GitHub 스타일 스킨을 강제 적용합니다. */}
      {/* 다크모드 적용을 위해 'markdown-body' 뒤에 다크 클래스를 명시하거나 감쌉니다. */}
      <div className="markdown-body style-dark-override text-base leading-relaxed">
        {selectedContent.content ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
