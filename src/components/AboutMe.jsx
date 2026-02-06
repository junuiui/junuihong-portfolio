import EducationPage from "../pages/AboutmePages/Education";
import ExperiencesPage from "../pages/AboutmePages/Experiences";
import ProjectsPage from "../pages/AboutmePages/Projects";
import SkillsPage from "../pages/AboutmePages/Skills";

export default function AboutMe() {

  /**
   * Todo:
   * -- 
   *  1. Projects Page
   *  2. Education Page
   *  3. Skills Page
   */

  return (
    <div className="min-h-screen bg-primary text-main">
      {/* Projects Section */}
      <section id="projects">
        <ProjectsPage />
      </section>

      {/* Experience Section */}
      <section id="experience">
        <ExperiencesPage />
      </section>

      {/* Education Section */}
      <section id="education">
        <EducationPage />
      </section>

      {/* Skills Section */}
      <section id="skills">
        <SkillsPage />
      </section>
    </div>
  );
}