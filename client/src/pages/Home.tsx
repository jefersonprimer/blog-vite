import { useState, useEffect } from "react";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import PostFilter from "@/components/PostFilter";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { language } = useLanguage();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  
  // Fetch posts data
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['/api/posts'],
    staleTime: Infinity, // Keep this data fresh forever (or until page reload)
  });
  
  // Extract all unique tags from posts
  const allTags = posts ? Array.from(new Set(posts.flatMap((post: Post) => post.tags))) : [];
  
  // Update filtered posts when posts data changes
  useEffect(() => {
    if (posts) {
      setFilteredPosts(posts);
    }
  }, [posts]);
  
  // Handle filter change
  const handleFilter = (filtered: Post[]) => {
    setFilteredPosts(filtered);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Fernanda Kipper | Dev</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {language === "en" 
              ? "Learn about web development, cloud computing, programming, technology and careers. Here we talk about Java, Angular, AWS and much more. Practical content for those who want to update themselves, grow in their career and master the most used tools in the market."
              : "Aprenda sobre desenvolvimento web, cloud computing, programação, tecnologia e carreira. Aqui falamos de Java, Angular, AWS e muito mais. Conteúdo prático para quem quer se atualizar, crescer na carreira e dominar as ferramentas mais usadas no mercado."}
          </p>
          <div className="inline-flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">Clean Architecture</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">HTML</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">CSS</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">JavaScript</span>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      {posts && (
        <PostFilter 
          posts={posts} 
          onFilter={handleFilter} 
          allTags={allTags} 
        />
      )}
      
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
