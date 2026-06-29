/**
 * A simple, lightweight markdown-to-HTML parser.
 * Converts basic markdown syntax (headings, bold, italic, lists, blockquotes, code blocks)
 * into styled HTML strings.
 */
export function renderMarkdown(markdown: string): string {
  if (!markdown) return '';

  // 1. Basic escaping or preprocessing
  let html = markdown;

  // 2. Headings (###, ##, #)
  html = html
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 text-slate-800 dark:text-slate-100">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold mt-10 mb-5 text-slate-900 dark:text-white">$1</h1>');

  // 3. Bold (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>');

  // 4. Italic (*text*)
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // 5. Blockquotes (> text)
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-purple-500 pl-4 py-2 my-4 italic text-slate-700 dark:text-slate-300 bg-purple-500/5 dark:bg-purple-500/10 rounded-r-lg">$1</blockquote>');

  // 6. Code blocks (```lang ... ```)
  // Let's handle multi-line code blocks
  html = html.replace(/```(?:[a-z]+)?\n([\s\S]*?)\n```/gm, '<pre class="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-sm overflow-x-auto my-6 border border-slate-800">$1</pre>');

  // 7. Inline code (`code`)
  html = html.replace(/`(.*?)`/g, '<code class="bg-slate-100 dark:bg-slate-800 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>');

  // 8. Process paragraphs and lists line by line
  const lines = html.split('\n');
  let inList = false;
  const processedLines = lines.map(line => {
    const trimmed = line.trim();

    // Unordered lists (- item)
    if (trimmed.startsWith('- ')) {
      let result = '';
      if (!inList) {
        inList = true;
        result += '<ul class="list-disc list-inside my-4 space-y-2 text-slate-700 dark:text-slate-300">';
      }
      result += `<li class="ml-4">${trimmed.substring(2)}</li>`;
      return result;
    } else if (inList && !trimmed.startsWith('- ')) {
      inList = false;
      return '</ul>' + (trimmed ? `<p class="my-4 leading-relaxed text-slate-700 dark:text-slate-300">${trimmed}</p>` : '');
    }

    // Empty lines
    if (!trimmed) return '';

    // Check if the line is already wrapped in a block element
    if (
      trimmed.startsWith('<h') ||
      trimmed.startsWith('<blockquote') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('<li') ||
      trimmed.startsWith('<pre') ||
      trimmed.startsWith('</pre>') ||
      trimmed.startsWith('</ul')
    ) {
      return trimmed;
    }

    return `<p class="my-4 leading-relaxed text-slate-700 dark:text-slate-300 text-base sm:text-lg">${trimmed}</p>`;
  });

  if (inList) {
    processedLines.push('</ul>');
  }

  return processedLines.filter(Boolean).join('\n');
}
