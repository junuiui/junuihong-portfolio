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
        <div className="bg-[#100d74] text-[#ffffff] px-4 py-12 md:px-20 font-mono">
            {/* center title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-8 border-b text-center border-[#ffffff] pb-3 tracking-wider">
                PROJECTS
            </h1>

            {/* Terminal border box */}
            <div className="border border-[#ffffff] rounded-lg overflow-hidden shadow-lg shadow-[#ffffff]">
                {/* Header */}
                <div className="bg-[#100d74] text-[#ffffff] grid grid-cols-5 gap-4 px-4 py-3 border-b border-[#ffffff] text-sm md:text-base">
                    <span className="col-span-2 font-bold">Project Name</span>
                    <span className="font-bold">Year</span>
                    <span className="font-bold">Tech Stack</span>
                    <span className="font-bold">Link</span>
                </div>

                {/* Body */}
                {visibleProjects.map((project, index) => {
                    const isOpen = expandedIndexes.includes(index);
                    return (
                        <div key={index} className="border-b border-[#ffffff]/20">
                            {/* Row */}
                            <div
                                onClick={() => handleRowClick(index)}
                                className="grid grid-cols-5 gap-4 px-4 py-3 cursor-pointer hover:bg-[#150D11]/10 transition-all"
                            >
                                <span className="col-span-2 flex items-center gap-2 font-semibold">
                                    {project.title}
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
                                            className="bg-[#100d74]/10 border border-[#ffffff]/20 px-2 py-0.5 rounded"
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
                                            className="flex items-center gap-1 hover:underline text-[#ffffff]"
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
                                            className="flex items-center gap-1 hover:underline text-[#ffffff]"
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
                                <div className="bg-[#100d74]/5 text-[#ffffff] px-8 py-2 text-sm animate-fadeIn">
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
                    className="flex items-center gap-2 text-[#ffffff] hover:text-[#00ff66] font-bold transition-all"
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




// OLD CODE
// import { useState } from 'react'

// //  data    ##########################################
// import data from '../../../Data/projects.json';

// //  icon    ##########################################
// import { FaGithub } from 'react-icons/fa';
// import { FiArrowDown } from 'react-icons/fi';

// export default function ProjectsPage() {

//     const [isExpanded, setIsExpanded] = useState(false);

//     const handleLoadMore = () => {
//         setIsExpanded(prev => !prev);
//     };

//     const visibleProjects = !isExpanded ? data.slice(0, 4) : data

//     return (
//         <div className="min-h-screen bg-[#150DF7] text-[#00ff66] px-6 py-12 md:px-20 outline-solid">

//             <h1 className="text-4xl font-bold mb-8">Projects</h1>

//             <div className="grid gap-10">
//                 {visibleProjects.map((project, index) => (
//                     <div
//                         key={index}
//                         className="bg-[#0A0A5F] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//                     >
//                         {/* title + year */}
//                         <div className="flex justify-between items-center mb-2">
//                             <h2 className="text-2xl font-bold">{project.title}</h2>
//                             <span className="text-sm text-gray-300">{project.year}</span>
//                         </div>

//                         {/* stacks */}
//                         <div className="flex flex-wrap gap-2 mb-4">
//                             {project.tech.map((tech, idx) => (
//                                 <span
//                                     key={idx}
//                                     className="bg-[#00ff66]/20 text-[#00ff66] px-2 py-1 rounded text-xs font-mono"
//                                 >
//                                     {tech}
//                                 </span>
//                             ))}
//                         </div>

//                         {/* details */}
//                         <ul className="list-disc list-inside space-y-1 text-[#b0ff99]">
//                             {project.details.map((detail, idx) => (
//                                 <li key={idx}>{detail}</li>
//                             ))}
//                         </ul>

//                         {/* link */}
//                         {project.url && (
//                             <div className="mt-4">
//                                 <a
//                                     href={project.url.startsWith("http") ? project.url : "#"}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="flex items-center gap-2 text-[#00ff66] hover:underline"
//                                 >
//                                     <FaGithub /> {project.url}
//                                 </a>
//                             </div>
//                         )}
//                     </div>

//                 ))}
//             </div>

//             {/* Load More 버튼 */}
//             <div className="flex justify-center mt-10">
//                 <button
//                     onClick={handleLoadMore}
//                     className="flex items-center gap-2 text-[#00ff66] hover:text-white font-bold transition-all"
//                 >
//                     {isExpanded ? "Show Less" : "Load All"}
//                     <FiArrowDown
//                         className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "rotate-180" : "animate-bounce"
//                             }`}
//                     />
//                 </button>
//             </div>
//         </div>
//     );
// }


// import { useState } from 'react'
// import data from '../../../Data/projects.json'

// // icons
// import { FaGithub } from 'react-icons/fa'
// import { FiArrowDown, FiChevronDown, FiChevronUp } from 'react-icons/fi'

// export default function ProjectsPage() {
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [expandedProjects, setExpandedProjects] = useState({})

//   const handleLoadMore = () => {
//     setIsExpanded(prev => !prev)
//   }

//   const toggleProjectDetail = (index) => {
//     setExpandedProjects(prev => ({
//       ...prev,
//       [index]: !prev[index],
//     }))
//   }

//   const visibleProjects = !isExpanded ? data.slice(0, 4) : data

//   return (
//     <div className="min-h-screen bg-[#0A0A5F] text-[#00ff66] px-6 py-12 md:px-20 font-mono">
//       <h1 className="text-3xl md:text-4xl font-bold mb-8 border-b border-[#00ff66]/40 pb-3 tracking-tight">
//         / Projects
//       </h1>

//       <div className="flex flex-col gap-8">
//         {visibleProjects.map((project, index) => (
//           <div
//             key={index}
//             className="relative bg-[#150DF7]/20 border border-[#00ff66]/30 rounded-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:border-[#00ff66]/60 shadow-lg"
//           >
//             {/* Title + Year */}
//             <div className="flex justify-between items-center mb-3">
//               <h2 className="text-2xl font-bold">{project.title}</h2>
//               <span className="text-sm text-[#b0ff99]/70">{project.year}</span>
//             </div>

//             {/* Tech stack */}
//             <div className="flex flex-wrap gap-2 mb-4">
//               {project.tech.map((tech, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-[#00ff66]/10 text-[#00ff66] px-2 py-1 rounded text-xs border border-[#00ff66]/20"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>

//             {/* Show detail toggle */}
//             <button
//               onClick={() => toggleProjectDetail(index)}
//               className="flex items-center gap-2 text-[#00ff66] hover:text-white transition-all font-semibold mb-2"
//             >
//               {expandedProjects[index] ? (
//                 <>
//                   <FiChevronUp className="w-5 h-5" /> Hide Detail
//                 </>
//               ) : (
//                 <>
//                   <FiChevronDown className="w-5 h-5" /> Show Detail
//                 </>
//               )}
//             </button>

//             {/* Details (collapsible) */}
//             {expandedProjects[index] && (
//               <div className="border-t border-[#00ff66]/20 pt-3 mt-2 animate-fadeIn">
//                 <ul className="list-disc list-inside space-y-1 text-[#b0ff99]">
//                   {project.details.map((detail, idx) => (
//                     <li key={idx}>{detail}</li>
//                   ))}
//                 </ul>

//                 {project.url && (
//                   <div className="mt-4 flex items-center gap-2">
//                     <FaGithub className="text-[#00ff66]" />
//                     <a
//                       href={project.url.startsWith('http') ? project.url : '#'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:underline text-[#00ff66]"
//                     >
//                       {project.url}
//                     </a>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Load More */}
//       <div className="flex justify-center mt-12">
//         <button
//           onClick={handleLoadMore}
//           className="flex items-center gap-2 text-[#00ff66] hover:text-white font-bold transition-all"
//         >
//           {isExpanded ? 'Show Less' : 'Load All'}
//           <FiArrowDown
//             className={`w-6 h-6 transition-transform duration-300 ${
//               isExpanded ? 'rotate-180' : 'animate-bounce'
//             }`}
//           />
//         </button>
//       </div>
//     </div>
//   )
// }