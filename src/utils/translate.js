// Modern translation utility using Fetch API
export const autoTranslate = async (text, targetLang) => {
  if (targetLang === 'en') return text;
  
  try {
    // Using LibreTranslate (free and open-source)
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text'
      })
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.warn('Translation failed, using original text:', error);
    return text; // Fallback to original text
  }
};

// Alternative translation function using Google Translate API (replaces MyMemory)
export const translateText = async (text, targetLang) => {
  if (targetLang === 'en') return text;

  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    
    if (response.ok) {
      const data = await response.json();
      return data[0][0][0] || text;
    }
    return text;
  } catch (error) {
    console.warn('Google Translate failed:', error);
    return text;
  }
};

