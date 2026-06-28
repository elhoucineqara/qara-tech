<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { t } from '$lib/i18n/i18n';
  import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
  import { tilt3d, reveal } from '$lib/actions/motion';

  let mounted = false;
  let selectedCategory = 'all';

  interface Project {
    id: number;
    key: string;
    title: string;
    subtitle?: string;
    description: string;
    technologies: string[];
    category: string;
    demoUrl?: string;
    githubUrl?: string;
    impact: string;
    featured?: boolean;
    gradient: string;
    icon: string;
    image?: string;
    logo?: string;
  }

  $: projects = [
    {
      id: 1,
      key: 'harx',
      title: $t('projects.items.harx.title'),
      subtitle: $t('projects.items.harx.subtitle'),
      description: $t('projects.items.harx.description'),
      technologies: ['Laravel', 'React', 'Svelte', 'Node.js', 'WebRTC', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'OpenAI'],
      category: 'Enterprise',
      demoUrl: 'http://harx.ai/',
      featured: true,
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      icon: 'fa-solid fa-headset',
      image: '/images/HARX.png',
      logo: '/images/harx-mascotte.webp',
      impact: $t('projects.items.harx.impact')
    },
    {
      id: 2,
      key: 'lms',
      title: $t('projects.items.lms.title'),
      subtitle: $t('projects.items.lms.subtitle'),
      description: $t('projects.items.lms.description'),
      technologies: ['SvelteKit', 'Laravel', 'Node.js', 'MySQL', 'MongoDB', 'RESTful API', 'WebSockets'],
      category: 'Education',
      demoUrl: 'https://learn.qaranetwork.com/',
      featured: true,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      icon: 'fa-solid fa-graduation-cap',
      image: '/images/dar-al-ilm.png',
      logo: '/images/logo_dar-alilm.svg',
      impact: $t('projects.items.lms.impact')
    },
    {
      id: 3,
      key: 'hr',
      title: $t('projects.items.hr.title'),
      description: $t('projects.items.hr.description'),
      technologies: ['Laravel', 'React', 'MySQL', 'RESTful API', 'Bootstrap'],
      category: 'Enterprise',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      icon: 'fa-solid fa-users-gear',
      impact: $t('projects.items.hr.impact')
    },
    {
      id: 4,
      key: 'portfolio',
      title: $t('projects.items.portfolio.title'),
      description: $t('projects.items.portfolio.description'),
      technologies: ['SvelteKit', 'TypeScript', 'TailwindCSS', 'OpenAI API', 'Vite'],
      category: 'Personal',
      gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
      icon: 'fa-solid fa-robot',
      githubUrl: 'https://github.com/elhoucineqara',
      impact: $t('projects.items.portfolio.impact')
    },
    {
      id: 5,
      key: 'ecommerce',
      title: $t('projects.items.ecommerce.title'),
      description: $t('projects.items.ecommerce.description'),
      technologies: ['Laravel', 'Vue.js', 'MySQL', 'Stripe', 'PayPal', 'Redis', 'Docker'],
      category: 'E-Commerce',
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      icon: 'fa-solid fa-cart-shopping',
      impact: $t('projects.items.ecommerce.impact')
    },
    {
      id: 6,
      key: 'chat',
      title: $t('projects.items.chat.title'),
      description: $t('projects.items.chat.description'),
      technologies: ['Node.js', 'React', 'WebSockets', 'MongoDB', 'Redis', 'WebRTC'],
      category: 'Communication',
      gradient: 'from-sky-500 via-blue-500 to-indigo-500',
      icon: 'fa-solid fa-comments',
      impact: $t('projects.items.chat.impact')
    }
  ] as Project[];

  onMount(() => (mounted = true));

  let expandedTech = new Set<number>();
  function toggleTech(id: number) {
    if (expandedTech.has(id)) expandedTech.delete(id);
    else expandedTech.add(id);
    expandedTech = expandedTech;
  }

  function categoryLabel(category: string): string {
    if (category === 'all') return $t('projects.filter.all');
    const translated = $t(`projects.categories.${category}`);
    return translated && translated !== `projects.categories.${category}` ? translated : category;
  }

  $: categories = ['all', ...new Set(projects.map((p) => p.category))];
  $: filteredProjects =
    selectedCategory === 'all' ? projects : projects.filter((p) => p.category === selectedCategory);
