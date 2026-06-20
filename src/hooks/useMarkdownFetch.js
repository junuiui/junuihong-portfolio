import { useEffect } from "react";

export default function useMarkdownFetch(selectedContent, setSelectedContent) {
    useEffect(() => {
    if (!selectedContent || selectedContent.content) return;

    let fetchUrl = "";
    if (selectedContent.type === "project") {
        fetchUrl = `/Blogs/project/${selectedContent.slug}.md`;
    } else if (selectedContent.type === "study") {
        const { bigCategory, subCategory, fileName } = selectedContent.meta;
        fetchUrl = `/Blogs/study/${bigCategory}/${subCategory}/${fileName}`;
    }

    console.log("📡 FETCHING_TARGET_URL:", fetchUrl);

    fetch(fetchUrl)
        .then((res) => {
            if (!res.ok)
                throw new Error(`HTTP_STATUS_${res.status}: File not found`);
            return res.text();
        })
        .then((text) => {
            setSelectedContent((prev) => ({ ...prev, content: text }));
        })
        .catch((err) => {
            console.error("❌ Markdown Fetch Failed:", err.message);
            setSelectedContent((prev) => ({
                ...prev,
                content: `## ❌ FILE_LOAD_FAILURE\n\n**Reason:** \`${err.message}\`\n\n**Path:** \`public${fetchUrl}\``,
            }));
        });
    }, [selectedContent?.slug, setSelectedContent]);
}
