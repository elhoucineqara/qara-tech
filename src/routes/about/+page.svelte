 <script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n/i18n';
  
  let isVisible = false;
  let showModal = false;
  let displayedText = "";
  let isTyping = true;
  const fullText = $t('about.company');
  let currentIndex = 0;
  
  onMount(() => {
    isVisible = true;
    typeText();
    createParticles();
    createScanline();
    initMatrixRain();
    createCodeLines();
  });

  const typeText = () => {
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        displayedText += fullText[currentIndex];
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        isTyping = false;
      }
    }, 100);
  };

  const toggleModal = () => {
    showModal = !showModal;
  };

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
  <div class="flex-grow relative pt-16 md:pt-32 pb-16 md:pb-32 flex content-center items-center justify-center">
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <!-- Matrix rain effect -->
      <canvas id="matrix-rain" class="absolute inset-0 opacity-10"></canvas>
      <!-- Code lines effect -->
      <div class="code-lines absolute inset-0 opacity-5"></div>
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
        <!-- New animated shapes -->
        <circle cx="40%" cy="80%" r="15" fill="rgba(0, 255, 255, 0.15)" class="animate-pulse">
          <animate attributeName="r" values="15;17;15" dur="10s" repeatCount="indefinite" />
        </circle>
        <circle cx="60%" cy="30%" r="25" fill="rgba(255, 0, 255, 0.15)" class="animate-pulse-delayed">
          <animate attributeName="r" values="25;27;25" dur="7s" repeatCount="indefinite" />
        </circle>
        <!-- Additional geometric shapes -->
        <rect x="10" y="10" width="20" height="20" fill="rgba(0, 255, 255, 0.1)" class="animate-rotate">
          <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="10s" repeatCount="indefinite"/>
        </rect>
        <polygon points="70,20 75,25 70,30 65,25" fill="rgba(255, 0, 255, 0.1)" class="animate-float">
          <animateTransform attributeName="transform" type="rotate" from="0 70 25" to="360 70 25" dur="8s" repeatCount="indefinite"/>
        </polygon>
        <!-- Decorative shapes -->
        <path 
          d="M 40 30 Q 50 10, 60 30 T 80 30" 
          stroke="rgba(0, 255, 255, 0.2)" 
          fill="none" 
          stroke-width="2"
          class="animate-draw"
        />
        <path 
          d="M 70 70 Q 80 50, 90 70 T 110 70" 
          stroke="rgba(255, 0, 255, 0.2)" 
          fill="none" 
          stroke-width="2"
          class="animate-draw-delayed"
        />
        <!-- New decorative paths -->
        <path 
          d="M 20 50 Q 30 30, 40 50 T 60 50" 
          stroke="rgba(0, 255, 255, 0.15)" 
          fill="none" 
          stroke-width="1.5"
          class="animate-draw-slow"
        />
        <path 
          d="M 80 20 Q 90 0, 100 20 T 120 20" 
          stroke="rgba(255, 0, 255, 0.15)" 
          fill="none" 
          stroke-width="1.5"
          class="animate-draw-slower"
        />
        <!-- New wave effect -->
        <path 
          d="M 0 80 Q 25 70, 50 80 T 100 80" 
          stroke="rgba(0, 255, 255, 0.1)" 
          fill="none" 
          stroke-width="2"
          class="animate-wave"
        />
        <path 
          d="M 0 85 Q 25 75, 50 85 T 100 85" 
          stroke="rgba(255, 0, 255, 0.1)" 
          fill="none" 
          stroke-width="2"
          class="animate-wave-delayed"
        />
      </svg>
    </div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="items-center flex flex-wrap">
        <!-- Title section that always appears first -->
        <div class="w-full mb-8 sm:mb-12 lg:hidden px-2">
          <h1 class="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 font-mono leading-tight">
            <span class="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">{$t('about.title')}</span>
          </h1>
          <h2 class="text-lg sm:text-xl mb-2 text-gray-200 font-medium leading-relaxed">{$t('about.subtitle')} <span class:typewriter={isTyping} class="text-cyan-400 font-semibold">{displayedText}</span></h2>
        </div>

        <!-- Profile image section -->
        <div class="w-full lg:w-4/12 px-4 mr-auto ml-auto mb-12 lg:mb-0 order-1 lg:order-2">
          <div class="relative flex justify-center items-center">
            <div class="absolute w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full animate-pulse"></div>
            <img 
              alt="El Houcine QARA" 
              src="/images/profile.jpg" 
              class="w-64 sm:w-72 h-64 sm:h-72 object-cover rounded-full relative z-10 shadow-xl hover:scale-105 transition-transform duration-300"
            >
          </div>
        </div>

        <!-- Main content section -->
        <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto order-2 lg:order-1">
          <!-- Title only visible on desktop -->
          <div class="hidden lg:block mb-6">
            <h1 class="text-4xl lg:text-5xl font-bold mb-4 font-mono leading-tight">
              <span class="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">{$t('about.title')}</span>
            </h1>
            <h2 class="text-xl sm:text-2xl mb-4 text-gray-200 font-medium leading-relaxed">{$t('about.subtitle')} <span class:typewriter={isTyping} class="text-cyan-400 font-semibold">{displayedText}</span></h2>
          </div>
          
          <div class="space-y-4 mb-8 sm:mb-10">
            <p class="flex items-center text-gray-300 hover:transform hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
              <i class="fas fa-envelope mr-4 text-cyan-400 text-lg sm:text-xl"></i>
              <a href="mailto:elhoucineqara114@gmail.com" class="hover:text-cyan-400 transition-colors duration-300 break-all">{$t('about.email')}</a>
            </p>
            <p class="flex items-center text-gray-300 hover:transform hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
              <i class="fas fa-phone mr-4 text-purple-400 text-lg sm:text-xl"></i>
              <a href="tel:+212637446431" class="hover:text-purple-400 transition-colors duration-300 break-all">{$t('about.phone')}</a>
            </p>
            <p class="flex items-center text-gray-300 hover:transform hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
              <i class="fab fa-whatsapp mr-4 text-cyan-400 text-lg sm:text-xl"></i>
              <a href="https://wa.me/212637446431" class="hover:text-cyan-400 transition-colors duration-300 break-all">WhatsApp</a>
            </p>
            <p class="flex items-center text-gray-300 hover:transform hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
              <i class="fab fa-linkedin mr-4 text-purple-400 text-lg sm:text-xl"></i>
              <a href="https://www.linkedin.com/in/el-houcine-qara-927b07302/" target="_blank" rel="noopener noreferrer" class="hover:text-purple-400 transition-colors duration-300 break-all">LinkedIn</a>
            </p>
            <p class="flex items-center text-gray-300 hover:transform hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
              <i class="fab fa-github mr-4 text-cyan-400 text-lg sm:text-xl"></i>
              <a href="https://github.com/elhoucineqara" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400 transition-colors duration-300 break-all">GitHub</a>
            </p>
            <p class="flex items-center text-gray-300 hover:transform hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
              <i class="fab fa-twitter mr-4 text-purple-400 text-lg sm:text-xl"></i>
              <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" class="hover:text-purple-400 transition-colors duration-300 break-all">Twitter</a>
            </p>
            <p class="flex items-center text-gray-300 hover:transform hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
              <i class="fas fa-map-marker-alt mr-4 text-cyan-400 text-lg sm:text-xl"></i>
              <span>{$t('about.location')}</span>
            </p>
          </div>

          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="/cv.pdf" 
              download
              class="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center sm:justify-start text-sm sm:text-base"
            >
              <i class="fas fa-download mr-3"></i>
              {$t('about.downloadCV')}
            </a>
            <button 
              on:click={toggleModal}
              class="bg-gray-800 text-gray-200 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center sm:justify-start border border-gray-700 hover:bg-gray-700 text-sm sm:text-base"
            >
              <i class="fas fa-eye mr-3"></i>
              {$t('about.viewCV')}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Removing the footer section -->
