<script lang="ts">
  import { currentLang, languages, type Lang } from '$lib/i18n/i18n';
  import { onMount } from 'svelte';

  let open = false;

  function select(lang: string) {
    currentLang.set(lang as Lang);
    open = false;
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('[data-lang-toggle]')) {
      open = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<div class="relative" data-lang-toggle>
  <button
    type="button"
    on:click|stopPropagation={() => (open = !open)}
    aria-label="Change language"
    aria-haspopup="listbox"
    aria-expanded={open}
    title="Change language"
    class="relative h-10 px-3 rounded-xl flex items-center gap-1.5
           bg-white/60 dark:bg-slate-800/60 backdrop-blur-md
           border border-white/70 dark:border-slate-700/70
           text-slate-700 dark:text-slate-200
           hover:bg-white/90 dark:hover:bg-slate-800/90
           hover:shadow-md hover:scale-105
           transition-all duration-300 text-sm font-semibold"
  >
    <img
      src={languages[$currentLang].flag}
      alt="{languages[$currentLang].label} flag"
      class="w-6 h-4 rounded-sm object-cover shadow-sm ring-1 ring-black/5 dark:ring-white/10"
      loading="lazy"
    />
    <span class="hidden sm:inline">{languages[$currentLang].short}</span>
    <i class="fa-solid fa-chevron-down text-[10px] opacity-60 transition-transform duration-300 {open ? 'rotate-180' : ''}"></i>
  </button>

  {#if open}
    <div
      role="listbox"
      class="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden z-50
             bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
             border border-white/70 dark:border-slate-700/60
             shadow-xl shadow-purple-500/10 dark:shadow-black/40
             animate-fadeDown"
    >
      {#each Object.entries(languages) as [code, info]}
        <button
          type="button"
          role="option"
          aria-selected={$currentLang === code}
          on:click={() => select(code)}
          class="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm transition-colors
                 {$currentLang === code
            ? 'bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 font-semibold'
            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'}"
        >
          <img
            src={info.flag}
            alt="{info.label} flag"
            class="w-6 h-4 rounded-sm object-cover shadow-sm ring-1 ring-black/5 dark:ring-white/10"
            loading="lazy"
          />
          <span>{info.label}</span>
          {#if $currentLang === code}
            <i class="fa-solid fa-check ml-auto text-purple-500 dark:text-purple-300 text-xs"></i>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeDown { animation: fadeDown 0.2s ease-out forwards; }
</style>
