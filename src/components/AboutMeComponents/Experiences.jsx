import { motion } from "framer-motion";
import data from "../../../Data/experiences.json"; // 경로에 맞춰 수정

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-primary text-main px-4 py-12 md:px-20 font-mono">
      {/* Section Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-16 border-b text-center border-main pb-3 tracking-wider">
        WORK EXPERIENCE
      </h1>

      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Timeline Bar */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-main/30 h-full" />

        {data.experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          const isPresent = !exp.end;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative mb-16 flex flex-col md:flex-row items-center w-full ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary border-2 border-main rounded-full z-10">
                {isPresent && (
                  <span className="absolute inset-0 rounded-full bg-main animate-ping opacity-75" />
                )}
              </div>

              {/* Date Label (Desktop) */}
              <div className={`hidden md:block w-1/2 px-8 text-xl font-bold ${isEven ? "text-left" : "text-right"}`}>
                <span className="border border-main px-3 py-1 rounded text-sm md:text-base">
                  {exp.start.year}.{exp.start.month} - {exp.end ? `${exp.end.year}.${exp.end.month}` : "PRESENT"}
                </span>
              </div>

              {/* Content Card */}
              <div className="w-full md:w-1/2 pl-12 md:px-8">
                <div className="bg-[#1A1A1A]/50 border border-main/20 p-6 rounded-lg hover:border-main transition-all shadow-lg">
                  {/* Date (Mobile) */}
                  <span className="md:hidden block text-sm font-bold text-main mb-2">
                    {exp.start.year}.{exp.start.month} ~ {exp.end ? `${exp.end.year}.${exp.end.month}` : "PRESENT"}
                  </span>
                  
                  <h3 className="text-xl font-bold text-main leading-tight">{exp.title}</h3>
                  <p className="text-sm opacity-80 mb-4">{exp.company} | {exp.location}</p>
                  
                  <ul className="space-y-3">
                    {exp.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-sm md:text-base flex items-start leading-relaxed">
                        <span className="text-main mr-2">▹</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}