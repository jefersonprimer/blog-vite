import { useState, useEffect } from "react";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { language } = useLanguage();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<number>(6);
  
  // Fetch posts data
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
    staleTime: Infinity, // Keep this data fresh forever (or until page reload)
  });
  
  // Update filtered posts when posts data changes
  useEffect(() => {
    if (posts) {
      setFilteredPosts(posts);
    }
  }, [posts]);

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 6);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Jeferson Primer | Dev</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {language === "en" 
              ? "Learn about web development, cloud computing, programming, technology and careers. Here we talk about Java, Angular, AWS and much more."
              : "Aprenda sobre desenvolvimento web, cloud computing, programação, tecnologia e carreira. Aqui falamos de Java, Angular, AWS e muito mais."}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {language === "en"
              ? "Practical content for those who want to update themselves, grow in their career and master the most used tools in the market."
              : "Conteúdo prático para quem quer se atualizar, crescer na carreira e dominar as ferramentas mais usadas no mercado."}
          </p>
        </div>
      </section>
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="max-w-3xl mx-auto text-center py-10">
          <h2 className="text-xl font-bold text-red-500 mb-2">
            {language === "en" ? "Error loading posts" : "Erro ao carregar posts"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {language === "en" 
              ? "Please try refreshing the page."
              : "Por favor, tente atualizar a página."}
          </p>
        </div>
      )}
      
      {/* Empty State */}
      {!isLoading && filteredPosts && filteredPosts.length === 0 && (
        <div className="max-w-3xl mx-auto text-center py-10">
          <h2 className="text-xl font-bold mb-2">
            {language === "en" ? "No posts found" : "Nenhum post encontrado"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {language === "en" 
              ? "Try adjusting your search or filter criteria."
              : "Tente ajustar sua busca ou critérios de filtro."}
          </p>
        </div>
      )}
      
      {/* Posts Grid */}
      {!isLoading && filteredPosts && filteredPosts.length > 0 && (
        <section>
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {filteredPosts.slice(0, visiblePosts).map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          {/* Load More Button */}
          {visiblePosts < filteredPosts.length && (
            <div className="flex justify-center items-center w-full mt-8 mb-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-black text-white dark:text-black dark:bg-white rounded-lg hover:bg-primary-700 transition-colors text-center"
              >
                {language === "en" ? "Load more posts" : "Carregar mais posts"}
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
