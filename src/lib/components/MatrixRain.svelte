<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let opacity: number = 0.35;
  export let speed: number = 1;
  export let fontSize: number = 14;
  export let color: string = '#a855f7';

  let canvas: HTMLCanvasElement;
  let container: HTMLDivElement;
  let animationId = 0;
  let drops: number[] = [];
  let cols = 0;
  let lastTime = 0;
  let visible = true;
  const TARGET_FPS = 15;
  const FRAME_MS = 1000 / TARGET_FPS;

  const charset =
    'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピ0123456789{}[]<>=+*-/&|!?$%@#'.split('');

  function resize() {
    if (!canvas || !container) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    const ctx = canvas.getContext('2d');
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(rect.width / fontSize);
    drops = new Array(cols).fill(0).map(() => Math.random() * -50);
  }

  function draw(now: number) {
    if (!canvas) return;
    if (!visible || now - lastTime < FRAME_MS) {
      animationId = requestAnimationFrame(draw);
      return;
    }
    lastTime = now;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    ctx.fillStyle = 'rgba(5, 4, 20, 0.12)';
    ctx.fillRect(0, 0, w, h);

    ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace`;
    for (let i = 0; i < cols; i++) {
      const ch = charset[Math.floor(Math.random() * charset.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillStyle = color + 'ff';
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.fillText(ch, x, y);
      ctx.shadowBlur = 0;

      if (y > h && Math.random() > 0.975) drops[i] = 0;
      drops[i] += speed;
    }

    animationId = requestAnimationFrame(draw);
  }

  function onVisibilityChange() {
    visible = !document.hidden;
  }

  onMount(() => {
    if (typeof window === 'undefined') return;
    resize();
    animationId = requestAnimationFrame(draw);
    const ro = new ResizeObserver(() => resize());
    if (container) ro.observe(container);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  });

  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
  });
</script>

<div
  bind:this={container}
  class="absolute inset-0 pointer-events-none overflow-hidden"
  style="opacity: {opacity}; mix-blend-mode: screen;"
  aria-hidden="true"
>
  <canvas bind:this={canvas} class="block w-full h-full"></canvas>
</div>
