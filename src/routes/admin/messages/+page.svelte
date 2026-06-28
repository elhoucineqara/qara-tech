<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { ContactMessage } from '$lib/server/contact-messages';

  let messages: ContactMessage[] = [];
  let loading = true;
  let error = '';
  let selected: ContactMessage | null = null;

  async function loadMessages() {
    loading = true;
    error = '';
    try {
      const res = await fetch('/api/admin/messages');
      if (res.status === 401) {
        await goto('/admin');
        return;
      }
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      messages = data.messages ?? [];
    } catch {
      error = 'Impossible de charger les messages';
    } finally {
      loading = false;
    }
  }

  async function markRead(id: string) {
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action: 'read' })
    });
    messages = messages.map((m) => (m.id === id ? { ...m, read: true } : m));
    if (selected?.id === id) selected = { ...selected, read: true };
  }

  async function removeMessage(id: string) {
    if (!confirm('Supprimer ce message ?')) return;
    const res = await fetch('/api/admin/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) {
      messages = messages.filter((m) => m.id !== id);
      if (selected?.id === id) selected = null;
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    await goto('/admin');
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function openMessage(msg: ContactMessage) {
    selected = msg;
    if (!msg.read) markRead(msg.id);
  }

  $: unreadCount = messages.filter((m) => !m.read).length;

  onMount(loadMessages);
</script>

<svelte:head>
  <title>Messages — Admin QARATECH</title>
  <meta name="robots" content="noindex, nofollow" />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<div class="min-h-screen">
  <!-- Top bar -->
  <header class="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
        >
          <i class="fa-solid fa-inbox text-white"></i>
        </div>
        <div>
          <h1 class="text-lg font-bold text-white">Messages contact</h1>
          <p class="text-xs text-slate-400">
            {messages.length} message{messages.length !== 1 ? 's' : ''}
            {#if unreadCount > 0}
              · <span class="text-emerald-400">{unreadCount} non lu{unreadCount !== 1 ? 's' : ''}</span>
            {/if}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          on:click={loadMessages}
          class="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition"
          title="Actualiser"
        >
          <i class="fa-solid fa-rotate-right"></i>
        </button>
        <button
          type="button"
          on:click={logout}
          class="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition"
        >
          <i class="fa-solid fa-right-from-bracket mr-1"></i>
          Déconnexion
        </button>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    {#if loading}
      <div class="flex justify-center py-20">
        <svg class="animate-spin h-8 w-8 text-purple-500" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    {:else if error}
      <div class="text-center py-16 text-rose-400">{error}</div>
    {:else if messages.length === 0}
      <div class="text-center py-20 rounded-2xl border border-slate-800 bg-slate-900/50">
        <i class="fa-solid fa-inbox text-4xl text-slate-600 mb-4"></i>
        <p class="text-slate-400">Aucun message pour le moment</p>
        <p class="text-sm text-slate-500 mt-2">Les soumissions du formulaire contact apparaîtront ici.</p>
      </div>
    {:else}
      <div class="grid lg:grid-cols-5 gap-6">
        <!-- List -->
        <div class="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {#each messages as msg (msg.id)}
            <button
              type="button"
              on:click={() => openMessage(msg)}
              class="w-full text-left p-4 rounded-xl border transition
                     {selected?.id === msg.id
                ? 'border-purple-500/50 bg-purple-500/10'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'}
                     {!msg.read ? 'ring-1 ring-emerald-500/30' : ''}"
            >
              <div class="flex items-start justify-between gap-2 mb-1">
                <span class="font-semibold text-white truncate">
                  {msg.firstName} {msg.lastName}
                </span>
                {#if !msg.read}
                  <span class="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5"></span>
                {/if}
              </div>
              <p class="text-xs text-slate-400 truncate">{msg.email}</p>
              <p class="text-sm text-slate-300 mt-2 line-clamp-2">{msg.message}</p>
              <p class="text-[10px] text-slate-500 mt-2">{formatDate(msg.createdAt)}</p>
            </button>
          {/each}
        </div>

        <!-- Detail -->
        <div class="lg:col-span-3">
          {#if selected}
            <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 sticky top-24">
              <div class="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 class="text-xl font-bold text-white">
                    {selected.firstName} {selected.lastName}
                  </h2>
                  <p class="text-sm text-slate-400 mt-1">{formatDate(selected.createdAt)}</p>
                </div>
                <button
                  type="button"
                  on:click={() => selected && removeMessage(selected.id)}
                  class="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition"
                  title="Supprimer"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>

              <div class="space-y-4 mb-6">
                <a
                  href="mailto:{selected.email}"
                  class="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 transition"
                >
                  <i class="fa-solid fa-envelope text-purple-400 w-5"></i>
                  <span class="text-slate-200 break-all">{selected.email}</span>
                </a>
                {#if selected.phone}
                  <a
                    href="tel:{selected.phone}"
                    class="flex items-center gap-3 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 transition"
                  >
                    <i class="fa-solid fa-phone text-emerald-400 w-5"></i>
                    <span class="text-slate-200">{selected.phone}</span>
                  </a>
                {/if}
              </div>

              <div class="rounded-xl bg-slate-950/80 border border-slate-800 p-5">
                <h3 class="text-xs uppercase tracking-wider text-slate-500 mb-3">Message</h3>
                <p class="text-slate-200 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:{selected.email}?subject=Re: Contact QARATECH"
                  class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white
                         bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition"
                >
                  <i class="fa-solid fa-reply"></i>
                  Répondre par email
                </a>
              </div>
            </div>
          {:else}
            <div
              class="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center text-slate-500"
            >
              <i class="fa-solid fa-hand-pointer text-3xl mb-3 opacity-50"></i>
              <p>Sélectionnez un message pour voir les détails</p>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </main>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
