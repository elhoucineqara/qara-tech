import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (!browser) return 'dark';
  try {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  } catch {
    return 'dark';
  }
}

function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>(getInitialTheme());

  function applyTheme(value: Theme) {
    if (!browser) return;
    const root = document.documentElement;
    if (value === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try {
      localStorage.setItem('theme', value);
    } catch {}
  }

  return {
    subscribe,
    set(value: Theme) {
      applyTheme(value);
      set(value);
    },
    toggle() {
      update((current) => {
        const next: Theme = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        return next;
      });
    },
    init() {
      if (!browser) return;
      const initial = getInitialTheme();
      applyTheme(initial);
      set(initial);
    }
  };
}

export const theme = createThemeStore();
