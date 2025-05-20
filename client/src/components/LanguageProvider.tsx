import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "pt-br";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Get stored language or use browser language or default to English
  const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return "en";
    
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage === "en" || storedLanguage === "pt-br") {
      return storedLanguage;
    }
    
    // Check browser language
    const browserLanguage = navigator.language.toLowerCase();
    if (browserLanguage.startsWith("pt")) {
      return "pt-br";
    }
    
    return "en"; // Default to English
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  // Update document language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}