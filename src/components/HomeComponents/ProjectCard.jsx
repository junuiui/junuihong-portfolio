import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectCard({ project }) {
  const handleCardClick = () => {
    // Priority: Deployed URL -> GitHub URL
    const targetUrl = project.deployed_url || project.url;
    if (targetUrl) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  const isDeployed = !!project.deployed_url;

  return (
    <div
      onClick={handleCardClick}
      className={`relative group bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-xl transition-all duration-300 h-64 flex flex-col justify-between p-6`}
    >
      {/* Default State Content */}
      <div className="flex flex-col h-full z-10">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors pr-2">
            {project.title}
            {project.status === 'in-progress' && (
              <span className="block text-sm font-normal text-cyan-400 mt-1">(In-Progress)</span>
            )}
          </h3>
          <span className="text-xs font-mono text-gray-400 bg-black/20 px-2 py-1 rounded whitespace-nowrap">
            {project.year}
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((t, i) => (
              <span key={i} className="text-xs text-cyan-300 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20">
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs text-gray-400 self-center">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover State Overlay */}
      <div className="absolute inset-0 bg-primary/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center z-20">
        <p className="text-sm text-gray-200 mb-4 line-clamp-4">
          {project.details[0]}
        </p>
        <div className="mt-2 flex items-center gap-2 text-white font-bold bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
          {isDeployed ? <FaExternalLinkAlt /> : <FaGithub />}
          <span>{isDeployed ? "View Live" : "View Code"}</span>
        </div>
      </div>
    </div>
  );
}
