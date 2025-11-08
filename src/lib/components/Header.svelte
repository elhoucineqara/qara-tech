<script lang="ts">
  import { page } from '$app/stores';
  import { clickOutside } from '$lib/actions/clickOutside';

  let isScrolled = false;
  let isMenuOpen = false;
  
  function handleScroll() {
    isScrolled = window.scrollY > 50;
  }
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }

  // Determine if the current page requires a transparent background
  $: isTransparentPage = $page.url.pathname === '/';
  
  // Determine text color based on page and scroll - toujours blanc/vert
  $: textColor = isScrolled ? 'text-green-400' : 'text-white';
  $: hoverColor = 'hover:text-green-300';
  $: headerBg = isScrolled || !isTransparentPage 
    ? 'bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-md shadow-lg border-b border-green-500/30' 
    : 'bg-black/30 backdrop-blur-sm';
</script>

<header class="fixed w-full z-50 transition-all duration-500 ease-in-out {headerBg}">
  <nav class="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-3">
      <a href="/" class="hover:scale-110 transition-all duration-300 group">
          <div class="flex items-center gap-2 sm:gap-3">
            <!-- Logo Icon with Hexagon -->
            <div class="relative">
              <!-- Animated rings -->
              <div class="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 border-2 border-green-500/30 rounded-lg rotate-45 group-hover:rotate-90 transition-all duration-500"></div>
              <div class="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 border-2 border-cyan-500/20 rounded-lg -rotate-45 group-hover:rotate-0 transition-all duration-700"></div>
              
              <!-- Main logo -->
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 via-green-400 to-cyan-500 rounded-lg flex items-center justify-center font-black relative z-10 shadow-lg shadow-green-500/50 group-hover:shadow-green-500/80 transition-all duration-300">
                <span class="text-base sm:text-xl text-black">Q</span>
              </div>
              
              <!-- Glow effect -->
              <div class="absolute inset-0 bg-green-500 blur-xl opacity-40 group-hover:opacity-70 transition-all duration-300 rounded-lg animate-pulse"></div>
            </div>
            
            <!-- Logo Text with gradient -->
            <div class="text-base sm:text-xl md:text-2xl font-black tracking-tight">
              <span class="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">QARA</span><span class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">TECH</span>
              <!-- Underline effect -->
              <div class="h-0.5 bg-gradient-to-r from-green-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>
      </a>
      </div>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-3 lg:space-x-6 text-sm lg:text-base font-mono">
        <a href="/" class="{textColor} {hoverColor} transition-all duration-300 relative group {$page.url.pathname === '/' ? 'font-semibold text-green-300' : ''}">
          Home
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="/about" class="{textColor} {hoverColor} transition-all duration-300 relative group {$page.url.pathname === '/about' ? 'font-semibold text-green-300' : ''}">
          About
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="/skills" class="{textColor} {hoverColor} transition-all duration-300 relative group {$page.url.pathname === '/skills' ? 'font-semibold text-green-300' : ''}">
          Skills
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="/experience" class="{textColor} {hoverColor} transition-all duration-300 relative group {$page.url.pathname === '/experience' ? 'font-semibold text-green-300' : ''}">
          Experience
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="/projects" class="{textColor} {hoverColor} transition-all duration-300 relative group {$page.url.pathname === '/projects' ? 'font-semibold text-green-300' : ''}">
          Projects
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="/education" class="{textColor} {hoverColor} transition-all duration-300 relative group {$page.url.pathname === '/education' ? 'font-semibold text-green-300' : ''}">
          Education
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="/services" class="{textColor} {hoverColor} transition-all duration-300 relative group {$page.url.pathname === '/services' ? 'font-semibold text-green-300' : ''}">
          Services
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="/contact" class="{textColor} {hoverColor} transition-all duration-300 relative group {$page.url.pathname === '/contact' ? 'font-semibold text-green-300' : ''}">
          Contact
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
        </a>
      </div>

      <!-- Mobile: Hamburger -->
      <div class="md:hidden flex items-center">
        <button class="{textColor} hover:scale-110 transition-transform duration-300" on:click={toggleMenu} aria-label="Menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {#if isMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>
    </div>
    </div>

    <!-- Mobile Menu Overlay -->
    {#if isMenuOpen}
      <div class="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 animate-fadeIn" on:click={toggleMenu}></div>
      <div class="md:hidden fixed top-16 left-0 right-0 mx-4 z-50 animate-slideDown bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg shadow-2xl border border-green-500/30">
        <!-- Close Button -->
        <div class="flex justify-between items-center p-4 border-b border-green-500/30">
          <span class="text-green-400 font-mono text-sm font-semibold">
            Navigation Menu
          </span>
          <button on:click={toggleMenu} class="text-green-400 hover:text-red-400 hover:rotate-90 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-2 p-4">
          <a href="/" on:click={toggleMenu} class="block font-mono text-green-400 hover:text-green-300 transition-all duration-300 py-2 px-3 rounded hover:bg-green-500/20 border border-transparent hover:border-green-500/30 {$page.url.pathname === '/' ? 'font-semibold bg-green-500/20 border-green-500/30' : ''}">
            Home
          </a>
          <a href="/about" on:click={toggleMenu} class="block font-mono text-green-400 hover:text-green-300 transition-all duration-300 py-2 px-3 rounded hover:bg-green-500/20 border border-transparent hover:border-green-500/30 {$page.url.pathname === '/about' ? 'font-semibold bg-green-500/20 border-green-500/30' : ''}">
            About
          </a>
          <a href="/skills" on:click={toggleMenu} class="block font-mono text-green-400 hover:text-green-300 transition-all duration-300 py-2 px-3 rounded hover:bg-green-500/20 border border-transparent hover:border-green-500/30 {$page.url.pathname === '/skills' ? 'font-semibold bg-green-500/20 border-green-500/30' : ''}">
            Skills
          </a>
          <a href="/experience" on:click={toggleMenu} class="block font-mono text-green-400 hover:text-green-300 transition-all duration-300 py-2 px-3 rounded hover:bg-green-500/20 border border-transparent hover:border-green-500/30 {$page.url.pathname === '/experience' ? 'font-semibold bg-green-500/20 border-green-500/30' : ''}">
            Experience
          </a>
          <a href="/projects" on:click={toggleMenu} class="block font-mono text-green-400 hover:text-green-300 transition-all duration-300 py-2 px-3 rounded hover:bg-green-500/20 border border-transparent hover:border-green-500/30 {$page.url.pathname === '/projects' ? 'font-semibold bg-green-500/20 border-green-500/30' : ''}">
            Projects
          </a>
          <a href="/education" on:click={toggleMenu} class="block font-mono text-green-400 hover:text-green-300 transition-all duration-300 py-2 px-3 rounded hover:bg-green-500/20 border border-transparent hover:border-green-500/30 {$page.url.pathname === '/education' ? 'font-semibold bg-green-500/20 border-green-500/30' : ''}">
            Education
          </a>
          <a href="/services" on:click={toggleMenu} class="block font-mono text-green-400 hover:text-green-300 transition-all duration-300 py-2 px-3 rounded hover:bg-green-500/20 border border-transparent hover:border-green-500/30 {$page.url.pathname === '/services' ? 'font-semibold bg-green-500/20 border-green-500/30' : ''}">
            Services
          </a>
          <a href="/contact" on:click={toggleMenu} class="block font-mono text-green-400 hover:text-green-300 transition-all duration-300 py-2 px-3 rounded hover:bg-green-500/20 border border-transparent hover:border-green-500/30 {$page.url.pathname === '/contact' ? 'font-semibold bg-green-500/20 border-green-500/30' : ''}">
            Contact
          </a>
        </div>
      </div>
    {/if}
  </nav>
</header>

<style>
  .font-playfair {
    font-family: 'Playfair Display', serif;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }

  .animate-slideDown {
    animation: slideDown 0.3s ease-out forwards;
  }
</style> 