<script lang="ts">
  import { onMount } from 'svelte';
  import { adminPageTitle, adminPageSubtitle } from '$lib/stores/admin-ui';

  export let data: any;
  $: posts = data.posts;

  let shareModalOpen = false;
  let selectedPost: any = null;
  let targetEmail = '';
  let scheduledAt = '';
  let sharing = false;
  let shareStatus = '';

  onMount(() => {
    adminPageTitle.set('Articles');
    adminPageSubtitle.set('Gérer et partager vos articles de blog');
  });

  function openShareModal(post: any) {
    selectedPost = post;
    targetEmail = '';
    scheduledAt = '';
    shareStatus = '';
    shareModalOpen = true;
  }

  function closeShareModal() {
    shareModalOpen = false;
    selectedPost = null;
  }

  async function handleShare() {
    if (!targetEmail || !selectedPost) return;

    sharing = true;
    shareStatus = '';
    
    try {
      const res = await fetch('/api/admin/articles/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: selectedPost.slug,
          email: targetEmail,
          scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : null
        })
      });

      if (res.ok) {
        shareStatus = 'success';
        setTimeout(() => closeShareModal(), 2000);
      } else {
        const err = await res.json();
        shareStatus = `error: ${err.message || 'Erreur lors du partage'}`;
      }
    } catch (err) {
      shareStatus = 'error: Erreur réseau';
    } finally {
      sharing = false;
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
</script>

<div class="space-y-6">
  <div class="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-slate-300">
        <thead class="bg-slate-950/50 text-xs uppercase text-slate-400 font-semibold">
          <tr>
            <th scope="col" class="px-6 py-4">Titre (FR)</th>
            <th scope="col" class="px-6 py-4">Auteur</th>
            <th scope="col" class="px-6 py-4">Date</th>
            <th scope="col" class="px-6 py-4">Statut</th>
            <th scope="col" class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800">
          {#each posts as post}
            <tr class="hover:bg-slate-800/30 transition-colors">
              <td class="px-6 py-4 font-medium text-white truncate max-w-[200px]" title={post.title.fr}>
                {post.title.fr || post.title.en}
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 text-xs">
                  <i class="fa-solid fa-user text-slate-500"></i> {post.author}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-slate-400">
                {formatDate(post.date)}
              </td>
              <td class="px-6 py-4">
                {#if post.published}
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Publié
                  </span>
                {:else}
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-400 text-xs font-medium border border-slate-500/20">
                    <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    Brouillon
                  </span>
                {/if}
              </td>
              <td class="px-6 py-4 text-right">
                <button
                  on:click={() => openShareModal(post)}
                  class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-purple-500/20 transition-all border border-transparent hover:border-purple-500/30 group relative"
                  title="Partager via Brevo (Email)"
                >
                  <i class="fa-solid fa-envelope group-hover:scale-110 transition-transform"></i>
                </button>
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700 inline-block ml-1"
                  title="Voir l'article"
                >
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="5" class="px-6 py-12 text-center text-slate-500">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800/50 mb-3">
                  <i class="fa-solid fa-file-lines text-xl"></i>
                </div>
                <p>Aucun article trouvé.</p>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Modal Partage Brevo -->
{#if shareModalOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
    <div class="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 relative">
      <button 
        on:click={closeShareModal}
        class="absolute top-4 right-4 text-slate-400 hover:text-white transition"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

      <h3 class="text-xl font-bold text-white mb-2">Partager par Email</h3>
      <p class="text-sm text-slate-400 mb-6">
        Envoyer l'article <strong class="text-purple-400">"{selectedPost?.title.fr}"</strong> via Brevo.
      </p>

      <form on:submit|preventDefault={handleShare} class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-slate-300 mb-1">Emails des destinataires (séparés par des virgules)</label>
          <textarea
            id="email"
            bind:value={targetEmail}
            required
            rows="3"
            placeholder="exemple1@domaine.com, exemple2@domaine.com..."
            class="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
          ></textarea>
        </div>

        <div>
          <label for="scheduledAt" class="block text-sm font-medium text-slate-300 mb-1">Planifier l'envoi (Optionnel)</label>
          <input
            type="datetime-local"
            id="scheduledAt"
            bind:value={scheduledAt}
            class="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
          <p class="text-xs text-slate-500 mt-1">Laissez vide pour envoyer immédiatement.</p>
        </div>

        {#if shareStatus === 'success'}
          <div class="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm flex items-center gap-2">
            <i class="fa-solid fa-check-circle"></i> {scheduledAt ? 'Email planifié avec succès !' : 'Email envoyé avec succès !'}
          </div>
        {:else if shareStatus.startsWith('error')}
          <div class="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-sm flex items-center gap-2">
            <i class="fa-solid fa-triangle-exclamation"></i> {shareStatus.replace('error: ', '')}
          </div>
        {/if}

        <div class="pt-4 flex justify-end gap-3">
          <button
            type="button"
            on:click={closeShareModal}
            class="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={sharing || !targetEmail}
            class="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {#if sharing}
              <i class="fa-solid fa-circle-notch fa-spin"></i> Traitement...
            {:else if scheduledAt}
              <i class="fa-solid fa-clock"></i> Planifier
            {:else}
              <i class="fa-solid fa-paper-plane"></i> Envoyer
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
