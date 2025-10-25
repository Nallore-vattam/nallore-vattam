// utils/translate.js
export const autoTranslate = async (text, targetLang) => {
  if (!text || targetLang === "en") return text;

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en|${targetLang}`;

    console.log("🔹 Translating:", text, "→", targetLang);

    const response = await fetch(url);
    const data = await response.json();

    if (data?.responseData?.translatedText) {
      console.log("✅ Translated:", data.responseData.translatedText);
      return data.responseData.translatedText;
    } else {
      console.warn("⚠️ No translation found for:", text);
      return text;
    }
  } catch (error) {
    console.error("❌ MyMemory translation failed:", error);
    return text;
  }
};

export const translateText = autoTranslate;
