import { Link } from "wouter";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-xl font-bold">📝 PrimerDev</span>
          </div>
        </Link>
        
        {/* Navigation */}
        <nav className="flex items-center space-x-4">
          <Link href="/how-to-create">
            <div className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer mr-4">
              Create Post
            </div>
          </Link>
          <LanguageSelector />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
