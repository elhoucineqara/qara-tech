<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n/i18n';
  import Header from '$lib/components/Header.svelte';
  import SEO from '$lib/components/SEO.svelte';
  
  let isVisible = false;
  
  onMount(() => {
    isVisible = true;
    initMatrixRain();
    createFloatingCode();
  });

  const initMatrixRain = () => {
    const canvas = document.getElementById('matrix-rain') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-=<>/{}[]|\\";
    const matrixArray = matrix.split("");
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * (canvas.height / fontSize));
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff00';
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

  const createFloatingCode = () => {
    const container = document.querySelector('.code-snippets');
    if (!container) return;

    const codeSnippets = [
      'const dev = new Developer();',
      'function build() { return app; }',
      'npm run deploy --production',
      'git commit -m "feat: new feature"',
      'SELECT * FROM users WHERE active=1',
      'docker-compose up -d',
      'Laravel::make()->awesome()',
      'React.useEffect(() => {})',
      'async/await Promise.resolve()',
      'console.log("Hello World");',
      'php artisan serve',
      'composer install',
      'npm install --save',
      'const api = await fetch(url);',
      'sudo systemctl restart nginx'
    ];

    for (let i = 0; i < 15; i++) {
      const snippet = document.createElement('div');
      snippet.className = 'floating-code';
      snippet.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      snippet.style.left = `${Math.random() * 100}%`;
      snippet.style.top = `${Math.random() * 100}%`;
      snippet.style.animationDelay = `${Math.random() * 5}s`;
      snippet.style.animationDuration = `${15 + Math.random() * 10}s`;
      container.appendChild(snippet);
    }
  };
</script>

<SEO 
  title="El Houcine QARA - Full Stack Developer | Laravel, React, Node.js Expert"
  description="Full Stack Developer with 2+ years experience building enterprise applications. Expert in Laravel, React, Svelte, Node.js. Based in Morocco. Portfolio showcasing 15+ successful projects."
  keywords="Full Stack Developer Morocco, Laravel Developer, React Developer, Web Application Development, Enterprise Software, HARX, LMS Development, Morocco Software Engineer"
  url="https://qaratech.vercel.app/"
/>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
</svelte:head>

