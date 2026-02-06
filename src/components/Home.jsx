import devPic from '../assets/mypic.jpeg';
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import ProjectGrid from './HomeComponents/ProjectGrid';
import ProfileCard from './HomeComponents/ProfileCard';

export default function Home() {
  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen bg-primary overflow-hidden">
      {/* Left Section (1/3) - Profile */}
      <div className="w-full lg:w-1/3 flex flex-col items-center justify-center p-8 z-10">
        <ProfileCard
          name="Junui Hong"
          title="Software Engineer"
          handle="junuiui"
          status="Looking for a job"
          contactText="Download Resume"
          avatarUrl={devPic}
          showUserInfo
          enableTilt={true}
          enableMobileTilt
          onContactClick={() => window.open('/resume_jun_swe-3.pdf', '_blank')}
          showBehindGlow
          behindGlowColor="rgba(125, 190, 255, 0.67)"
          customInnerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
        >
          {/* Social Links */}
          <div className="flex gap-6 mt-4">
            <a href="https://github.com/junuiui" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:scale-110 transition-all">
              <FaGithub className="w-8 h-8" />
            </a>
            <a href="https://linkedin.com/in/junui-hong-338487280/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 hover:scale-110 transition-all">
              <FaLinkedin className="w-8 h-8" />
            </a>
            <a href="https://instagram.com/junuiui" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 hover:scale-110 transition-all">
              <FaInstagram className="w-8 h-8" />
            </a>
          </div>
        </ProfileCard>
      </div>

      {/* Right Section (2/3) - Projects */}
      <div
        className="w-full lg:w-2/3 flex items-center justify-center z-10 p-4 md:p-12 overflow-y-auto backdrop-blur-sm"
      >
        <div className="w-full h-full flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-cyan-400 pl-4">Latest Projects</h2>
          <ProjectGrid />
        </div>
      </div>
    </div>
  );
}

