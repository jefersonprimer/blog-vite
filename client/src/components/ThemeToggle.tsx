import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { ThemeProviderContext } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeProviderContext);
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <i className="ri-sun-line dark:hidden"></i>
      <i className="ri-moon-line hidden dark:block"></i>
    </Button>
  );
}
