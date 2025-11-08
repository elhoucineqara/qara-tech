<script lang="ts">
  import { onMount } from 'svelte';
  
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
    <canvas id="matrix-rain" class="absolute inset-0 opacity-10"></canvas>
    <div class="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
  </div>

  <div class="relative z-10 px-4 sm:px-8 pt-32 pb-16">
    <div class="container mx-auto">
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-cyan-400">Professional Experience</h1>
        <p class="text-lg text-gray-200 max-w-3xl mx-auto">2+ Years of experience building innovative solutions</p>
      </div>

      <div class="max-w-5xl mx-auto space-y-8">
        <!-- Experience 1: Call Center HARX -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <h3 class="text-2xl font-bold text-cyan-400 mb-2">Full Stack Developer - Call Center HARX</h3>
              <h4 class="text-xl text-purple-400 mb-2">I-ETERIA</h4>
            </div>
            <div class="text-gray-300 flex flex-col items-start md:items-end">
              <span class="flex items-center mb-1">
                <i class="fas fa-calendar mr-2"></i>
                Feb 2024 – Present
              </span>
              <span class="flex items-center">
                <i class="fas fa-map-marker-alt mr-2"></i>
                Remote
              </span>
            </div>
          </div>
          
          <p class="text-gray-200 mb-4 leading-relaxed">
            Leading the development of HARX, an advanced cloud-based call center solution. 
            Architecting and implementing a comprehensive VoIP platform with real-time 
            communication features, intelligent call routing, CRM integration, and advanced 
            analytics dashboard. Developing microservices architecture for scalability and 
            performance optimization.
          </p>

          <ul class="space-y-2 mb-6 text-gray-300">
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Designed and developed real-time call management system with WebRTC integration</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Implemented AI-powered call analytics and sentiment analysis using OpenAI</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Built RESTful APIs for CRM integration with Zoho and Google services</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Developed responsive admin dashboard with React for monitoring and reporting</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Integrated VoIP telephony system with automatic call distribution (ACD)</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Created real-time notifications system using WebSockets</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Optimized database queries reducing response time by 60%</span>
            </li>
          </ul>

          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Laravel</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">React</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Svelte</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Node.js</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">WebRTC</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">MySQL</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">MongoDB</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Redis</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">WebSockets</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">OpenAI</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Docker</span>
          </div>
        </div>

        <!-- Experience 2: LMS Development -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <h3 class="text-2xl font-bold text-cyan-400 mb-2">Web Developer - LMS Development</h3>
              <h4 class="text-xl text-purple-400 mb-2">I-ETERIA</h4>
            </div>
            <div class="text-gray-300 flex flex-col items-start md:items-end">
              <span class="flex items-center mb-1">
                <i class="fas fa-calendar mr-2"></i>
                Feb 2024 – Oct 2024
              </span>
              <span class="flex items-center">
                <i class="fas fa-map-marker-alt mr-2"></i>
                Remote
              </span>
            </div>
          </div>
          
          <p class="text-gray-200 mb-4 leading-relaxed">
            Developed a comprehensive Learning Management System (LMS) for HARX organization, 
            designed to deliver specialized trading training programs across multiple companies. 
            The platform enables traders to access educational content, complete courses, track 
            progress, and obtain certifications in financial trading and market analysis.
          </p>

          <ul class="space-y-2 mb-6 text-gray-300">
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Architected and developed multi-company LMS platform for trader training programs</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Implemented course management system with video lessons, assessments, and certifications</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Built user progress tracking and analytics dashboard for training administrators</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Created role-based access control for different companies and user types</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Developed interactive trading simulations and practical exercises modules</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Implemented reporting system for tracking learner performance across companies</span>
            </li>
          </ul>

          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Laravel</span>
            <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Svelte</span>
            <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Node.js</span>
            <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">MySQL</span>
            <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">MongoDB</span>
            <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">RESTful API</span>
            <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">WebSockets</span>
          </div>
        </div>

        <!-- Experience 3: HR Automation -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <h3 class="text-2xl font-bold text-cyan-400 mb-2">Full Stack Developer</h3>
              <h4 class="text-xl text-purple-400 mb-2">HR Automation Project</h4>
            </div>
            <div class="text-gray-300 flex flex-col items-start md:items-end">
              <span class="flex items-center mb-1">
                <i class="fas fa-calendar mr-2"></i>
                March 2023 – April 2023
              </span>
              <span class="flex items-center">
                <i class="fas fa-map-marker-alt mr-2"></i>
                Remote
              </span>
            </div>
          </div>
          
          <p class="text-gray-200 mb-4 leading-relaxed">
            Developed a comprehensive HR management system to automate human resources processes 
            including employee onboarding, leave management, payroll processing, and performance 
            evaluation. Implemented secure authentication, role-based access control, and automated 
            workflows to streamline HR operations.
          </p>

          <ul class="space-y-2 mb-6 text-gray-300">
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Designed and developed employee management dashboard with real-time data visualization</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Implemented automated leave request and approval workflow system</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Built payroll calculation module with tax and deduction management</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Created document management system for employee records</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check-circle text-cyan-400 mr-3 mt-1"></i>
              <span>Integrated email notifications for automated HR communications</span>
            </li>
          </ul>

          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Laravel</span>
            <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">React</span>
            <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">MySQL</span>
            <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">RESTful API</span>
            <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Bootstrap</span>
          </div>
        </div>

        <!-- Experience 4: Electronics Technician -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <h3 class="text-2xl font-bold text-cyan-400 mb-2">Electronics Repair Technician</h3>
              <h4 class="text-xl text-purple-400 mb-2">C2EZ</h4>
            </div>
            <div class="text-gray-300 flex flex-col items-start md:items-end">
              <span class="flex items-center mb-1">
                <i class="fas fa-calendar mr-2"></i>
                Feb 2020 – Mar 2020
              </span>
              <span class="flex items-center">
                <i class="fas fa-map-marker-alt mr-2"></i>
                Casablanca, Morocco
              </span>
            </div>
          </div>
          
          <p class="text-gray-200 mb-4 leading-relaxed">
            Specialized in electronics card conception and repair, Arduino programming, 
            and machine software troubleshooting. Gained valuable hardware-software 
            integration experience.
          </p>

          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Arduino</span>
            <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Electronics</span>
            <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Hardware Repair</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
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
    }
    50% { 
      transform: translateY(-20px) translateX(10px); 
      opacity: 0.8;
    }
  }

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

  #matrix-rain {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>

