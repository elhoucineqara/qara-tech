<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { t } from '$lib/i18n/i18n';
  import SEO from '$lib/components/SEO.svelte';
  import ParticleSphere from '$lib/components/ParticleSphere.svelte';
  import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
  import TerminalTyping from '$lib/components/TerminalTyping.svelte';
  import { tilt3d, reveal } from '$lib/actions/motion';

  let mounted = false;
  onMount(() => (mounted = true));

  $: featuredProjects = [
    {
      key: 'harx',
      title: $t('projects.items.harx.title'),
      subtitle: $t('projects.items.harx.subtitle'),
      description: $t('projects.items.harx.description'),
      url: 'http://harx.ai/',
      tech: ['React', 'Node.js', 'WebRTC', 'AI'],
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      image: '/images/HARX.png',
      logo: '/images/harx-mascotte.webp'
    },
    {
      key: 'lms',
      title: $t('projects.items.lms.title'),
      subtitle: $t('projects.items.lms.subtitle'),
      description: $t('projects.items.lms.description'),
      url: 'https://learn.qaranetwork.com/',
      tech: ['SvelteKit', 'Laravel', 'MySQL', 'i18n'],
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      image: '/images/dar-al-ilm.png',
      logo: '/images/logo_dar-alilm.svg'
    },
    {
      key: 'bahijastore',
      title: $t('projects.items.bahijastore.title'),
      subtitle: 'E-Commerce Platform',
      description: $t('projects.items.bahijastore.description'),
      url: 'https://bahijastore.vercel.app/',
      tech: ['Next.js', 'Node.js', 'TailwindCSS'],
      gradient: 'from-pink-500 via-red-500 to-yellow-500',
      image: '/images/bahijastore-screenshot.png',
      logo: '/images/bahijastore-logo.png'
    }
  ];

  $: stats = [
    { value: '15+', label: $t('home.stats.projects') },
    { value: '2+', label: $t('home.stats.yearsExp') },
    { value: '10+', label: $t('home.stats.technologies') },
    { value: '100%', label: $t('home.stats.dedication') }
  ];

  const techStack = [
    { name: 'Laravel', icon: 'fa-brands fa-laravel', color: 'text-red-500' },
    { name: 'React', icon: 'fa-brands fa-react', color: 'text-cyan-500' },
    { name: 'Svelte', icon: 'fa-solid fa-bolt', color: 'text-orange-500' },
    { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-green-600' },
    { name: 'TypeScript', icon: 'fa-solid fa-code', color: 'text-blue-600' },
    { name: 'MySQL', icon: 'fa-solid fa-database', color: 'text-indigo-600' },
    { name: 'Docker', icon: 'fa-brands fa-docker', color: 'text-sky-500' },
    { name: 'Git', icon: 'fa-brands fa-git-alt', color: 'text-rose-500' }
  ];
</script>

<SEO
  title="El Houcine QARA — Full Stack Developer | Laravel, React, SvelteKit"
  description="Full Stack Developer based in Morocco. Building modern web platforms — HARX contact center, Dar Al-Ilm LMS, enterprise apps. Laravel, React, Svelte, Node.js."
  keywords="Full Stack Developer Morocco, Laravel, React, SvelteKit, HARX, Dar Al-Ilm, Contact Center, LMS"
/>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<!-- ==================== HERO ==================== -->
<section class="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
  <AnimatedBackground variant="aurora" showStars={true} />

  <div class="container relative z-10">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- Left: copy -->
      <div class="text-center lg:text-left">
        {#if mounted}
          <div in:fly={{ y: 20, duration: 600 }} class="inline-flex items-center gap-2 badge-glass mb-6">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{$t('home.badge')}</span>
          </div>

          <h1
            in:fly={{ y: 30, duration: 700, delay: 100 }}
            class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
          >
            {$t('home.greeting')} <span class="text-gradient">{$t('home.name')}</span><br />
            {$t('home.titlePart1')} <span class="text-gradient-blue">{$t('home.titlePart2')}</span>
          </h1>

          <p
            in:fly={{ y: 30, duration: 700, delay: 200 }}
            class="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            {$t('home.subtitle')}
            <span class="font-semibold text-slate-800 dark:text-slate-100">{$t('home.subtitleHighlight1')}</span>
            {$t('home.subtitleAnd')}
            <span class="font-semibold text-slate-800 dark:text-slate-100">{$t('home.subtitleHighlight2')}</span>
            {$t('home.subtitleEnd')}
          </p>

          <div
            in:fly={{ y: 30, duration: 700, delay: 300 }}
            class="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a href="/projects" class="btn-primary-gradient shine">
              <i class="fa-solid fa-folder-open"></i>
              {$t('home.viewMyWork')}
            </a>
            <a href="/contact" class="btn-secondary-light">
              <i class="fa-solid fa-paper-plane"></i>
              {$t('common.getInTouch')}
            </a>
          </div>

          <!-- Stats inline -->
          <div in:fade={{ duration: 700, delay: 400 }} class="mt-12 grid grid-cols-4 gap-4 max-w-lg mx-auto lg:mx-0">
            {#each stats as s, i}
              <div class="text-center lg:text-left reveal-scale" use:reveal={{ delay: 400 + i * 80 }}>
                <div class="text-2xl sm:text-3xl font-bold text-gradient-animated">{s.value}</div>
                <div class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Right: floating glass card stack -->
      {#if mounted}
        <div in:fly={{ x: 40, duration: 800, delay: 200 }} class="relative h-[520px] hidden lg:block">
          <!-- Decorative ring -->
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full
                   border border-purple-200/60 ring-glow-purple"
          ></div>
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full
                   border border-pink-200/60"
          ></div>

          <!-- Floating card 1: live terminal -->
          <div
            class="absolute top-6 left-2 w-72 animate-float"
            style="animation-delay: 0s"
            use:tilt3d={{ max: 10, scale: 1.03 }}
          >
            <TerminalTyping />
          </div>

          <!-- Floating card 2: project (clickable) -->
          <a
            href="http://harx.ai/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit HARX live site"
            class="group absolute top-32 right-0 w-64 glass-card p-5 animate-float
                   hover:shadow-2xl hover:shadow-purple-500/20
                   transition-all duration-300 cursor-pointer"
            style="animation-delay: 1.5s"
            use:tilt3d={{ max: 10, scale: 1.04 }}
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 shadow border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                <img src="/images/harx-mascotte.webp" alt="HARX" class="w-9 h-9 object-contain" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-1.5">
                  HARX
                  <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400 group-hover:text-purple-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"></i>
                </div>
                <div class="text-xs text-slate-500 dark:text-slate-400">Contact Center</div>
              </div>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="badge-tech">React</span>
              <span class="badge-tech">Node.js</span>
              <span class="text-emerald-600 dark:text-emerald-400 font-semibold">● Live</span>
            </div>
          </a>

          <!-- Floating card 5: project (clickable) -->
          <a
            href="https://bahijastore.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Bahija Store live site"
            class="group absolute top-64 right-12 w-64 glass-card p-5 animate-float z-10
                   hover:shadow-2xl hover:shadow-pink-500/20
                   transition-all duration-300 cursor-pointer"
            style="animation-delay: 2.5s"
            use:tilt3d={{ max: 10, scale: 1.04 }}
          >
            <div class="flex items-center gap-3 mb-3">
              <div class="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 shadow border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                <img src="/images/bahijastore-logo.png" alt="Bahija Store" class="w-9 h-9 object-contain" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-semibold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-1.5">
                  Bahija Store
                  <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400 group-hover:text-pink-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"></i>
                </div>
                <div class="text-xs text-slate-500 dark:text-slate-400">E-Commerce</div>
              </div>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="badge-tech">Next.js</span>
              <span class="badge-tech">Node.js</span>
              <span class="text-emerald-600 dark:text-emerald-400 font-semibold">● Live</span>
            </div>
          </a>

          <!-- Floating card 3: stat -->
          <div
            class="absolute bottom-20 left-12 w-56 glass-card p-5 animate-float"
            style="animation-delay: 3s"
            use:tilt3d={{ max: 10, scale: 1.03 }}
          >
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center"
              >
                <i class="fa-solid fa-rocket text-white text-lg"></i>
              </div>
              <div>
                <div class="text-2xl font-extrabold text-slate-800 dark:text-slate-100">95%</div>
                <div class="text-xs text-slate-500 dark:text-slate-400">Performance</div>
              </div>
            </div>
          </div>

          <!-- Floating card 4: animated particle sphere with logo -->
          <div
            class="absolute bottom-4 right-6 w-56 h-56 sm:w-64 sm:h-64 animate-float"
            style="animation-delay: 2s"
          >
            <ParticleSphere
              particleCount={180}
              radius={90}
              rotationSpeed={0.005}
              centerImage="/images/qaratech-icon.png"
            />
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- ==================== FEATURED PROJECTS ==================== -->
<section class="relative py-20 sm:py-28">
  <div class="container relative z-10">
    <div class="text-center mb-14 reveal" use:reveal>
      <span class="badge-glass mb-4">
        <i class="fa-solid fa-star text-yellow-500"></i>
        {$t('home.featured.badge')}
      </span>
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {$t('home.featured.title')} <span class="text-gradient">{$t('home.featured.titleHighlight')}</span>
      </h2>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        {$t('home.featured.subtitle')}
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      {#each featuredProjects as project, i}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          class="group relative block glass-card overflow-hidden reveal-scale lift hover:shadow-2xl transition-all duration-500"
          use:reveal={{ delay: i * 120 }}
          use:tilt3d={{ max: 6, scale: 1.01 }}
        >
          <!-- Screenshot header -->
          <div class="relative h-56 bg-gradient-to-br {project.gradient} overflow-hidden">
            <img
              src={project.image}
              alt="{project.title} screenshot"
              class="w-full h-full object-cover object-top opacity-95 group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <div class="absolute top-4 right-4 badge-glass">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {$t('common.live')}
            </div>
          </div>

          <div class="p-6">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={project.logo}
                    alt="{project.title} logo"
                    class="w-10 h-10 object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{project.subtitle}</p>
                </div>
              </div>
              <i
                class="fa-solid fa-arrow-up-right-from-square text-slate-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
              ></i>
            </div>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{project.description}</p>
            <div class="flex flex-wrap gap-2">
              {#each project.tech as t}
                <span class="badge-tech">{t}</span>
              {/each}
            </div>
          </div>
        </a>
      {/each}
    </div>

    <div class="text-center mt-12">
      <a href="/projects" class="btn-glass shine">
        <i class="fa-solid fa-layer-group"></i>
        {$t('common.viewAllProjects')}
      </a>
    </div>
  </div>
</section>

<!-- ==================== TECH STACK ==================== -->
<section class="relative py-20 sm:py-24">
  <div class="container relative z-10">
    <div class="text-center mb-12 reveal" use:reveal>
      <span class="badge-glass mb-4">
        <i class="fa-solid fa-microchip text-indigo-500"></i>
        {$t('home.stack.badge')}
      </span>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {$t('home.stack.title')} <span class="text-gradient-blue">{$t('home.stack.titleHighlight')}</span>
      </h2>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
      {#each techStack as tech, i}
        <div
          class="glass-card p-5 flex flex-col items-center justify-center gap-2 reveal-scale lift transition-all duration-300 aspect-square hover:-translate-y-1 hover:shadow-xl"
          use:reveal={{ delay: i * 35 }}
        >
          <i class="{tech.icon} {tech.color} text-3xl"></i>
          <span class="text-xs font-medium text-slate-700 dark:text-slate-200">{tech.name}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ==================== CTA ==================== -->
<section class="relative py-20 sm:py-28">
  <div class="container relative z-10">
    <div
      class="relative overflow-hidden glass-strong rounded-3xl p-10 sm:p-16 text-center reveal-scale"
      use:reveal
      use:tilt3d={{ max: 3, scale: 1.005 }}
    >
      <!-- Decorative gradient blob -->
      <div
        class="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-purple-400/50 to-pink-400/50 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-400/50 to-cyan-400/50 rounded-full blur-3xl"
      ></div>

      <div class="relative">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {$t('home.cta.title')} <span class="text-gradient">{$t('home.cta.titleHighlight')}</span>
        </h2>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {$t('home.cta.subtitle')}
        </p>
        <div class="mt-8 flex flex-wrap gap-4 justify-center">
          <a href="/contact" class="btn-primary-gradient shine">
            <i class="fa-solid fa-paper-plane"></i>
            {$t('common.startProject')}
          </a>
          <a
            href="https://wa.me/212637446431"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary-light"
          >
            <i class="fa-brands fa-whatsapp text-emerald-500"></i>
            {$t('common.quickChat')}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  :global(body) {
    font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
  }
</style>
