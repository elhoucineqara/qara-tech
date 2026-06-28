<script lang="ts">
  import { adminPageTitle, adminPageSubtitle, adminRefresh } from '$lib/stores/admin-ui';

  export let mobileOpen = false;
  export let onLogout: () => void;
</script>

<header
  class="sticky top-0 z-30 h-16 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl
         flex items-center justify-between gap-4 px-4 sm:px-6"
>
  <div class="flex items-center gap-3 min-w-0">
    <button
      type="button"
      class="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
      aria-label="Ouvrir le menu"
      on:click={() => (mobileOpen = !mobileOpen)}
    >
      <i class="fa-solid fa-bars"></i>
    </button>
    <div class="min-w-0">
      {#if $adminPageTitle}
        <h1 class="text-base sm:text-lg font-bold text-white truncate">{$adminPageTitle}</h1>
      {:else}
        <h1 class="text-base sm:text-lg font-bold text-white">Dashboard</h1>
      {/if}
      {#if $adminPageSubtitle}
        <p class="text-xs text-slate-500 truncate hidden sm:block">{$adminPageSubtitle}</p>
      {/if}
    </div>
  </div>

  <div class="flex items-center gap-2 flex-shrink-0">
    {#if $adminRefresh}
      <button
        type="button"
        on:click={() => $adminRefresh?.()}
        class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        title="Actualiser"
      >
        <i class="fa-solid fa-rotate-right"></i>
      </button>
    {/if}
    <button
      type="button"
      on:click={onLogout}
      class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300
             hover:bg-rose-500/10 hover:text-rose-300 border border-transparent hover:border-rose-500/20 transition"
    >
      <i class="fa-solid fa-right-from-bracket"></i>
      <span class="hidden sm:inline">Déconnexion</span>
    </button>
  </div>
</header>
