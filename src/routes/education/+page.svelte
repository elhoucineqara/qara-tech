<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { t } from '$lib/i18n/i18n';
  import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
  import { tilt3d, reveal } from '$lib/actions/motion';

  let mounted = false;
  onMount(() => (mounted = true));

  interface Education {
    key: string;
    period: string;
    inProgress: boolean;
    tags: string[];
    icon: string;
    gradient: string;
  }

  const education: Education[] = [
    {
      key: 'master',
      period: '2024 — 2025',
      inProgress: true,
      tags: ['Educational Tech', 'Pedagogical Innovation', 'Digitalization', 'E-Learning'],
      icon: 'fa-solid fa-graduation-cap',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500'
    },
    {
      key: 'bachelor',
      period: '2023 — 2024',
      inProgress: false,
      tags: ['Software Architecture', 'Web Technologies', 'Project Management', 'Modern Dev'],
      icon: 'fa-solid fa-university',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500'
    },
    {
      key: 'tech',
      period: '2022 — 2023',
      inProgress: false,
      tags: ['Full Stack', 'Frontend', 'Backend', 'Databases'],
      icon: 'fa-solid fa-code',
      gradient: 'from-emerald-500 via-teal-500 to-green-500'
    },
    {
      key: 'physics',
      period: '2019 — 2020',
      inProgress: false,
      tags: ['Mathematics', 'Physics', 'Electronics', 'Scientific Method'],
      icon: 'fa-solid fa-atom',
      gradient: 'from-sky-500 via-blue-500 to-indigo-500'
    },
    {
      key: 'bac',
      period: '2015 — 2016',
      inProgress: false,
      tags: ['Physical Sciences', 'Mathematics', 'Chemistry', 'Physics'],
      icon: 'fa-solid fa-school',
      gradient: 'from-amber-500 via-orange-500 to-rose-500'
    }
  ];

  const certifications = [
    { key: 'laravel', icon: 'fa-brands fa-laravel', color: 'text-red-500' },
    { key: 'react', icon: 'fa-brands fa-react', color: 'text-cyan-500' },
    { key: 'node', icon: 'fa-brands fa-node-js', color: 'text-green-600' },
    { key: 'db', icon: 'fa-solid fa-database', color: 'text-purple-600 dark:text-purple-400' },
    { key: 'cloud', icon: 'fa-brands fa-aws', color: 'text-orange-500' },
    { key: 'agile', icon: 'fa-solid fa-tasks', color: 'text-amber-500' }
  ];
</script>

<svelte:head>
  <title>Education & Certifications — El Houcine QARA</title>
  <meta name="description" content="Academic background and certifications: Master's, Bachelor's, technical diplomas and tech certifications." />
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
</svelte:head>

<!-- Hero -->
<section class="relative pt-32 pb-12 sm:pt-40 overflow-hidden">
  <AnimatedBackground variant="cube" showStars={true} />

  <div class="container relative z-10 text-center">
    {#if mounted}
      <div in:fly={{ y: 20, duration: 500 }} class="badge-glass mb-5">
        <i class="fa-solid fa-graduation-cap text-indigo-500"></i>
        {$t('education.badge')}
      </div>
      <h1
        in:fly={{ y: 30, duration: 700, delay: 100 }}
        class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
      >
        {$t('education.titlePart1')} <span class="text-gradient">{$t('education.titleHighlight')}</span>
      </h1>
      <p
        in:fade={{ duration: 700, delay: 200 }}
        class="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
      >
        {$t('education.subtitle')}
      </p>
    {/if}
  </div>
</section>

<!-- Education cards -->
<section class="relative pb-16">
  <div class="container">
    <div class="max-w-5xl mx-auto space-y-6">
      {#each education as ed, i}
        <div
          class="group relative glass-card overflow-hidden reveal lift hover:shadow-2xl transition-all duration-500"
          use:reveal={{ delay: i * 100 }}
          use:tilt3d={{ max: 4, scale: 1.01 }}
        >
            <div class="grid sm:grid-cols-12">
              <!-- Side gradient bar with icon -->
              <div class="sm:col-span-3 lg:col-span-2 bg-gradient-to-br {ed.gradient} p-6 flex sm:flex-col items-center justify-center gap-4 sm:gap-2 text-white">
                <i class="{ed.icon} text-4xl drop-shadow"></i>
                <div class="sm:text-center">
                  <div class="text-xs uppercase tracking-wider opacity-80">{$t('education.period')}</div>
                  <div class="font-bold">{ed.period}</div>
                </div>
              </div>

              <!-- Content -->
              <div class="sm:col-span-9 lg:col-span-10 p-6">
                <div class="flex items-start justify-between gap-2 mb-2">
                  <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{$t(`education.items.${ed.key}.degree`)}</h3>
                  <span
                    class="badge-glass !text-[10px] uppercase tracking-wider flex-shrink-0
                           {ed.inProgress ? '!bg-amber-50/80 dark:bg-amber-500/15 !text-amber-700 dark:text-amber-300' : '!bg-emerald-50 dark:bg-emerald-500/10/80 !text-emerald-700 dark:text-emerald-300'}"
                  >
                    {ed.inProgress ? $t('common.inProgress') : $t('common.completed')}
                  </span>
                </div>
                <p class="text-purple-600 dark:text-purple-400 font-semibold text-sm mb-3">{$t(`education.items.${ed.key}.school`)}</p>
                <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-4">{$t(`education.items.${ed.key}.description`)}</p>
                <div class="flex flex-wrap gap-1.5">
                  {#each ed.tags as tag}
                    <span class="badge-tech">{tag}</span>
                  {/each}
                </div>
              </div>
            </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Certifications & Skills -->
<section class="relative py-12">
  <div class="container">
    <div class="text-center mb-12">
      <span class="badge-glass mb-4">
        <i class="fa-solid fa-certificate text-yellow-500"></i>
        {$t('education.certsBadge')}
      </span>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {$t('education.certsTitle')} <span class="text-gradient">{$t('education.certsTitleHighlight')}</span>
      </h2>
      <p class="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        {$t('education.certsSubtitle')}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each certifications as c, i}
        <div
          class="glass-card p-5 reveal-scale lift transition-all"
          use:reveal={{ delay: i * 80 }}
          use:tilt3d={{ max: 8, scale: 1.03 }}
        >
          <div class="flex items-center gap-4 mb-3">
            <div class="w-14 h-14 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 flex items-center justify-center">
              <i class="{c.icon} {c.color} text-3xl"></i>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 dark:text-white">{$t(`education.certs.${c.key}.title`)}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">{$t(`education.certs.${c.key}.sub`)}</p>
            </div>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{$t(`education.certs.${c.key}.desc`)}</p>
        </div>
      {/each}
    </div>

    <!-- Continuous learning callout -->
    <div class="mt-12 relative overflow-hidden glass-strong rounded-3xl p-10 text-center">
      <div class="absolute -top-20 -right-20 w-80 h-80 bg-amber-300/40 dark:bg-amber-600/25 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-300/40 dark:bg-purple-600/25 rounded-full blur-3xl"></div>
      <div class="relative">
        <i class="fa-solid fa-trophy text-5xl text-amber-500 mb-4"></i>
        <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{$t('education.continuous.title')}</h3>
        <p class="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {$t('education.continuous.subtitle')}
        </p>
      </div>
    </div>
  </div>
</section>
