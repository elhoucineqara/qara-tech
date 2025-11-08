<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n/i18n';
  
  let isVisible = false;
  
  onMount(() => {
    isVisible = true;
    createParticles();
    createScanline();
    initMatrixRain();
  });

  const createParticles = () => {
    const container = document.querySelector('.absolute.inset-0');
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
    const container = document.querySelector('.absolute.inset-0');
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
</script>

<div class="min-h-screen w-full relative">
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
    <!-- Matrix rain effect -->
    <canvas id="matrix-rain" class="absolute inset-0 opacity-10"></canvas>
    <!-- Add a subtle grid pattern -->
    <div class="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
    <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <!-- Main curved shape -->
      <path 
        d="M 100 0 C 100 0, 100 30, 90 50 C 80 70, 60 80, 40 85 C 20 90, 10 95, 0 100" 
        fill="rgba(0, 255, 255, 0.05)"
        class="transition-all duration-300"
      />
      <!-- Decorative circles -->
      <circle cx="20%" cy="20%" r="30" fill="rgba(0, 255, 255, 0.1)" class="animate-float">
        <animate attributeName="r" values="30;32;30" dur="8s" repeatCount="indefinite" />
      </circle>
      <circle cx="80%" cy="60%" r="20" fill="rgba(255, 0, 255, 0.1)" class="animate-float-delayed">
        <animate attributeName="r" values="20;22;20" dur="6s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>

  <div class="relative z-10 px-8 pt-32 pb-8">
    <div class="container mx-auto px-4">
      <!-- En-tête centré -->
      <div class="text-center mb-12">
        <h3 class="text-4xl font-bold mb-4 text-cyan-400">
          {$t('pages.services.title')}
        </h3>
        <p class="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-200 max-w-4xl mx-auto" style="line-height: 2;">
          {$t('pages.services.description')}
        </p>
      </div>

      <!-- Services Grid -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Web Development -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40 p-6 flex flex-col h-[400px]">
          <div class="text-center mb-4 flex-grow">
            <i class="fas fa-code text-5xl text-cyan-400 mb-4"></i>
            <h4 class="text-xl font-semibold text-cyan-400 mb-2">{$t('pages.services.webDev.title')}</h4>
            <p class="text-gray-300">{$t('pages.services.webDev.description')}</p>
          </div>
          <div class="mt-auto">
            <a href="/contact" class="block w-full text-center bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-2 px-4 rounded-lg transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40">
              {$t('pages.services.webDev.cta')}
            </a>
          </div>
        </div>

        <!-- Mobile Development -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 p-6 flex flex-col h-[400px]">
          <div class="text-center mb-4 flex-grow">
            <i class="fas fa-mobile-alt text-5xl text-purple-400 mb-4"></i>
            <h4 class="text-xl font-semibold text-purple-400 mb-2">{$t('pages.services.mobileDev.title')}</h4>
            <p class="text-gray-300">{$t('pages.services.mobileDev.description')}</p>
          </div>
          <div class="mt-auto">
            <a href="/contact" class="block w-full text-center bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-2 px-4 rounded-lg transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40">
              {$t('pages.services.mobileDev.cta')}
            </a>
          </div>
        </div>

        <!-- Cloud Solutions -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40 p-6 flex flex-col h-[400px]">
          <div class="text-center mb-4 flex-grow">
            <i class="fas fa-cloud text-5xl text-cyan-400 mb-4"></i>
            <h4 class="text-xl font-semibold text-cyan-400 mb-2">{$t('pages.services.cloud.title')}</h4>
            <p class="text-gray-300">{$t('pages.services.cloud.description')}</p>
          </div>
          <div class="mt-auto">
            <a href="/contact" class="block w-full text-center bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-2 px-4 rounded-lg transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40">
              {$t('pages.services.cloud.cta')}
            </a>
          </div>
        </div>

        <!-- DevOps -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 p-6 flex flex-col h-[400px]">
          <div class="text-center mb-4 flex-grow">
            <i class="fas fa-server text-5xl text-purple-400 mb-4"></i>
            <h4 class="text-xl font-semibold text-purple-400 mb-2">{$t('pages.services.devops.title')}</h4>
            <p class="text-gray-300">{$t('pages.services.devops.description')}</p>
          </div>
          <div class="mt-auto">
            <a href="/contact" class="block w-full text-center bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-2 px-4 rounded-lg transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40">
              {$t('pages.services.devops.cta')}
            </a>
          </div>
        </div>

        <!-- AI & ML -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40 p-6 flex flex-col h-[400px]">
          <div class="text-center mb-4 flex-grow">
            <i class="fas fa-brain text-5xl text-cyan-400 mb-4"></i>
            <h4 class="text-xl font-semibold text-cyan-400 mb-2">{$t('pages.services.ai.title')}</h4>
            <p class="text-gray-300">{$t('pages.services.ai.description')}</p>
          </div>
          <div class="mt-auto">
            <a href="/contact" class="block w-full text-center bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 py-2 px-4 rounded-lg transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40">
              {$t('pages.services.ai.cta')}
            </a>
          </div>
        </div>

        <!-- Consulting -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 p-6 flex flex-col h-[400px]">
          <div class="text-center mb-4 flex-grow">
            <i class="fas fa-lightbulb text-5xl text-purple-400 mb-4"></i>
            <h4 class="text-xl font-semibold text-purple-400 mb-2">{$t('pages.services.consulting.title')}</h4>
            <p class="text-gray-300">{$t('pages.services.consulting.description')}</p>
          </div>
          <div class="mt-auto">
            <a href="/contact" class="block w-full text-center bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-2 px-4 rounded-lg transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40">
              {$t('pages.services.consulting.cta')}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
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

  /* Add CRT screen effect */
  .crt-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    animation: flicker 0.15s infinite;
  }

  @keyframes flicker {
    0% { opacity: 0.97; }
    5% { opacity: 0.95; }
    10% { opacity: 0.9; }
    15% { opacity: 0.95; }
    20% { opacity: 0.98; }
    25% { opacity: 0.95; }
    30% { opacity: 0.9; }
    35% { opacity: 0.95; }
    40% { opacity: 0.98; }
    45% { opacity: 0.95; }
    50% { opacity: 0.9; }
    55% { opacity: 0.95; }
    60% { opacity: 0.98; }
    65% { opacity: 0.95; }
    70% { opacity: 0.9; }
    75% { opacity: 0.95; }
    80% { opacity: 0.98; }
    85% { opacity: 0.95; }
    90% { opacity: 0.9; }
    95% { opacity: 0.95; }
    100% { opacity: 0.98; }
  }

  /* Add distortion effect */
  .distortion {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 255, 255, 0.1) 0px,
      rgba(0, 255, 255, 0.1) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    animation: distort 0.5s infinite;
  }

  @keyframes distort {
    0% { transform: skewX(0deg); }
    25% { transform: skewX(1deg); }
    75% { transform: skewX(-1deg); }
    100% { transform: skewX(0deg); }
  }

  /* Update text colors for tech theme */
  h1, h3 {
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }

  /* Add glitch effect */
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }

  .glitch-effect {
    animation: glitch 1s linear infinite;
  }

  /* Update button styles */
  a, button {
    position: relative;
    overflow: hidden;
  }

  a::before, button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  a:hover::before, button:hover::before {
    left: 100%;
  }
</style> 
