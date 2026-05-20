import { useState } from "react";
import data from "../../Data/projects.json";
import { FiArrowDown } from "react-icons/fi";
import ProjectCard from "./ProjectComponents/ProjectCard" // 새로 만들 컴포넌트
import ProjectRow from "./ProjectComponents/ProjectRow";   // 기존 리스트용 컴포넌트 분리

export default function Project() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 상위 2개는 하이라이트 카드로 사용
  const featuredProjects = data.slice(0, 2);
  // 나머지는 리스트로 표시
  const archiveProjects = isExpanded ? data.slice(2) : data.slice(2, 5);

  return (
    <div className="min-h-screen bg-primary text-main px-4 py-12 md:px-20 font-mono">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 border-b text-center border-main pb-3 tracking-wider">
        PROJECTS & ARCHITECTURE
      </h1>

      {/* 1. Featured Section: Deep Dive */}
      <section className="mb-20">
        <h2 className="text-xl font-bold mb-6 text-cyan-400">// FEATURED_SYSTEMS</h2>
        <div className="space-y-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>

      {/* 2. Archive Section: Table View */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-main/60">// ARCHIVE_LOGS</h2>
        <div className="border border-main/30 rounded-lg overflow-hidden shadow-lg bg-black/20">
          {/* Header */}
          <div className="bg-main/5 grid grid-cols-5 gap-4 px-4 py-3 border-b border-main/30 text-xs md:text-sm font-bold opacity-70">
            <span className="col-span-2 text-main">PROJECT_NAME</span>
            <span className="text-main">YEAR</span>
            <span className="text-main">TECH_STACK</span>
            <span className="text-main text-right">LINKS</span>
          </div>

          {/* Body */}
          {archiveProjects.map((project, index) => (
            <ProjectRow key={index} project={project} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-main/70 hover:text-main font-bold transition-all group"
          >
            {isExpanded ? "TERMINATE_LOGS" : "INITIALIZE_FULL_LOGS"}
            <FiArrowDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : "animate-bounce"}`} />
          </button>
        </div>
      </section>
    </div>
  );
}