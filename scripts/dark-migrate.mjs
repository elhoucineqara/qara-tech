import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const files = [
  'src/routes/+page.svelte',
  'src/routes/+layout.svelte',
  'src/routes/about/+page.svelte',
  'src/routes/projects/+page.svelte',
  'src/routes/skills/+page.svelte',
  'src/routes/experience/+page.svelte',
  'src/routes/services/+page.svelte',
  'src/routes/education/+page.svelte',
  'src/routes/contact/+page.svelte',
  'src/routes/blog/+page.svelte'
];

const subs = [
  ['text-slate-900', 'dark:text-white'],
  ['text-slate-800', 'dark:text-slate-100'],
  ['text-slate-700', 'dark:text-slate-200'],
  ['text-slate-600', 'dark:text-slate-300'],
  ['text-slate-500', 'dark:text-slate-400'],
  ['text-slate-400', 'dark:text-slate-500'],
  ['text-slate-300', 'dark:text-slate-600'],
  ['bg-white/80', 'dark:bg-slate-800/80'],
  ['bg-white/70', 'dark:bg-slate-800/70'],
  ['bg-white/60', 'dark:bg-slate-800/60'],
  ['border-slate-200', 'dark:border-slate-700'],
  ['border-slate-100', 'dark:border-slate-700'],
  ['bg-slate-50', 'dark:bg-slate-800/50'],
  ['bg-emerald-50', 'dark:bg-emerald-500/10'],
  ['border-emerald-100', 'dark:border-emerald-500/20'],
  ['border-emerald-200', 'dark:border-emerald-500/30'],
  ['text-emerald-700', 'dark:text-emerald-300'],
  ['text-emerald-600', 'dark:text-emerald-400'],
  ['bg-rose-50', 'dark:bg-rose-500/10'],
  ['border-rose-200', 'dark:border-rose-500/30'],
  ['text-rose-700', 'dark:text-rose-300'],
  ['bg-amber-50/80', 'dark:bg-amber-500/15'],
  ['text-amber-700', 'dark:text-amber-300'],
  ['text-purple-700', 'dark:text-purple-300'],
  ['text-purple-600', 'dark:text-purple-400'],
  ['placeholder-slate-400', 'dark:placeholder-slate-500'],
  ['hover:text-slate-900', 'dark:hover:text-white'],
  ['ring-white', 'dark:ring-slate-900'],
  ['via-purple-300/60', 'dark:via-purple-500/40'],
  ['bg-purple-300/40', 'dark:bg-purple-600/25'],
  ['bg-pink-300/40', 'dark:bg-pink-600/25'],
  ['bg-blue-300/40', 'dark:bg-blue-600/25'],
  ['bg-cyan-300/40', 'dark:bg-cyan-600/25'],
  ['bg-indigo-300/40', 'dark:bg-indigo-600/25'],
  ['bg-amber-300/40', 'dark:bg-amber-600/25'],
  ['from-indigo-50', 'dark:from-indigo-500/15'],
  ['to-pink-50', 'dark:to-pink-500/15'],
  ['hover:bg-indigo-100', 'dark:hover:bg-indigo-500/20'],
  ['hover:text-purple-600', 'dark:hover:text-purple-400'],
  ['hover:text-purple-800', 'dark:hover:text-purple-300'],
  ['group-hover:text-purple-600', 'dark:group-hover:text-purple-400']
];

for (const rel of files) {
  const path = join(root, rel);
  if (!existsSync(path)) {
    console.log('skip', rel);
    continue;
  }
  let content = readFileSync(path, 'utf8');
  const before = content;

  for (const [cls, dark] of subs) {
    const re = new RegExp(`(?<!dark:)(?<![\\w-])${cls.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\s+dark:)`, 'g');
    content = content.replace(re, `${cls} ${dark}`);
  }

  // bg-white alone (not opacity)
  content = content.replace(/(?<!dark:)(?<![\w-/])bg-white(?![\w-/])(?!\s+dark:)/g, 'bg-white dark:bg-slate-900');

  if (content !== before) {
    writeFileSync(path, content);
    console.log('updated', rel);
  } else {
    console.log('unchanged', rel);
  }
}

console.log('done');
