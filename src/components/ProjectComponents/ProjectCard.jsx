import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";

export default function ProjectCard({ project }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-main/30 bg-[#121212] rounded-xl overflow-hidden shadow-2xl hover:border-main/60 transition-colors"
    >
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Metadata & Decisions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-main">{project.title}</h3>
              {project.status === "in-progress" && (
                <span className="text-[10px] bg-cyan-900/50 text-cyan-400 px-2 py-0.5 border border-cyan-400/50 rounded-full animate-pulse">
                  ACTIVE_DEV
                </span>
              )}
            </div>
            <p className="text-sm opacity-70 leading-relaxed">{project.details[0]}</p>
          </div>

          {project.technical_decisions && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-main/50 uppercase tracking-widest border-l-2 border-main pl-2">
                Technical Challenges
              </h4>
              {project.technical_decisions.map((td, i) => (
                <div key={i} className="bg-main/5 p-4 rounded border border-main/10">
                  <p className="text-xs font-bold text-cyan-400 mb-1">ISSUE: {td.issue}</p>
                  <p className="text-sm opacity-90">{td.solution}</p>
                  <p className="text-[11px] mt-2 text-main/40 italic">// Why: {td.why}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Operations & Stack */}
        <div className="flex flex-col justify-between bg-black/40 p-6 rounded-lg border border-main/5">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-main/50 uppercase tracking-widest">Deployment Pipeline</h4>
            <ul className="space-y-2">
              {project.deployment_procedure?.map((step, i) => (
                <li key={i} className="text-xs flex items-start gap-2 text-main/80">
                  <span className="text-main">›</span> {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t, i) => (
                <span key={i} className="text-[10px] px-2 py-1 bg-main/10 border border-main/20 rounded text-main/80">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4">
              <a href={project.url} target="_blank" className="flex-1 flex items-center justify-center gap-2 py-2 border border-main text-main text-xs font-bold hover:bg-main hover:text-primary transition-all">
                <FaGithub /> SOURCE_CODE
              </a>
              {project.deployed_url && (
                <a href={project.deployed_url} target="_blank" className="flex-1 flex items-center justify-center gap-2 py-2 bg-main text-primary text-xs font-bold hover:opacity-80 transition-all">
                  <IoIosLink /> LIVE_DEMO
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}