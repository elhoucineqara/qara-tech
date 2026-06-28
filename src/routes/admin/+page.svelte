<script lang="ts">
  import { goto } from '$app/navigation';

  let password = '';
  let error = '';
  let loading = false;

  async function handleLogin() {
    error = '';
    loading = true;

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        await goto('/admin/messages');
      } else {
        error = 'Mot de passe incorrect';
      }
    } catch {
      error = 'Erreur de connexion';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Admin — QARATECH</title>
  <meta name="robots" content="noindex, nofollow" />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<div class="min-h-screen flex items-center justify-center p-4">
  <div
    class="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 shadow-2xl shadow-purple-500/10"
  >
    <div class="text-center mb-8">
      <div
        class="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center"
      >
        <i class="fa-solid fa-shield-halved text-white text-xl"></i>
      </div>
      <h1 class="text-2xl font-bold text-white">Admin QARATECH</h1>
      <p class="text-sm text-slate-400 mt-2">Accès réservé — messages de contact</p>
    </div>

    <form class="space-y-4" on:submit|preventDefault={handleLogin}>
      <div>
        <label for="password" class="block text-sm font-medium text-slate-300 mb-2">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          bind:value={password}
          autocomplete="current-password"
          placeholder="••••••••"
          class="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white
                 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500"
        />
      </div>

      {#if error}
        <p class="text-sm text-rose-400 flex items-center gap-2">
          <i class="fa-solid fa-circle-exclamation"></i>
          {error}
        </p>
      {/if}

      <button
        type="submit"
        disabled={loading || !password}
        class="w-full py-3 rounded-xl font-semibold text-white
               bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
               hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {#if loading}
          Connexion...
        {:else}
          <i class="fa-solid fa-right-to-bracket mr-2"></i>
          Se connecter
        {/if}
      </button>
    </form>

    <p class="text-center mt-6 text-xs text-slate-500">
      <a href="/" class="hover:text-purple-400 transition">← Retour au site</a>
    </p>
  </div>
</div>
