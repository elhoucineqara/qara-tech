<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  let isVisible = false;
  let selectedCategory = 'all';
  
  interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    category: string;
    image: string;
    demoUrl?: string;
    githubUrl?: string;
    features: string[];
    impact: string;
  }
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'HARX - Call Center Platform',
      description: 'Advanced cloud-based call center solution with real-time VoIP, CRM integration, and AI analytics',
      longDescription: 'HARX is a comprehensive call center management platform that revolutionizes customer communication. Built with modern technologies, it provides real-time call routing, AI-powered sentiment analysis, and comprehensive analytics.',
      technologies: ['Laravel', 'React', 'Svelte', 'Node.js', 'WebRTC', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'OpenAI'],
      category: 'Enterprise',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
      demoUrl: 'https://harx-demo.com',
      features: [
        'Real-time WebRTC video/audio calls',
        'AI-powered call analytics and sentiment analysis',
        'Automatic call distribution (ACD)',
        'CRM integration (Zoho, Google)',
        'Real-time dashboard with live metrics',
        'WebSocket notifications',
        '60% faster database query optimization'
      ],
      impact: 'Improved call center efficiency by 45% and customer satisfaction by 60%'
    },
    {
      id: 2,
      title: 'LMS - Learning Management System',
      description: 'Multi-company LMS platform for specialized trading training programs',
      longDescription: 'A comprehensive Learning Management System designed for HARX organization to deliver specialized trading training across multiple companies. Features include course management, progress tracking, and certification.',
      technologies: ['Laravel', 'Svelte', 'Node.js', 'MySQL', 'MongoDB', 'RESTful API', 'WebSockets'],
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      features: [
        'Multi-company course management',
        'Video lessons with interactive assessments',
        'Real-time progress tracking',
        'Role-based access control',
        'Trading simulation modules',
        'Advanced reporting system',
        'Automated certification generation'
      ],
      impact: 'Trained 500+ traders across 15 companies with 95% completion rate'
    },
    {
      id: 3,
      title: 'HR Automation System',
      description: 'Complete HR management solution with automated workflows and payroll processing',
      longDescription: 'Comprehensive HR management system automating employee onboarding, leave management, payroll processing, and performance evaluation with secure role-based access.',
      technologies: ['Laravel', 'React', 'MySQL', 'RESTful API', 'Bootstrap'],
      category: 'Enterprise',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      features: [
        'Automated employee onboarding',
        'Leave request workflow system',
        'Payroll calculation with tax management',
        'Document management system',
        'Performance evaluation tracking',
        'Email notification automation',
        'Real-time HR analytics dashboard'
      ],
      impact: 'Reduced HR processing time by 70% and eliminated manual errors'
    },
    {
      id: 4,
      title: 'AI-Powered Portfolio',
      description: 'Modern portfolio website with integrated AI chatbot assistant',
      longDescription: 'A cutting-edge portfolio website featuring an AI-powered chatbot that can answer questions about skills, experience, and projects. Built with SvelteKit and OpenAI integration.',
      technologies: ['SvelteKit', 'TypeScript', 'TailwindCSS', 'OpenAI API', 'Vite'],
      category: 'Personal',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      githubUrl: 'https://github.com/yourusername/portfolio',
      features: [
        'AI chatbot with context-aware responses',
        'Modern animated UI with Matrix effects',
        'Multilingual support (i18n)',
        'Responsive design',
        'Dark theme optimized',
        'SEO optimized',
        'Fast performance with Vite'
      ],
      impact: 'Increased recruiter engagement by 80% with interactive AI assistant'
    },
    {
      id: 5,
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce solution with payment integration',
      longDescription: 'Complete e-commerce platform with product management, shopping cart, order processing, and multiple payment gateway integrations.',
      technologies: ['Laravel', 'Vue.js', 'MySQL', 'Stripe', 'PayPal', 'Redis', 'Docker'],
      category: 'E-Commerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      features: [
        'Product catalog management',
        'Shopping cart with real-time updates',
        'Multiple payment gateways',
        'Order tracking system',
        'Inventory management',
        'Customer reviews and ratings',
        'Admin analytics dashboard'
      ],
      impact: 'Processed $500K+ in transactions with 99.9% uptime'
    },
    {
      id: 6,
      title: 'Real-Time Chat Application',
      description: 'Scalable chat application with WebSocket communication',
      longDescription: 'Real-time messaging platform supporting group chats, file sharing, and video calls with end-to-end encryption.',
      technologies: ['Node.js', 'React', 'WebSockets', 'MongoDB', 'Redis', 'WebRTC'],
      category: 'Communication',
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800',
      features: [
        'Real-time messaging with WebSockets',
        'Group chat functionality',
        'File and media sharing',
        'Video/audio calls with WebRTC',
        'End-to-end encryption',
        'Message search and history',
        'Typing indicators and read receipts'
      ],
      impact: 'Supports 10,000+ concurrent users with <100ms latency'
    }
  ];
  
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
  
  $: categories = ['all', ...new Set(projects.map(p => p.category))];
  $: filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);