</div>

{#if showModal}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
    on:click|self={toggleModal}
  >
    <div class="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl min-h-[80vh] my-4">
      <div class="flex justify-end">
        <button 
          on:click={toggleModal}
          class="m-2 sm:m-4 text-slate-500 hover:text-slate-700 text-xl z-10"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="p-2 sm:p-4 h-full min-h-[80vh]">
        <iframe
          src="/cv.pdf"
          title="CV"
          class="w-full h-full rounded-lg"
          style="min-height: 80vh;"
        ></iframe>
      </div>
    </div>
  </div>
{/if}

<style>
  .font-playfair {
    font-family: 'Playfair Display', serif;
  }
  
  .font-poppins {
    font-family: 'Poppins', sans-serif;
  }

  [dir="rtl"] .ml-auto {
    margin-left: 0;
    margin-right: auto;
  }

  [dir="rtl"] .mr-auto {
    margin-right: 0;
    margin-left: auto;
  }

  .typewriter {
    border-right: 2px solid #00ffff;
    animation: blink 0.75s step-end infinite;
  }

  @keyframes blink {
    from, to { border-color: transparent }
    50% { border-color: #00ffff; }
  }

  .clip-path-triangle {
    display: none;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  @keyframes draw {
    from { stroke-dashoffset: 1000; }
    to { stroke-dashoffset: 0; }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float 6s ease-in-out infinite;
    animation-delay: 2s;
  }

  .animate-draw {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 4s ease-out forwards;
  }

  .animate-draw-delayed {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 4s ease-out forwards;
    animation-delay: 1s;
  }

  .animate-pulse-delayed {
    animation: pulse 4s ease-in-out infinite;
    animation-delay: 1s;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.2); opacity: 0.6; }
  }

  .animate-draw-slow {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 6s ease-out forwards;
  }

  .animate-draw-slower {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 8s ease-out forwards;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .animate-rotate {
    animation: rotate 10s linear infinite;
  }

  @keyframes wave {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(20px); }
  }

  .animate-wave {
    animation: wave 8s ease-in-out infinite;
  }

  .animate-wave-delayed {
    animation: wave 8s ease-in-out infinite;
    animation-delay: 2s;
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

  /* Update text colors for tech theme */
  h1 {
    color: #00ffff;
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  }

  h2 {
    color: #fff;
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
</style> 