<div class="relative">
  <!-- Hero Section -->
  <div class="relative flex content-center items-center justify-center h-screen overflow-hidden">
    <!-- Background avec dégradé sombre et grille -->
    <div class="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <canvas id="matrix-rain" class="absolute inset-0 w-full h-full opacity-20"></canvas>
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div class="code-snippets absolute inset-0"></div>
      <span class="absolute inset-0 w-full h-full bg-black opacity-50"></span>
    </div>
    
    <!-- Terminal-style border effect -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
    
    <div class="container relative mx-auto px-4 z-10">
      <div class="items-center flex flex-wrap justify-center">
        <div class="w-full lg:w-6/12 px-4 text-center">
          <!-- Terminal header effect -->
          <div class="mb-4 md:mb-6 flex justify-center px-2">
            <div class="inline-block bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg px-2 md:px-4 py-1.5 md:py-2">
              <span class="text-green-400 font-mono text-xs md:text-sm">
                <span class="inline-block w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full mr-1 md:mr-2"></span>
                <span class="inline-block w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full mr-1 md:mr-2"></span>
                <span class="inline-block w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mr-1 md:mr-2"></span>
                <span class="text-red-400">root</span><span class="text-white">@</span><span class="text-cyan-400">qara</span><span class="text-white">:</span><span class="text-blue-400">~/elhoucine</span><span class="text-green-400">#</span>
              </span>
            </div>
          </div>
          
          <div class="text-white font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 glitch-text px-2">
            {$t('hero.name')}
          </div>
          
          <div class="text-green-400 font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl my-3 md:my-4 font-light typing-effect px-2">
            <span class="text-green-500">$</span> {$t('hero.title')}
          </div>
          
          <div class="text-gray-300 font-poppins text-base sm:text-lg md:text-xl lg:text-2xl my-3 md:my-4 font-light px-4">
            {$t('hero.subtitle')}
          </div>
          
          <!-- Code-style icons -->
          <div class="flex justify-center gap-2 md:gap-4 my-4 md:my-6 text-green-400 px-2">
            <div class="font-mono text-xs md:text-sm bg-black/30 px-2 md:px-3 py-1 rounded border border-green-500/30">
              <i class="fas fa-code"></i> <span class="hidden sm:inline">Code</span>
            </div>
            <div class="font-mono text-xs md:text-sm bg-black/30 px-2 md:px-3 py-1 rounded border border-green-500/30">
              <i class="fas fa-terminal"></i> <span class="hidden sm:inline">Terminal</span>
            </div>
            <div class="font-mono text-xs md:text-sm bg-black/30 px-2 md:px-3 py-1 rounded border border-green-500/30">
              <i class="fas fa-server"></i> <span class="hidden sm:inline">Deploy</span>
            </div>
          </div>
          
          <a href="/contact" class="bg-green-500/20 text-green-400 border-2 border-green-500 active:bg-green-500/30 text-xs md:text-sm font-mono font-semibold uppercase px-4 md:px-8 py-3 md:py-4 rounded shadow hover:shadow-lg hover:shadow-green-500/50 outline-none focus:outline-none transition-all duration-300 inline-block hover:scale-105" type="button">
            <i class="fas fa-terminal mr-2"></i>{$t('hero.contact')}
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .min-h-screen-75 {
    min-height: 75vh;
  }
  
  .font-playfair {
    font-family: 'Playfair Display', serif;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: 1px;
  }
  
  .font-poppins {
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.5px;
  }

  [dir="rtl"] .ml-auto {
    margin-left: 0;
    margin-right: auto;
  }

  [dir="rtl"] .mr-auto {
    margin-right: 0;
    margin-left: auto;
  }

  .logo {
    max-width: 200px;
    height: auto;
    display: block;
  }

  header {
    height: 8vh;
  }

  /* Matrix Canvas */
  #matrix-rain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  /* Floating Code Snippets */
  .code-snippets {
    overflow: hidden;
    pointer-events: none;
  }

  :global(.floating-code) {
    position: absolute;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: rgba(0, 255, 0, 0.4);
    white-space: nowrap;
    animation: float-code 20s infinite linear;
    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  }

  @keyframes float-code {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.6;
    }
    90% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(-100vh) translateX(50px) rotate(5deg);
      opacity: 0;
    }
  }

  /* Glitch Text Effect */
  .glitch-text {
    position: relative;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 
      0 0 10px rgba(0, 255, 0, 0.5),
      0 0 20px rgba(0, 255, 0, 0.3),
      0 0 30px rgba(0, 255, 0, 0.2);
    animation: glitch 3s infinite;
  }

  @keyframes glitch {
    0%, 90%, 100% {
      text-shadow: 
        0 0 10px rgba(0, 255, 0, 0.5),
        0 0 20px rgba(0, 255, 0, 0.3),
        0 0 30px rgba(0, 255, 0, 0.2);
    }
    92% {
      text-shadow: 
        -2px 0 rgba(255, 0, 0, 0.7),
        2px 0 rgba(0, 255, 0, 0.7);
    }
    94% {
      text-shadow: 
        2px 0 rgba(255, 0, 0, 0.7),
        -2px 0 rgba(0, 255, 0, 0.7);
    }
  }

  /* Typing Effect */
  .typing-effect {
    position: relative;
    display: inline-block;
  }

  .typing-effect::after {
    content: '|';
    display: inline-block;
    animation: blink 1s infinite;
    margin-left: 5px;
  }

  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }

  /* Button Styles */
  a[href="/contact"] {
    position: relative;
    overflow: hidden;
  }

  a[href="/contact"]::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.3), transparent);
    transition: left 0.5s;
  }

  a[href="/contact"]:hover::before {
    left: 100%;
  }

  /* Terminal Dots Animation */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(0.9);
    }
  }

  .inline-block.w-3.h-3 {
    animation: pulse 2s infinite;
  }

  .inline-block.w-3.h-3:nth-child(1) {
    animation-delay: 0s;
  }

  .inline-block.w-3.h-3:nth-child(2) {
    animation-delay: 0.3s;
  }

  .inline-block.w-3.h-3:nth-child(3) {
    animation-delay: 0.6s;
  }

  /* Scanline Effect */
  @keyframes scanline {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }

  .relative.flex.content-center::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.5), transparent);
    animation: scanline 8s linear infinite;
    pointer-events: none;
    z-index: 100;
  }
</style>
