<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';

  onMount(() => theme.init());
</script>

<button
  type="button"
  on:click={() => theme.toggle()}
  aria-label="Toggle dark mode"
  title="Toggle dark mode"
  class="relative w-10 h-10 rounded-xl flex items-center justify-center
         bg-white/60 dark:bg-slate-800/60 backdrop-blur-md
         border border-white/70 dark:border-slate-700/70
         text-slate-700 dark:text-amber-300
         hover:bg-white/90 dark:hover:bg-slate-800/90
         hover:shadow-md hover:scale-105
         transition-all duration-300 overflow-hidden"
>
  <!-- Sun (light mode) -->
  <i
    class="fa-solid fa-sun absolute transition-all duration-500
           {$theme === 'dark' ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}"
  ></i>
  <!-- Moon (dark mode) -->
  <i
    class="fa-solid fa-moon absolute transition-all duration-500
           {$theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}"
  ></i>
</button>
