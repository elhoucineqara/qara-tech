<script lang="ts">
  import { onMount } from 'svelte';
  import { adminPageTitle, adminPageSubtitle } from '$lib/stores/admin-ui';

  export let data: any;
  $: emails = data.emails;

  onMount(() => {
    adminPageTitle.set('Historique des Emails');
    adminPageSubtitle.set('Suivez vos envois planifiés et immédiats');
  });

  function formatDate(dateStr: string) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<div class="space-y-6">
  <div class="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-300">
        <thead class="bg-slate-950/50 text-xs uppercase text-slate-400 font-semibold">
          <tr>
            <th scope="col" class="px-6 py-4">Article (Slug)</th>
            <th scope="col" class="px-6 py-4">Destinataire(s)</th>
            <th scope="col" class="px-6 py-4">Créé le</th>
            <th scope="col" class="px-6 py-4">Planifié pour</th>
            <th scope="col" class="px-6 py-4">Envoyé le</th>
            <th scope="col" class="px-6 py-4">Statut</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800">
          {#each emails as email}
            <tr class="hover:bg-slate-800/30 transition-colors">
              <td class="px-6 py-4 font-medium text-white max-w-[150px] truncate" title={email.slug}>
                {email.slug}
              </td>
              <td class="px-6 py-4 max-w-[200px] truncate" title={email.email}>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 text-xs">
                  <i class="fa-solid fa-at text-slate-500"></i> {email.email}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-slate-400">
                {formatDate(email.createdAt)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-purple-400">
                {formatDate(email.scheduledAt)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-slate-400">
                {formatDate(email.sentAt)}
              </td>
              <td class="px-6 py-4">
                {#if email.status === 'sent'}
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Envoyé
                  </span>
                {:else if email.status === 'pending'}
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    En attente
                  </span>
                {:else if email.status === 'failed'}
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-medium border border-rose-500/20" title={email.error}>
                    <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    Échoué
                  </span>
                {:else}
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-400 text-xs font-medium border border-slate-500/20">
                    <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    {email.status}
                  </span>
                {/if}
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="6" class="px-6 py-12 text-center text-slate-500">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800/50 mb-3">
                  <i class="fa-solid fa-envelope-open text-xl"></i>
                </div>
                <p>Aucun email dans l'historique.</p>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
