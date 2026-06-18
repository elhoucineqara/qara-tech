<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let particleCount = 220;
  export let radius = 140;
  export let colors: string[] = ['#6366f1', '#a855f7', '#ec4899', '#06b6d4', '#3b82f6'];
  export let rotationSpeed = 0.004;
  export let centerLabel: string = '';
  export let centerImage: string = '';

  let canvas: HTMLCanvasElement;
  let container: HTMLDivElement;
  let animationId: number;
  let angleX = 0;
  let angleY = 0;

  interface Particle {
    x: number;
    y: number;
    z: number;
    size: number;
    color: string;
    pulse: number;
    pulseSpeed: number;
  }

  let particles: Particle[] = [];

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      // Fibonacci-like sphere distribution for even spacing
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      particles.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        size: Math.random() * 1.6 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }
  }

  function resize() {
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    const ctx = canvas.getContext('2d');
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    // Subtle background glow
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius * 1.8);
    grad.addColorStop(0, 'rgba(168, 85, 247, 0.18)');
    grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);

    // Project every particle through rotation, then sort by depth for proper layering
    const projected = particles.map((p) => {
      // Rotate around Y axis
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      // Rotate around X axis
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      return { ...p, rx: x1, ry: y2, rz: z2 };
    });
    projected.sort((a, b) => a.rz - b.rz);

    for (const p of projected) {
      const depth = (p.rz + radius) / (radius * 2);
      const scale = 0.4 + depth * 0.9;
      const pulse = 0.85 + Math.sin(p.pulse) * 0.15;
      const x = cx + p.rx;
      const y = cy + p.ry;
      const size = p.size * scale * pulse;
      const alpha = Math.max(0.15, depth);

      ctx.beginPath();
      ctx.shadowBlur = 14 * depth;
      ctx.shadowColor = p.color;
      ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      p.pulse += p.pulseSpeed;
    }

    ctx.shadowBlur = 0;

    // Draw subtle connection lines for front-facing particles
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
    ctx.lineWidth = 0.6;
    const frontParticles = projected.filter((p) => p.rz > 30).slice(0, 40);
    for (let i = 0; i < frontParticles.length; i++) {
      for (let j = i + 1; j < frontParticles.length; j++) {
        const a = frontParticles[i];
        const b = frontParticles[j];
        const dx = a.rx - b.rx;
        const dy = a.ry - b.ry;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 55) {
          ctx.beginPath();
          ctx.moveTo(cx + a.rx, cy + a.ry);
          ctx.lineTo(cx + b.rx, cy + b.ry);
          ctx.stroke();
        }
      }
    }

    angleY += rotationSpeed;
    angleX += rotationSpeed * 0.4;
    animationId = requestAnimationFrame(draw);
  }

  onMount(() => {
    if (typeof window === 'undefined') return;
    resize();
    createParticles();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
    });
    if (container) ro.observe(container);

    return () => {
      ro.disconnect();
    };
  });

  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
  });
</script>

<div bind:this={container} class="relative w-full h-full">
  <canvas bind:this={canvas} class="absolute inset-0"></canvas>

  {#if centerImage}
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="relative animate-pulse-slow">
        <div
          class="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden
                 drop-shadow-2xl"
        >
          <img
            src={centerImage}
            alt="Center logo"
            class="w-full h-full object-contain"
          />
        </div>
        <div
          class="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 blur-2xl opacity-60 -z-10"
        ></div>
      </div>
    </div>
  {:else if centerLabel}
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="relative">
        <div
          class="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                 flex items-center justify-center shadow-2xl shadow-purple-500/50
                 ring-4 ring-white/20 backdrop-blur-md
                 animate-pulse-slow"
        >
          <span class="font-black text-3xl sm:text-4xl text-white tracking-tight drop-shadow-lg">
            {centerLabel}
          </span>
        </div>
        <div
          class="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 blur-2xl opacity-50 -z-10"
        ></div>
      </div>
    </div>
  {/if}
</div>

<style>
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  :global(.animate-pulse-slow) {
    animation: pulse-slow 4s ease-in-out infinite;
  }
</style>
