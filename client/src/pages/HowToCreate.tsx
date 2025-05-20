import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";
import { parseMarkdown } from "@/lib/markdownParser";

export default function HowToCreate() {
  const { language } = useLanguage();
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/how-to-create-posts.md");
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error("Error loading guide:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuide();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/">
            <div className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
              <i className="ri-arrow-left-line mr-1"></i>
              {language === "en" ? "Back to all posts" : "Voltar para todos os posts"}
            </div>
          </Link>
        </div>
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === "en" ? "How to Create Posts" : "Como Criar Posts"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === "en" 
              ? "A guide to creating and managing content for your PrimerDev blog"
              : "Um guia para criar e gerenciar conteúdo para seu blog PrimerDev"}
          </p>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {/* Guide Content */}
        {!isLoading && markdownContent && (
          <article 
            className="blog-content prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdownContent) }}
          />
        )}
      </div>
    </div>
  );
}