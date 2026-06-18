<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { t } from '$lib/i18n/i18n';
  import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
  import { tilt3d, reveal } from '$lib/actions/motion';

  let mounted = false;
  let selectedCategory = 'all';

  onMount(() => (mounted = true));

  interface Skill {
    name: string;
    icon: string;
    color: string;
    category: string;
    isSvg?: boolean;
  }

  const skills: Skill[] = [
    // Frontend
    { name: 'React', icon: 'fa-brands fa-react', color: 'text-cyan-500', category: 'frontend' },
    { name: 'Angular', icon: 'fa-brands fa-angular', color: 'text-red-600', category: 'frontend' },
    { name: 'Vue.js', icon: 'fa-brands fa-vuejs', color: 'text-emerald-500', category: 'frontend' },
    { name: 'SvelteKit', icon: 'fa-solid fa-bolt', color: 'text-orange-500', category: 'frontend' },
    // Backend
    { name: 'Laravel', icon: 'fa-brands fa-laravel', color: 'text-red-500', category: 'backend' },
    { name: 'Spring Boot', icon: 'fa-solid fa-leaf', color: 'text-green-600', category: 'backend' },
    { name: '.NET', icon: 'fa-brands fa-microsoft', color: 'text-purple-600 dark:text-purple-400', category: 'backend' },
    { name: 'Django', icon: 'fa-brands fa-python', color: 'text-emerald-800', category: 'backend' },
    { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-green-600', category: 'backend' },
    // Languages
    { name: 'JavaScript', icon: 'fa-brands fa-js', color: 'text-yellow-500', category: 'languages' },
    { name: 'Python', icon: 'fa-brands fa-python', color: 'text-blue-600', category: 'languages' },
    { name: 'Java', icon: 'fa-brands fa-java', color: 'text-orange-700', category: 'languages' },
    { name: 'TypeScript', icon: 'fa-solid fa-code', color: 'text-blue-500', category: 'languages' },
    { name: 'PHP', icon: 'fa-brands fa-php', color: 'text-indigo-500', category: 'languages' },
    { name: 'C/C++', icon: 'fa-solid fa-copyright', color: 'text-slate-500 dark:text-slate-400', category: 'languages' },
    // Databases
    { name: 'MySQL', icon: 'fa-solid fa-database', color: 'text-blue-700', category: 'databases' },
    { name: 'MongoDB', icon: 'fa-solid fa-database', color: 'text-green-600', category: 'databases' },
    { name: 'Oracle', icon: 'fa-solid fa-table', color: 'text-red-600', category: 'databases' },
    { name: 'Redis', icon: 'fa-solid fa-database', color: 'text-red-500', category: 'databases' },
    // DevOps
    { name: 'REST APIs', icon: 'fa-solid fa-plug', color: 'text-sky-500', category: 'devops' },
    { name: 'GraphQL', icon: 'fa-solid fa-exchange-alt', color: 'text-pink-500', category: 'devops' },
    { name: 'WebRTC', icon: 'fa-solid fa-video', color: 'text-orange-500', category: 'devops' },
    { name: 'WebSockets', icon: 'fa-solid fa-network-wired', color: 'text-cyan-500', category: 'devops' },
    { name: 'AWS', icon: 'fa-brands fa-aws', color: 'text-orange-500', category: 'devops' },
    { name: 'Google Cloud', icon: 'fa-brands fa-google', color: 'text-blue-500', category: 'devops' },
    { name: 'Azure', icon: 'fa-brands fa-microsoft', color: 'text-sky-600', category: 'devops' },
    { name: 'Docker', icon: 'fa-brands fa-docker', color: 'text-sky-500', category: 'devops' },
    // Tools
    { name: 'Git', icon: 'fa-brands fa-git-alt', color: 'text-orange-600', category: 'tools' },
    { name: 'JIRA', icon: 'fa-solid fa-tasks', color: 'text-blue-600', category: 'tools' },
    { name: 'Scrum', icon: 'fa-solid fa-users', color: 'text-cyan-600', category: 'tools' },
    { name: 'UML', icon: 'fa-solid fa-project-diagram', color: 'text-purple-600 dark:text-purple-400', category: 'tools' },
    { name: 'Figma', icon: 'fa-brands fa-figma', color: 'text-rose-500', category: 'tools' },
    { name: 'Adobe XD', icon: 'fa-solid fa-pen-nib', color: 'text-pink-500', category: 'tools' },
    { name: 'VS Code', icon: 'fa-solid fa-code', color: 'text-blue-600', category: 'tools' },
    // Architecture
    { name: 'Microservices', icon: 'fa-solid fa-cubes', color: 'text-cyan-500', category: 'architecture' },
    { name: 'Microfrontends', icon: 'fa-solid fa-puzzle-piece', color: 'text-rose-500', category: 'architecture' },
    { name: 'Qiankun', icon: 'fa-solid fa-layer-group', color: 'text-green-600', category: 'architecture' },
    // Mobile
    { name: 'Android', icon: 'fa-brands fa-android', color: 'text-green-500', category: 'mobile' },
    { name: 'iOS', icon: 'fa-brands fa-apple', color: 'text-slate-700 dark:text-slate-200', category: 'mobile' },
    { name: 'React Native', icon: 'fa-brands fa-react', color: 'text-cyan-500', category: 'mobile' },
    { name: 'Ionic', icon: 'fa-solid fa-mobile', color: 'text-blue-500', category: 'mobile' },
    // Testing
    { name: 'Jest', icon: 'fa-solid fa-vial', color: 'text-red-600', category: 'testing' },
    { name: 'Cypress', icon: 'fa-solid fa-check-circle', color: 'text-emerald-500', category: 'testing' },
    { name: 'PHPUnit', icon: 'fa-solid fa-flask', color: 'text-purple-600 dark:text-purple-400', category: 'testing' }
  ];

  $: categories = [
    { id: 'all', label: $t('skills.categories.all') },
    { id: 'frontend', label: $t('skills.categories.frontend') },
    { id: 'backend', label: $t('skills.categories.backend') },
    { id: 'languages', label: $t('skills.categories.languages') },
    { id: 'databases', label: $t('skills.categories.databases') },
    { id: 'devops', label: $t('skills.categories.devops') },
    { id: 'tools', label: $t('skills.categories.tools') },
    { id: 'architecture', label: $t('skills.categories.architecture') },
    { id: 'mobile', label: $t('skills.categories.mobile') },
    { id: 'testing', label: $t('skills.categories.testing') }
  ];

  const categoryIcons: Record<string, string> = {
    frontend: 'fa-solid fa-window-maximize',
    backend: 'fa-solid fa-server',
    languages: 'fa-solid fa-code',
    databases: 'fa-solid fa-database',
    devops: 'fa-solid fa-cloud',
    tools: 'fa-solid fa-wrench',
    architecture: 'fa-solid fa-sitemap',
    mobile: 'fa-solid fa-mobile-screen',
    testing: 'fa-solid fa-vial'
  };

  $: filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  $: groupedSkills =
    selectedCategory === 'all'
      ? Object.keys(categoryIcons).map((cat) => ({
          cat,
          skills: skills.filter((s) => s.category === cat)
        }))
      : [{ cat: selectedCategory, skills: filteredSkills }];
</script>

<svelte:head>
  <title>Skills — El Houcine QARA</title>
  <meta
    name="description"
    content="Technical skills: Laravel, React, SvelteKit, Node.js, TypeScript, Docker, AWS and more."
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    rel="stylesheet"
  />
</svelte:head>

<!-- Hero -->
<section class="relative pt-32 pb-12 sm:pt-40 overflow-hidden">
  <AnimatedBackground variant="aurora" showStars={true} />

  <div class="container relative z-10 text-center">
    {#if mounted}
      <div in:fly={{ y: 20, duration: 500 }} class="badge-glass mb-5">
        <i class="fa-solid fa-microchip text-indigo-500"></i>
        {$t('skills.badge')}
      </div>
      <h1
        in:fly={{ y: 30, duration: 700, delay: 100 }}
        class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
      >
        {$t('skills.titlePart1')} <span class="text-gradient">{$t('skills.titleHighlight')}</span>
      </h1>
      <p
        in:fade={{ duration: 700, delay: 200 }}
        class="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
      >
        {$t('skills.subtitle')}
      </p>
    {/if}
  </div>
</section>

<!-- Filter -->
<section class="relative pb-8">
  <div class="container">
    <div class="flex flex-wrap justify-center gap-2">
      {#each categories as cat}
          <button
          on:click={() => (selectedCategory = cat.id)}
          class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                 {selectedCategory === cat.id
            ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
            : 'bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/70 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-700/80'}"
        >
          {cat.label}
          </button>
        {/each}
      </div>
          </div>
</section>

<!-- Skills grid -->
<section class="relative pb-24">
  <div class="container">
    {#each groupedSkills as group}
      {#if group.skills.length > 0}
        <div class="mb-12">
      {#if selectedCategory === 'all'}
            <div class="flex items-center gap-3 mb-6">
              <i class="{categoryIcons[group.cat]} text-purple-500"></i>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">{$t(`skills.groupTitles.${group.cat}`)}</h2>
              <div class="h-px flex-1 bg-gradient-to-r from-purple-200 to-transparent"></div>
      </div>
      {/if}

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {#each group.skills as skill, i}
              <div
                class="group glass-card p-5 flex flex-col items-center justify-center gap-2
                       reveal-scale lift transition-all duration-300 aspect-square hover:-translate-y-1 hover:shadow-xl"
                use:reveal={{ delay: i * 25 }}
              >
                <i
                  class="{skill.icon} {skill.color} text-4xl group-hover:scale-110 transition-transform duration-300"
                ></i>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200 text-center">{skill.name}</span>
              </div>
            {/each}
        </div>
      </div>
      {/if}
    {/each}

    <!-- Stats bar -->
    <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      {#each [
        { value: skills.length + '+', label: $t('skills.stats.technologies') },
        { value: '10+', label: $t('skills.stats.categories') },
        { value: '2+', label: $t('skills.stats.yearsExp') },
        { value: '100%', label: $t('skills.stats.passion') }
      ] as stat, i}
        <div
          class="glass-card p-5 text-center reveal-scale lift transition-all"
          use:reveal={{ delay: i * 80 }}
          use:tilt3d={{ max: 8, scale: 1.03 }}
        >
          <div class="text-3xl font-extrabold text-gradient-animated">{stat.value}</div>
          <div class="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
        </div>
      {/each}
    </div>
  </div>
</section>
