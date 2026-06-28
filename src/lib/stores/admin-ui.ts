import { writable } from 'svelte/store';

export const adminPageTitle = writable('');
export const adminPageSubtitle = writable('');
export const adminRefresh = writable<(() => void | Promise<void>) | null>(null);
