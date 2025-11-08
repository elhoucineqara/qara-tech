<script lang="ts">
  import { page } from '$app/stores';
  import { browser } from '$app/environment';

  // Props avec valeurs par défaut
  export let title = 'El Houcine QARA - Full Stack Developer';
  export let description = 'Full Stack Developer specializing in Laravel, React, Svelte, Node.js. Building scalable web applications with modern technologies. 2+ years experience in enterprise solutions.';
  export let keywords = 'Full Stack Developer, Web Developer, Laravel Developer, React Developer, Node.js, Svelte, TypeScript, Morocco Developer, Software Engineer, Web Applications';
  export let author = 'El Houcine QARA';
  export let image = '/images/qaratech.jpg'; // Image optimisée pour SEO et réseaux sociaux
  export let type = 'website';
  export let twitterHandle = '@elhoucineqara';
  export let locale = 'en_US';
  
  // Configuration de l'URL de base
  const baseUrl = 'https://qaratech.vercel.app';
  
  // Obtenir l'URL complète dynamiquement
  $: currentUrl = browser ? window.location.href : baseUrl;
  $: fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author} />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  <meta name="theme-color" content="#00ff00" />
  
  <!-- Open Graph / Facebook / LinkedIn / WhatsApp -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={currentUrl} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={fullImageUrl} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={title} />
  <meta property="og:site_name" content="El Houcine QARA Portfolio" />
  <meta property="og:locale" content={locale} />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={twitterHandle} />
  <meta name="twitter:creator" content={twitterHandle} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={fullImageUrl} />
  <meta name="twitter:image:alt" content={title} />
  
  <!-- Instagram / Pinterest -->
  <meta property="og:image:secure_url" content={fullImageUrl} />
  <meta property="og:image:type" content="image/jpeg" />
  
  <!-- Telegram -->
  <meta property="telegram:channel" content={twitterHandle} />
  
  <!-- Additional SEO -->
  <link rel="canonical" href={currentUrl} />
  
  <!-- Structured Data (JSON-LD) -->
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "El Houcine QARA",
    "url": currentUrl,
    "image": fullImageUrl,
    "jobTitle": "Full Stack Developer",
    "description": description,
    "alumniOf": "ENSET Mohammedia",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "MA",
      "addressLocality": "Morocco"
    },
    "knowsAbout": [
      "Laravel",
      "React",
      "Svelte",
      "Node.js",
      "TypeScript",
      "Full Stack Development",
      "Web Development",
      "Software Engineering",
      "PHP",
      "JavaScript",
      "MySQL",
      "PostgreSQL"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/el-houcine-qara-927b07302/",
      "https://github.com/elhoucineqara",
      "https://wa.me/212637446431"
    ]
  })}</script>`}
</svelte:head>

