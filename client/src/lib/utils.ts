import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date with the specified language
 */
export function formatDate(date: string, language: string) {
  return new Date(date).toLocaleDateString(
    language === "pt-br" ? "pt-BR" : "en-US", 
    { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    }
  );
}

/**
 * Extracts unique tags from an array of posts
 */
export function extractUniqueTags(posts: any[]) {
  if (!posts || !Array.isArray(posts)) return [];
  
  const allTags: string[] = posts.flatMap(post => post.tags || []);
  return Array.from(new Set(allTags));
}

/**
 * Creates a URL-friendly slug from a string
 */
export function createSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
