<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { t, currentLang } from '$lib/i18n/i18n';
  import { page } from '$app/stores';
  import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
  import { renderMarkdown } from '$lib/utils/markdown';
  import AdSense from '$lib/components/AdSense.svelte';

  interface BlogPost {
    slug: string;
    title: { en: string; fr: string };
    excerpt: { en: string; fr: string };
    content: { en: string; fr: string };
    author: string;
    date: string;
    tags: string[];
    readTime: number;
    image: string;
  }

  export let data: { post: BlogPost };

  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  $: post = data.post;
  $: title = post.title[$currentLang] || post.title.en;
  $: excerpt = post.excerpt[$currentLang] || post.excerpt.en;
  $: rawContent = post.content[$currentLang] || post.content.en;
  $: renderedHtml = renderMarkdown(rawContent);

  function formatDate(dateString: string, lang: string): string {
    const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  let copySuccess = false;
  function copyLink() {
    navigator.clipboard.writeText($page.url.href);
    copySuccess = true;
    setTimeout(() => { copySuccess = false; }, 2000);
  }
</script>

<svelte:head>
  <title>{title} — El Houcine QARA</title>
  <meta name="description" content={excerpt} />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<!-- Background -->
<div class="relative min-h-screen pt-24 pb-20 overflow-hidden">
  <AnimatedBackground variant="aurora" />

  <div class="container relative z-10 max-w-7xl mx-auto px-4">
    <!-- Back to Blog Button -->
    <div class="mb-8">
      <a
        href="/blog"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
               bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/70 dark:border-slate-700
               text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400
               hover:-translate-x-1 transition-all duration-300 shadow-sm"
      >
        <i class="fa-solid fa-arrow-left"></i>
        {$t('blog.backToBlog')}
      </a>
    </div>

    {#if mounted}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8" in:fly={{ y: 30, duration: 600 }}>
        <!-- Main Content -->
        <article class="lg:col-span-8 xl:col-span-8">
          <!-- Hero Header -->
          <header class="mb-10">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              {title}
            </h1>

            <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span class="flex items-center gap-1.5">
                <i class="fa-solid fa-clock text-xs"></i>
                {post.readTime} {$t('blog.minRead')}
              </span>
            </div>
          </header>

          <!-- Cover Image -->
          <div class="relative w-full h-[250px] sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl mb-12 group">
            <img
              src={post.image}
              alt={title}
              class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
          </div>

          <!-- Article Content -->
          <div class="glass-card p-6 sm:p-10 md:p-12 shadow-xl border border-white/40 dark:border-slate-800/40 mb-8">
            <div class="prose prose-slate dark:prose-invert max-w-none">
              {@html renderedHtml}
            </div>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="lg:col-span-4 xl:col-span-4">
          <div class="sticky top-28 space-y-6">
            <!-- Author Card -->
            <div class="glass-card p-6 shadow-xl border border-white/40 dark:border-slate-800/40">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">À propos de l'auteur</h3>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/30">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p class="font-bold text-slate-900 dark:text-white">{post.author}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">{formatDate(post.date, $currentLang)}</p>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div class="glass-card p-6 shadow-xl border border-white/40 dark:border-slate-800/40">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Tags</h3>
              <div class="flex flex-wrap gap-2">
                {#each post.tags as tag}
                  <span class="badge-tech text-xs px-3 py-1">{tag}</span>
                {/each}
              </div>
            </div>

            <!-- Share Buttons -->
            <div class="glass-card p-6 shadow-xl border border-white/40 dark:border-slate-800/40">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">{$t('blog.shareArticle') || 'Partager cet article'}</h3>
              <div class="flex flex-col gap-3">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + $page.url.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-between px-4 py-2.5 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500 hover:text-white transition-all border border-green-500/20"
                >
                  <span class="font-medium">WhatsApp</span>
                  <i class="fa-brands fa-whatsapp text-lg"></i>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent($page.url.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-between px-4 py-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all border border-blue-500/20"
                >
                  <span class="font-medium">Facebook</span>
                  <i class="fa-brands fa-facebook-f text-lg"></i>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent($page.url.href)}&text=${encodeURIComponent(title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-between px-4 py-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500 hover:text-white transition-all border border-sky-500/20"
                >
                  <span class="font-medium">Twitter</span>
                  <i class="fa-brands fa-twitter text-lg"></i>
                </a>
                <button
                  on:click={copyLink}
                  class="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-500/10 text-slate-700 dark:text-slate-300 hover:bg-slate-600 hover:text-white transition-all border border-slate-500/20"
                >
                  <span class="font-medium">{copySuccess ? ($t('blog.copied') || 'Copié !') : ($t('blog.copyLink') || 'Copier le lien')}</span>
                  <i class="fa-solid {copySuccess ? 'fa-check' : 'fa-link'} text-lg"></i>
                </button>
              </div>
            </div>

            <!-- AdSense Advertisement -->
            <div class="glass-card p-6 shadow-xl border border-white/40 dark:border-slate-800/40">
              <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Publicité</h3>
              <AdSense client="ca-pub-7245366364935377" slot="1234567890" format="auto" responsive={true} />
            </div>
          </div>
        </aside>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Custom styles for the markdown content */
  :global(.prose h2) {
    font-size: 2rem !important;
    font-weight: 800 !important;
    margin-top: 3rem !important;
    margin-bottom: 1.5rem !important;
    color: inherit;
    line-height: 1.3;
  }
  :global(.prose h3) {
    font-size: 1.5rem !important;
    font-weight: 700 !important;
    margin-top: 2rem !important;
    margin-bottom: 1rem !important;
    color: inherit;
  }
  :global(.prose p) {
    margin-bottom: 1.5rem;
    line-height: 1.8;
    font-size: 1.125rem;
  }
  :global(.prose ul) {
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
  }
  :global(.prose li) {
    margin-bottom: 0.5rem;
  }
  :global(.prose blockquote) {
    border-left-color: #9333ea;
    background-color: rgba(147, 51, 234, 0.05);
    padding: 1rem 1.5rem;
    border-radius: 0 0.5rem 0.5rem 0;
    font-style: italic;
    margin: 2rem 0;
  }
</style>
