export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400">
              Built with ❤️ by <a href="https://github.com/jefersonprimer" className="text-primary-600 dark:text-primary-400 hover:underline">@jefersonprimer</a>
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/jefersonprimer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              <i className="ri-github-fill text-xl"></i>
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://twitter.com/jefersonprimer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              <i className="ri-twitter-fill text-xl"></i>
              <span className="sr-only">Twitter</span>
            </a>
            <a href="https://linkedin.com/in/jefersonprimer" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              <i className="ri-linkedin-fill text-xl"></i>
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
