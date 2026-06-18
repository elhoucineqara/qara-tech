<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import { t, currentLang } from '$lib/i18n/i18n';
  import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
  import { tilt3d, reveal } from '$lib/actions/motion';

  interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    tags: string[];
    readTime: number;
    gradient: string;
  }

  let posts: BlogPost[] = [];
  let loading = true;
  let mounted = false;
  let selectedTag = 'all';

  const samplePosts: BlogPost[] = [
    {
      id: 1,
      title: 'Getting Started with SvelteKit',
      excerpt:
        'Learn how to build modern web applications with SvelteKit, the full-stack framework for the web.',
      author: 'El Houcine QARA',
      date: '2024-01-15',
      tags: ['SvelteKit', 'Web Development', 'Tutorial'],
      readTime: 5,
      gradient: 'from-orange-500 via-amber-500 to-yellow-500'
    },
    {
      id: 2,
      title: 'Mastering TypeScript for Better Code',
      excerpt:
        'Discover how TypeScript can improve your development experience and code quality.',
      author: 'El Houcine QARA',
      date: '2024-01-10',
      tags: ['TypeScript', 'Programming', 'Best Practices'],
      readTime: 8,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500'
    },
    {
      id: 3,
      title: 'Building Responsive Designs with TailwindCSS',
      excerpt:
        'Create beautiful, responsive user interfaces with TailwindCSS utility-first approach.',
      author: 'El Houcine QARA',
      date: '2024-01-05',
      tags: ['CSS', 'TailwindCSS', 'Design'],
      readTime: 6,
      gradient: 'from-cyan-500 via-teal-500 to-emerald-500'
    }
  ];

  onMount(() => {
    mounted = true;
    setTimeout(() => {
      posts = samplePosts;
      loading = false;
    }, 600);
  });

  $: filteredPosts =
    selectedTag === 'all' ? posts : posts.filter((post) => post.tags.includes(selectedTag));

  $: allTags = ['all', ...new Set(posts.flatMap((post) => post.tags))];

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
  <title>Blog — El Houcine QARA</title>
  <meta
    name="description"
    content="Articles about web development, programming and technology."
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<!-- Hero -->
<section class="relative pt-32 pb-12 sm:pt-40 overflow-hidden">
  <AnimatedBackground variant="aurora" />

  <div class="container relative z-10 text-center">
    {#if mounted}
      <div in:fly={{ y: 20, duration: 500 }} class="badge-glass mb-5">
        <i class="fa-solid fa-pen-nib text-amber-500"></i>
        {$t('blog.badge')}
      </div>
      <h1
        in:fly={{ y: 30, duration: 700, delay: 100 }}
        class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
      >
        {$t('blog.titlePart1')} <span class="text-gradient">{$t('blog.titleHighlight')}</span>
      </h1>
      <p
        in:fade={{ duration: 700, delay: 200 }}
        class="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
      >
        {$t('blog.subtitle')}
      </p>
    {/if}
  </div>
</section>

<!-- Tags filter -->
<section class="relative pb-8">
  <div class="container">
    <div class="flex flex-wrap justify-center gap-2">
      {#each allTags as tag}
        <button
          on:click={() => (selectedTag = tag)}
          class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                 {selectedTag === tag
            ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
            : 'bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/70 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-700/80'}"
        >
          {tag === 'all' ? $t('blog.filterAll') : tag}
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- Posts -->
<section class="relative pb-24">
  <div class="container">
    {#if loading}
      <div class="flex justify-center items-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    {:else if filteredPosts.length === 0}
      <div class="glass-card p-12 text-center max-w-lg mx-auto">
        <i class="fa-solid fa-file-lines text-5xl text-slate-300 dark:text-slate-600 mb-4"></i>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">{$t('blog.noPosts')}</h3>
        <p class="text-slate-600 dark:text-slate-300">{$t('blog.noPostsHint')}</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredPosts as post, index}
          <article
            class="group glass-card overflow-hidden reveal-scale lift hover:shadow-2xl transition-all duration-500"
            use:reveal={{ delay: index * 100 }}
            use:tilt3d={{ max: 8, scale: 1.02 }}
          >
            <div class="relative h-44 bg-gradient-to-br {post.gradient} overflow-hidden">
              <div class="absolute inset-0 bg-grid-light opacity-20"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-white text-6xl font-black opacity-30">{post.title.charAt(0)}</span>
              </div>
            </div>

            <div class="p-6">
              <div class="flex flex-wrap gap-1.5 mb-3">
                {#each post.tags.slice(0, 2) as tag}
                  <span class="badge-tech">{tag}</span>
                {/each}
              </div>

              <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {post.title}
              </h2>

              <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

              <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div class="flex items-center gap-2">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{formatDate(post.date, $currentLang)}</span>
                </div>
                <span class="flex items-center gap-1">
                  <i class="fa-solid fa-clock"></i>
                  {post.readTime} {$t('blog.minRead')}
                </span>
              </div>

              <button
                class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
              >
                {$t('blog.readMore')}
                <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
