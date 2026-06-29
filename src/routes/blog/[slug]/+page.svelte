<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { t, currentLang } from '$lib/i18n/i18n';
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
    gradient: string;
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

  <div class="container relative z-10 max-w-4xl mx-auto px-4">
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
      <article in:fly={{ y: 30, duration: 600 }}>
        <!-- Hero Header -->
        <header class="text-center mb-10">
          <div class="flex flex-wrap justify-center gap-2 mb-4">
            {#each post.tags as tag}
              <span class="badge-tech text-xs px-3 py-1">{tag}</span>
            {/each}
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
            {title}
          </h1>

          <div class="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span class="flex items-center gap-1.5">
              <i class="fa-solid fa-user text-xs"></i>
              {post.author}
            </span>
            <span>•</span>
            <span class="flex items-center gap-1.5">
              <i class="fa-solid fa-calendar text-xs"></i>
              {formatDate(post.date, $currentLang)}
            </span>
            <span>•</span>
            <span class="flex items-center gap-1.5">
              <i class="fa-solid fa-clock text-xs"></i>
              {post.readTime} {$t('blog.minRead')}
            </span>
          </div>
        </header>

        <!-- Cover Image / Gradient -->
        <div class="relative w-full h-[250px] sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl mb-12 group">
          {#if post.image}
            <img
              src={post.image}
              alt={title}
              class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
          {:else}
            <div class="absolute inset-0 bg-gradient-to-br {post.gradient}"></div>
            <div class="absolute inset-0 bg-grid-light opacity-20"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-white text-9xl font-black opacity-25">{title.charAt(0)}</span>
            </div>
          {/if}
        </div>

        <!-- Article Content -->
        <div class="glass-card p-6 sm:p-10 md:p-12 shadow-xl border border-white/40 dark:border-slate-800/40">
          <div class="prose prose-slate dark:prose-invert max-w-none">
            {@html renderedHtml}
          </div>

          <!-- AdSense Advertisement -->
          <div class="mt-8 pt-8 border-t border-slate-200/40 dark:border-slate-800/40">
            <!-- Remplacer 'slot' par l'ID de votre bloc d'annonce AdSense (ex: slot="1234567890") -->
            <AdSense client="ca-pub-7245366364935377" slot="1234567890" format="auto" responsive={true} />
          </div>
        </div>
      </article>
    {/if}
  </div>
</div>

<style>
  /* Custom styles for the markdown content */
  :global(.prose p) {
    margin-bottom: 1.5rem;
    line-height: 1.75;
  }
  :global(.prose ul) {
    margin-bottom: 1.5rem;
  }
  :global(.prose li) {
    margin-bottom: 0.5rem;
  }
</style>
