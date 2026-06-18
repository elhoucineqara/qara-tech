<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let nodeCount: number = 50;
  export let opacity: number = 0.5;
  export let linkDistance: number = 140;
  export let speed: number = 0.4;
  export let color: string = '#6366f1';
  export let pulseColor: string = '#ec4899';
  /** Désactiver l'interaction souris (coûteux en perf) */
  export let interactive: boolean = false;

  interface Node {
    x: number; y: number;
    vx: number; vy: number;
    r: number;
    pulse: number;
    pulseSpeed: number;
  }

  let canvas: HTMLCanvasElement;
  let container: HTMLDivElement;
  let animationId = 0;
  let nodes: Node[] = [];
  let mouse = { x: -9999, y: -9999, active: false };
  let visible = true;
  let lastTime = 0;
  const TARGET_FPS = 30;
  const FRAME_MS = 1000 / TARGET_FPS;

  function buildNodes(w: number, h: number) {
    nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 2 + 1.4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02
      });
    }
  }

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
    buildNodes(rect.width, rect.height);
  }

  function draw(now: number = 0) {
    if (!visible) {
      animationId = requestAnimationFrame(draw);
      return;
    }
    if (now - lastTime < FRAME_MS) {
      animationId = requestAnimationFrame(draw);
      return;
    }
    lastTime = now;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      n.pulse += n.pulseSpeed;

      if (mouse.active) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          n.vx += (dx / d) * 0.04;
          n.vy += (dy / d) * 0.04;
        }
        n.vx = Math.max(-1, Math.min(1, n.vx));
        n.vy = Math.max(-1, Math.min(1, n.vy));
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < linkDistance) {
          const alpha = 1 - dist / linkDistance;
          ctx.strokeStyle = `${color}${Math.floor(alpha * 80).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      const pulseScale = 1 + Math.sin(n.pulse) * 0.4;
      const r = n.r * pulseScale;

      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
      grad.addColorStop(0, pulseColor + 'cc');
      grad.addColorStop(0.4, color + '55');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = pulseColor;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    animationId = requestAnimationFrame(draw);
  }

  function onMove(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  }
  function onLeave() { mouse.active = false; mouse.x = -9999; mouse.y = -9999; }

  function onVisibilityChange() {
    visible = !document.hidden;
  }

  onMount(() => {
    if (typeof window === 'undefined') return;
    resize();
    animationId = requestAnimationFrame(draw);
    const ro = new ResizeObserver(() => resize());
    if (container) ro.observe(container);
    if (interactive) {
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseleave', onLeave);
    }
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      ro.disconnect();
      if (interactive) {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseleave', onLeave);
      }
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
  style="opacity: {opacity};"
  aria-hidden="true"
>
  <canvas bind:this={canvas} class="block w-full h-full"></canvas>
</div>
