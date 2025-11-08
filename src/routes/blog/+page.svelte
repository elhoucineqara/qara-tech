<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  
  interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    tags: string[];
    readTime: number;
    image: string;
  }
  
  let posts: BlogPost[] = [];
  let loading = true;
  let selectedTag = 'all';
  
  const samplePosts: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with SvelteKit",
      excerpt: "Learn how to build modern web applications with SvelteKit, the full-stack framework for the web.",
      content: "Full article content here...",
      author: "Your Name",
      date: "2024-01-15",
      tags: ["SvelteKit", "Web Development", "Tutorial"],
      readTime: 5,
      image: "/images/blog/sveltekit.jpg"
    },
    {
      id: 2,
      title: "Mastering TypeScript for Better Code",
      excerpt: "Discover how TypeScript can improve your development experience and code quality.",
      content: "Full article content here...",
      author: "Your Name",
      date: "2024-01-10",
      tags: ["TypeScript", "Programming", "Best Practices"],
      readTime: 8,
      image: "/images/blog/typescript.jpg"
    },
    {
      id: 3,
      title: "Building Responsive Designs with TailwindCSS",
      excerpt: "Create beautiful, responsive user interfaces with TailwindCSS utility-first approach.",
      content: "Full article content here...",
      author: "Your Name",
      date: "2024-01-05",
      tags: ["CSS", "TailwindCSS", "Design"],
      readTime: 6,
      image: "/images/blog/tailwind.jpg"
    }
  ];
  
  onMount(() => {
    // Simulate loading
    setTimeout(() => {
      posts = samplePosts;
      loading = false;
    }, 1000);
  });
  
  $: filteredPosts = selectedTag === 'all' 
    ? posts 
    : posts.filter(post => post.tags.includes(selectedTag));
  
  $: allTags = ['all', ...new Set(posts.flatMap(post => post.tags))];
  
  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>Blog - Your Name</title>
  <meta name="description" content="Read the latest articles about web development, programming, and technology." />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-6" in:fly={{ y: 50, duration: 600 }}>
        Blog
      </h1>
      <p class="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto" in:fly={{ y: 50, duration: 600, delay: 200 }}>
        Insights, tutorials, and thoughts on web development and technology
      </p>
    </div>
  </section>
  
  <!-- Filter Tags -->
  <section class="py-8 bg-white border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap gap-2 justify-center">
        {#each allTags as tag}
          <button
            on:click={() => selectedTag = tag}
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 {selectedTag === tag 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
            in:fly={{ y: 20, duration: 400, delay: 100 * allTags.indexOf(tag) }}
          >
            {tag === 'all' ? 'All Posts' : tag}
          </button>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Blog Posts -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      {#if loading}
        <div class="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each filteredPosts as post, index}
            <article 
              class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              in:fly={{ y: 50, duration: 600, delay: index * 100 }}
            >
              <!-- Post Image -->
              <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <div class="text-white text-4xl font-bold opacity-20">
                  {post.title.charAt(0)}
                </div>
              </div>
              
              <!-- Post Content -->
              <div class="p-6">
                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-3">
                  {#each post.tags.slice(0, 2) as tag}
                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>
                  {/each}
                </div>
                
                <!-- Title -->
                <h2 class="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                
                <!-- Excerpt -->
                <p class="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <!-- Meta -->
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <div class="flex items-center space-x-4">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <span>{post.readTime} min read</span>
                </div>
                
                <!-- Read More Button -->
                <button class="mt-4 text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Read More →
                </button>
              </div>
            </article>
          {/each}
        </div>
        
        {#if filteredPosts.length === 0}
          <div class="text-center py-20">
            <div class="text-6xl mb-4">📝</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">No posts found</h3>
            <p class="text-gray-600">Try selecting a different tag or check back later for new content.</p>
          </div>
        {/if}
      {/if}
    </div>
  </section>
</div>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style> 