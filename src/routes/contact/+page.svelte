<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { t } from '$lib/i18n/i18n';
  
  let isVisible = false;
  let showModal = false;
  let isSubmitting = false;
  let submitStatus: 'idle' | 'success' | 'error' = 'idle';
  let errorMessage = '';
  
  let formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  async function handleSubmit() {
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      submitStatus = 'error';
      errorMessage = 'Please fill in all required fields';
      setTimeout(() => {
        submitStatus = 'idle';
      }, 3000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      submitStatus = 'error';
      errorMessage = 'Please enter a valid email address';
      setTimeout(() => {
        submitStatus = 'idle';
      }, 3000);
      return;
    }

    isSubmitting = true;

    try {
      // Option 1: Send to your own API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        submitStatus = 'success';
        // Reset form
        formData = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        };
        
        // Show success message for 5 seconds
        setTimeout(() => {
          submitStatus = 'idle';
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // If API fails, prepare mailto as fallback
      const subject = encodeURIComponent(`Contact from ${formData.firstName} ${formData.lastName}`);
      const body = encodeURIComponent(`
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
      `);
      
      // Open mailto as fallback
      window.location.href = `mailto:elhoucineqara114@gmail.com?subject=${subject}&body=${body}`;
      
      submitStatus = 'success';
      errorMessage = 'Opening your email client...';
      
      setTimeout(() => {
        submitStatus = 'idle';
      }, 3000);
    } finally {
      isSubmitting = false;
    }
  }
  
  function openModal() {
    showModal = true;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    showModal = false;
    document.body.style.overflow = 'auto';
  }
  
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
    <!-- En-tête centré -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4 text-cyan-400">{$t('contact.title')}</h1>
      <p class="text-gray-200 text-lg">{$t('contact.subtitle')}</p>
      <p class="mt-4 text-gray-300 max-w-2xl mx-auto">
        {$t('contact.description')}
      </p>
    </div>
    
    <!-- Formulaire -->
    <div class="w-full max-w-2xl mx-auto">
      <form class="space-y-8 p-10 bg-slate-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-cyan-500/20" on:submit|preventDefault={handleSubmit}>      
        <div class="grid md:grid-cols-2 gap-8">
          <div class="relative">
            <label class="block text-sm font-semibold text-cyan-400 mb-2">{$t('contact.form.firstName')}</label>
            <input 
              type="text" 
              placeholder={$t('contact.form.firstName')} 
              bind:value={formData.firstName}
              class="w-full px-5 py-4 border-2 border-cyan-500/20 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/40 bg-slate-800/50 text-gray-200 placeholder-gray-400"
            >
          </div>
          <div class="relative">
            <label class="block text-sm font-semibold text-cyan-400 mb-2">{$t('contact.form.lastName')}</label>
            <input 
              type="text" 
              placeholder={$t('contact.form.lastName')} 
              bind:value={formData.lastName}
              class="w-full px-5 py-4 border-2 border-cyan-500/20 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/40 bg-slate-800/50 text-gray-200 placeholder-gray-400"
            >
          </div>
        </div>

        <div class="relative">
          <label class="block text-sm font-semibold text-cyan-400 mb-2">{$t('contact.form.email')}</label>
          <input 
            type="email" 
            placeholder="example@email.com" 
            bind:value={formData.email}
            class="w-full px-5 py-4 border-2 border-cyan-500/20 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/40 bg-slate-800/50 text-gray-200 placeholder-gray-400"
          >
        </div>

        <div class="relative">
          <label class="block text-sm font-semibold text-cyan-400 mb-2">{$t('contact.form.phone')}</label>
          <input 
            type="tel" 
            placeholder="xxx-xxx-xxxx" 
            bind:value={formData.phone}
            class="w-full px-5 py-4 border-2 border-cyan-500/20 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/40 bg-slate-800/50 text-gray-200 placeholder-gray-400"
          >
        </div>

        <div class="relative">
          <label class="block text-sm font-semibold text-cyan-400 mb-2">{$t('contact.form.message')}</label>
          <textarea 
            rows="5" 
            placeholder={$t('contact.form.message')} 
            bind:value={formData.message}
            class="w-full px-5 py-4 border-2 border-cyan-500/20 rounded-2xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/40 bg-slate-800/50 text-gray-200 placeholder-gray-400 resize-none"
          ></textarea>
        </div>

        <!-- Status Messages -->
        {#if submitStatus === 'success'}
          <div class="p-4 bg-green-500/20 border border-green-500/40 rounded-xl text-green-300 flex items-center animate-fadeIn">
            <i class="fas fa-check-circle mr-3 text-xl"></i>
            <span>Message sent successfully! I'll get back to you soon.</span>
          </div>
        {/if}

        {#if submitStatus === 'error'}
          <div class="p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 flex items-center animate-fadeIn">
            <i class="fas fa-exclamation-circle mr-3 text-xl"></i>
            <span>{errorMessage}</span>
          </div>
        {/if}

        <button 
          type="submit" 
          disabled={isSubmitting}
          class="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 px-6 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-0.5 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
        >
          {#if isSubmitting}
            <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          {:else}
            <i class="fas fa-paper-plane mr-2"></i>
            {$t('contact.form.sendMessage')}
          {/if}
        </button>
      </form>

      <!-- Alternative Contact Methods -->
      <div class="mt-8 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20">
        <h3 class="text-xl font-bold text-cyan-400 mb-4 text-center">Or reach me directly:</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="mailto:elhoucineqara114@gmail.com" class="flex items-center justify-center p-4 bg-slate-900/50 rounded-xl hover:bg-slate-900 transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40">
            <i class="fas fa-envelope text-cyan-400 text-2xl mr-3"></i>
            <div class="text-left">
              <div class="text-xs text-gray-400">Email</div>
              <div class="text-sm text-gray-200 font-semibold">Send Email</div>
            </div>
          </a>
          
          <a href="https://wa.me/212637446431" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center p-4 bg-slate-900/50 rounded-xl hover:bg-slate-900 transition-all duration-300 border border-green-500/20 hover:border-green-500/40">
            <i class="fab fa-whatsapp text-green-400 text-2xl mr-3"></i>
            <div class="text-left">
              <div class="text-xs text-gray-400">WhatsApp</div>
              <div class="text-sm text-gray-200 font-semibold">Chat Now</div>
            </div>
          </a>
          
          <a href="tel:+212637446431" class="flex items-center justify-center p-4 bg-slate-900/50 rounded-xl hover:bg-slate-900 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40">
            <i class="fas fa-phone text-purple-400 text-2xl mr-3"></i>
            <div class="text-left">
              <div class="text-xs text-gray-400">Phone</div>
              <div class="text-sm text-gray-200 font-semibold">Call Me</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

{#if showModal}
  <div 
    class="fixed inset-0 z-50 overflow-y-auto" 
    transition:fade={{ duration: 100 }}
    on:click|self={closeModal}
  >
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-50"
    ></div>

    <!-- Modal Content -->
    <div class="flex items-center justify-center min-h-screen p-4">
      <div 
        class="relative bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-2xl max-w-2xl w-full m-auto border border-cyan-500/20"
        transition:scale={{ duration: 200, start: 0.95, opacity: 1 }}
      >
        <!-- Close button -->
        <button 
          class="absolute top-4 right-4 text-cyan-400 hover:text-cyan-300 transition-colors z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-cyan-500/20"
          on:click={closeModal}
          type="button"
        >
          <i class="fas fa-times text-xl"></i>
        </button>

        <!-- Form Content -->
        <div class="p-8">
          <h4 class="text-2xl font-bold mb-6 text-cyan-400">{$t('contact.modal.title')}</h4>
          <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-cyan-400 mb-2">{$t('contact.modal.name')}</label>
              <input
                type="text"
                id="name"
                bind:value={formData.firstName}
                class="w-full px-4 py-3 border-2 border-cyan-500/20 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/40 bg-slate-800/50 text-gray-200 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-cyan-400 mb-2">{$t('contact.form.email')}</label>
              <input
                type="email"
                id="email"
                bind:value={formData.email}
                class="w-full px-4 py-3 border-2 border-cyan-500/20 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/40 bg-slate-800/50 text-gray-200 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-cyan-400 mb-2">{$t('contact.modal.subject')}</label>
              <input
                type="text"
                id="subject"
                bind:value={formData.message}
                class="w-full px-4 py-3 border-2 border-cyan-500/20 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/40 bg-slate-800/50 text-gray-200 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-cyan-400 mb-2">{$t('contact.form.message')}</label>
              <textarea
                id="message"
                bind:value={formData.message}
                rows="4"
                class="w-full px-4 py-3 border-2 border-cyan-500/20 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/40 bg-slate-800/50 text-gray-200 placeholder-gray-400 resize-none"
                required
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                class="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 px-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-0.5"
              >
                {$t('contact.form.sendMessage')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
{/if}

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
</style> 
