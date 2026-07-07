<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Header from '$lib/components/Header.svelte';
  import ScrollToTop from '$lib/components/ScrollToTop.svelte';
  import MatrixRain from '$lib/components/MatrixRain.svelte';
  import NeuralNetwork from '$lib/components/NeuralNetwork.svelte';
  import CodeStream from '$lib/components/CodeStream.svelte';
  import { theme } from '$lib/stores/theme';
  import { currentLang, t } from '$lib/i18n/i18n';
  import AdSense from '$lib/components/AdSense.svelte';

  type TechTheme = 'matrix' | 'neural' | 'code' | 'none';

  // Un seul effet par page pour rester fluide
  const routeTheme: Record<string, TechTheme> = {
    '/': 'neural',
    '/about': 'neural',
    '/skills': 'code',
    '/experience': 'matrix',
    '/projects': 'code',
    '/services': 'code',
    '/education': 'neural',
    '/contact': 'matrix',
    '/blog': 'code'
  };

  let isMobile = false;
  let reduceMotion = false;
  let enableHeavyFx = false;

  onMount(() => {
    theme.init();
    currentLang.init();

    const mqMobile = window.matchMedia('(max-width: 768px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    isMobile = mqMobile.matches;
    reduceMotion = mqMotion.matches;
    enableHeavyFx = !isMobile && !reduceMotion;

    const onMobile = (e: MediaQueryListEvent) => {
      isMobile = e.matches;
      enableHeavyFx = !isMobile && !reduceMotion;
    };
    const onMotion = (e: MediaQueryListEvent) => {
      reduceMotion = e.matches;
      enableHeavyFx = !isMobile && !reduceMotion;
    };
    mqMobile.addEventListener('change', onMobile);
    mqMotion.addEventListener('change', onMotion);

    return () => {
      mqMobile.removeEventListener('change', onMobile);
      mqMotion.removeEventListener('change', onMotion);
    };
  });

  $: techTheme = routeTheme[$page.url.pathname] ?? 'neural';
  $: activeFx = enableHeavyFx ? techTheme : 'none';
  $: isAdminRoute = $page.url.pathname.startsWith('/admin');

  const currentYear = new Date().getFullYear();

  $: quickLinks = [
    { href: '/', label: $t('nav.home') },
    { href: '/about', label: $t('nav.about') },
    { href: '/projects', label: $t('nav.projects') },
    { href: '/services', label: $t('nav.services') },
    { href: '/contact', label: $t('nav.contact') }
  ];

  const featuredLinks = [
    { href: 'http://harx.ai/', label: 'HARX · Contact Center' },
    { href: 'https://learn.qaranetwork.com/', label: 'Dar Al-Ilm · LMS' }
  ];

  const socials = [
    {
      href: 'mailto:elhoucineqara114@gmail.com',
      icon: 'fa-solid fa-envelope',
      label: 'Email',
      color: 'hover:text-rose-500'
    },
    {
      href: 'https://www.linkedin.com/in/el-houcine-qara-927b07302/',
      icon: 'fa-brands fa-linkedin-in',
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    },
    {
      href: 'https://wa.me/212637446431',
      icon: 'fa-brands fa-whatsapp',
      label: 'WhatsApp',
      color: 'hover:text-emerald-500'
    },
    {
      href: 'https://github.com/elhoucineqara',
      icon: 'fa-brands fa-github',
      label: 'GitHub',
      color: 'hover:text-slate-900 dark:text-white'
    }
  ];
</script>

<!-- Global animated tech background — fixed, visible on full page scroll -->
{#if !isAdminRoute}
<div
  class="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
  aria-hidden="true"
>
  <div class="absolute inset-0 bg-grid-light opacity-25 dark:opacity-15"></div>
  <div
    class="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-indigo-400/25 to-purple-400/25 blur-3xl animate-drift"
  ></div>
  <div
    class="absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-pink-400/25 to-purple-400/25 blur-3xl animate-drift"
    style="animation-delay: -5s"
  ></div>
  <div
    class="absolute bottom-0 left-1/4 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-cyan-400/22 to-blue-400/22 blur-3xl animate-drift"
    style="animation-delay: -10s"
  ></div>
  <div class="absolute inset-0 bg-aurora opacity-30 dark:opacity-25"></div>
  {#key activeFx}
    {#if activeFx === 'matrix'}
      <MatrixRain opacity={0.2} speed={1} />
    {:else if activeFx === 'neural'}
      <NeuralNetwork opacity={0.4} nodeCount={28} linkDistance={140} />
    {:else if activeFx === 'code'}
      <CodeStream opacity={0.25} count={12} />
    {/if}
  {/key}
</div>
{/if}

<div class="min-h-screen flex flex-col relative">
  {#if !isAdminRoute}
  <Header />
  {/if}

  <main class="flex-1">
    {#if !isAdminRoute}
      <div class="container pt-24 pb-2 max-w-4xl mx-auto relative z-20">
        <AdSense slot="" format="horizontal" responsive={true} />
      </div>
    {/if}
    <slot />
  </main>

  {#if !isAdminRoute}
  <!-- ==================== FOOTER ==================== -->
  <footer class="relative mt-20">
    <!-- Top fade -->
    <div class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-300/60 dark:via-purple-500/40 to-transparent"></div>

    <div class="container relative py-14">
      <div class="glass-strong rounded-3xl p-8 sm:p-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <!-- Brand -->
          <div class="lg:col-span-1">
            <a href="/" class="flex items-center gap-3 mb-4 group">
              <div class="relative">
                <div
                  class="w-12 h-12 rounded-full overflow-hidden
                         ring-2 ring-white/60 dark:ring-purple-500/30
                         shadow-lg shadow-purple-500/30
                         group-hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src="/images/qaratech-icon.png"
                    alt="QARATECH logo"
                    class="w-full h-full object-contain"
                  />
                </div>
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-full blur-xl opacity-30 -z-10"></div>
              </div>
              <div>
                <div class="text-xl font-extrabold tracking-tight leading-none">
                  <span class="text-gradient">QARA</span><span class="text-slate-800 dark:text-slate-100">TECH</span>
                </div>
                <div class="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{$t('header.tagline')}</div>
              </div>
            </a>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {$t('footer.tagline')}
            </p>
            <div class="mt-4 inline-flex items-center gap-2 badge-glass">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{$t('footer.available')}</span>
            </div>
          </div>

          <!-- Quick links -->
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{$t('footer.navigate')}</h3>
            <ul class="space-y-2.5">
              {#each quickLinks as link}
                <li>
                  <a
                    href={link.href}
                    class="group inline-flex items-center text-sm text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
                  >
                    <span class="w-0 group-hover:w-3 h-px bg-purple-500 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </a>
                </li>
              {/each}
            </ul>
          </div>

          <!-- Featured projects -->
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{$t('footer.liveProjects')}</h3>
            <ul class="space-y-2.5">
              {#each featuredLinks as link}
                <li>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
                  >
                    <i class="fa-solid fa-arrow-up-right-from-square text-xs opacity-60 group-hover:opacity-100"></i>
                    {link.label}
                  </a>
                </li>
              {/each}
            </ul>
          </div>

          <!-- Contact + socials -->
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{$t('footer.getInTouch')}</h3>
            <ul class="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-envelope mt-1 text-purple-500"></i>
                <a href="mailto:elhoucineqara114@gmail.com" class="hover:text-purple-600 dark:hover:text-purple-400 transition break-all">
                  elhoucineqara114@gmail.com
                </a>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-phone mt-1 text-purple-500"></i>
                <a href="tel:+212637446431" class="hover:text-purple-600 dark:hover:text-purple-400 transition">
                  +212 637 446 431
                </a>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-location-dot mt-1 text-purple-500"></i>
                <span>Bouznika, {$t('common.morocco')}</span>
              </li>
            </ul>

            <div class="mt-5 flex items-center gap-2">
              {#each socials as s}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  class="w-10 h-10 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/80
                         flex items-center justify-center text-slate-500 dark:text-slate-400 {s.color}
                         hover:scale-110 hover:shadow-md transition-all duration-300"
                >
                  <i class="{s.icon}"></i>
                </a>
              {/each}
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            © {currentYear} <span class="font-semibold text-slate-700 dark:text-slate-200">El Houcine QARA</span>. {$t('footer.rights')}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            {$t('footer.craftedWith')}
            <i class="fa-solid fa-heart text-pink-500 animate-pulse"></i>
            {$t('footer.craftedWithEnd')}
          </p>
        </div>
      </div>
    </div>
  </footer>

  <ScrollToTop />
  {/if}
</div>
