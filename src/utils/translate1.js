export const translateText = async (text, targetLang) => {
  if (targetLang === "en") return text;

  try {
    const response = await fetch(`https://libretranslate.com/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, source: "en", target: targetLang, format: "text" })
    });

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.warn("Translation failed:", error);
    return text;
  }
};
