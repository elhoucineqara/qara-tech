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
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-cyan-400">Education & Certifications</h1>
        <p class="text-lg text-gray-200 max-w-3xl mx-auto">Academic excellence and continuous learning</p>
      </div>

      <div class="max-w-5xl mx-auto space-y-8">
        <!-- Education 1: Master's -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <span class="text-3xl font-bold text-cyan-400 mr-4">2024-2025</span>
                <span class="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-semibold">In Progress</span>
              </div>
              <h3 class="text-2xl font-bold text-purple-400 mb-2">Master's in Digital Transformation of Educational Processes</h3>
              <h4 class="text-xl text-gray-300 mb-3">2nd Year - ENSET Mohammedia, Morocco</h4>
              <p class="text-gray-200 leading-relaxed mb-4">
                Advanced specialized training in digital transformation of education, 
                covering modern educational technologies, digitalization of learning processes, 
                and digital pedagogical innovation.
              </p>
            </div>
            <div class="hidden md:block ml-4">
              <i class="fas fa-graduation-cap text-6xl text-cyan-400/30"></i>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Educational Technologies</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Pedagogical Innovation</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Digitalization</span>
            <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">E-Learning</span>
          </div>
        </div>

        <!-- Education 2: Professional Bachelor's -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <span class="text-3xl font-bold text-purple-400 mr-4">2023-2024</span>
                <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold">Completed</span>
              </div>
              <h3 class="text-2xl font-bold text-cyan-400 mb-2">Professional Bachelor's in Computer Systems Engineering & Web Technologies</h3>
              <h4 class="text-xl text-gray-300 mb-3">EST Sidi Bennour Chouaib Doukkali, El Jadida, Morocco</h4>
              <p class="text-gray-200 leading-relaxed mb-4">
                Comprehensive software engineering program covering advanced programming concepts, 
                software architecture, project management, and modern development methodologies.
              </p>
            </div>
            <div class="hidden md:block ml-4">
              <i class="fas fa-university text-6xl text-purple-400/30"></i>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Software Architecture</span>
            <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Web Technologies</span>
            <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Project Management</span>
            <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Modern Development</span>
          </div>
        </div>

        <!-- Education 3: Specialized Technician -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <span class="text-3xl font-bold text-green-400 mr-4">2022-2023</span>
                <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold">Completed</span>
              </div>
              <h3 class="text-2xl font-bold text-cyan-400 mb-2">Specialized Technician Diploma in Digital Development, Web Full Stack</h3>
              <h4 class="text-xl text-gray-300 mb-3">ISTA TAOURIRT, Morocco</h4>
              <p class="text-gray-200 leading-relaxed mb-4">
                Intensive program focused on full-stack web development, covering both 
                frontend and backend technologies with hands-on project experience.
              </p>
            </div>
            <div class="hidden md:block ml-4">
              <i class="fas fa-code text-6xl text-green-400/30"></i>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Full Stack Development</span>
            <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Frontend Technologies</span>
            <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Backend Development</span>
            <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Database Management</span>
          </div>
        </div>

        <!-- Education 4: Bachelor's -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <span class="text-3xl font-bold text-blue-400 mr-4">2019-2020</span>
                <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold">Completed</span>
              </div>
              <h3 class="text-2xl font-bold text-cyan-400 mb-2">Fundamental Bachelor's in Physical Sciences</h3>
              <h4 class="text-xl text-gray-300 mb-3">Faculty of Sciences Aïn Chock Hassan II, Casablanca</h4>
              <p class="text-gray-200 leading-relaxed mb-4">
                Strong foundation in mathematics, physics, and scientific methodology 
                that supports analytical problem-solving in software development.
              </p>
            </div>
            <div class="hidden md:block ml-4">
              <i class="fas fa-atom text-6xl text-blue-400/30"></i>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Mathematics</span>
            <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Physics</span>
            <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Electronics</span>
            <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Scientific Method</span>
          </div>
        </div>

        <!-- Education 5: Baccalaureate -->
        <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <span class="text-3xl font-bold text-indigo-400 mr-4">2015-2016</span>
                <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-semibold">Completed</span>
              </div>
              <h3 class="text-2xl font-bold text-cyan-400 mb-2">Baccalaureate in Physical Sciences</h3>
              <h4 class="text-xl text-gray-300 mb-3">Ibn Khaldoun High School, Bouznika, Morocco</h4>
              <p class="text-gray-200 leading-relaxed mb-4">
                High school diploma with specialization in Physical Sciences, providing 
                a solid foundation in mathematics, physics, chemistry, and scientific reasoning.
              </p>
            </div>
            <div class="hidden md:block ml-4">
              <i class="fas fa-school text-6xl text-indigo-400/30"></i>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">Physical Sciences</span>
            <span class="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">Mathematics</span>
            <span class="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">Chemistry</span>
            <span class="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">Physics</span>
          </div>
        </div>

        <!-- Certifications Section -->
        <div class="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-cyan-500/30">
          <div class="text-center mb-8">
            <i class="fas fa-certificate text-5xl text-yellow-400 mb-4"></i>
            <h3 class="text-3xl font-bold text-cyan-400 mb-3">Certifications & Skills</h3>
            <p class="text-gray-200 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              Continuously expanding expertise through professional certifications and hands-on experience
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Laravel -->
            <div class="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <i class="fab fa-laravel text-4xl text-red-500 mr-4"></i>
                <div>
                  <h4 class="text-lg font-bold text-gray-200">Laravel Expert</h4>
                  <p class="text-sm text-gray-400">Framework Mastery</p>
                </div>
              </div>
              <p class="text-gray-300 text-sm">Advanced backend development with Laravel, RESTful APIs, and microservices architecture</p>
            </div>

            <!-- React -->
            <div class="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <i class="fab fa-react text-4xl text-blue-400 mr-4"></i>
                <div>
                  <h4 class="text-lg font-bold text-gray-200">React Developer</h4>
                  <p class="text-sm text-gray-400">Frontend Excellence</p>
                </div>
              </div>
              <p class="text-gray-300 text-sm">Expert in React, Redux, Hooks, and modern frontend development patterns</p>
            </div>

            <!-- Node.js -->
            <div class="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <i class="fab fa-node-js text-4xl text-green-500 mr-4"></i>
                <div>
                  <h4 class="text-lg font-bold text-gray-200">Node.js Expert</h4>
                  <p class="text-sm text-gray-400">Server-Side Pro</p>
                </div>
              </div>
              <p class="text-gray-300 text-sm">Scalable backend solutions with Node.js, Express, and real-time communications</p>
            </div>

            <!-- Database -->
            <div class="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <i class="fas fa-database text-4xl text-purple-400 mr-4"></i>
                <div>
                  <h4 class="text-lg font-bold text-gray-200">Database Design</h4>
                  <p class="text-sm text-gray-400">Data Architect</p>
                </div>
              </div>
              <p class="text-gray-300 text-sm">MySQL, MongoDB, PostgreSQL, Redis - optimized database design and query performance</p>
            </div>

            <!-- Cloud -->
            <div class="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <i class="fab fa-aws text-4xl text-orange-400 mr-4"></i>
                <div>
                  <h4 class="text-lg font-bold text-gray-200">Cloud Computing</h4>
                  <p class="text-sm text-gray-400">AWS & Azure</p>
                </div>
              </div>
              <p class="text-gray-300 text-sm">Cloud infrastructure deployment, scalability, and DevOps practices</p>
            </div>

            <!-- Agile -->
            <div class="bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-105">
              <div class="flex items-center mb-4">
                <i class="fas fa-tasks text-4xl text-yellow-400 mr-4"></i>
                <div>
                  <h4 class="text-lg font-bold text-gray-200">Agile & Scrum</h4>
                  <p class="text-sm text-gray-400">Project Management</p>
                </div>
              </div>
              <p class="text-gray-300 text-sm">Experienced in Agile methodologies, Scrum, JIRA, and collaborative development</p>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-cyan-500/30 mt-8">
          <div class="text-center">
            <i class="fas fa-trophy text-5xl text-yellow-400 mb-4"></i>
            <h3 class="text-2xl font-bold text-cyan-400 mb-3">Continuous Learning</h3>
            <p class="text-gray-200 text-lg leading-relaxed max-w-3xl mx-auto">
              Committed to lifelong learning and staying current with the latest technologies and industry trends. 
              Actively pursuing new certifications and participating in professional development programs.
            </p>
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

