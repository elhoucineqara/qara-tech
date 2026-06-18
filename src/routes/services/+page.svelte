<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { t } from '$lib/i18n/i18n';
  import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
  import { tilt3d, reveal } from '$lib/actions/motion';

  let mounted = false;
  onMount(() => (mounted = true));

  interface Service {
    key: string;
    icon: string;
    color: string;
    gradient: string;
  }

  const services: Service[] = [
    { key: 'web', icon: 'fa-solid fa-code', color: 'text-indigo-500', gradient: 'from-indigo-500 to-purple-500' },
    { key: 'mobile', icon: 'fa-solid fa-mobile-screen', color: 'text-pink-500', gradient: 'from-pink-500 to-rose-500' },
    { key: 'cloud', icon: 'fa-solid fa-cloud', color: 'text-sky-500', gradient: 'from-sky-500 to-cyan-500' },
    { key: 'devops', icon: 'fa-solid fa-server', color: 'text-emerald-500', gradient: 'from-emerald-500 to-teal-500' },
    { key: 'ai', icon: 'fa-solid fa-brain', color: 'text-fuchsia-500', gradient: 'from-fuchsia-500 to-pink-500' },
    { key: 'consulting', icon: 'fa-solid fa-lightbulb', color: 'text-amber-500', gradient: 'from-amber-500 to-orange-500' }
  ];

  const processSteps = [
    { step: '01', key: 'discovery' },
    { step: '02', key: 'planning' },
    { step: '03', key: 'building' },
    { step: '04', key: 'support' }
  ];
</script>

<svelte:head>
  <title>Services — El Houcine QARA</title>
  <meta
    name="description"
    content="Professional development services: web, mobile, cloud, DevOps, AI and consulting."
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<!-- Hero -->
<section class="relative pt-32 pb-16 sm:pt-40 overflow-hidden">
  <AnimatedBackground variant="cube" />

  <div class="container relative z-10 text-center">
    {#if mounted}
      <div in:fly={{ y: 20, duration: 500 }} class="badge-glass mb-5">
        <i class="fa-solid fa-briefcase text-purple-500"></i>
        {$t('services.badge')}
      </div>
      <h1
        in:fly={{ y: 30, duration: 700, delay: 100 }}
        class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
      >
        {$t('services.titlePart1')} <span class="text-gradient">{$t('services.titleHighlight')}</span>
      </h1>
      <p
        in:fade={{ duration: 700, delay: 200 }}
        class="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
      >
        {$t('services.subtitle')}
      </p>
    {/if}
  </div>
</section>

<!-- Services grid -->
<section class="relative pb-16">
  <div class="container">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each services as svc, i}
        <div
          class="group relative glass-card p-6 sm:p-7 overflow-hidden reveal-scale lift hover:shadow-2xl transition-all duration-500"
          use:reveal={{ delay: i * 100 }}
          use:tilt3d={{ max: 8, scale: 1.02 }}
        >
            <!-- Decorative blob -->
            <div
              class="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br {svc.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"
            ></div>

            <div
              class="relative w-14 h-14 rounded-2xl bg-gradient-to-br {svc.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
            >
              <i class="{svc.icon} text-white text-2xl"></i>
            </div>

            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">{$t(`services.items.${svc.key}.title`)}</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-5">{$t(`services.items.${svc.key}.description`)}</p>

            <ul class="space-y-2 mb-6">
              {#each ['feat1', 'feat2', 'feat3'] as f}
                <li class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <i class="fa-solid fa-check {svc.color}"></i>
                  {$t(`services.items.${svc.key}.${f}`)}
                </li>
              {/each}
            </ul>

            <a
              href="/contact"
              class="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
            >
              {$t('common.learnMore')}
              <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
      {/each}
    </div>
  </div>
</section>

<!-- Process -->
<section class="relative py-20">
  <div class="container">
    <div class="text-center mb-12">
      <span class="badge-glass mb-4">
        <i class="fa-solid fa-route text-emerald-500"></i>
        {$t('services.process.badge')}
      </span>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {$t('services.process.title')} <span class="text-gradient-blue">{$t('services.process.titleHighlight')}</span>
      </h2>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
      <!-- Connecting line -->
      <div
        class="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-indigo-300/0 via-purple-300/60 dark:via-purple-500/40 to-pink-300/0"
      ></div>

      {#each processSteps as p, i}
        <div
          class="relative glass-card p-6 text-center reveal lift transition-all"
          use:reveal={{ delay: i * 120 }}
          use:tilt3d={{ max: 6, scale: 1.02 }}
        >
          <div
            class="relative mx-auto w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-purple-500/30"
          >
            {p.step}
          </div>
          <h3 class="font-bold text-slate-900 dark:text-white mb-2">{$t(`services.process.steps.${p.key}`)}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{$t(`services.process.steps.${p.key}Desc`)}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="relative pb-24">
  <div class="container">
    <div class="relative overflow-hidden glass-strong rounded-3xl p-10 sm:p-14 text-center">
      <div class="absolute -top-20 -right-20 w-80 h-80 bg-purple-300/50 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-300/50 rounded-full blur-3xl"></div>
      <div class="relative">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {$t('services.cta.title')} <span class="text-gradient">{$t('services.cta.titleHighlight')}</span>?
        </h2>
        <p class="mt-3 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {$t('services.cta.subtitle')}
        </p>
        <a href="/contact" class="btn-primary-gradient mt-6 shine">
          <i class="fa-solid fa-paper-plane"></i>
          {$t('services.cta.button')}
        </a>
      </div>
    </div>
  </div>
</section>
