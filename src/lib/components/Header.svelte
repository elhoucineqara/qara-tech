<script lang="ts">
  import { page } from '$app/stores';
  import { onMount, onDestroy } from 'svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import LanguageToggle from './LanguageToggle.svelte';
  import { t } from '$lib/i18n/i18n';

  let isScrolled = false;
  let isMenuOpen = false;

  function handleScroll() {
    isScrolled = window.scrollY > 30;
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
    }
  });

  $: navItems = [
    { href: '/', label: $t('nav.home') },
    { href: '/about', label: $t('nav.about') },
    { href: '/skills', label: $t('nav.skills') },
    { href: '/experience', label: $t('nav.experience') },
    { href: '/projects', label: $t('nav.projects') },
    { href: '/services', label: $t('nav.services') },
    { href: '/blog', label: $t('nav.blog') },
    { href: '/contact', label: $t('nav.contact') }
  ];

  $: currentPath = $page.url.pathname;
</script>

<header
  class="fixed top-0 inset-x-0 z-50 transition-all duration-500
         {isScrolled
    ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-b border-white/60 dark:border-slate-800/60 shadow-[0_4px_24px_-8px_rgba(99,102,241,0.15)] dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.6)]'
    : 'bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl border-b border-white/30 dark:border-slate-800/30'}"
>
  <nav class="container">
    <div class="flex justify-between items-center py-3 sm:py-4">
      <!-- Logo -->
      <a href="/" class="group flex items-center gap-3" on:click={closeMenu}>
        <div class="relative">
          <div
            class="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden
                   ring-2 ring-white/60 dark:ring-purple-500/30
                   shadow-lg shadow-purple-500/30
                   group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
          >
            <img
              src="/images/qaratech-icon.png"
              alt="QARATECH logo"
              class="w-full h-full object-contain"
            />
          </div>
          <div
            class="absolute inset-0 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-full blur-xl opacity-40
                   group-hover:opacity-70 transition-opacity duration-300 -z-10"
          ></div>
        </div>
        <div class="hidden xs:block sm:block">
          <div class="text-lg sm:text-xl font-extrabold tracking-tight leading-none">
            <span class="text-gradient">QARA</span><span class="text-slate-800 dark:text-slate-100">TECH</span>
          </div>
          <div class="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
            {$t('header.tagline')}
          </div>
        </div>
      </a>

      <!-- Desktop nav -->
      <div class="hidden lg:flex items-center gap-1">
        {#each navItems as item}
          <a
            href={item.href}
            class="relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300
                   {currentPath === item.href
              ? 'text-purple-700 dark:text-purple-300 bg-purple-50/80 dark:bg-purple-500/15'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'}"
          >
            {item.label}
            {#if currentPath === item.href}
              <span
                class="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
              ></span>
            {/if}
          </a>
        {/each}
      </div>

      <!-- CTA + mobile button -->
      <div class="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />

        <a
          href="/contact"
          class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white
                 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                 shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30
                 hover:-translate-y-0.5 transition-all duration-300"
        >
          <i class="fa-solid fa-paper-plane text-xs"></i>
          {$t('common.hireMe')}
        </a>

        <button
          class="lg:hidden w-10 h-10 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/70 dark:border-slate-700/70
                 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/80 transition"
          on:click={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {#if isMenuOpen}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            {:else}
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            {/if}
          </svg>
        </button>
      </div>
    </div>
  </nav>
</header>

<!-- Mobile menu overlay -->
{#if isMenuOpen}
  <div
    class="lg:hidden fixed inset-0 bg-slate-900/30 dark:bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
    on:click={closeMenu}
    role="button"
    tabindex="-1"
    on:keydown={(e) => e.key === 'Escape' && closeMenu()}
  ></div>

  <div
    class="lg:hidden fixed top-20 left-4 right-4 z-50 glass-strong rounded-2xl p-2 animate-slideDown"
  >
    {#each navItems as item}
      <a
        href={item.href}
        on:click={closeMenu}
        class="block px-4 py-3 rounded-xl text-sm font-medium transition
               {currentPath === item.href
          ? 'bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-indigo-500/20 dark:to-pink-500/20 text-purple-700 dark:text-purple-300'
          : 'text-slate-700 dark:text-slate-200 hover:bg-white/70 dark:hover:bg-slate-800/60'}"
      >
        {item.label}
      </a>
    {/each}
    <a
      href="/contact"
      on:click={closeMenu}
      class="block mt-2 px-4 py-3 rounded-xl text-center text-sm font-semibold text-white
             bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md"
    >
      <i class="fa-solid fa-paper-plane text-xs mr-2"></i>
      {$t('common.hireMe')}
    </a>
  </div>
{/if}

<style>
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
  .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }

  @media (min-width: 380px) {
    :global(.xs\:block) { display: block; }
  }
</style>
