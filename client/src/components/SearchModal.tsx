import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { Post } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  posts: Post[];
}

export default function SearchModal({ isOpen, onClose, searchQuery, posts }: SearchModalProps) {
  const { language } = useLanguage();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Filter posts based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = posts.filter((post) => {
      const titleMatches = post.title[language].toLowerCase().includes(query);
      const idMatches = post.id.toLowerCase().includes(query);
      const tagMatches = post.tags.some(tag => tag.toLowerCase().includes(query));
      
      return titleMatches || idMatches || tagMatches;
    });
    
    setFilteredPosts(filtered);
  }, [searchQuery, posts, language]);
  
  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Close on escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-16 px-4">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[70vh] overflow-hidden"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium">
            {language === "en" ? "Search Results" : "Resultados da Busca"}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(70vh-60px)]">
          {filteredPosts.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              {searchQuery.trim() === "" 
                ? (language === "en" ? "Type to search..." : "Digite para pesquisar...")
                : (language === "en" ? "No posts found" : "Nenhum post encontrado")}
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPosts.map((post) => (
                <li key={post.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Link href={`/posts/${post.id}`} onClick={onClose}>
                    <div className="cursor-pointer">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-blue-600 dark:text-blue-400">
                          {post.title[language]}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          {post.id}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-2 py-0.5 bg-gray-100 dark:bg-gray-600 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}