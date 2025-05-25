import { Post } from "@/types";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { language } = useLanguage();
  
  return (
    <article className="post-card overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <Link href={`/posts/${post.id}`}>
          <div className="md:w-[300px] h-[220px]">
            <img 
              src={post.coverImage} 
              alt={post.title[language]} 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </Link>
        <div className="p-5 md:w-2/3">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <i className="ri-calendar-line mr-1"></i>
              <span>{new Date(post.date).toLocaleDateString(language === 'pt-br' ? 'pt-BR' : 'en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {language.toUpperCase()}
            </div>
          </div>
          <Link href={`/posts/${post.id}`}>
            <h2 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {post.title[language]}
            </h2>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {post.description[language]}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Link 
                key={tag} 
                href={`/blog/category/${tag.toLowerCase()}`}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
          
          {/* Author Profile */}
          <div className="flex items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <img 
              src="https://avatars.githubusercontent.com/u/158480212?v=4" 
              alt="Jeferson Primer" 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-medium text-sm">Jeferson Primer</h3>
              <p className="text-xs text-#4B5563 dark:text-#FFFFFF">Software Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
