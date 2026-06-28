<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';
  import AdminSidebar from '$lib/components/AdminSidebar.svelte';
  import AdminNavbar from '$lib/components/AdminNavbar.svelte';
  import { adminPageTitle, adminPageSubtitle, adminRefresh } from '$lib/stores/admin-ui';

  export let data: { authenticated: boolean };

  let mobileOpen = false;

  $: showShell = data.authenticated && $page.url.pathname !== '/admin';

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    await goto('/admin');
  }

  onDestroy(() => {
    adminPageTitle.set('');
    adminPageSubtitle.set('');
    adminRefresh.set(null);
  });
</script>

<svelte:head>
  {#if showShell}
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      rel="stylesheet"
    />
  {/if}
</svelte:head>

{#if showShell}
  <div class="min-h-screen flex bg-slate-950 text-slate-100">
    <AdminSidebar bind:mobileOpen />
    <div class="flex-1 flex flex-col min-w-0 min-h-screen">
      <AdminNavbar bind:mobileOpen onLogout={logout} />
      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
{:else}
  <slot />
{/if}
