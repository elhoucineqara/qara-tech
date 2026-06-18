<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { t } from '$lib/i18n/i18n';
  import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
  import { tilt3d, reveal } from '$lib/actions/motion';

  let mounted = false;
  let displayedText = '';
  let isTyping = true;
  const fullText = 'I-ETERIA';
  let currentIndex = 0;

  onMount(() => {
    mounted = true;
    const id = setInterval(() => {
      if (currentIndex < fullText.length) {
        displayedText += fullText[currentIndex];
        currentIndex++;
      } else {
        clearInterval(id);
        isTyping = false;
      }
    }, 100);
  });

  $: contacts = [
    {
      icon: 'fa-solid fa-envelope',
      label: $t('about.page.labels.email'),
      value: 'elhoucineqara114@gmail.com',
      href: 'mailto:elhoucineqara114@gmail.com',
      color: 'from-rose-400 to-pink-500'
    },
    {
      icon: 'fa-solid fa-phone',
      label: $t('about.page.labels.phone'),
      value: '+212 637 446 431',
      href: 'tel:+212637446431',
      color: 'from-indigo-400 to-purple-500'
    },
    {
      icon: 'fa-brands fa-whatsapp',
      label: $t('about.page.labels.whatsapp'),
      value: $t('about.page.labels.whatsappValue'),
      href: 'https://wa.me/212637446431',
      color: 'from-emerald-400 to-green-500'
    },
    {
      icon: 'fa-brands fa-linkedin-in',
      label: $t('about.page.labels.linkedin'),
      value: 'el-houcine-qara',
      href: 'https://www.linkedin.com/in/el-houcine-qara-927b07302/',
      color: 'from-blue-400 to-sky-500'
    },
    {
      icon: 'fa-brands fa-github',
      label: $t('about.page.labels.github'),
      value: '@elhoucineqara',
      href: 'https://github.com/elhoucineqara',
      color: 'from-slate-600 to-slate-800'
    },
    {
      icon: 'fa-solid fa-location-dot',
      label: $t('about.page.labels.location'),
      value: 'Bouznika, ' + $t('common.morocco'),
      href: '#',
      color: 'from-amber-400 to-orange-500'
    }
  ];

  $: highlights = [
    { icon: 'fa-solid fa-code', label: $t('about.page.highlights.cleanCode'), value: $t('about.page.highlights.cleanCodeValue') },
    { icon: 'fa-solid fa-rocket', label: $t('about.page.highlights.performance'), value: $t('about.page.highlights.performanceValue') },
    { icon: 'fa-solid fa-users', label: $t('about.page.highlights.teamWork'), value: $t('about.page.highlights.teamWorkValue') },
    { icon: 'fa-solid fa-graduation-cap', label: $t('about.page.highlights.learning'), value: $t('about.page.highlights.learningValue') }
  ];
</script>

