import { Post } from "@/types";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/useLanguage";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { language } = useLanguage();
  
  return (
    <article className="post-card rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <img 
        src={post.coverImage} 
        alt={post.title[language]} 
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <i className="ri-calendar-line mr-1"></i>
            <span>{new Date(post.date).toLocaleDateString(language === 'pt-br' ? 'pt-BR' : 'en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
            {language.toUpperCase()}
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">{post.title[language]}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
          {post.description[language]}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/posts/${post.id}`}>
          <a className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline">
            {language === 'en' ? 'Read more' : 'Leia mais'}
            <i className="ri-arrow-right-line ml-1"></i>
          </a>
        </Link>
      </div>
    </article>
  );
}
