<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { adminPageTitle, adminPageSubtitle, adminRefresh } from '$lib/stores/admin-ui';
  import type { VisitorStats } from '$lib/server/visitors';

  let stats: VisitorStats | null = null;
  let loading = true;
  let error = '';

  async function loadStats() {
    loading = true;
    error = '';
    try {
      const res = await fetch('/api/admin/visitors');
      if (res.status === 401) {
        await goto('/admin');
        return;
      }
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      stats = data.stats;
    } catch {
      error = 'Impossible de charger les statistiques';
    } finally {
      loading = false;
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function flag(code: string) {
    if (!code || code === 'XX' || code.length !== 2) return '🌍';
    return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)));
  }

  onMount(() => {
    adminPageTitle.set('Statistiques visiteurs');
    adminPageSubtitle.set('Collection visits');
    adminRefresh.set(loadStats);
    loadStats();
  });

  onDestroy(() => {
    adminRefresh.set(null);
  });
</script>

<svelte:head>
  <title>Visiteurs — Admin QARATECH</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if loading}
      <div class="flex justify-center py-20">
        <svg class="animate-spin h-8 w-8 text-purple-500" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    {:else if error}
      <div class="text-center py-16 text-rose-400">{error}</div>
    {:else if stats}
      <!-- KPI cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {#each [
          { label: 'Visites totales', value: stats.totals.visits, icon: 'fa-eye', color: 'from-indigo-500 to-purple-500' },
          { label: "Aujourd'hui", value: stats.totals.today, icon: 'fa-calendar-day', color: 'from-emerald-500 to-teal-500' },
          { label: 'Visiteurs uniques', value: stats.totals.uniqueVisitors, icon: 'fa-users', color: 'from-pink-500 to-rose-500' },
          { label: 'Pays', value: stats.totals.countries, icon: 'fa-globe', color: 'from-amber-500 to-orange-500' }
        ] as kpi}
          <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs uppercase tracking-wider text-slate-500">{kpi.label}</span>
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br {kpi.color} flex items-center justify-center">
                <i class="fa-solid {kpi.icon} text-white text-xs"></i>
              </div>
            </div>
            <p class="text-3xl font-bold text-white">{kpi.value.toLocaleString('fr-FR')}</p>
          </div>
        {/each}
      </div>

      <div class="grid lg:grid-cols-2 gap-6 mb-8">
        <!-- Countries -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-earth-africa text-purple-400"></i>
            Par pays
          </h2>
          {#if stats.byCountry.length === 0}
            <p class="text-slate-500 text-sm">Aucune donnée pour le moment</p>
          {:else}
            <div class="space-y-3">
              {#each stats.byCountry as row}
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="text-lg">{flag(row.countryCode)}</span>
                    <span class="text-slate-200 truncate">{row.country}</span>
                    <span class="text-xs text-slate-500">{row.countryCode}</span>
                  </div>
                  <div class="flex items-center gap-3 flex-shrink-0">
                    <div class="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style="width: {Math.round((row.count / stats.totals.visits) * 100)}%"
                      ></div>
                    </div>
                    <span class="text-sm font-semibold text-white w-8 text-right">{row.count}</span>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Pages -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-file-lines text-emerald-400"></i>
            Pages visitées
          </h2>
          {#if stats.byPage.length === 0}
            <p class="text-slate-500 text-sm">Aucune donnée pour le moment</p>
          {:else}
            <div class="space-y-2">
              {#each stats.byPage as row}
                <div class="flex items-center justify-between py-2 border-b border-slate-800/80 last:border-0">
                  <code class="text-sm text-purple-300">{row.path}</code>
                  <span class="text-sm font-semibold text-slate-300">{row.count}</span>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-6 mb-8">
        <!-- Devices -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 class="text-lg font-bold text-white mb-4">Appareils</h2>
          <div class="flex flex-wrap gap-3">
            {#each stats.byDevice as row}
              <div class="px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div class="text-xs text-slate-400 capitalize">{row.device}</div>
                <div class="text-xl font-bold text-white">{row.count}</div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Browsers -->
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 class="text-lg font-bold text-white mb-4">Navigateurs</h2>
          <div class="flex flex-wrap gap-3">
            {#each stats.byBrowser as row}
              <div class="px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div class="text-xs text-slate-400">{row.browser}</div>
                <div class="text-xl font-bold text-white">{row.count}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Recent visits -->
      <div class="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-800">
          <h2 class="text-lg font-bold text-white">Visites récentes</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-950/50 text-slate-400 text-left">
              <tr>
                <th class="px-4 py-3 font-medium">Date</th>
                <th class="px-4 py-3 font-medium">Pays</th>
                <th class="px-4 py-3 font-medium">Page</th>
                <th class="px-4 py-3 font-medium">Appareil</th>
                <th class="px-4 py-3 font-medium">Navigateur</th>
                <th class="px-4 py-3 font-medium">Langue</th>
              </tr>
            </thead>
            <tbody>
              {#each stats.recent as visit}
                <tr class="border-t border-slate-800/80 hover:bg-slate-800/30">
                  <td class="px-4 py-3 text-slate-400 whitespace-nowrap">{formatDate(visit.createdAt)}</td>
                  <td class="px-4 py-3 text-slate-200">
                    {flag(visit.countryCode)} {visit.country}
                    {#if visit.city}
                      <span class="text-slate-500 text-xs">· {visit.city}</span>
                    {/if}
                  </td>
                  <td class="px-4 py-3"><code class="text-purple-300">{visit.path}</code></td>
                  <td class="px-4 py-3 text-slate-300 capitalize">{visit.device}</td>
                  <td class="px-4 py-3 text-slate-300">{visit.browser} / {visit.os}</td>
                  <td class="px-4 py-3 text-slate-400">{visit.language || '—'}</td>
                </tr>
              {:else}
                <tr>
                  <td colspan="6" class="px-4 py-8 text-center text-slate-500">Aucune visite enregistrée</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
