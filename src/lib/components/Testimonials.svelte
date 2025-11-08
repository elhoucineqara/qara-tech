<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  
  interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    image: string;
    rating: number;
    text: string;
  }
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ahmed Benali",
      role: "CTO",
      company: "I-ETERIA",
      image: "https://ui-avatars.com/api/?name=Ahmed+Benali&background=0D8ABC&color=fff&size=200",
      rating: 5,
      text: "El Houcine is an exceptional full-stack developer. His work on the HARX call center platform exceeded our expectations. The real-time features and AI integration he implemented have transformed our business operations. His technical expertise and problem-solving skills are outstanding."
    },
    {
      id: 2,
      name: "Sarah Martinez",
      role: "Product Manager",
      company: "TechFlow Solutions",
      image: "https://ui-avatars.com/api/?name=Sarah+Martinez&background=7C3AED&color=fff&size=200",
      rating: 5,
      text: "Working with El Houcine on our LMS platform was a pleasure. He demonstrated deep knowledge of both frontend and backend technologies. The platform he built handles thousands of users seamlessly. His attention to detail and commitment to quality are remarkable."
    },
    {
      id: 3,
      name: "Mohamed El Fassi",
      role: "HR Director",
      company: "Global Services Inc",
      image: "https://ui-avatars.com/api/?name=Mohamed+Fassi&background=10B981&color=fff&size=200",
      rating: 5,
      text: "The HR automation system El Houcine developed for us has revolutionized our HR processes. It reduced our processing time by 70% and eliminated manual errors completely. His professionalism and technical skills are top-notch. Highly recommended!"
    },
    {
      id: 4,
      name: "Lisa Chen",
      role: "CEO",
      company: "Digital Innovators",
      image: "https://ui-avatars.com/api/?name=Lisa+Chen&background=EF4444&color=fff&size=200",
      rating: 5,
      text: "El Houcine's expertise in modern web technologies is impressive. He delivered our e-commerce platform ahead of schedule with features we didn't even think were possible. His communication throughout the project was excellent. A true professional!"
    },
    {
      id: 5,
      name: "Karim Alaoui",
      role: "Tech Lead",
      company: "Innovation Labs",
      image: "https://ui-avatars.com/api/?name=Karim+Alaoui&background=F59E0B&color=fff&size=200",
      rating: 5,
      text: "I had the opportunity to work with El Houcine on several complex projects. His ability to tackle challenging technical problems and deliver clean, maintainable code is exceptional. He's always up-to-date with the latest technologies and best practices."
    },
    {
      id: 6,
      name: "Emma Williams",
      role: "Founder",
      company: "StartUp Hub",
      image: "https://ui-avatars.com/api/?name=Emma+Williams&background=8B5CF6&color=fff&size=200",
      rating: 5,
      text: "El Houcine helped us build our MVP from scratch. His full-stack capabilities allowed us to move quickly and iterate fast. The quality of his work and his proactive approach to problem-solving made him an invaluable part of our team."
    }
  ];
  
  let currentIndex = 0;
  let autoplayInterval: any;
  
  onMount(() => {
    startAutoplay();
    return () => clearInterval(autoplayInterval);
  });
  
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      nextTestimonial();
    }, 5000);
  }
  
  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
  }
  
  function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  }
  
  function goToTestimonial(index: number) {
    currentIndex = index;
    clearInterval(autoplayInterval);
    startAutoplay();
  }
  
  $: visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ];
</script>

<section class="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100">
  <div class="container mx-auto px-4">
    <!-- Header -->
    <div class="text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        What Clients Say
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Don't just take my word for it - hear from satisfied clients and colleagues
      </p>
    </div>
    
    <!-- Testimonials Carousel -->
    <div class="relative max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each visibleTestimonials as testimonial, index}
          <div 
            class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 {index === 0 ? 'md:scale-105 z-10' : 'md:scale-95 opacity-75'} border"
            in:fly={{ x: 100, duration: 500, delay: index * 100 }}
          >
            <!-- Rating Stars -->
            <div class="flex justify-center mb-4">
              {#each Array(testimonial.rating) as _, i}
                <i class="fas fa-star text-yellow-400 text-xl"></i>
              {/each}
            </div>
            
            <!-- Quote -->
            <div class="text-gray-600 text-center mb-6 italic leading-relaxed">
              "{testimonial.text}"
            </div>
            
            <!-- Author -->
            <div class="flex items-center justify-center">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                class="w-16 h-16 rounded-full mr-4 border-4 border-indigo-100"
              />
              <div class="text-left">
                <div class="font-bold text-gray-900">{testimonial.name}</div>
                <div class="text-sm text-gray-600">{testimonial.role}</div>
                <div class="text-xs text-indigo-600 font-semibold">{testimonial.company}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Navigation Arrows -->
      <button
        on:click={prevTestimonial}
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-4 shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 z-20 text-gray-900 border"
        aria-label="Previous testimonial"
      >
        <i class="fas fa-chevron-left text-xl"></i>
      </button>
      
      <button
        on:click={nextTestimonial}
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-4 shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 z-20 text-gray-900 border"
        aria-label="Next testimonial"
      >
        <i class="fas fa-chevron-right text-xl"></i>
      </button>
    </div>
    
    <!-- Dots Navigation -->
    <div class="flex justify-center mt-8 space-x-2">
      {#each testimonials as _, index}
        <button
          on:click={() => goToTestimonial(index)}
          class="w-3 h-3 rounded-full transition-all duration-300 {index === currentIndex ? 'bg-indigo-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}"
          aria-label="Go to testimonial {index + 1}"
        ></button>
      {/each}
    </div>
    
    <!-- Stats -->
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      <div class="text-center">
        <div class="text-4xl font-bold text-indigo-600 mb-2">100%</div>
        <div class="text-gray-600 font-medium">Client Satisfaction</div>
      </div>
      <div class="text-center">
        <div class="text-4xl font-bold text-indigo-600 mb-2">15+</div>
        <div class="text-gray-600 font-medium">Happy Clients</div>
      </div>
      <div class="text-center">
        <div class="text-4xl font-bold text-indigo-600 mb-2">5.0</div>
        <div class="text-gray-600 font-medium">Average Rating</div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Add smooth transitions */
  section {
    position: relative;
    overflow: hidden;
  }
</style>

