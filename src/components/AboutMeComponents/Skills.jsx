/**
 * Showing Skills!
 */

// data file
import data from '../../../Data/skills.json'

export default function Skills() {
  return (
    <div className="min-h-screen bg-primary text-main px-4 py-12 md:px-20 font-mono">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 border-b text-center border-main pb-3 tracking-wider">
        SKILLS
      </h1>

      {/* Table Wrapper */}
      <div className="border border-main rounded-lg overflow-hidden shadow-lg shadow-main">
        {/* Header */}
        <div className="bg-primary text-main grid grid-cols-2 md:grid-cols-3 gap-4 px-4 py-3 border-b border-main text-sm md:text-base font-bold">
          <span className="font-bold">Category</span>
          <span className="col-span-2 font-bold">Technologies</span>
        </div>

        {Object.entries(data).map(([category, items]) => (
          <div key={category} className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 py-3 border-b border-main/20 hover:bg-[#150D11]/10 transition-colors">
            <span className="font-semibold text-main">{category}</span>
            <span className="col-span-2 text-sm md:text-base">
              {Array.isArray(items) ? items.join(", ") : items}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}