</script>

<svelte:head>
  <title>Projects - El Houcine QARA</title>
  <meta name="description" content="Explore my portfolio of web development projects including enterprise applications, e-commerce platforms, and innovative solutions." />
</svelte:head>

<div class="min-h-screen w-full relative">
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
    <canvas id="matrix-rain" class="absolute inset-0 opacity-10"></canvas>
    <div class="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
  </div>

  <div class="relative z-10 px-4 sm:px-8 pt-32 pb-16">
    <div class="container mx-auto">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-cyan-400" in:fly={{ y: -50, duration: 600 }}>
          Projects
        </h1>
        <p class="text-lg text-gray-200 max-w-3xl mx-auto" in:fly={{ y: -50, duration: 600, delay: 100 }}>
          Showcasing innovative solutions and successful implementations
        </p>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        {#each categories as category}
          <button
            on:click={() => selectedCategory = category}
            class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 {selectedCategory === category 
              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg' 
              : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-cyan-500/20'}"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        {/each}
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each filteredProjects as project, index}
          <div 
            class="bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-2 group"
            in:fly={{ y: 50, duration: 600, delay: index * 100 }}
          >
            <!-- Project Image -->
            <div class="relative h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              <div class="absolute bottom-4 left-4 px-3 py-1 bg-cyan-500/20 backdrop-blur-sm rounded-full text-cyan-300 text-sm border border-cyan-500/30">
                {project.category}
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-6">
              <h3 class="text-2xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p class="text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>

              <!-- Technologies -->
              <div class="flex flex-wrap gap-2 mb-4">
                {#each project.technologies.slice(0, 4) as tech}
                  <span class="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                    {tech}
                  </span>
                {/each}
                {#if project.technologies.length > 4}
                  <span class="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                    +{project.technologies.length - 4} more
                  </span>
                {/if}
              </div>

              <!-- Impact Badge -->
              <div class="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p class="text-green-300 text-sm flex items-start">
                  <i class="fas fa-chart-line mt-1 mr-2"></i>
                  <span>{project.impact}</span>
                </p>
              </div>

              <!-- Actions -->
              <div class="flex gap-3">
                {#if project.demoUrl}
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 text-center bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <i class="fas fa-external-link-alt mr-2"></i>
                    Demo
                  </a>
                {/if}
                {#if project.githubUrl}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 text-center bg-slate-800 text-gray-200 py-2 px-4 rounded-lg hover:bg-slate-700 transition-all duration-300 border border-cyan-500/20"
                  >
                    <i class="fab fa-github mr-2"></i>
                    Code
                  </a>
                {/if}
                {#if !project.demoUrl && !project.githubUrl}
                  <div class="flex-1 text-center bg-slate-800/50 text-gray-400 py-2 px-4 rounded-lg border border-cyan-500/10">
                    <i class="fas fa-lock mr-2"></i>
                    Private Project
                  </div>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- CTA Section -->
      <div class="mt-16 text-center">
        <div class="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30">
          <h2 class="text-3xl font-bold text-cyan-400 mb-4">Interested in Working Together?</h2>
          <p class="text-gray-200 text-lg mb-6 max-w-2xl mx-auto">
            Let's discuss how I can help bring your next project to life with innovative solutions and cutting-edge technologies.
          </p>
          <a 
            href="/contact"
            class="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
          >
            <i class="fas fa-paper-plane mr-2"></i>
            Get In Touch
          </a>
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

