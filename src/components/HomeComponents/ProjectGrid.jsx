import { useNavigate } from 'react-router-dom';
import projects from '../../../Data/projects.json';
import ProjectCard from './ProjectCard';
import { FaArrowRight } from "react-icons/fa";

export default function ProjectGrid() {
  const navigate = useNavigate();
  // Get latest 4 projects
  const recentProjects = projects.slice(0, 4);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recentProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => navigate('/aboutme')}
          className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <span className="text-lg">View all projects</span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