</script>

<svelte:head>
  <title>Projects · El Houcine QARA</title>
  <meta
    name="description"
    content="Portfolio of web platforms — HARX contact center, Dar Al-Ilm LMS, HR automation, e-commerce and more."
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<!-- Header section -->
<section class="relative pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden">
  <AnimatedBackground variant="aurora" />

  <div class="container relative z-10 text-center">
    {#if mounted}
      <div in:fly={{ y: 20, duration: 500 }} class="badge-glass mb-5">
        <i class="fa-solid fa-layer-group text-purple-500"></i>
        {$t('projects.badge')}
      </div>
      <h1
        in:fly={{ y: 30, duration: 600, delay: 100 }}
        class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
      >
        {$t('projects.titlePart1')} <span class="text-gradient">{$t('projects.titleHighlight')}</span>
      </h1>
      <p
        in:fade={{ duration: 600, delay: 200 }}
        class="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
      >
        {$t('projects.subtitle')}
      </p>
    {/if}
  </div>
</section>

<!-- Featured projects (live URLs) -->
{#if mounted}
  <section class="relative pb-12">
    <div class="container">
      <div class="flex items-center gap-3 mb-6">
        <span class="badge-glass">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {$t('projects.live')}
        </span>
        <div class="h-px flex-1 bg-gradient-to-r from-purple-200 to-transparent"></div>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        {#each projects.filter((p) => p.featured) as project, i}
          <div
            class="group glass-card overflow-hidden reveal-scale lift hover:shadow-2xl transition-all duration-500"
            use:reveal={{ delay: i * 120 }}
            use:tilt3d={{ max: 6, scale: 1.01 }}
          >
            <!-- Screenshot block -->
            <div class="relative h-64 bg-gradient-to-br {project.gradient} overflow-hidden">
              {#if project.image}
                <img
                  src={project.image}
                  alt="{project.title} screenshot"
                  class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              {:else}
                <div class="absolute inset-0 bg-grid-light opacity-20"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <i class="{project.icon} text-white text-7xl drop-shadow-2xl"></i>
                </div>
              {/if}
              <div class="absolute top-4 right-4 badge-glass">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {$t('common.live')}
              </div>
              <div class="absolute top-4 left-4 badge-glass">
                {categoryLabel(project.category)}
              </div>
            </div>

            <div class="p-6">
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  {#if project.logo}
                    <div class="w-14 h-14 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={project.logo}
                        alt="{project.title} logo"
                        class="w-12 h-12 object-contain"
                        loading="lazy"
                      />
                    </div>
                  {/if}
                  <div>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                    {#if project.subtitle}
                      <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{project.subtitle}</p>
                    {/if}
                  </div>
                </div>
              </div>

              <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-5">{project.description}</p>

              <div class="flex flex-wrap gap-2 mb-5">
                {#each expandedTech.has(project.id) ? project.technologies : project.technologies.slice(0, 6) as tech}
                  <span class="badge-tech">{tech}</span>
                {/each}
                {#if project.technologies.length > 6}
                  <button
                    type="button"
                    on:click|preventDefault|stopPropagation={() => toggleTech(project.id)}
                    class="badge-tech hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition cursor-pointer"
                    aria-label="Show all technologies"
                  >
                    {#if expandedTech.has(project.id)}
                      <i class="fa-solid fa-minus text-[10px]"></i> {$t('common.showLess')}
                    {:else}
                      +{project.technologies.length - 6}
                    {/if}
                  </button>
                {/if}
              </div>

              <div
                class="mb-5 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 dark:border-emerald-500/20"
              >
                <p class="text-sm text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                  <i class="fa-solid fa-chart-line mt-0.5"></i>
                  <span>{project.impact}</span>
                </p>
              </div>

              <div class="flex gap-3">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 btn-primary-gradient shine !py-2.5"
                >
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  {$t('projects.actions.visitLive')}
                </a>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
{/if}

<!-- Filter -->
<section class="relative py-8">
  <div class="container">
    <div class="flex items-center gap-3 mb-6">
      <span class="badge-glass">
        <i class="fa-solid fa-filter text-indigo-500"></i>
        {$t('projects.all')}
      </span>
      <div class="h-px flex-1 bg-gradient-to-r from-indigo-200 to-transparent"></div>
    </div>

    <div class="flex flex-wrap gap-2.5">
      {#each categories as category}
        <button
          on:click={() => (selectedCategory = category)}
          class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                 {selectedCategory === category
            ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
            : 'bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/70 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-700/80'}"
        >
          {categoryLabel(category)}
        </button>
      {/each}
    </div>
  </div>
</section>

<!-- All projects grid -->
<section class="relative pb-24">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredProjects as project, i (project.id)}
        <div
          class="group glass-card overflow-hidden reveal lift hover:shadow-xl transition-all duration-500"
          use:reveal={{ delay: i * 80 }}
          use:tilt3d={{ max: 8, scale: 1.02 }}
        >
          <div class="relative h-40 bg-gradient-to-br {project.gradient} overflow-hidden">
            {#if project.image}
              <img
                src={project.image}
                alt="{project.title} screenshot"
                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            {:else}
              <div class="absolute inset-0 bg-grid-light opacity-20"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <i class="{project.icon} text-white text-5xl drop-shadow-lg"></i>
              </div>
            {/if}
            <div class="absolute top-3 left-3 badge-glass !text-[10px]">
              {categoryLabel(project.category)}
            </div>
            {#if project.demoUrl}
              <div class="absolute top-3 right-3 badge-glass !text-[10px]">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                {$t('common.live')}
              </div>
            {/if}
          </div>

          <div class="p-5">
            <div class="flex items-center gap-2.5 mb-1">
              {#if project.logo}
                <div class="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={project.logo} alt="{project.title} logo" class="w-6 h-6 object-contain" loading="lazy" />
                </div>
              {/if}
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">{project.title}</h3>
            </div>
            {#if project.subtitle}
              <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">{project.subtitle}</p>
            {/if}
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>

            <div class="flex flex-wrap gap-1.5 mb-4">
              {#each expandedTech.has(project.id) ? project.technologies : project.technologies.slice(0, 3) as tech}
                <span class="badge-tech !text-[10px] !px-2 !py-0.5">{tech}</span>
              {/each}
              {#if project.technologies.length > 3}
                <button
                  type="button"
                  on:click|preventDefault|stopPropagation={() => toggleTech(project.id)}
                  class="badge-tech !text-[10px] !px-2 !py-0.5 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition cursor-pointer"
                  aria-label="Show all technologies"
                >
                  {#if expandedTech.has(project.id)}
                    <i class="fa-solid fa-minus text-[9px]"></i> {$t('common.showLess')}
                  {:else}
                    +{project.technologies.length - 3}
                  {/if}
                </button>
              {/if}
            </div>

            <div class="flex gap-2">
              {#if project.demoUrl}
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white
                         bg-gradient-to-r from-indigo-500 to-purple-500 hover:shadow-md transition"
                >
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                  {$t('projects.actions.demo')}
                </a>
              {/if}
              {#if project.githubUrl}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200
                         bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition"
                >
                  <i class="fa-brands fa-github"></i>
                  {$t('projects.actions.code')}
                </a>
              {/if}
              {#if !project.demoUrl && !project.githubUrl}
                <div
                  class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400
                         bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                >
                  <i class="fa-solid fa-lock"></i>
                  {$t('projects.actions.private')}
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- CTA -->
    <div class="mt-16">
      <div class="relative overflow-hidden glass-strong rounded-3xl p-10 sm:p-14 text-center">
        <div class="absolute -top-20 -right-20 w-80 h-80 bg-purple-300/50 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-300/50 rounded-full blur-3xl"></div>
        <div class="relative">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {$t('projects.cta.title')}
          </h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            {$t('projects.cta.subtitle')}
          </p>
          <a href="/contact" class="btn-primary-gradient mt-6 shine">
            <i class="fa-solid fa-paper-plane"></i>
            {$t('projects.cta.button')}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
