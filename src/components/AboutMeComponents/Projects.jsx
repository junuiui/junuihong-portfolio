// /**
//  * Showing Projects
//  * TODO: 
//  *  categorize?
//  */

import { useState } from "react";
import data from "../../../Data/projects.json";
import { FaGithub } from "react-icons/fa";
import { FiChevronDown, FiChevronUp, FiArrowDown } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";

export default function Projects() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleRowClick = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) // if opened already, close
        : [...prev, index] // if close, open
    );
  };

  const visibleProjects = !isExpanded ? data.slice(0, 3) : data;

  return (
    <div className="bg-primary text-main px-4 py-12 md:px-20 font-mono">
      {/* center title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 border-b text-center border-main pb-3 tracking-wider">
        PROJECTS
      </h1>

      {/* Terminal border box */}
      <div className="border border-main rounded-lg overflow-hidden shadow-lg shadow-main">
        {/* Header */}
        <div className="bg-primary text-main grid grid-cols-5 gap-4 px-4 py-3 border-b border-main text-sm md:text-base">
          <span className="col-span-2 font-bold">Project Name</span>
          <span className="font-bold">Year</span>
          <span className="font-bold">Tech Stack</span>
          <span className="font-bold">Link</span>
        </div>

        {/* Body */}
        {visibleProjects.map((project, index) => {
          const isOpen = expandedIndexes.includes(index);
          return (
            <div key={index} className="border-b border-main/20">
              {/* Row */}
              <div
                onClick={() => handleRowClick(index)}
                className="grid grid-cols-5 gap-4 px-4 py-3 cursor-pointer hover:bg-[#150D11]/10 transition-all"
              >
                <span className="col-span-2 flex items-center gap-2 font-semibold">
                  {project.title}
                  {project.status === 'in-progress' && (
                    <span className="text-sm font-normal text-cyan-400">(In-Progress)</span>
                  )}
                  {isOpen ? (
                    <FiChevronUp className="w-4 h-4" />
                  ) : (
                    <FiChevronDown className="w-4 h-4" />
                  )}
                </span>
                <span className="text-[#ffffff]">{project.year}</span>
                <span className="text-xs flex flex-wrap gap-1">
                  {project.tech.slice(0, 10).map((t, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 border border-main/20 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 10 && <span>...</span>}
                </span>

                {/* Links */}
                <span className="flex items-center gap-4">
                  {/* Deployed Webpage */}
                  {project.deployed_url ? (
                    <a
                      href={project.deployed_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:underline text-main"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IoIosLink /> Link
                    </a>
                  ) : (
                    null
                  )}

                  {/* Github Link */}
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:underline text-main"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub /> GitHub
                    </a>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </span>
              </div>

              {/* Details Row */}
              {isOpen && (
                <div className="bg-primary/5 text-main px-8 py-2 text-sm animate-fadeIn">
                  <ul className="list-disc list-inside space-y-1">
                    {project.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Load All */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleToggleExpand}
          className="flex items-center gap-2 text-main hover:text-[#00ff66] font-bold transition-all"
        >
          {isExpanded ? "Show Less" : "Load All"}
          <FiArrowDown
            className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "rotate-180 animate-bounce" : "animate-bounce"
              }`}
          />
        </button>
      </div>
    </div>
  );
}





