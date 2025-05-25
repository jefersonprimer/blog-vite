import { useState } from "react";
import { Link, useLocation } from "wouter";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import SearchModal from "./SearchModal";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/useLanguage";
import { Post } from "@/types";
import logo from "@/assets/logo.png";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { language } = useLanguage();
  const [location] = useLocation();
  
  // Fetch posts data for search functionality
  const { data: posts = [] } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
    staleTime: Infinity,
  });
  
  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };
  
  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchQuery("");
  };
  
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        <div className="flex items-center justify-between w-full max-w-6xl">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img src={logo} alt="Logo" width="120" height="80" className="w-32 h-26 dark:invert" />
              </div>
            </Link>
            
            {/* Search Input (Just for displaying/clicking) */}
            <div className="relative max-w-xs ml-4 md:ml-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder={language === "en" ? "Search posts..." : "Buscar posts..."}
                  className="w-40 md:w-64 py-2 pl-10 pr-4 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none cursor-pointer"
                  readOnly
                  onClick={handleSearchClick}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />
          </nav>
        </div>
      </div>
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={closeSearchModal} 
        initialSearchQuery={searchQuery}
        posts={posts}
      />
    </header>
  );
}
