import { useState } from "react";
import blogData from "../../Data/blogStructure.json";
import BlogSidebar from "./BlogComponents/BlogSidebar";
import BlogContent from "./BlogComponents/BlogContent";
import useMarkdownFetch from "../hooks/useMarkdownFetch.js"

export default function BlogPage() {
  const [activeMenu, setActiveMenu] = useState("projects");
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  // 1. Custom Hook
  useMarkdownFetch(selectedContent, setSelectedContent);

  // 2. Projects Pagination 인프라 변수 계산
  const [projectLimit, setProjectLimit] = useState(3);
  const totalProjects = blogData.projects || [];
  const visibleProjects = totalProjects.slice(0, projectLimit);
  const hasMoreProjects = projectLimit < totalProjects.length;

  const handleLoadMoreProjects = () => {
    setProjectLimit((prev) => prev + 3);
  };

  const toggleCategory = (subCatName) => {
    setExpandedCategories((prev) =>
      prev.includes(subCatName)
        ? prev.filter((name) => name !== subCatName)
        : [...prev, subCatName],
    );
  };

  return (
    <div className="flex min-h-screen bg-primary text-main font-mono">
      <BlogSidebar
        blogData={blogData}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        visibleProjects={visibleProjects}
        hasMoreProjects={hasMoreProjects}
        handleLoadMoreProjects={handleLoadMoreProjects}
        expandedCategories={expandedCategories}
        toggleCategory={toggleCategory}
        selectedContent={selectedContent}
        setSelectedContent={setSelectedContent}
      />
      <main className="flex-1 p-8 md:p-16 overflow-y-auto h-screen">
        <BlogContent selectedContent={selectedContent} />
      </main>
    </div>
  );
}
