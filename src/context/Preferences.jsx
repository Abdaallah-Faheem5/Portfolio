import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { data as english } from '../data/index.js';
import { ar } from '../data/translations.js';

const Preferences = createContext(null);
const protectedFields = new Set(['navigation', 'slug', 'icon', 'field', 'src', 'image', 'video', 'tech', 'tags', 'demo', 'github', 'linkedin', 'cv', 'email', 'phone', 'status']);
function translateContent(value, key) {
  if (protectedFields.has(key)) return value;
  if (typeof value === 'string') return ar[value] ?? value;
  if (Array.isArray(value)) return value.map((item) => translateContent(item));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([field, item]) => [field, translateContent(item, field)]));
  return value;
}
const arabic = translateContent(english);

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  const [language, setLanguage] = useState(() => document.documentElement.lang === 'ar' ? 'ar' : 'en');
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    window.dispatchEvent(new Event('resize'));
    try {
      localStorage.setItem('portfolio-theme', theme);
      localStorage.setItem('portfolio-language', language);
    } catch { /* Preferences still work when browser storage is unavailable. */ }
  }, [theme, language]);
  const t = (text) => language === 'ar' ? ar[text] ?? text : text;
  return <Preferences.Provider value={{ theme, setTheme, language, setLanguage, t, data: language === 'ar' ? arabic : english }}>{children}</Preferences.Provider>;
}

export const usePortfolio = () => useContext(Preferences);
