import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi"; 
import { IoIosLink } from "react-icons/io";

export default function ProjectRow({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-main/10">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="grid grid-cols-5 gap-4 px-4 py-4 cursor-pointer hover:bg-main/5 transition-all items-center group"
      >
        <span className="col-span-2 font-semibold text-main group-hover:pl-2 transition-all flex items-center gap-2">
          {project.title}
          <FiChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </span>
        <span className="text-xs opacity-60">{project.year}</span>
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 2).map((t, i) => (
            <span key={i} className="text-[9px] border border-main/20 px-1.5 py-0.5 rounded opacity-70">
              {t}
            </span>
          ))}
          {project.tech.length > 2 && <span className="text-[9px] opacity-40">+{project.tech.length - 2}</span>}
        </div>
        <div className="flex justify-end gap-3">
          {project.url && <a href={project.url} target="_blank" className="hover:text-white"><FaGithub /></a>}
          {project.deployed_url && <a href={project.deployed_url} target="_blank" className="hover:text-white"><IoIosLink /></a>}
        </div>
      </div>

      {isOpen && (
        <div className="bg-black/40 px-8 py-4 text-xs leading-relaxed animate-fadeIn border-t border-main/5">
          <ul className="space-y-2 opacity-80 list-none">
            {project.details.map((detail, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-main">›</span> {detail}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}