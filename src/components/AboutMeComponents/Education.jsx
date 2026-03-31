import { motion } from "framer-motion";
import data from "../../../Data/educations.json"

export default function EducationPage() {
  const allEducation = [
    ...data.universities.map(u => ({ ...u, type: 'University' })),
    ...data.secondaries.map(s => ({ ...s, type: 'Secondary', program: 'High School Diploma' }))
  ].sort((a, b) => b.start.year - a.start.year);

  return (
    <div className="min-h-screen bg-primary text-main px-4 py-12 md:px-20 font-mono">
      {/* Section Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-16 border-b text-center border-main pb-3 tracking-wider uppercase">
        Education
      </h1>

      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Timeline Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-main/30 h-full" />

        {allEducation.map((edu, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative mb-16 flex flex-col md:flex-row items-center w-full ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary border-2 border-main rounded-full z-10 shadow-[0_0_8px_rgba(var(--main-rgb),0.5)]" />

              {/* Date Label (Desktop) */}
              <div className={`hidden md:block w-1/2 px-8 text-xl font-bold ${isEven ? "text-left" : "text-right"}`}>
                <span className="border border-main px-3 py-1 rounded text-sm md:text-base">
                  {edu.start.year}.{edu.start.month} - {edu.end.year}.{edu.end.month}
                </span>
              </div>

              {/* Content Card */}
              <div className="w-full md:w-1/2 pl-12 md:px-8">
                <div className="bg-[#1A1A1A]/40 border border-main/20 p-6 rounded-lg hover:border-main/60 transition-all group">
                  {/* Date (Mobile) */}
                  <span className="md:hidden block text-xs font-bold text-main/70 mb-2">
                    {edu.start.year}.{edu.start.month} ~ {edu.end.year}.{edu.end.month}
                  </span>
                  
                  <h3 className="text-xl font-bold text-main group-hover:tracking-wide transition-all">
                    {edu.name}
                  </h3>
                  <p className="text-sm md:text-base text-main/90 mb-4">{edu.program}</p>
                  
                  {/* Academic Achievements (GPA & Honors) */}
                  {(edu.gpa || edu.deans_list) && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {edu.gpa && (
                        <div className="flex flex-col border-l-2 border-main pl-3">
                          <span className="text-[10px] uppercase opacity-60">GPA</span>
                          <span className="text-sm font-bold">{edu.gpa.value} / {edu.gpa.scale}</span>
                        </div>
                      )}
                      {edu.deans_list && (
                        <div className="flex flex-col border-l-2 border-main pl-3">
                          <span className="text-[10px] uppercase opacity-60">Honors</span>
                          <span className="text-sm font-bold">Dean's List x{edu.deans_list}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Institution Link */}
                  {edu.url && (
                    <a 
                      href={edu.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-[10px] text-main/50 hover:text-main underline transition-colors"
                    >
                      Visit Institution ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}