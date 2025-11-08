<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { clickOutside } from '$lib/actions/clickOutside';
  
  export let isOpen: boolean = false;
  export let title: string = '';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  
  const dispatch = createEventDispatcher();
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };
  
  function closeModal() {
    dispatch('close');
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200 }}
    on:click={closeModal}
  ></div>
  
  <!-- Modal -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200 }}
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full {sizeClasses[size]} max-h-[90vh] overflow-y-auto"
      in:scale={{ duration: 200, start: 0.95 }}
      out:scale={{ duration: 200, start: 0.95 }}
      use:clickOutside={() => true}
      on:click_outside={closeModal}
    >
      <!-- Header -->
      {#if title}
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <button
            on:click={closeModal}
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      {/if}
      
      <!-- Content -->
      <div class="p-6">
        <slot />
      </div>
      
      <!-- Footer -->
      <slot name="footer">
        <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            on:click={closeModal}
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            on:click={() => dispatch('confirm')}
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </slot>
    </div>
  </div>
{/if} 