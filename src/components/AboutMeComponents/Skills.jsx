/**
 * Showing Skills!
 */

// data file
import data from '../../../Data/skills.json'

export default function Skills() {
  return (
    <div className="min-h-screen bg-[#100d74] text-[#ffffff] px-4 py-12 md:px-20 font-mono">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 border-b text-center border-[#ffffff] pb-3 tracking-wider">
        SKILLS
      </h1>

      {/* Table Wrapper */}
      <div className="border border-[#ffffff] rounded-lg overflow-hidden shadow-lg shadow-[#ffffff]">
        {/* Header */}
        <div className="bg-[#100d74] text-[#ffffff] grid grid-cols-2 md:grid-cols-3 gap-4 px-4 py-3 border-b border-[#ffffff] text-sm md:text-base font-bold">
          <span className="font-bold">Category</span>
          <span className="col-span-2 font-bold">Technologies</span>
        </div>

        {Object.entries(data).map(([category, items]) => (
          <div key={category} className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 py-3 border-b border-[#ffffff]/20 hover:bg-[#150D11]/10 transition-colors">
            <span className="font-semibold text-[#ffffff]">{category}</span>
            <span className="col-span-2 text-sm md:text-base">
              {Array.isArray(items) ? items.join(", ") : items}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}
