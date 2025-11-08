<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { t } from '$lib/i18n/i18n';

  // État de la présentation
  let currentSlide = 1;
  const totalSlides = 16;
  let isFullscreen = false;

  // Mapping des titres des slides
  function getSlideTitle(slideNumber: number): string {
    const titles: Record<number, string> = {
      1: 'Title',
      2: 'What We Will Talk About',
      3: 'What is AI?',
      4: 'AI Today',
      5: 'Making Work Easier',
      6: 'New Jobs',
      7: 'Changing Work',
      8: 'AI Tools We Use',
      9: 'Working Better',
      10: 'Problems to Solve',
      11: 'How to Start',
      12: 'Good Ways to Work',
      13: 'What is Coming Next',
      14: 'What to Do',
      15: 'End',
      16: 'Thank You'
    };
    return titles[slideNumber] || '';
  }

  // Mapping des éléments de l'agenda
  function getAgendaItem(number: number): string {
    const items: Record<number, string> = {
      1: 'What is AI?',
      2: 'How AI is Used Today',
      3: 'How Work is Changing',
      4: 'What Will Happen Next',
      5: 'What We Should Do'
    };
    return items[number] || '';
  }

  // Navigation entre les slides
  function nextSlide() {
    if (currentSlide < totalSlides) {
      currentSlide++;
    }
  }

  function previousSlide() {
    if (currentSlide > 1) {
      currentSlide--;
    }
  }

  // Gestion du mode plein écran
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      isFullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        isFullscreen = false;
      }
    }
  }

  // Gestion des touches clavier pour la navigation
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' || event.key === 'Space') {
      nextSlide();
    } else if (event.key === 'ArrowLeft') {
      previousSlide();
    } else if (event.key === 'f') {
      toggleFullscreen();
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
    createParticles();
    createScanline();
    initMatrixRain();
    createCodeLines();
  });

  function createParticles() {
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
  }

  function createScanline() {
    const container = document.querySelector('.tech-background');
    if (!container) return;
    const scanline = document.createElement('div');
    scanline.className = 'scanline';
    container.appendChild(scanline);
  }

  function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const matrixArray = matrix.split("");
    const fontSize = 22;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * (canvas.height / fontSize));
    }
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff00';
      ctx.shadowColor = '#00ff00';
      ctx.shadowBlur = 8;
      ctx.font = `bold ${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      ctx.shadowBlur = 0;
    };
    setInterval(draw, 33);
  }

  function createCodeLines() {
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
  }
</script>

<div class="min-h-screen text-white relative flex">
  <div class="absolute inset-0 bg-[#0f172a]"></div>
  <div class="absolute inset-0 bg-[#18181b] clip-diagonal"></div>
  <!-- Background informatique animé -->
  <div class="tech-background absolute inset-0 z-0">
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
    <canvas id="matrix-rain" class="absolute inset-0 opacity-80"></canvas>
    <div class="code-lines absolute inset-0 opacity-5"></div>
    <div class="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
    <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <circle cx="20%" cy="20%" r="30" fill="rgba(0, 255, 255, 0.1)" class="animate-float">
        <animate attributeName="r" values="30;32;30" dur="8s" repeatCount="indefinite" />
      </circle>
      <circle cx="80%" cy="60%" r="20" fill="rgba(255, 0, 255, 0.1)" class="animate-float-delayed">
        <animate attributeName="r" values="20;22;20" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="40%" cy="80%" r="15" fill="rgba(0, 255, 255, 0.15)" class="animate-pulse">
        <animate attributeName="r" values="15;17;15" dur="10s" repeatCount="indefinite" />
      </circle>
      <circle cx="60%" cy="30%" r="25" fill="rgba(255, 0, 255, 0.15)" class="animate-pulse-delayed">
        <animate attributeName="r" values="25;27;25" dur="7s" repeatCount="indefinite" />
      </circle>
      <rect x="10%" y="10%" width="20" height="20" fill="rgba(0, 255, 255, 0.1)" class="animate-rotate">
        <animateTransform attributeName="transform" type="rotate" from="0 10% 10%" to="360 10% 10%" dur="10s" repeatCount="indefinite"/>
      </rect>
    </svg>
  </div>

  <!-- Sidebar with titles -->
  <div class="w-80 bg-gray-900/80 border-r border-gray-800 h-screen fixed left-0">
    <div class="h-full flex flex-col">
      <div class="p-4">
        <h3 class="text-lg font-semibold text-cyan-400 mb-4">Table of Contents</h3>
        <div class="grid grid-cols-1 gap-1">
          {#each Array(totalSlides) as _, i}
            <button
              class="text-left py-1.5 px-3 rounded-lg transition-all duration-200 flex items-center text-sm {currentSlide === i + 1 ? 'bg-cyan-500/20 text-cyan-400 font-medium' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}"
              on:click={() => currentSlide = i + 1}
            >
              <span class="w-6 opacity-60">{(i + 1).toString().padStart(2, '0')}</span>
              <span class="flex-1 truncate">{getSlideTitle(i + 1)}</span>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Main content -->
  <div class="flex-1 ml-80 relative">
    <button
      class="absolute top-6 right-6 p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-200 hover:scale-110"
      on:click={toggleFullscreen}
      title="Toggle Fullscreen (F)"
    >
      <i class="fas {isFullscreen ? 'fa-compress' : 'fa-expand'}"></i>
    </button>

    <!-- Navigation Controls -->
    <div class="fixed bottom-6 right-6 flex items-center space-x-4 z-50">
      <div class="text-gray-400 bg-gray-900/50 py-2 px-4 rounded-full">
        Slide {currentSlide}/{totalSlides}
      </div>
      <button
        class="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-200 hover:scale-110 {currentSlide === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
        on:click={previousSlide}
        disabled={currentSlide === 1}
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <button
        class="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-200 hover:scale-110 {currentSlide === totalSlides ? 'opacity-50 cursor-not-allowed' : ''}"
        on:click={nextSlide}
        disabled={currentSlide === totalSlides}
      >
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>

    <!-- Slides Container -->
    <div class="h-screen flex items-center justify-center p-12 pt-16">
      <div class="w-full max-w-5xl mx-auto flex flex-col h-full">
        <div class="slide-content">
          {#if currentSlide === 1}
            <div class="flex flex-row h-full w-full">
              <div class="flex-1 flex items-center justify-center">
                <div class="cover-container">
                  <div class="school-info">
                    <h2 class="school-name">ENSET MOHAMMEDIA</h2>
                    <p class="master-name">Master's Degree in Digital Transformation<br/>of Educational Processes and Skills Engineering</p>
                  </div>
                  <div class="title-box">
                    <h1 class="cover-title">
                      The Impact of AI<br/>on the Workspace
                    </h1>
                  </div>
                  <div class="presenter-info">
                    <p class="presenter-name">EL HOUCINE QARA</p>
                    <div class="presenter-role">Senior Software Engineer</div>
                    <div class="date">May 15, 2025</div>
                  </div>
                </div>
              </div>
            </div>
          {:else}
            <div class="slide-text">
              {#if currentSlide === 2}
                <div class="agenda-container">
                  <h2 class="section-title">Journey Through AI</h2>
                  <ul class="agenda-list">
                    {#each Array(5) as _, i}
                      <li class="agenda-item">
                        <span class="agenda-number">{i + 1}</span>
                        <span class="agenda-text">{getAgendaItem(i + 1)}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              {:else if currentSlide === 3}
                <div class="content-container">
                  <h2 class="section-title">What is AI?</h2>
                  <div class="content-box">
                    <p class="main-text">AI helps computers think and learn like people. It makes work faster and better.</p>
                    <div class="key-points">
                      <div class="key-point">
                        <i class="fas fa-lightbulb"></i>
                        <span>Why AI is Good: It helps us work better and find new ways to do things</span>
                      </div>
                      <div class="key-point">
                        <i class="fas fa-bullseye"></i>
                        <span>What We Will Learn: How AI changes work and what we need to know</span>
                      </div>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 4}
                <div class="content-container">
                  <h2 class="section-title">AI Today</h2>
                  <div class="stats-container">
                    <div class="stats-item">
                      <div class="stats-number">37%</div>
                      <div class="stats-description">of companies use AI</div>
                    </div>
                    <div class="stats-item">
                      <div class="stats-number">80%</div>
                      <div class="stats-description">started using more AI after 2020</div>
                    </div>
                    <div class="stats-item">
                      <div class="stats-number">$432B</div>
                      <div class="stats-description">AI market size in 2022</div>
                    </div>
                  </div>
                  <div class="key-applications">
                    <h3 class="applications-title">Where AI is Used</h3>
                    <div class="applications-grid">
                      <div class="application-item">
                        <i class="fas fa-cogs"></i>
                        <span>Doing Work by Itself</span>
                      </div>
                      <div class="application-item">
                        <i class="fas fa-chart-bar"></i>
                        <span>Looking at Numbers</span>
                      </div>
                      <div class="application-item">
                        <i class="fas fa-headset"></i>
                        <span>Helping Customers</span>
                      </div>
                      <div class="application-item">
                        <i class="fas fa-brain"></i>
                        <span>Making Choices</span>
                      </div>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 5}
                <div class="content-container">
                  <h2 class="section-title">Making Work Easier</h2>
                  <div class="metrics-container">
                    <div class="metric-item">
                      <i class="fas fa-tachometer-alt"></i>
                      <div class="metric-value">40%</div>
                      <div class="metric-label">less hand work</div>
                    </div>
                    <div class="metric-item">
                      <i class="fas fa-chart-line"></i>
                      <div class="metric-value">25%</div>
                      <div class="metric-label">more work done</div>
                    </div>
                    <div class="metric-item">
                      <i class="fas fa-bolt"></i>
                      <div class="metric-value">60%</div>
                      <div class="metric-label">faster work</div>
                    </div>
                  </div>
                  <div class="impact-areas">
                    <h3 class="impact-title">Where AI Helps</h3>
                    <div class="impact-grid">
                      <div class="impact-item">Office work</div>
                      <div class="impact-item">Working with data</div>
                      <div class="impact-item">Checking quality</div>
                      <div class="impact-item">Using resources</div>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 6}
                <div class="content-container">
                  <h2 class="section-title">New Jobs</h2>
                  <div class="evolution-container">
                    <div class="evolution-section">
                      <h3 class="evolution-title">New Work Roles</h3>
                      <div class="roles-grid">
                        <div class="role-item">
                          <i class="fas fa-graduation-cap"></i>
                          <span>AI Teachers</span>
                        </div>
                        <div class="role-item">
                          <i class="fas fa-database"></i>
                          <span>Data Workers</span>
                        </div>
                        <div class="role-item">
                          <i class="fas fa-robot"></i>
                          <span>Automation Experts</span>
                        </div>
                        <div class="role-item">
                          <i class="fas fa-balance-scale"></i>
                          <span>AI Rules Experts</span>
                        </div>
                      </div>
                    </div>
                    <div class="evolution-section">
                      <h3 class="evolution-title">Skills We Need</h3>
                      <div class="skills-grid">
                        <div class="skill-item">Understanding AI</div>
                        <div class="skill-item">Working with Data</div>
                        <div class="skill-item">Thinking Clearly</div>
                        <div class="skill-item">Being Flexible</div>
                      </div>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 7}
                <div class="content-container">
                  <h2 class="section-title">Changing Work</h2>
                  <div class="transformation-container">
                    <div class="transformation-section">
                      <h3 class="transformation-title">New Work Places</h3>
                      <div class="integration-grid">
                        <div class="integration-item">
                          <i class="fas fa-laptop-house"></i>
                          <span>Smart offices</span>
                        </div>
                        <div class="integration-item">
                          <i class="fas fa-users"></i>
                          <span>Working together online</span>
                        </div>
                        <div class="integration-item">
                          <i class="fas fa-tools"></i>
                          <span>AI tools</span>
                        </div>
                      </div>
                    </div>
                    <div class="transformation-section">
                      <h3 class="transformation-title">How Work Changes</h3>
                      <div class="process-grid">
                        <div class="process-item">Automatic work</div>
                        <div class="process-item">Quick information</div>
                        <div class="process-item">Planning ahead</div>
                      </div>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 8}
                <div class="content-container">
                  <h2 class="section-title">AI Tools We Use</h2>
                  <div class="tools-container">
                    <div class="tool-category">
                      <h3 class="tool-title">Talking</h3>
                      <div class="tool-items">
                        <div class="tool-item">ChatGPT</div>
                        <div class="tool-item">Language Help</div>
                        <div class="tool-item">Meeting Helpers</div>
                      </div>
                    </div>
                    <div class="tool-category">
                      <h3 class="tool-title">Getting Work Done</h3>
                      <div class="tool-items">
                        <div class="tool-item">Automatic Tasks</div>
                        <div class="tool-item">Project Help</div>
                        <div class="tool-item">Paper Work</div>
                      </div>
                    </div>
                    <div class="tool-category">
                      <h3 class="tool-title">Understanding</h3>
                      <div class="tool-items">
                        <div class="tool-item">Looking at Data</div>
                        <div class="tool-item">Predicting</div>
                        <div class="tool-item">Making Choices</div>
                      </div>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 9}
                <div class="content-container">
                  <h2 class="section-title">Working Better</h2>
                  <div class="productivity-container">
                    <div class="productivity-section">
                      <h3 class="productivity-title">Good Changes</h3>
                      <div class="gains-grid">
                        <div class="gain-item">
                          <div class="gain-value">30%</div>
                          <div class="gain-label">saving time</div>
                        </div>
                        <div class="gain-item">
                          <div class="gain-value">45%</div>
                          <div class="gain-label">saving money</div>
                        </div>
                        <div class="gain-item">
                          <div class="gain-value">50%</div>
                          <div class="gain-label">faster choices</div>
                        </div>
                      </div>
                    </div>
                    <div class="productivity-section">
                      <h3 class="productivity-title">Better Work</h3>
                      <div class="quality-grid">
                        <div class="quality-item">Fewer mistakes</div>
                        <div class="quality-item">Same quality</div>
                        <div class="quality-item">More correct</div>
                      </div>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 10}
                <div class="content-container">
                  <h2 class="section-title">Problems to Solve</h2>
                  <div class="challenges-container">
                    <div class="challenge-section">
                      <h3 class="challenge-title">Tech Problems</h3>
                      <div class="challenge-grid">
                        <div class="challenge-item">
                          <i class="fas fa-code-branch"></i>
                          <span>Making things work together</span>
                        </div>
                        <div class="challenge-item">
                          <i class="fas fa-database"></i>
                          <span>Good data</span>
                        </div>
                        <div class="challenge-item">
                          <i class="fas fa-shield-alt"></i>
                          <span>Keeping things safe</span>
                        </div>
                        <div class="challenge-item">
                          <i class="fas fa-server"></i>
                          <span>Making sure it works</span>
                        </div>
                      </div>
                    </div>
                    <div class="challenge-section">
                      <h3 class="challenge-title">People Problems</h3>
                      <div class="challenge-grid">
                        <div class="challenge-item">
                          <i class="fas fa-user-times"></i>
                          <span>People don't want change</span>
                        </div>
                        <div class="challenge-item">
                          <i class="fas fa-graduation-cap"></i>
                          <span>Need to learn new things</span>
                        </div>
                        <div class="challenge-item">
                          <i class="fas fa-user-shield"></i>
                          <span>Worry about jobs</span>
                        </div>
                        <div class="challenge-item">
                          <i class="fas fa-book"></i>
                          <span>Need training</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 11}
                <div class="content-container">
                  <h2 class="section-title">How to Start</h2>
                  <div class="strategy-container">
                    <div class="strategy-timeline">
                      <div class="strategy-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                          <h3 class="step-title">Look and Plan</h3>
                          <p class="step-description">See what you have and what you want</p>
                        </div>
                      </div>
                      <div class="strategy-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                          <h3 class="step-title">Try Small</h3>
                          <p class="step-description">Test in a small way first</p>
                        </div>
                      </div>
                      <div class="strategy-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                          <h3 class="step-title">Learn</h3>
                          <p class="step-description">Teach people what they need to know</p>
                        </div>
                      </div>
                      <div class="strategy-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                          <h3 class="step-title">Use More</h3>
                          <p class="step-description">Use it in more places</p>
                        </div>
                      </div>
                      <div class="strategy-step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                          <h3 class="step-title">Check and Fix</h3>
                          <p class="step-description">See what works and what doesn't</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 12}
                <div class="content-container">
                  <h2 class="section-title">Good Ways to Work</h2>
                  <div class="practices-container">
                    <div class="practice-section">
                      <h3 class="practice-title">Tech Ways</h3>
                      <div class="practice-grid">
                        <div class="practice-item">
                          <i class="fas fa-play"></i>
                          <span>Start small, grow slowly</span>
                        </div>
                        <div class="practice-item">
                          <i class="fas fa-check-circle"></i>
                          <span>Use good data</span>
                        </div>
                        <div class="practice-item">
                          <i class="fas fa-sync"></i>
                          <span>Keep things new</span>
                        </div>
                        <div class="practice-item">
                          <i class="fas fa-lock"></i>
                          <span>Keep things safe</span>
                        </div>
                      </div>
                    </div>
                    <div class="practice-section">
                      <h3 class="practice-title">People Ways</h3>
                      <div class="practice-grid">
                        <div class="practice-item">
                          <i class="fas fa-comments"></i>
                          <span>Talk clearly</span>
                        </div>
                        <div class="practice-item">
                          <i class="fas fa-graduation-cap"></i>
                          <span>Keep learning</span>
                        </div>
                        <div class="practice-item">
                          <i class="fas fa-users"></i>
                          <span>Let people help</span>
                        </div>
                        <div class="practice-item">
                          <i class="fas fa-comment-dots"></i>
                          <span>Listen to people</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 13}
                <div class="content-container">
                  <h2 class="section-title">What's Coming Next</h2>
                  <div class="trends-container">
                    <div class="trend-section">
                      <h3 class="trend-title">New Tech</h3>
                      <div class="trend-grid">
                        <div class="trend-item">
                          <i class="fas fa-language"></i>
                          <span>Better Language AI</span>
                        </div>
                        <div class="trend-item">
                          <i class="fas fa-eye"></i>
                          <span>Computer Vision</span>
                        </div>
                        <div class="trend-item">
                          <i class="fas fa-atom"></i>
                          <span>Quantum AI</span>
                        </div>
                        <div class="trend-item">
                          <i class="fas fa-network-wired"></i>
                          <span>Edge Computing</span>
                        </div>
                      </div>
                    </div>
                    <div class="trend-section">
                      <h3 class="trend-title">Work Changes</h3>
                      <div class="trend-grid">
                        <div class="trend-item">
                          <i class="fas fa-brain"></i>
                          <span>People and AI Together</span>
                        </div>
                        <div class="trend-item">
                          <i class="fas fa-robot"></i>
                          <span>Self-working Systems</span>
                        </div>
                        <div class="trend-item">
                          <i class="fas fa-user-cog"></i>
                          <span>AI for Each Person</span>
                        </div>
                        <div class="trend-item">
                          <i class="fas fa-balance-scale"></i>
                          <span>AI Rules</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 14}
                <div class="content-container">
                  <h2 class="section-title">What to Do</h2>
                  <div class="recommendations-container">
                    <div class="recommendation-section">
                      <h3 class="recommendation-title">For Companies</h3>
                      <div class="recommendation-grid">
                        <div class="recommendation-item">
                          <i class="fas fa-chess"></i>
                          <span>Make a clear AI plan</span>
                        </div>
                        <div class="recommendation-item">
                          <i class="fas fa-graduation-cap"></i>
                          <span>Teach people</span>
                        </div>
                        <div class="recommendation-item">
                          <i class="fas fa-balance-scale"></i>
                          <span>Make good rules</span>
                        </div>
                        <div class="recommendation-item">
                          <i class="fas fa-chart-line"></i>
                          <span>Watch and change</span>
                        </div>
                      </div>
                    </div>
                    <div class="recommendation-section">
                      <h3 class="recommendation-title">For People</h3>
                      <div class="recommendation-grid">
                        <div class="recommendation-item">
                          <i class="fas fa-book"></i>
                          <span>Keep learning</span>
                        </div>
                        <div class="recommendation-item">
                          <i class="fas fa-brain"></i>
                          <span>Learn about AI</span>
                        </div>
                        <div class="recommendation-item">
                          <i class="fas fa-users"></i>
                          <span>Be good with people</span>
                        </div>
                        <div class="recommendation-item">
                          <i class="fas fa-bell"></i>
                          <span>Stay updated</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 15}
                <div class="content-container">
                  <h2 class="section-title">End</h2>
                  <div class="conclusion-container">
                    <div class="conclusion-main">
                      <p class="conclusion-text">AI is changing how we work and what work means.</p>
                    </div>
                    <div class="conclusion-actions">
                      <div class="action-item">
                        <i class="fas fa-sync"></i>
                        <span>Change: Use new tech</span>
                      </div>
                      <div class="action-item">
                        <i class="fas fa-graduation-cap"></i>
                        <span>Learn: Keep learning new things</span>
                      </div>
                      <div class="action-item">
                        <i class="fas fa-lightbulb"></i>
                        <span>Create: Find new ways to work</span>
                      </div>
                    </div>
                    <div class="conclusion-thankyou">
                      <p class="thankyou-text">Thank you for listening</p>
                    </div>
                  </div>
                </div>
              {:else if currentSlide === 16}
                <div class="content-container">
                  <div class="thank-you-container">
                    <div class="thank-you-content">
                      <div class="thank-you-icon">
                        <i class="fas fa-heart"></i>
                      </div>
                      <h2 class="thank-you-title">Thank You!</h2>
                      <p class="thank-you-message">For your time and attention during this presentation</p>
                      <div class="thank-you-details">
                        <div class="contact-info">
                          <p class="contact-label">Contact</p>
                          <p class="contact-value">votre@email.com</p>
                        </div>
                        <div class="social-links">
                          <a href="#" class="social-link">
                            <i class="fab fa-linkedin"></i>
                          </a>
                          <a href="#" class="social-link">
                            <i class="fab fa-github"></i>
                          </a>
                          <a href="#" class="social-link">
                            <i class="fab fa-twitter"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .slide-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .slide-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: rgb(34, 211, 238);
    padding: 1rem;
    background: rgba(17, 24, 39, 0.3);
    border-radius: 0.75rem;
    border-left: 4px solid rgb(34, 211, 238);
    margin-bottom: 2rem;
  }

  .agenda-item {
    background: rgba(17, 24, 39, 0.3);
    border-radius: 0.75rem;
    transition: all 0.2s ease;
  }

  .agenda-item:hover {
    background: rgba(17, 24, 39, 0.5);
    transform: translateX(4px);
  }

  /* Suppression du scrolling */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Utility classes */
  .text-lg { font-size: 1.125rem; }
  .text-xl { font-size: 1.25rem; }
  .text-2xl { font-size: 1.5rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .space-y-4 > * + * { margin-top: 1rem; }

  /* Styles pour la page de garde */
  .first-slide {
    position: relative;
  }

  .cover-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding-top: 2rem;
    height: 100%;
  }

  .school-info {
    text-align: center;
  }

  .school-name {
    font-size: 2rem;
    color: #60A5FA;
    margin-bottom: 1rem;
  }

  .master-name {
    font-size: 1.2rem;
    color: white;
    line-height: 1.5;
  }

  .title-box {
    text-align: center;
  }

  .cover-title {
    font-size: 3rem;
    color: white;
    line-height: 1.2;
  }

  .presenter-info {
    text-align: center;
  }

  .presenter-name {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 0.5rem;
  }

  .presenter-role {
    font-size: 1.2rem;
    color: #94A3B8;
    margin-bottom: 0.5rem;
  }

  .date {
    font-size: 1rem;
    color: #60A5FA;
  }

  .clip-diagonal {
    clip-path: polygon(25% 0, 100% 0, 100% 100%, 15% 100%);
  }

  .agenda-container {
    max-width: 800px;
    margin: 0 auto;
  }

  .agenda-list {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
  }

  .agenda-item {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    background: rgba(30, 41, 59, 0.7);
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    border-left: 4px solid #60A5FA;
  }

  .agenda-item:hover {
    transform: translateX(5px);
    background: rgba(30, 41, 59, 0.8);
  }

  .agenda-number {
    font-size: 1.25rem;
    font-weight: 600;
    color: #60A5FA;
    margin-right: 1.5rem;
    min-width: 1.5rem;
  }

  .agenda-text {
    font-size: 1.1rem;
    color: #E2E8F0;
  }

  /* Supprimez les styles existants pour les crochets */
  .agenda-item::before,
  .agenda-item::after {
    display: none;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .agenda-item {
    animation: fadeIn 0.5s ease forwards;
  }

  .agenda-item:nth-child(1) { animation-delay: 0.1s; }
  .agenda-item:nth-child(2) { animation-delay: 0.2s; }
  .agenda-item:nth-child(3) { animation-delay: 0.3s; }
  .agenda-item:nth-child(4) { animation-delay: 0.4s; }
  .agenda-item:nth-child(5) { animation-delay: 0.5s; }

  .stats-container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 3rem;
    width: 100%;
    max-width: 1000px;
  }

  .stats-item {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    width: 30%;
    transition: transform 0.3s ease, background-color 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .stats-item:hover {
    transform: translateY(-5px);
    background: rgba(139, 92, 246, 0.15);
  }

  .stats-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: #8B5CF6;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
  }

  .stats-description {
    font-size: 1.1rem;
    color: #E2E8F0;
    line-height: 1.4;
  }

  .key-applications {
    width: 100%;
    max-width: 1000px;
    margin-top: 2rem;
  }

  .key-applications-title {
    font-size: 1.5rem;
    color: #8B5CF6;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .applications-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .application-item {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 0.75rem;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    backdrop-filter: blur(10px);
  }

  .application-item:hover {
    transform: translateY(-3px);
    background: rgba(139, 92, 246, 0.15);
  }

  .application-item i {
    font-size: 1.5rem;
    color: #8B5CF6;
  }

  .application-item span {
    font-size: 1rem;
    color: #E2E8F0;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .stats-item {
    animation: fadeInUp 0.5s ease forwards;
  }

  .stats-item:nth-child(1) { animation-delay: 0.1s; }
  .stats-item:nth-child(2) { animation-delay: 0.2s; }
  .stats-item:nth-child(3) { animation-delay: 0.3s; }

  .application-item {
    animation: fadeInUp 0.5s ease forwards;
  }

  .application-item:nth-child(1) { animation-delay: 0.4s; }
  .application-item:nth-child(2) { animation-delay: 0.5s; }
  .application-item:nth-child(3) { animation-delay: 0.6s; }
  .application-item:nth-child(4) { animation-delay: 0.7s; }

  .content-container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
  }

  .key-applications {
    width: 100%;
    max-width: 1000px;
    margin-top: 3rem;
  }

  .section-title {
    font-size: 2.5rem;
    color: #60A5FA;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 600;
  }

  .content-box {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 1rem;
    padding: 2rem;
    margin-bottom: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(96, 165, 250, 0.1);
  }

  .main-text {
    font-size: 1.5rem;
    color: #E2E8F0;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .key-points {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .key-point {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(96, 165, 250, 0.1);
    border-radius: 0.75rem;
    border-left: 4px solid #60A5FA;
  }

  .key-point i {
    font-size: 1.5rem;
    color: #60A5FA;
  }

  .key-point span {
    color: #E2E8F0;
    font-size: 1.1rem;
  }

  .metrics-container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 3rem;
  }

  .metric-item {
    text-align: center;
    padding: 2rem;
    background: rgba(96, 165, 250, 0.1);
    border-radius: 1rem;
    width: 30%;
  }

  .metric-item i {
    font-size: 2rem;
    color: #60A5FA;
    margin-bottom: 1rem;
  }

  .metric-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: #60A5FA;
    margin-bottom: 0.5rem;
  }

  .metric-label {
    color: #E2E8F0;
    font-size: 1.1rem;
  }

  .impact-areas {
    margin-top: 2rem;
  }

  .impact-title {
    font-size: 1.5rem;
    color: #60A5FA;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .impact-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  .impact-item {
    background: rgba(96, 165, 250, 0.1);
    padding: 1rem;
    border-radius: 0.75rem;
    text-align: center;
    color: #E2E8F0;
  }

  .evolution-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .evolution-section {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(96, 165, 250, 0.1);
  }

  .evolution-title {
    font-size: 1.5rem;
    color: #60A5FA;
    margin-bottom: 1.5rem;
  }

  .roles-grid, .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .role-item, .skill-item {
    background: rgba(30, 41, 59, 0.5);
    padding: 1rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid rgba(96, 165, 250, 0.2);
  }

  .role-item i {
    font-size: 1.5rem;
    color: #60A5FA;
  }

  .transformation-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .transformation-section {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(96, 165, 250, 0.1);
    width: 100%;
  }

  .transformation-title {
    font-size: 1.5rem;
    color: #60A5FA;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .integration-grid, .process-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    width: 100%;
  }

  .integration-item, .process-item {
    background: rgba(30, 41, 59, 0.5);
    padding: 1.5rem;
    border-radius: 0.75rem;
    text-align: center;
    border: 1px solid rgba(96, 165, 250, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .integration-item i {
    font-size: 1.5rem;
    color: #60A5FA;
  }

  .integration-item span, .process-item {
    color: #E2E8F0;
    font-size: 1rem;
    line-height: 1.4;
  }

  @media (min-width: 768px) {
    .transformation-container {
      flex-direction: row;
    }

    .transformation-section {
      flex: 1;
    }
  }

  .tools-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .tool-category {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(96, 165, 250, 0.1);
  }

  .tool-title {
    font-size: 1.5rem;
    color: #60A5FA;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .tool-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tool-item {
    background: rgba(30, 41, 59, 0.5);
    padding: 1rem;
    border-radius: 0.75rem;
    text-align: center;
    color: #E2E8F0;
    border: 1px solid rgba(96, 165, 250, 0.2);
  }

  .productivity-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .productivity-section {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(96, 165, 250, 0.1);
  }

  .productivity-title {
    font-size: 1.5rem;
    color: #60A5FA;
    margin-bottom: 1.5rem;
  }

  .gains-grid, .quality-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .gain-item, .quality-item {
    background: rgba(30, 41, 59, 0.5);
    padding: 1rem;
    border-radius: 0.75rem;
    text-align: center;
    border: 1px solid rgba(96, 165, 250, 0.2);
  }

  .gain-value {
    font-size: 2rem;
    font-weight: bold;
    color: #60A5FA;
    margin-bottom: 0.5rem;
  }

  .gain-label {
    color: #E2E8F0;
  }

  .challenges-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .challenge-section {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(96, 165, 250, 0.1);
  }

  .challenge-title {
    font-size: 1.5rem;
    color: #60A5FA;
    margin-bottom: 1.5rem;
  }

  .challenge-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .challenge-item {
    background: rgba(30, 41, 59, 0.5);
    padding: 1rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid rgba(96, 165, 250, 0.2);
  }

  .challenge-item i {
    font-size: 1.5rem;
    color: #60A5FA;
  }

  .strategy-container {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(96, 165, 250, 0.1);
  }

  .strategy-timeline {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .strategy-step {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .step-number {
    width: 3rem;
    height: 3rem;
    background: linear-gradient(135deg, #60A5FA, #3B82F6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    box-shadow: 0 4px 6px rgba(96, 165, 250, 0.2);
  }

  .step-content {
    flex: 1;
  }

  .step-title {
    font-size: 1.25rem;
    color: #60A5FA;
    margin-bottom: 0.5rem;
  }

  .step-description {
    color: #E2E8F0;
  }

  .practices-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .practice-section {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(96, 165, 250, 0.1);
  }

  .practice-title {
    font-size: 1.5rem;
    color: #60A5FA;
    margin-bottom: 1.5rem;
  }

  .practice-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .practice-item {
    background: rgba(30, 41, 59, 0.5);
    padding: 1rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid rgba(96, 165, 250, 0.2);
  }

  .practice-item i {
    font-size: 1.5rem;
    color: #60A5FA;
  }

  .trends-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .trend-section {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(96, 165, 250, 0.1);
  }

  .trend-title {
    font-size: 1.5rem;
    color: #60A5FA;
    margin-bottom: 1.5rem;
  }

  .trend-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .trend-item {
    background: rgba(30, 41, 59, 0.5);
    padding: 1rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid rgba(96, 165, 250, 0.2);
  }

  .trend-item i {
    font-size: 1.5rem;
    color: #60A5FA;
  }

  .recommendations-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .recommendation-section {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(96, 165, 250, 0.1);
  }

  .recommendation-title {
    font-size: 1.5rem;
    color: #60A5FA;
    margin-bottom: 1.5rem;
  }

  .recommendation-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .recommendation-item {
    background: rgba(30, 41, 59, 0.5);
    padding: 1rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid rgba(96, 165, 250, 0.2);
  }

  .recommendation-item i {
    font-size: 1.5rem;
    color: #60A5FA;
  }

  .conclusion-container {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(96, 165, 250, 0.1);
  }

  .conclusion-main {
    text-align: center;
    margin-bottom: 3rem;
  }

  .conclusion-text {
    font-size: 2rem;
    color: #E2E8F0;
    line-height: 1.4;
  }

  .conclusion-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .action-item {
    background: rgba(30, 41, 59, 0.5);
    padding: 1.5rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid rgba(96, 165, 250, 0.2);
  }

  .action-item i {
    font-size: 1.5rem;
    color: #60A5FA;
  }

  .action-item span {
    color: #E2E8F0;
    font-size: 1.1rem;
  }

  .conclusion-thankyou {
    text-align: center;
  }

  .thankyou-text {
    font-size: 1.5rem;
    color: #60A5FA;
  }

  .thank-you-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    padding: 2rem;
  }

  .thank-you-content {
    background: rgba(30, 41, 59, 0.7);
    border-radius: 2rem;
    padding: 4rem;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(96, 165, 250, 0.1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    width: 100%;
  }

  .thank-you-icon {
    font-size: 4rem;
    color: #60A5FA;
    margin-bottom: 2rem;
    animation: pulse 2s infinite;
  }

  .thank-you-title {
    font-size: 3.5rem;
    color: #60A5FA;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  .thank-you-message {
    font-size: 1.5rem;
    color: #E2E8F0;
    margin-bottom: 3rem;
  }

  .thank-you-details {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
  }

  .contact-info {
    background: rgba(30, 41, 59, 0.5);
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid rgba(96, 165, 250, 0.2);
  }

  .contact-label {
    font-size: 1.2rem;
    color: #60A5FA;
    margin-bottom: 0.5rem;
  }

  .contact-value {
    font-size: 1.1rem;
    color: #E2E8F0;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }

  .social-link {
    width: 3rem;
    height: 3rem;
    background: rgba(30, 41, 59, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #60A5FA;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    border: 1px solid rgba(96, 165, 250, 0.2);
  }

  .social-link:hover {
    transform: translateY(-5px);
    background: rgba(96, 165, 250, 0.1);
    color: #3B82F6;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
</style> 