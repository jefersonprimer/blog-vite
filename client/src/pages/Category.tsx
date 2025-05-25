import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";

export default function Category() {
  const { language } = useLanguage();
  const [_, params] = useRoute("/blog/category/:category");
  const category = params?.category;
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<number>(6);
  
  // Fetch posts data
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
    staleTime: Infinity,
  });
  
  // Update filtered posts when posts data changes
  useEffect(() => {
    if (posts && category) {
      const filtered = posts.filter(post => 
        post.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [posts, category]);

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 6);
  };

  // If no category is provided, show a message
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "en" ? "Category Not Found" : "Categoria Não Encontrada"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {language === "en" 
              ? "Please select a valid category."
              : "Por favor, selecione uma categoria válida."}
          </p>
          <Link href="/">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-black text-white dark:text-black dark:bg-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer">
              {language === "en" ? "Back to Home" : "Voltar para Início"}
            </div>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <section className="mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize">
            {category}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {language === "en" 
              ? `Posts about ${category}`
              : `Posts sobre ${category}`}
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
              ? "No posts found in this category."
              : "Nenhum post encontrado nesta categoria."}
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