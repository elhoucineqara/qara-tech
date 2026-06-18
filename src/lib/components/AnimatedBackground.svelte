<script lang="ts">
  /**
   * AnimatedBackground
   * Décor 3D + drifting orbs + aurora + grid + (optional) twinkling stars.
   * Optional tech overlays: matrix rain, neural network, code stream.
   */
  import MatrixRain from './MatrixRain.svelte';
  import NeuralNetwork from './NeuralNetwork.svelte';
  import CodeStream from './CodeStream.svelte';

  export let variant: 'aurora' | 'orbs' | 'cube' | 'minimal' = 'aurora';
  export let showStars: boolean = false;
  export let showGrid: boolean = true;

  /** Optional tech overlay layered on top of the geometric background */
  export let tech: 'none' | 'matrix' | 'neural' | 'code' | 'matrix+code' | 'neural+code' = 'none';
  /** Overlay strength */
  export let techOpacity: number = 0.35;
</script>

<div class="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
  <!-- Aurora gradient sheet -->
  {#if variant === 'aurora' || variant === 'cube'}
    <div class="absolute inset-0 bg-aurora opacity-60 dark:opacity-50"></div>
  {/if}

  <!-- Grid texture -->
  {#if showGrid}
    <div class="absolute inset-0 bg-grid-light opacity-40 dark:opacity-20"></div>
  {/if}

  <!-- Drifting orbs -->
  {#if variant === 'aurora' || variant === 'orbs'}
    <div class="absolute -top-20 -left-20 w-80 h-80 rounded-full
                bg-gradient-to-br from-indigo-400/40 to-purple-400/40
                blur-3xl animate-drift"></div>
    <div class="absolute top-1/3 -right-24 w-96 h-96 rounded-full
                bg-gradient-to-br from-pink-400/40 to-purple-400/40
                blur-3xl animate-drift" style="animation-delay: -4s"></div>
    <div class="absolute bottom-0 left-1/4 w-72 h-72 rounded-full
                bg-gradient-to-br from-cyan-400/35 to-blue-400/35
                blur-3xl animate-drift" style="animation-delay: -8s"></div>
  {/if}

  <!-- Rotating 3D cube -->
  {#if variant === 'cube'}
    <div class="absolute top-12 right-8 sm:right-20 w-32 h-32 sm:w-44 sm:h-44
                opacity-50 dark:opacity-40"
         style="perspective: 700px;">
      <div class="cube-3d w-full h-full animate-spin-3d-slow rounded-2xl">
        <div class="face rounded-2xl" style="transform: translateZ(60px);"></div>
        <div class="face rounded-2xl" style="transform: rotateY(180deg) translateZ(60px);"></div>
        <div class="face rounded-2xl" style="transform: rotateY(90deg)  translateZ(60px);"></div>
        <div class="face rounded-2xl" style="transform: rotateY(-90deg) translateZ(60px);"></div>
        <div class="face rounded-2xl" style="transform: rotateX(90deg)  translateZ(60px);"></div>
        <div class="face rounded-2xl" style="transform: rotateX(-90deg) translateZ(60px);"></div>
      </div>
    </div>

    <div class="absolute bottom-16 left-6 sm:left-16 w-20 h-20 sm:w-28 sm:h-28
                opacity-40 dark:opacity-35"
         style="perspective: 600px;">
      <div class="cube-3d w-full h-full animate-spin-3d rounded-xl">
        <div class="face rounded-xl" style="transform: translateZ(40px);"></div>
        <div class="face rounded-xl" style="transform: rotateY(180deg) translateZ(40px);"></div>
        <div class="face rounded-xl" style="transform: rotateY(90deg)  translateZ(40px);"></div>
        <div class="face rounded-xl" style="transform: rotateY(-90deg) translateZ(40px);"></div>
        <div class="face rounded-xl" style="transform: rotateX(90deg)  translateZ(40px);"></div>
        <div class="face rounded-xl" style="transform: rotateX(-90deg) translateZ(40px);"></div>
      </div>
    </div>
  {/if}

  <!-- Twinkling stars -->
  {#if showStars}
    <div class="stars-bg absolute inset-0 opacity-50 dark:opacity-90"></div>
  {/if}

  <!-- Tech overlays (AI, hacking, dev) -->
  {#if tech === 'matrix' || tech === 'matrix+code'}
    <MatrixRain opacity={techOpacity} />
  {/if}
  {#if tech === 'neural' || tech === 'neural+code'}
    <NeuralNetwork opacity={techOpacity + 0.2} />
  {/if}
  {#if tech === 'code' || tech === 'matrix+code' || tech === 'neural+code'}
    <CodeStream opacity={techOpacity} />
  {/if}
</div>

<style>
  .stars-bg {
    background-image:
      radial-gradient(2px 2px at 12% 18%, rgba(255,255,255,0.9), transparent 50%),
      radial-gradient(2px 2px at 28% 72%, rgba(255,255,255,0.7), transparent 50%),
      radial-gradient(1.5px 1.5px at 48% 30%, rgba(255,255,255,0.85), transparent 50%),
      radial-gradient(2px 2px at 68% 60%, rgba(255,255,255,0.7), transparent 50%),
      radial-gradient(1.5px 1.5px at 82% 22%, rgba(255,255,255,0.9), transparent 50%),
      radial-gradient(2px 2px at 92% 80%, rgba(255,255,255,0.6), transparent 50%),
      radial-gradient(1.5px 1.5px at 8%  88%, rgba(255,255,255,0.8), transparent 50%),
      radial-gradient(1.5px 1.5px at 38% 6%,  rgba(255,255,255,0.7), transparent 50%),
      radial-gradient(2px 2px at 58% 90%, rgba(255,255,255,0.8), transparent 50%),
      radial-gradient(1.5px 1.5px at 78% 48%, rgba(255,255,255,0.85), transparent 50%);
    animation: twinkle 7s ease-in-out infinite;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%      { opacity: 1;   transform: scale(1.04); }
  }
</style>
