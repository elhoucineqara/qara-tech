<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { t } from '$lib/i18n/i18n';
  import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
  import { tilt3d, reveal } from '$lib/actions/motion';

  let mounted = false;
  onMount(() => (mounted = true));

  interface Experience {
    key: string;
    achievementKeys: string[];
    technologies: string[];
    gradient: string;
    icon: string;
    url?: string;
    image?: string;
    logo?: string;
  }

  const experiences: Experience[] = [
    {
      key: 'harx',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      icon: 'fa-solid fa-headset',
      url: 'https://harx25pageslinks.netlify.app/',
      image: '/images/HARX.png',
      logo: '/images/harx-mascotte.webp',
      achievementKeys: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
      technologies: ['Laravel', 'React', 'Svelte', 'Node.js', 'WebRTC', 'MySQL', 'MongoDB', 'Redis', 'WebSockets', 'OpenAI', 'Docker']
    },
    {
      key: 'lms',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      icon: 'fa-solid fa-graduation-cap',
      url: 'https://learn.qaranetwork.com/',
      image: '/images/dar-al-ilm.png',
      logo: '/images/logo_dar-alilm.svg',
      achievementKeys: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'],
      technologies: ['Laravel', 'Svelte', 'Node.js', 'MySQL', 'MongoDB', 'RESTful API', 'WebSockets']
    },
    {
      key: 'hr',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      icon: 'fa-solid fa-users-gear',
      achievementKeys: ['a1', 'a2', 'a3', 'a4', 'a5'],
      technologies: ['Laravel', 'React', 'MySQL', 'RESTful API', 'Bootstrap']
    },
    {
      key: 'electronics',
      gradient: 'from-amber-500 via-orange-500 to-rose-500',
      icon: 'fa-solid fa-microchip',
      achievementKeys: ['a1', 'a2', 'a3'],
      technologies: ['Arduino', 'Electronics', 'Hardware Repair']
    }
  ];
</script>

<svelte:head>
  <title>Experience — El Houcine QARA</title>
  <meta
    name="description"
    content="2+ years of professional experience building enterprise platforms — HARX contact center, Dar Al-Ilm LMS, HR automation."
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<!-- Hero -->
<section class="relative pt-32 pb-12 sm:pt-40 overflow-hidden">
  <AnimatedBackground variant="cube" />

  <div class="container relative z-10 text-center">
    {#if mounted}
      <div in:fly={{ y: 20, duration: 500 }} class="badge-glass mb-5">
        <i class="fa-solid fa-briefcase text-indigo-500"></i>
        {$t('experience.badge')}
      </div>
      <h1
        in:fly={{ y: 30, duration: 700, delay: 100 }}
        class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
      >
        {$t('experience.titlePart1')} <span class="text-gradient">{$t('experience.titleHighlight')}</span>
      </h1>
      <p
        in:fade={{ duration: 700, delay: 200 }}
        class="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
      >
        {$t('experience.subtitle')}
      </p>
    {/if}
  </div>
</section>

<!-- Experiences (timeline + centered cards) -->
<section class="relative pb-20">
  <div class="container">
    <div class="relative max-w-5xl mx-auto">
      <!-- Vertical timeline rail -->
      <div
        class="absolute left-4 sm:left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-indigo-300/0 via-purple-400/60 dark:via-purple-500/40 to-pink-300/0"
        aria-hidden="true"
      ></div>

      <div class="space-y-10">
        {#each experiences as exp, i}
          <div
            class="relative pl-12 sm:pl-16 reveal"
            use:reveal={{ delay: i * 120 }}
          >
              <!-- Timeline node (dot) -->
              <div
                class="absolute left-4 sm:left-6 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br {exp.gradient}
                       ring-4 ring-white dark:ring-slate-900 shadow-lg shadow-purple-500/30 z-10
                       flex items-center justify-center"
                aria-hidden="true"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
              </div>

              <!-- Period pill (sits ABOVE the card, near the dot) -->
              <div class="mb-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                          bg-white/80 dark:bg-slate-800/80 backdrop-blur-md
                          border border-purple-200/60 dark:border-purple-500/30
                          text-purple-700 dark:text-purple-300 shadow-sm">
                <i class="fa-solid fa-calendar text-[10px]"></i>
                {$t(`experience.items.${exp.key}.period`)}
              </div>

              <!-- Card -->
              <div
                class="group glass-card overflow-hidden hover:shadow-2xl transition-all duration-500"
                use:tilt3d={{ max: 4, scale: 1.01 }}
              >
                <!-- Banner image / icon -->
                {#if exp.image}
                  <div class="relative h-44 sm:h-52 bg-gradient-to-br {exp.gradient} overflow-hidden">
                    <img
                      src={exp.image}
                      alt="{$t(`experience.items.${exp.key}.company`)} project"
                      class="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
                    {#if exp.url}
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                               bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/40 hover:scale-105 transition"
                      >
                        <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        {$t('common.live')}
                        <i class="fa-solid fa-arrow-up-right-from-square text-[10px] ml-0.5"></i>
                      </a>
                    {/if}
                  </div>
                {:else}
                  <div class="relative h-24 bg-gradient-to-br {exp.gradient} overflow-hidden flex items-center px-5">
                    <div class="absolute inset-0 bg-grid-light opacity-20"></div>
                    <div class="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center relative">
                      <i class="{exp.icon} text-white text-2xl drop-shadow"></i>
                    </div>
                  </div>
                {/if}

                <!-- Body -->
                <div class="p-5 sm:p-6 lg:p-7">
                  <!-- Title row: logo + title + company + location -->
                  <div class="flex items-start gap-4 mb-4">
                    {#if exp.logo}
                      <div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0 -mt-10 relative z-10">
                        <img src={exp.logo} alt="{$t(`experience.items.${exp.key}.company`)} logo" class="w-11 h-11 object-contain" loading="lazy" />
                      </div>
                    {/if}
                    <div class="flex-1 min-w-0">
                      <h3 class="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                        {$t(`experience.items.${exp.key}.title`)}
                      </h3>
                      <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm">
                        <span class="font-semibold text-purple-600 dark:text-purple-400">
                          {$t(`experience.items.${exp.key}.company`)}
                        </span>
                        <span class="opacity-30 text-slate-500">·</span>
                        <span class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                          <i class="fa-solid fa-location-dot text-[10px]"></i>
                          {$t(`experience.items.${exp.key}.location`)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Description -->
                  <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {$t(`experience.items.${exp.key}.description`)}
                  </p>

                  <!-- Achievements -->
                  <ul class="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                    {#each exp.achievementKeys as ak}
                      <li class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <i class="fa-solid fa-check-circle text-emerald-500 mt-0.5 flex-shrink-0"></i>
                        <span>{$t(`experience.items.${exp.key}.${ak}`)}</span>
                      </li>
                    {/each}
                  </ul>

                  <!-- Stack -->
                  <div class="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                    {#each exp.technologies as tech}
                      <span class="badge-tech">{tech}</span>
                    {/each}
                  </div>
                </div>
              </div>
            </div>
        {/each}
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-16">
      <div class="relative overflow-hidden glass-strong rounded-3xl p-10 sm:p-14 text-center">
        <div class="absolute -top-20 -right-20 w-80 h-80 bg-pink-300/50 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-300/50 rounded-full blur-3xl"></div>
        <div class="relative">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {$t('experience.cta.title')}
          </h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            {$t('experience.cta.subtitle')}
          </p>
          <a href="/contact" class="btn-primary-gradient mt-6 shine">
            <i class="fa-solid fa-paper-plane"></i>
            {$t('common.getInTouch')}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