<svelte:head>
  <title>About — El Houcine QARA</title>
  <meta
    name="description"
    content="Full Stack Developer based in Morocco. Passionate about building modern web platforms with Laravel, React and SvelteKit."
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<!-- Hero -->
<section class="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
  <AnimatedBackground variant="cube" showStars={true} />

  <div class="container relative z-10">
    <div class="grid lg:grid-cols-5 gap-12 items-center">
      <!-- Avatar -->
      <div class="lg:col-span-2 flex justify-center">
        {#if mounted}
          <div in:fly={{ y: 30, duration: 700 }} class="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            <!-- Rotating conic gradient ring -->
            <div class="avatar-conic absolute inset-0 rounded-full"></div>

            <!-- Counter-rotating dashed ring -->
            <svg
              class="absolute inset-0 w-full h-full rotate-ccw-slow"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                stroke="url(#dashStroke)"
                stroke-width="0.6"
                stroke-dasharray="2 3"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient id="dashStroke" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stop-color="#a855f7" />
                  <stop offset="50%" stop-color="#ec4899" />
                  <stop offset="100%" stop-color="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            <!-- Orbiting tech icons -->
            <div class="orbit-container absolute inset-0 rotate-cw-slow">
              {#each [
                { icon: 'fa-brands fa-react',   color: 'text-cyan-400',    pos: 'top-0 left-1/2 -translate-x-1/2' },
                { icon: 'fa-brands fa-laravel', color: 'text-rose-500',    pos: 'right-0 top-1/2 -translate-y-1/2' },
                { icon: 'fa-solid fa-bolt',     color: 'text-amber-400',   pos: 'bottom-0 left-1/2 -translate-x-1/2' },
                { icon: 'fa-brands fa-node-js', color: 'text-emerald-500', pos: 'left-0 top-1/2 -translate-y-1/2' }
              ] as orb}
                <div class="absolute {orb.pos}">
                  <!-- Counter-rotate so icons stay upright while parent spins -->
                  <div class="rotate-ccw-slow">
                    <div class="w-10 h-10 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md
                                shadow-lg shadow-purple-500/20 border border-white/70 dark:border-slate-700
                                flex items-center justify-center">
                      <i class="{orb.icon} {orb.color} text-lg"></i>
                    </div>
                  </div>
                </div>
              {/each}
            </div>

            <!-- Photo card (kept floating) -->
            <div class="relative w-64 h-64 sm:w-72 sm:h-72 glass-card p-2 rounded-full animate-float">
              <img
                src="/images/qaratech.jpg"
                alt="El Houcine QARA"
                class="w-full h-full object-cover rounded-full"
              />

              <!-- Sparkle dots -->
              <span class="sparkle absolute -top-1 left-6 w-2 h-2 rounded-full bg-pink-400"></span>
              <span class="sparkle absolute top-12 -right-1 w-1.5 h-1.5 rounded-full bg-cyan-400" style="animation-delay: -1.2s"></span>
              <span class="sparkle absolute bottom-6 -left-2 w-2 h-2 rounded-full bg-purple-400" style="animation-delay: -2.4s"></span>
              <span class="sparkle absolute -bottom-1 right-10 w-1.5 h-1.5 rounded-full bg-amber-300" style="animation-delay: -0.6s"></span>
            </div>

            <!-- Status badge floating -->
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 badge-glass animate-float z-10" style="animation-delay: -1.5s">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span class="font-semibold">{$t('about.page.openToWork')}</span>
            </div>
          </div>
        {/if}
      </div>

      <!-- Content -->
      <div class="lg:col-span-3 text-center lg:text-left">
        {#if mounted}
          <div in:fly={{ y: 20, duration: 500 }} class="badge-glass mb-5">
            <i class="fa-solid fa-user text-purple-500"></i>
            {$t('about.page.badge')}
          </div>

          <h1
            in:fly={{ y: 30, duration: 700, delay: 100 }}
            class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
          >
            {$t('about.page.titlePart1')} <span class="text-gradient">{$t('about.page.titlePart2')}</span>
          </h1>

          <p
            in:fly={{ y: 30, duration: 700, delay: 200 }}
            class="mt-4 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            {$t('about.page.introPart1')}
            <span class="text-purple-600 dark:text-purple-400 font-semibold inline-flex items-center"
              ><span class:typewriter={isTyping}>{displayedText}</span></span
            > {$t('about.page.introPart2')}
          </p>

          <div
            in:fade={{ duration: 700, delay: 400 }}
            class="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start"
          >
            <span class="badge-glass"><i class="fa-solid fa-flag text-rose-500"></i> {$t('common.morocco')}</span>
            <span class="badge-glass"><i class="fa-solid fa-language text-blue-500"></i> {$t('about.page.languages')}</span>
            <span class="badge-glass"><i class="fa-solid fa-briefcase text-amber-500"></i> {$t('about.page.remote')}</span>
          </div>

          <div
            in:fade={{ duration: 700, delay: 500 }}
            class="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <a href="/contact" class="btn-primary-gradient shine">
              <i class="fa-solid fa-paper-plane"></i>
              {$t('common.getInTouch')}
            </a>
            <a href="/projects" class="btn-secondary-light">
              <i class="fa-solid fa-folder-open"></i>
              {$t('common.viewProjects')}
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<!-- Highlights -->
<section class="relative py-12">
  <div class="container">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {#each highlights as h, i}
        <div
          class="glass-card p-5 text-center reveal-scale lift cursor-default"
          use:reveal={{ delay: i * 100 }}
          use:tilt3d={{ max: 8, scale: 1.04 }}
        >
          <i class="{h.icon} text-3xl text-gradient mb-2"></i>
          <div class="text-sm font-bold text-slate-900 dark:text-white mt-2">{h.label}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">{h.value}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Contact Methods -->
<section class="relative py-16">
  <div class="container">
    <div class="text-center mb-10">
      <span class="badge-glass mb-4">
        <i class="fa-solid fa-address-card text-indigo-500"></i>
        {$t('about.page.contactBadge')}
      </span>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
        {$t('about.page.contactTitle')} <span class="text-gradient">{$t('about.page.contactTitleHighlight')}</span>
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each contacts as c, i}
        <a
          href={c.href}
          target={c.href.startsWith('http') ? '_blank' : null}
          rel="noopener noreferrer"
          class="group glass-card p-5 flex items-center gap-4 reveal lift transition-all"
          use:reveal={{ delay: i * 80 }}
          use:tilt3d={{ max: 6, scale: 1.02 }}
        >
          <div
            class="w-12 h-12 rounded-xl bg-gradient-to-br {c.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"
          >
            <i class="{c.icon} text-lg"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{c.label}</div>
            <div class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{c.value}</div>
          </div>
          <i
            class="fa-solid fa-arrow-right text-slate-400 dark:text-slate-500 group-hover:text-purple-500 group-hover:translate-x-1 transition-all"
          ></i>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .typewriter {
    border-right: 2px solid #a855f7;
    animation: blink 0.75s step-end infinite;
    padding-right: 2px;
  }
  @keyframes blink {
    from, to { border-color: transparent; }
    50% { border-color: #a855f7; }
  }

  /* Rotating conic gradient ring behind the photo */
  .avatar-conic {
    background: conic-gradient(
      from 0deg,
      rgba(99, 102, 241, 0.0)  0%,
      rgba(99, 102, 241, 0.5)  10%,
      rgba(168, 85, 247, 0.7)  30%,
      rgba(236, 72, 153, 0.7)  50%,
      rgba(6, 182, 212, 0.6)   70%,
      rgba(99, 102, 241, 0.0) 100%
    );
    -webkit-mask: radial-gradient(circle, transparent 58%, black 60%, black 70%, transparent 72%);
            mask: radial-gradient(circle, transparent 58%, black 60%, black 70%, transparent 72%);
    animation: spin-cw 10s linear infinite;
    filter: drop-shadow(0 0 12px rgba(168, 85, 247, 0.45));
  }

  @keyframes spin-cw {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .rotate-cw-slow  { animation: spin-cw 22s linear infinite; }
  .rotate-ccw-slow { animation: spin-ccw 22s linear infinite; }

  @keyframes spin-ccw {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }

  /* Sparkle dots that pop in/out */
  .sparkle {
    box-shadow: 0 0 8px currentColor;
    animation: sparkle 2.4s ease-in-out infinite;
  }
  @keyframes sparkle {
    0%, 100% { transform: scale(0.4); opacity: 0.3; }
    50%      { transform: scale(1.1); opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .avatar-conic,
    .rotate-cw-slow,
    .rotate-ccw-slow,
    .sparkle { animation: none !important; }
  }
</style>
