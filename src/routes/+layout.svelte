<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import ScrollToTop from '$lib/components/ScrollToTop.svelte';
</script>

<div class="min-h-screen bg-white">
  <Header />
  <main>
    <slot />
  </main>

  <!-- Tech Footer -->
  <footer class="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-green-400 overflow-hidden">
    <!-- Grid Background -->
    <div class="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
    
    <!-- Animated border top -->
    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <!-- Terminal Header -->
      <div class="flex justify-center mb-6 md:mb-8">
        <div class="inline-block bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg px-3 md:px-4 py-1.5 md:py-2">
          <span class="font-mono text-xs md:text-sm">
            <span class="text-green-500">$</span> 
            <span class="text-cyan-400">whoami</span>
            <span class="text-white ml-1 md:ml-2">></span>
            <span class="text-green-400 ml-1 md:ml-2">El Houcine QARA</span>
          </span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <!-- Column 1: About (2 colonnes sur large) -->
        <div class="lg:col-span-2 text-center lg:text-left">
          <h3 class="text-cyan-400 font-mono text-lg md:text-xl mb-4 font-bold">
            About.me
          </h3>
          <p class="text-gray-300 font-mono text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
            Full Stack Developer building innovative solutions with cutting-edge technologies. Passionate about creating efficient and scalable applications.
          </p>
          <div class="mt-4 flex items-center justify-center lg:justify-start gap-2">
            <span class="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span class="font-mono text-xs text-green-400">Online & Available</span>
          </div>
        </div>

        <!-- Column 2: Quick Links -->
        <div class="text-center lg:text-left">
          <h3 class="text-cyan-400 font-mono text-lg md:text-xl mb-4 font-bold">
            Navigation
          </h3>
          <nav class="space-y-2 font-mono text-sm">
            <a href="/" class="block text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform">
              → Home
            </a>
            <a href="/projects" class="block text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform">
              → Projects
            </a>
            <a href="/skills" class="block text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform">
              → Skills
            </a>
            <a href="/contact" class="block text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform">
              → Contact
            </a>
          </nav>
        </div>

        <!-- Column 3: Connect -->
        <div class="text-center lg:text-left">
          <h3 class="text-cyan-400 font-mono text-lg md:text-xl mb-4 font-bold">
            Connect
          </h3>
          
          <!-- Social Icons -->
          <div class="flex justify-center lg:justify-start gap-3 mb-4">
            <a href="mailto:elhoucineqara114@gmail.com" 
               class="w-10 h-10 bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/40 rounded-lg flex items-center justify-center hover:from-green-500/30 hover:to-cyan-500/30 hover:border-green-500 transition-all hover:scale-110 group"
               title="Email">
              <i class="fas fa-envelope text-green-400 group-hover:text-green-300"></i>
            </a>
            <a href="https://www.linkedin.com/in/el-houcine-qara-927b07302/" 
               target="_blank" 
               rel="noopener noreferrer"
               class="w-10 h-10 bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/40 rounded-lg flex items-center justify-center hover:from-green-500/30 hover:to-cyan-500/30 hover:border-green-500 transition-all hover:scale-110 group"
               title="LinkedIn">
              <i class="fab fa-linkedin text-green-400 group-hover:text-green-300"></i>
            </a>
            <a href="https://wa.me/212637446431" 
               target="_blank" 
               rel="noopener noreferrer"
               class="w-10 h-10 bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/40 rounded-lg flex items-center justify-center hover:from-green-500/30 hover:to-cyan-500/30 hover:border-green-500 transition-all hover:scale-110 group"
               title="WhatsApp">
              <i class="fab fa-whatsapp text-green-400 group-hover:text-green-300"></i>
            </a>
            <a href="https://github.com/elhoucineqara" 
               target="_blank" 
               rel="noopener noreferrer"
               class="w-10 h-10 bg-gradient-to-br from-green-500/20 to-cyan-500/20 border border-green-500/40 rounded-lg flex items-center justify-center hover:from-green-500/30 hover:to-cyan-500/30 hover:border-green-500 transition-all hover:scale-110 group"
               title="GitHub">
              <i class="fab fa-github text-green-400 group-hover:text-green-300"></i>
            </a>
          </div>
          
          <!-- Tech Stack -->
          <div class="flex flex-wrap justify-center lg:justify-start gap-2 text-xs font-mono">
            <span class="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-green-400">PHP</span>
            <span class="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-green-400">JS</span>
            <span class="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-green-400">React</span>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-green-500/20 pt-4 md:pt-6 mt-4 md:mt-6">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <!-- Copyright -->
          <div class="font-mono text-xs md:text-sm text-gray-500 text-center md:text-left">
            <span class="text-green-500">©</span> {new Date().getFullYear()} 
            <span class="text-cyan-400">El Houcine QARA</span> 
            <span class="text-gray-600 hidden sm:inline">|</span> 
            <span class="text-gray-500 block sm:inline mt-1 sm:mt-0">All rights reserved</span>
          </div>
          
          <!-- Status -->
          <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 font-mono text-xs">
            <div class="flex items-center space-x-2">
              <span class="text-green-500">●</span>
              <span class="text-gray-500">System: Operational</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-cyan-500">⚡</span>
              <span class="text-gray-500">Built with SvelteKit</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Floating Code Effect -->
      <div class="absolute bottom-4 left-4 font-mono text-xs text-green-500/20 animate-pulse hidden lg:block">
        {'>'} console.log("Thanks for visiting!");
      </div>
    </div>

    <!-- Animated scanline -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="h-full w-full" style="background: linear-gradient(transparent 50%, rgba(0, 255, 0, 0.03) 50%); background-size: 100% 4px;"></div>
    </div>
  </footer>
  
  <!-- Global Components -->
  <ScrollToTop />
</div> 