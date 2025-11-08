<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  export let type: 'success' | 'error' | 'warning' | 'info' = 'info';
  export let message: string = '';
  export let duration: number = 5000;
  export let show: boolean = false;
  
  const dispatch = createEventDispatcher();
  
  let timeoutId: ReturnType<typeof setTimeout>;
  
  $: if (show && duration > 0) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      show = false;
      dispatch('close');
    }, duration);
  }
  
  function closeNotification() {
    show = false;
    dispatch('close');
  }
  
  const typeConfig = {
    success: {
      icon: '✓',
      bgColor: 'bg-green-500',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    },
    error: {
      icon: '✕',
      bgColor: 'bg-red-500',
      textColor: 'text-red-800',
      borderColor: 'border-red-200'
    },
    warning: {
      icon: '⚠',
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200'
    },
    info: {
      icon: 'ℹ',
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200'
    }
  };
  
  const config = typeConfig[type];
</script>

{#if show}
  <div
    class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white shadow-lg rounded-lg border {config.borderColor} p-4"
    in:fly={{ y: -50, duration: 300 }}
    out:fade={{ duration: 200 }}
  >
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <div class="w-6 h-6 rounded-full {config.bgColor} flex items-center justify-center text-white text-sm font-bold">
          {config.icon}
        </div>
      </div>
      <div class="ml-3 flex-1">
        <p class="text-sm font-medium text-gray-900">
          {message}
        </p>
      </div>
      <div class="ml-4 flex-shrink-0 flex">
        <button
          on:click={closeNotification}
          class="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
{/if} 
