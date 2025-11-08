# Create new file
<script lang="ts">
  import { onMount } from 'svelte';
  
  let isVisible = false;
  
  onMount(() => {
    isVisible = true;
    createParticles();
    createScanline();
    initMatrixRain();
    createCodeLines();
  });

  const createParticles = () => {
    const container = document.querySelector('.tech-background');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);
    }
  };

  const createScanline = () => {
    const container = document.querySelector('.tech-background');
    if (!container) return;

    const scanline = document.createElement('div');
    scanline.className = 'scanline';
    container.appendChild(scanline);
  };

  const initMatrixRain = () => {
    const canvas = document.getElementById('matrix-rain') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const matrixArray = matrix.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * (canvas.height / fontSize));
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    setInterval(draw, 33);
  };

  const createCodeLines = () => {
    const container = document.querySelector('.code-lines');
    if (!container) return;

    const code = [
      'function init() {',
      '  const data = new Array();',
      '  return process(data);',
      '}',
      'class System {',
      '  constructor() {',
      '    this.status = "active";',
      '  }',
      '}',
      'const matrix = new Matrix();',
      'matrix.initialize();',
      'while(true) {',
      '  update();',
      '  render();',
      '}'
    ];

    code.forEach((line, index) => {
      const div = document.createElement('div');
      div.className = 'code-line';
      div.textContent = line;
      div.style.animationDelay = `${index * 0.5}s`;
      container.appendChild(div);
    });
  };
</script>

<div class="min-h-screen flex flex-col">
  <div class="tech-background absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
    <!-- Matrix rain effect -->
    <canvas id="matrix-rain" class="absolute inset-0 opacity-10"></canvas>
    <!-- Code lines effect -->
    <div class="code-lines absolute inset-0 opacity-5"></div>
    <!-- Add a subtle grid pattern -->
    <div class="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
    <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <!-- Decorative circles -->
      <circle cx="20%" cy="20%" r="30" fill="rgba(0, 255, 255, 0.1)" class="animate-float">
        <animate attributeName="r" values="30;32;30" dur="8s" repeatCount="indefinite" />
      </circle>
      <circle cx="80%" cy="60%" r="20" fill="rgba(255, 0, 255, 0.1)" class="animate-float-delayed">
        <animate attributeName="r" values="20;22;20" dur="6s" repeatCount="indefinite" />
      </circle>
      <!-- New animated shapes -->
      <circle cx="40%" cy="80%" r="15" fill="rgba(0, 255, 255, 0.15)" class="animate-pulse">
        <animate attributeName="r" values="15;17;15" dur="10s" repeatCount="indefinite" />
      </circle>
      <circle cx="60%" cy="30%" r="25" fill="rgba(255, 0, 255, 0.15)" class="animate-pulse-delayed">
        <animate attributeName="r" values="25;27;25" dur="7s" repeatCount="indefinite" />
      </circle>
      <!-- Additional geometric shapes -->
      <rect x="10%" y="10%" width="20" height="20" fill="rgba(0, 255, 255, 0.1)" class="animate-rotate">
        <animateTransform attributeName="transform" type="rotate" from="0 10% 10%" to="360 10% 10%" dur="10s" repeatCount="indefinite"/>
      </rect>
      <polygon points="70%,20% 75%,25% 70%,30% 65%,25%" fill="rgba(255, 0, 255, 0.1)" class="animate-float">
        <animateTransform attributeName="transform" type="rotate" from="0 70% 25%" to="360 70% 25%" dur="8s" repeatCount="indefinite"/>
      </polygon>
    </svg>
  </div>
  
  <div class="relative z-10 flex-grow">
    <slot />
  </div>
</div>

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  @keyframes draw {
    from { stroke-dashoffset: 1000; }
    to { stroke-dashoffset: 0; }
  }

  .animate-float {
    animation: float 8s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float 8s ease-in-out infinite;
    animation-delay: 4s;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 0.7; }
  }

  .animate-pulse-delayed {
    animation: pulse 8s ease-in-out infinite;
    animation-delay: 2s;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .animate-rotate {
    animation: rotate 10s linear infinite;
  }

  /* Add particle effect */
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(0, 255, 0, 0.3);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    animation: particle-float 6s ease-in-out infinite;
  }

  @keyframes particle-float {
    0%, 100% { 
      transform: translateY(0) translateX(0); 
      opacity: 0.5;
      box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    }
    50% { 
      transform: translateY(-20px) translateX(10px); 
      opacity: 0.8;
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.8);
    }
  }

  /* Add scanline effect */
  .scanline {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(0, 255, 0, 0.05) 50%
    );
    background-size: 100% 4px;
    pointer-events: none;
    animation: scanline 8s linear infinite;
  }

  @keyframes scanline {
    0% { transform: translateY(0); }
    100% { transform: translateY(100%); }
  }

  /* Matrix rain canvas */
  #matrix-rain {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  /* Code lines effect */
  .code-lines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    font-family: 'Courier New', monospace;
    color: #0F0;
    text-shadow: 0 0 5px #0F0;
    overflow: hidden;
  }

  .code-line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    animation: code-fade 2s ease-out forwards;
    white-space: nowrap;
  }

  @keyframes code-fade {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    100% {
      opacity: 0.3;
      transform: translateX(-50%) translateY(0);
    }
  }

  :global(h1) {
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }

  :global(h2) {
    color: #fff;
  }

  :global(.tech-text) {
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }

  :global(.tech-text-alt) {
    color: #ff00ff;
    text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
  }
</style> 