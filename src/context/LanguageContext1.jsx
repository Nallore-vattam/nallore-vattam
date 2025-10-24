import React, { createContext, useState, useContext, useEffect } from "react";
import { translateText } from "../utils/translate1";

export const LanguageContext1 = createContext();

export const LanguageProvider1 = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);

  const t = (text) => translations[text] || text;

  const translateContent = async (jsonContent) => {
    if (currentLanguage === "en") return jsonContent;

    setIsTranslating(true);
    const translatedContent = { ...jsonContent };

    const keys = Object.keys(jsonContent);
    for (let key of keys) {
      if (typeof jsonContent[key] === "string") {
        translatedContent[key] = await translateText(jsonContent[key], currentLanguage);
      } else if (Array.isArray(jsonContent[key])) {
        translatedContent[key] = jsonContent[key].map(async (item) => {
          if (typeof item === "string") return await translateText(item, currentLanguage);
          else if (typeof item === "object") return await translateContent(item);
          return item;
        });
        translatedContent[key] = await Promise.all(translatedContent[key]);
      } else if (typeof jsonContent[key] === "object") {
        translatedContent[key] = await translateContent(jsonContent[key]);
      }
    }

    setIsTranslating(false);
    return translatedContent;
  };

  useEffect(() => {
    setTranslations({});
  }, [currentLanguage]);

  return (
    <LanguageContext1.Provider value={{ currentLanguage, setCurrentLanguage, t, translateContent, isTranslating }}>
      {children}
    </LanguageContext1.Provider>
  );
};

export const useLanguage1 = () => useContext(LanguageContext1);
