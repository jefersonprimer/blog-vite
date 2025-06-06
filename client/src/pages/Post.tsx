import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { useQuery } from "@tanstack/react-query";
import { Post, PostContent } from "@/types";
import { parseMarkdown } from "@/lib/markdownParser";

export default function PostPage() {
  const { language, setLanguage } = useLanguage();
  const [_, params] = useRoute("/posts/:postId");
  const postId = params?.postId;
  
  // Fetch post metadata
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['/api/posts'],
    staleTime: Infinity,
  });
  
  const post = posts?.find((p: Post) => p.id === postId);
  
  // Fetch post content
  const { data: content, isLoading: contentLoading } = useQuery({
    queryKey: [`/api/posts/${postId}/${language}`],
    enabled: !!postId,
    staleTime: Infinity,
  });
  
  const isLoading = postsLoading || contentLoading;
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as "en" | "pt-br");
  };
  
  if (!postId) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-5xl font-bold mb-6">404</h1>
          <p className="text-xl mb-8">
            {language === "en" 
              ? "Oops! The page you're looking for doesn't exist."
              : "Ops! A página que você está procurando não existe."}
          </p>
          <Link href="/">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              {language === "en" ? "Back to Home" : "Voltar para Início"}
            </div>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Post Navigation */}
        <div className="mb-6">
          <Link href="/">
            <div className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
              <i className="ri-arrow-left-line mr-1"></i>
              {language === "en" ? "Back to all posts" : "Voltar para todos os posts"}
            </div>
          </Link>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        )}
        
        {/* Post Not Found */}
        {!isLoading && !post && (
          <div className="text-center py-10">
            <h1 className="text-3xl font-bold mb-4">
              {language === "en" ? "Post not found" : "Post não encontrado"}
            </h1>
            <p className="mb-6">
              {language === "en" 
                ? "The post you're looking for doesn't exist."
                : "O post que você está procurando não existe."}
            </p>
            <Link href="/">
              <div className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                {language === "en" ? "Back to Home" : "Voltar para Início"}
              </div>
            </Link>
          </div>
        )}
        
        {/* Post Content */}
        {!isLoading && post && content && (
          <>
            {/* Author info */}
            <div className="flex items-center mb-6">
              <img 
                src="https://avatars.githubusercontent.com/u/158480212?v=4" 
                alt="Jeferson Primer" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-bold">Jeferson Primer</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <i className="ri-calendar-line mr-1"></i>
                  <span>{new Date(post.date).toLocaleDateString(language === 'pt-br' ? 'pt-BR' : 'en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                  <span className="mx-2">•</span>
                  <span>{Math.ceil(content.content.length / 1000)} min read</span>
                </div>
              </div>
              <div className="ml-auto">
                <select 
                  id="postLanguage" 
                  className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700"
                  value={language}
                  onChange={handleLanguageChange}
                >
                  <option value="en">English</option>
                  <option value="pt-br">Português</option>
                </select>
              </div>
            </div>

            {/* Post Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title[language]}</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                    <Link 
                      key={tag} 
                      href={`/blog/category/${tag.toLowerCase()}`}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs transition-colors"
                    >
                      {tag}
                    </Link>
                  </span>
                ))}
              </div>
              
              <div className="lg:flex lg:gap-6 items-start">
                {/* <div className="lg:order-2 lg:w-2/5 mb-6 lg:mb-0 lg:sticky lg:top-24">
                  <img 
                    src={post.coverImage} 
                    alt={post.title[language]} 
                    className="w-full rounded-xl object-cover"
                  />
                </div> */}
                
                <div className="lg:order-1 lg:w-5/5">
                  {/* Post Content */}
                  <article 
                    className="blog-content font-serif prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(content.content) }}
                  />
                </div>
              </div>
            </header>
          </>
        )}
      </div>
    </div>
  );
}
