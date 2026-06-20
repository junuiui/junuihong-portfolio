import {
  FiChevronDown,
  FiChevronRight,
  FiFolder,
  FiFileText,
  FiPlus,
} from "react-icons/fi";

export default function BlogSidebar({
  blogData,
  activeMenu,
  setActiveMenu,
  visibleProjects,
  hasMoreProjects,
  handleLoadMoreProjects,
  expandedCategories,
  toggleCategory,
  selectedContent,
  setSelectedContent,
}) {
  return (
    <aside className="w-80 border-r border-main/20 bg-black/40 p-6 flex flex-col gap-6 select-none h-screen sticky top-0 overflow-y-auto">
      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 gap-2 border-b border-main/20 pb-4">
        <button
          onClick={() => setActiveMenu("projects")}
          className={`py-2 text-xs font-bold tracking-widest border transition-all ${
            activeMenu === "projects"
              ? "bg-main text-primary border-main"
              : "border-main/20 opacity-50 hover:opacity-100"
          }`}
        >
          PROJECTS
        </button>
        <button
          onClick={() => setActiveMenu("studies")}
          className={`py-2 text-xs font-bold tracking-widest border transition-all ${
            activeMenu === "studies"
              ? "bg-main text-primary border-main"
              : "border-main/20 opacity-50 hover:opacity-100"
          }`}
        >
          STUDIES
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        {/* A. PROJECTS MENU */}
        {activeMenu === "projects" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-main/40 tracking-wider uppercase">
              // LATEST_PROJECTS
            </h3>
            <ul className="space-y-1">
              {visibleProjects.map((project, idx) => (
                <li
                  key={idx}
                  onClick={() =>
                    setSelectedContent({
                      type: "project",
                      id: project.title,
                      slug: project.slug,
                      content: null,
                    })
                  }
                  className={`cursor-pointer text-sm p-2 rounded border border-transparent transition-all flex items-center gap-2 group ${
                    selectedContent?.slug === project.slug
                      ? "bg-main/10 text-white border-main/40"
                      : "hover:bg-main/5 hover:text-white"
                  }`}
                >
                  <span className="text-main/30 group-hover:text-main text-xs">
                    ⚡
                  </span>
                  <span className="truncate">{project.title}</span>
                </li>
              ))}
            </ul>
            {hasMoreProjects && (
              <button
                onClick={handleLoadMoreProjects}
                className="mt-4 w-full py-2 border border-dashed border-main/30 hover:border-main text-[11px] text-center font-bold tracking-wider transition-all flex items-center justify-center gap-1 hover:bg-main/5"
              >
                <FiPlus className="w-3 h-3" /> LOAD_MORE_PROJECTS
              </button>
            )}
          </div>
        )}

        {/* B. STUDIES MENU */}
        {activeMenu === "studies" && (
          <div className="space-y-6">
            {Object.keys(blogData.studies || {}).map((bigCategory) => (
              <div key={bigCategory} className="space-y-2">
                <h3 className="text-xs font-bold text-main/40 tracking-widest uppercase">
                  // {bigCategory}
                </h3>
                <div className="pl-2 border-l border-l-main/10 space-y-2">
                  {Object.keys(blogData.studies[bigCategory]).map(
                    (subCategory) => {
                      const isSubOpen =
                        expandedCategories.includes(subCategory);
                      const mdFiles =
                        blogData.studies[bigCategory][subCategory] || [];

                      return (
                        <div key={subCategory} className="space-y-1">
                          <div
                            onClick={() => toggleCategory(subCategory)}
                            className="text-sm font-semibold text-main/80 hover:text-white cursor-pointer flex items-center justify-between py-1 px-1 rounded hover:bg-main/5"
                          >
                            <span className="flex items-center gap-2 truncate">
                              <FiFolder className="w-4 h-4 text-main/60 shrink-0" />
                              {subCategory}
                            </span>
                            {isSubOpen ? (
                              <FiChevronDown className="w-3 h-3" />
                            ) : (
                              <FiChevronRight className="w-3 h-3" />
                            )}
                          </div>

                          {isSubOpen && (
                            <ul className="pl-4 border-l border-dashed border-main/20 space-y-0.5 animate-fadeIn">
                              {mdFiles.map((file, idx) => {
                                const fileSlug = `${bigCategory}-${subCategory}-${file}`;
                                return (
                                  <li
                                    key={idx}
                                    onClick={() =>
                                      setSelectedContent({
                                        type: "study",
                                        id: file,
                                        slug: fileSlug,
                                        content: null,
                                        meta: {
                                          bigCategory,
                                          subCategory,
                                          fileName: file,
                                        },
                                      })
                                    }
                                    className={`text-xs py-1.5 px-2 rounded cursor-pointer flex items-center gap-2 transition-all truncate ${
                                      selectedContent?.slug === fileSlug
                                        ? "bg-main/10 text-white font-bold"
                                        : "opacity-60 hover:opacity-100 hover:text-white hover:bg-main/5"
                                    }`}
                                  >
                                    <FiFileText className="w-3 h-3 shrink-0" />
                                    {file.replace(".md", "").replace(/_/g, " ")}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
