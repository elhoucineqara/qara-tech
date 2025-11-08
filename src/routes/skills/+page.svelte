<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n/i18n';
  import { fly } from 'svelte/transition';
  
  let isVisible = false;
  let selectedCategory = 'all';
  
  const categories = ['all', 'frontend', 'backend', 'languages', 'databases', 'devops', 'tools'];
  
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
      <!-- En-tête -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-cyan-400">
          {$t('pages.skills.title')}
        </h1>
        <p class="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-200 max-w-4xl mx-auto" style="line-height: 2;">
          {$t('pages.skills.description')}
        </p>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        {#each categories as category}
          <button
            on:click={() => selectedCategory = category}
            class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 {selectedCategory === category 
              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg scale-105' 
              : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-cyan-500/20'}"
            in:fly={{ y: -20, duration: 400, delay: categories.indexOf(category) * 50 }}
          >
            {category === 'all' ? 'All Skills' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        {/each}
      </div>

      <!-- Front-End -->
      {#if selectedCategory === 'all' || selectedCategory === 'frontend'}
      <div class="mt-16 transition-all duration-300" in:fly={{ y: 30, duration: 500 }}>
        <h3 class="text-2xl font-semibold mb-8 text-cyan-400 relative">
          <span class="relative group cursor-pointer">
            Frontend Frameworks
            <span class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 group/cards">
          <!-- React -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-react text-5xl text-[#61DAFB] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">React</h4>
          </div>

          <!-- Angular -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-angular text-5xl text-[#DD0031] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Angular</h4>
          </div>

          <!-- Vue.js -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-vuejs text-5xl text-[#42b883] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Vue.js</h4>
          </div>

          <!-- Svelte -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <svg class="svelte-logo" viewBox="0 0 98.1 118" height="3rem" style="margin: auto; margin-bottom: 0.5rem;">
              <path d="M91.8 15.6C80.9-.1 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 15.7 32.6 20.3 48.2 10.4l27.5-17.5c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-9-.4-18.2-5.7-25.5" fill="#FF3E00"/>
              <path d="M40.9 103.9c-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3.2-.9.4-1.7.6-2.6l.5-1.6 1.4 1c3.3 2.4 6.9 4.2 10.8 5.4l1 .3-.1 1c-.1 1.4.3 2.9 1.1 4.1 1.6 2.3 4.4 3.4 7.1 2.7.6-.2 1.2-.4 1.7-.7L65.5 72c1.4-.9 2.3-2.2 2.6-3.8.3-1.6-.1-3.3-1-4.6-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7l-10.5 6.7c-1.7 1.1-3.6 1.9-5.6 2.4-8.9 2.3-18.2-1.2-23.4-8.7-3.1-4.4-4.4-9.9-3.4-15.3.9-5.2 4.1-9.9 8.6-12.7l27.5-17.5c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.2.9-.4 1.7-.7 2.6l-.5 1.6-1.4-1c-3.3-2.4-6.9-4.2-10.8-5.4l-1-.3.1-1c.1-1.4-.3-2.9-1.1-4.1-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7l-10.5 6.7c-1.7 1.1-3.6 1.9-5.6 2.5" fill="#fff"/>
            </svg>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Svelte</h4>
          </div>
        </div>
      </div>
      {/if}

      <!-- Back-End -->
      {#if selectedCategory === 'all' || selectedCategory === 'backend'}
      <div class="mt-16 transition-all duration-300" in:fly={{ y: 30, duration: 500 }}>
        <h3 class="text-2xl font-semibold mb-8 text-cyan-400 relative">
          <span class="relative group cursor-pointer">
          Backend Frameworks
            <span class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <!-- Laravel -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-laravel text-5xl text-[#FF2D20] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Laravel</h4>
          </div>

          <!-- Spring Boot -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-leaf text-5xl text-[#6DB33F] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Spring Boot</h4>
          </div>

          <!-- .NET -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-microsoft text-5xl text-[#512BD4] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">.NET</h4>
          </div>

          <!-- Django -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-python text-5xl text-[#092E20] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Django</h4>
          </div>

          <!-- Node.js -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-node-js text-5xl text-[#339933] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Node.js</h4>
          </div>
        </div>
      </div>
      {/if}

      <!-- Programming Languages -->
      {#if selectedCategory === 'all' || selectedCategory === 'languages'}
      <div class="mt-16 transition-all duration-300" in:fly={{ y: 30, duration: 500 }}>
        <h3 class="text-2xl font-semibold mb-8 text-cyan-400 relative">
          <span class="relative group cursor-pointer">
          Programming Languages
            <span class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <!-- JavaScript -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-js text-5xl text-[#F7DF1E] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">JavaScript</h4>
          </div>

          <!-- Python -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-python text-5xl text-[#3776AB] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Python</h4>
          </div>

          <!-- Java -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-java text-5xl text-[#007396] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Java</h4>
          </div>

          <!-- TypeScript -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-code text-5xl text-[#3178C6] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">TypeScript</h4>
          </div>

          <!-- PHP -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-php text-5xl text-[#777BB4] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">PHP</h4>
          </div>

          <!-- C/C++ -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-copyright text-5xl text-[#A8B9CC] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">C/C++</h4>
          </div>
        </div>
      </div>
      {/if}

      <!-- Databases -->
      {#if selectedCategory === 'all' || selectedCategory === 'databases'}
      <div class="mt-16 transition-all duration-300" in:fly={{ y: 30, duration: 500 }}>
        <h3 class="text-2xl font-semibold mb-8 text-cyan-400 relative">
          <span class="relative group cursor-pointer">
          Databases
            <span class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <!-- MySQL -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-database text-5xl text-[#4479A1] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">MySQL</h4>
          </div>

          <!-- MongoDB -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-database text-5xl text-[#47A248] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">MongoDB</h4>
          </div>

          <!-- Oracle -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-table text-5xl text-[#F80000] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Oracle</h4>
          </div>

          <!-- Redis -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-database text-5xl text-[#DC382D] mb-2 transition-transform group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Redis</h4>
          </div>
        </div>
      </div>
      {/if}

      <!-- Development Tools -->
      {#if selectedCategory === 'all' || selectedCategory === 'tools'}
      <div class="mt-16 transition-all duration-300" in:fly={{ y: 30, duration: 500 }}>
        <h3 class="text-2xl font-semibold mb-8 text-cyan-400 relative">
          <span class="relative group cursor-pointer">
          Development Tools
            <span class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 group/cards">
          <!-- Git -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-git-alt text-5xl text-[#F05032] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Git</h4>
          </div>

          <!-- JIRA -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-tasks text-5xl text-[#0052CC] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">JIRA</h4>
          </div>

          <!-- Scrum -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-users text-5xl text-[#1788B1] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Scrum</h4>
          </div>

          <!-- UML -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-project-diagram text-5xl text-[#8B2BE2] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">UML</h4>
          </div>

          <!-- Figma -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-figma text-5xl text-[#F24E1E] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Figma</h4>
          </div>

          <!-- Adobe XD -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-pen-nib text-5xl text-[#FF61F6] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Adobe XD</h4>
          </div>

          <!-- VS Code -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-code text-5xl text-[#007ACC] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">VS Code</h4>
          </div>

          <!-- Docker -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-docker text-5xl text-[#2496ED] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Docker</h4>
          </div>
        </div>
      </div>
      {/if}

      <!-- API Technologies & DevOps -->
      {#if selectedCategory === 'all' || selectedCategory === 'devops'}
      <div class="mt-16 transition-all duration-300" in:fly={{ y: 30, duration: 500 }}>
        <h3 class="text-2xl font-semibold mb-8 text-cyan-400 relative">
          <span class="relative group cursor-pointer">
          API Technologies & DevOps
            <span class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-8 group/cards">
          <!-- REST APIs -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-plug text-5xl text-[#00A7E9] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">REST APIs</h4>
          </div>

          <!-- GraphQL -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-exchange-alt text-5xl text-[#E535AB] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">GraphQL</h4>
          </div>

          <!-- WebRTC -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-video text-5xl text-[#FF5722] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">WebRTC</h4>
          </div>

          <!-- WebSockets -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-network-wired text-5xl text-[#00D9FF] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">WebSockets</h4>
          </div>
        </div>
      </div>
      {/if}

      <!-- Architecture & Patterns -->
      {#if selectedCategory === 'all'}
      <div class="mt-16 transition-all duration-300" in:fly={{ y: 30, duration: 500 }}>
        <h3 class="text-2xl font-semibold mb-8 text-cyan-400 relative">
          <span class="relative group cursor-pointer">
            Architecture & Patterns
            <span class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-8 group/cards">
          <!-- Microservices -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-cubes text-5xl text-[#00D9FF] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Microservices</h4>
          </div>

          <!-- Microfrontends -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-puzzle-piece text-5xl text-[#FF6B6B] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Microfrontends</h4>
          </div>

          <!-- Qiankun -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-layer-group text-5xl text-[#4CAF50] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Qiankun</h4>
          </div>
        </div>
      </div>
      {/if}

      <!-- Cloud Computing -->
      {#if selectedCategory === 'all'}
      <div class="mt-16 transition-all duration-300" in:fly={{ y: 30, duration: 500 }}>
        <h3 class="text-2xl font-semibold mb-8 text-cyan-400 relative">
          <span class="relative group cursor-pointer">
          Cloud Computing
            <span class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 group/cards">
          <!-- AWS -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-aws text-5xl text-[#FF9900] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">AWS</h4>
          </div>

          <!-- Google Cloud -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-google text-5xl text-[#4285F4] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Google Cloud</h4>
          </div>

          <!-- Azure -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-microsoft text-5xl text-[#0089D6] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Azure</h4>
          </div>
        </div>
      </div>
      {/if}

      <!-- Mobile Development -->
      {#if selectedCategory === 'all'}
      <div class="mt-16 transition-all duration-300" in:fly={{ y: 30, duration: 500 }}>
        <h3 class="text-2xl font-semibold mb-8 text-cyan-400 relative">
          <span class="relative group cursor-pointer">
            Mobile Development
            <span class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 group/cards">
          <!-- Android -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-android text-5xl text-[#3DDC84] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Android</h4>
          </div>

          <!-- iOS -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-apple text-5xl text-[#A2AAAD] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">iOS</h4>
          </div>

          <!-- React Native -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fab fa-react text-5xl text-[#61DAFB] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">React Native</h4>
          </div>

          <!-- Ionic -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-mobile text-5xl text-[#3880FF] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Ionic</h4>
          </div>
        </div>
      </div>
      {/if}

      <!-- Testing -->
      {#if selectedCategory === 'all'}
      <div class="mt-16 transition-all duration-300" in:fly={{ y: 30, duration: 500 }}>
        <h3 class="text-2xl font-semibold mb-8 text-cyan-400 relative">
          <span class="relative group cursor-pointer">
            Testing & QA
            <span class="absolute bottom-0 left-0 w-full h-1 bg-cyan-400 rounded-full transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 group/cards">
          <!-- Jest -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-vial text-5xl text-[#C21325] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Jest</h4>
          </div>

          <!-- Cypress -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-check-circle text-5xl text-[#69D3A7] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Cypress</h4>
          </div>

          <!-- Selenium -->
          <div class="text-center p-4 bg-slate-900/50 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-500 group-hover/cards:hover:scale-105 group-hover/cards:hover:bg-slate-800/50 group-hover/cards:-translate-y-2 hover:shadow-cyan-400/20">
            <i class="fas fa-bug text-5xl text-[#43B02A] mb-2 transition-transform duration-500 group-hover/cards:hover:rotate-180"></i>
            <h4 class="text-lg text-gray-200 group-hover/cards:hover:text-cyan-400">Selenium</h4>
          </div>
        </div>
      </div>
      {/if}
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
  h1 {
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

  /* Style pour le logo Svelte */
  .svelte-logo {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .text-center:hover .svelte-logo {
    transform: scale(1.2);
  }

  /* Ajoutez ces styles pour l'effet de soulignement */
  h3 span span {
    transform-origin: left;
  }

  /* Ajouter des styles pour l'animation des cartes */
  .group-hover\/cards\:hover\:scale-105:hover {
    transform: scale(1.05);
    z-index: 10;
  }

  .group-hover\/cards\:hover\:-translate-y-2:hover {
    transform: translateY(-8px);
  }

  /* Ajouter un effet de brillance */
  .group-hover\/cards\:hover\:shadow-cyan-400\/20:hover {
    box-shadow: 0 0 25px rgba(34, 211, 238, 0.2);
  }

  /* Rotation des icônes */
  .group-hover\/cards\:hover\:rotate-180:hover {
    transform: rotate(360deg);
    transition: transform 1s ease-in-out;
  }

  /* Animation plus fluide pour toutes les transitions */
  * {
    transition: all 0.3s ease-in-out;
  }
</style> 
