import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import en from './translations/en.json';
import fr from './translations/fr.json';

export type Lang = 'en' | 'fr';

export const languages: Record<Lang, { label: string; short: string; flag: string }> = {
  en: { label: 'English', short: 'EN', flag: 'https://flagcdn.com/w320/us.png' },
  fr: { label: 'Français', short: 'FR', flag: 'https://flagcdn.com/w320/fr.png' }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dictionaries: Record<Lang, any> = { en, fr };

const STORAGE_KEY = 'qara_lang';

function getInitialLang(): Lang {
  if (!browser) return 'en';
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === 'en' || stored === 'fr') return stored;
  } catch {
    /* ignore */
  }
  return 'en';
}

function createLangStore() {
  const { subscribe, set } = writable<Lang>('en');

  return {
    subscribe,
    set: (lang: Lang) => {
      set(lang);
      if (browser) {
        try {
          localStorage.setItem(STORAGE_KEY, lang);
          document.documentElement.setAttribute('lang', lang);
        } catch {
          /* ignore */
        }
      }
    },
    init: () => {
      if (!browser) return;
      const initial = getInitialLang();
      set(initial);
      try {
        document.documentElement.setAttribute('lang', initial);
      } catch {
        /* ignore */
      }
    },
    toggle: () => {
      if (!browser) return;
      const current = (localStorage.getItem(STORAGE_KEY) as Lang) || 'en';
      const next: Lang = current === 'en' ? 'fr' : 'en';
      set(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
        document.documentElement.setAttribute('lang', next);
      } catch {
        /* ignore */
      }
    }
  };
}

export const currentLang = createLangStore();

export const t = derived(currentLang, ($currentLang) => (key: string): string => {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = keys.reduce<any>((obj, k) => (obj != null ? obj[k] : undefined), dictionaries[$currentLang]);
  if (typeof value === 'string') return value;
  // Fallback to English if missing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fallback = keys.reduce<any>((obj, k) => (obj != null ? obj[k] : undefined), dictionaries.en);
  return typeof fallback === 'string' ? fallback : key;
});
