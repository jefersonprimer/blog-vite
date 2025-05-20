import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Post } from "@/types";

interface PostFilterProps {
  posts: Post[];
  onFilter: (filteredPosts: Post[]) => void;
  allTags: string[];
}

export default function PostFilter({ posts, onFilter, allTags }: PostFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const { language } = useLanguage();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterPosts(value, selectedTag);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTag(value);
    filterPosts(searchTerm, value);
  };

  const filterPosts = (term: string, tag: string) => {
    const filtered = posts.filter(post => {
      // Filter by search term (title or description)
      const termMatch = !term || 
        post.title[language].toLowerCase().includes(term.toLowerCase()) || 
        post.description[language].toLowerCase().includes(term.toLowerCase());
      
      // Filter by tag
      const tagMatch = !tag || post.tags.includes(tag);
      
      return termMatch && tagMatch;
    });
    
    onFilter(filtered);
  };

  return (
    <section className="mb-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <input 
                type="text" 
                placeholder={language === "en" ? "Search posts..." : "Buscar posts..."}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={handleSearch}
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          <div>
            <select 
              className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedTag}
              onChange={handleTagChange}
            >
              <option value="">{language === "en" ? "All Tags" : "Todas as Tags"}</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
