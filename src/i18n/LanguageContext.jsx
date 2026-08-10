import React, { createContext, useContext, useState, useEffect } from "react";
import { en } from "./translations/en";
import { hi } from "./translations/hi";
import { mr } from "./translations/mr";

const translations = {
  en,
  hi,
  mr,
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem("lang", lang);
    }
  };

  /**
   * Helper function to translate keys using dot notation
   * e.g., t("home.welcome") or t("nav.home")
   */
  const t = (path, fallback = "") => {
    if (!path) return "";
    const keys = path.split(".");
    
    // First search in selected language dictionary
    let current = translations[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        current = null;
        break;
      }
    }

    if (current && typeof current === "string") {
      return current;
    }

    // Fallback to English dictionary if not found in target language
    let englishCurrent = translations.en;
    for (const key of keys) {
      if (englishCurrent && englishCurrent[key] !== undefined) {
        englishCurrent = englishCurrent[key];
      } else {
        englishCurrent = null;
        break;
      }
    }

    if (englishCurrent && typeof englishCurrent === "string") {
      return englishCurrent;
    }

    return fallback || path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
