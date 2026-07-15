<script lang="ts">
  import { page } from '$app/stores';

  export let mobileOpen = false;

  const links = [
    {
      href: '/admin/messages',
      label: 'Messages',
      icon: 'fa-inbox',
      collection: 'contact_messages'
    },
    {
      href: '/admin/visitors',
      label: 'Visiteurs',
      icon: 'fa-chart-line',
      collection: 'visits'
    },
    {
      href: '/admin/articles',
      label: 'Articles',
      icon: 'fa-file-lines',
      collection: 'blog_posts'
    },
    {
      href: '/admin/emails',
      label: 'Historique des Emails',
      icon: 'fa-envelope-open-text',
      collection: 'scheduled_emails'
    }
  ];

  function isActive(href: string) {
    return $page.url.pathname.startsWith(href);
  }
</script>

<!-- Mobile overlay -->
{#if mobileOpen}
  <button
    type="button"
    class="fixed inset-0 z-40 bg-black/60 lg:hidden"
    aria-label="Fermer le menu"
    on:click={() => (mobileOpen = false)}
  ></button>
{/if}

<aside
  class="fixed lg:sticky top-0 left-0 z-50 h-screen w-64 flex-shrink-0
         border-r border-slate-800 bg-slate-950 flex flex-col
         transition-transform duration-300 lg:translate-x-0
         {mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}"
>
  <!-- Brand -->
  <div class="px-5 py-5 border-b border-slate-800">
    <a href="/admin/messages" class="flex items-center gap-3 group">
      <div
        class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
               flex items-center justify-center shadow-lg shadow-purple-500/20"
      >
        <i class="fa-solid fa-shield-halved text-white"></i>
      </div>
      <div>
        <div class="font-bold text-white leading-tight">QARATECH</div>
        <div class="text-[10px] uppercase tracking-widest text-slate-500">Administration</div>
      </div>
    </a>
  </div>

  <!-- Navigation -->
  <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
    <p class="px-3 mb-2 text-[10px] uppercase tracking-widest text-slate-600 font-semibold">Menu</p>
    {#each links as link}
      <a
        href={link.href}
        on:click={() => (mobileOpen = false)}
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition
               {isActive(link.href)
          ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent'}"
      >
        <i class="fa-solid {link.icon} w-4 text-center"></i>
        <span class="flex-1">{link.label}</span>
      </a>
    {/each}
  </nav>

  <!-- MongoDB collections -->
  <div class="px-4 py-4 border-t border-slate-800">
    <p class="px-1 mb-2 text-[10px] uppercase tracking-widest text-slate-600 font-semibold">
      Collections MongoDB
    </p>
    <div class="space-y-1.5">
      {#each links as link}
        <div class="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-slate-900/80">
          <i class="fa-solid fa-database text-[10px] text-emerald-500"></i>
          <code class="text-[11px] text-slate-400 truncate">{link.collection}</code>
        </div>
      {/each}
    </div>
    <p class="mt-3 px-1 text-[10px] text-slate-600">Base : <code class="text-slate-500">qaratech</code></p>
  </div>

  <!-- Footer link -->
  <div class="px-4 py-4 border-t border-slate-800">
    <a
      href="/"
      class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition"
    >
      <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
      Voir le site
    </a>
  </div>
</aside>
