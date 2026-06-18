<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { get } from 'svelte/store';
  import { t } from '$lib/i18n/i18n';
  import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
  import { reveal, tilt3d } from '$lib/actions/motion';

  let mounted = false;
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

  onMount(() => (mounted = true));

  async function handleSubmit() {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      submitStatus = 'error';
      errorMessage = get(t)('contact.form.required');
      setTimeout(() => (submitStatus = 'idle'), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      submitStatus = 'error';
      errorMessage = get(t)('contact.form.invalidEmail');
      setTimeout(() => (submitStatus = 'idle'), 3000);
      return;
    }

    isSubmitting = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        submitStatus = 'success';
        formData = { firstName: '', lastName: '', email: '', phone: '', message: '' };
        setTimeout(() => (submitStatus = 'idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      const subject = encodeURIComponent(`Contact from ${formData.firstName} ${formData.lastName}`);
      const body = encodeURIComponent(
        `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:elhoucineqara114@gmail.com?subject=${subject}&body=${body}`;
      submitStatus = 'success';
      errorMessage = get(t)('contact.form.opening');
      setTimeout(() => (submitStatus = 'idle'), 3000);
    } finally {
      isSubmitting = false;
    }
  }

  $: directContacts = [
    {
      icon: 'fa-solid fa-envelope',
      label: $t('contact.sidebar.directLabels.email'),
      value: $t('contact.sidebar.directLabels.emailValue'),
      href: 'mailto:elhoucineqara114@gmail.com',
      gradient: 'from-rose-400 to-pink-500'
    },
    {
      icon: 'fa-brands fa-whatsapp',
      label: $t('contact.sidebar.directLabels.whatsapp'),
      value: $t('contact.sidebar.directLabels.whatsappValue'),
      href: 'https://wa.me/212637446431',
      gradient: 'from-emerald-400 to-green-500'
    },
    {
      icon: 'fa-solid fa-phone',
      label: $t('contact.sidebar.directLabels.phone'),
      value: $t('contact.sidebar.directLabels.phoneValue'),
      href: 'tel:+212637446431',
      gradient: 'from-indigo-400 to-purple-500'
    }
  ];
</script>

<svelte:head>
  <title>Contact — El Houcine QARA</title>
  <meta
    name="description"
    content="Get in touch for collaboration, freelance projects or job opportunities."
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
        <i class="fa-solid fa-paper-plane text-purple-500"></i>
        {$t('contact.badge')}
      </div>
      <h1
        in:fly={{ y: 30, duration: 700, delay: 100 }}
        class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05]"
      >
        {$t('contact.titlePart1')} <span class="text-gradient">{$t('contact.titleHighlight')}</span>
      </h1>
      <p
        in:fade={{ duration: 700, delay: 200 }}
        class="mt-5 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
      >
        {$t('contact.description')}
      </p>
    {/if}
  </div>
</section>

<!-- Form + sidebar -->
<section class="relative pb-24">
  <div class="container">
    <div class="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
      <!-- Form -->
      <div class="lg:col-span-3 reveal-left" use:reveal>
          <form
            class="glass-strong rounded-3xl p-6 sm:p-8 space-y-5"
            on:submit|preventDefault={handleSubmit}
          >
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  {$t('contact.form.firstName')} <span class="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  bind:value={formData.firstName}
                  placeholder="El Houcine"
                  class="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100
                         placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  {$t('contact.form.lastName')} <span class="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  bind:value={formData.lastName}
                  placeholder="QARA"
                  class="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100
                         placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                {$t('contact.form.email')} <span class="text-rose-500">*</span>
              </label>
              <input
                type="email"
                bind:value={formData.email}
                placeholder="you@email.com"
                class="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100
                       placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                {$t('contact.form.phone')}
              </label>
              <input
                type="tel"
                bind:value={formData.phone}
                placeholder="+212 xxx xxx xxx"
                class="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100
                       placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                {$t('contact.form.message')} <span class="text-rose-500">*</span>
              </label>
              <textarea
                rows="5"
                bind:value={formData.message}
                placeholder={$t('contact.form.messagePlaceholder')}
                class="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100
                       placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition resize-none"
              ></textarea>
            </div>

            {#if submitStatus === 'success'}
              <div
                class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center gap-3"
              >
                <i class="fa-solid fa-check-circle text-xl"></i>
                <span>{errorMessage || $t('contact.form.successTitle')}</span>
              </div>
            {/if}

            {#if submitStatus === 'error'}
              <div
                class="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 flex items-center gap-3"
              >
                <i class="fa-solid fa-exclamation-circle text-xl"></i>
                <span>{errorMessage}</span>
              </div>
            {/if}

            <button
              type="submit"
              disabled={isSubmitting}
              class="w-full btn-primary-gradient shine !py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {#if isSubmitting}
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {$t('contact.form.sending')}
              {:else}
                <i class="fa-solid fa-paper-plane"></i>
                {$t('contact.form.sendMessage')}
              {/if}
            </button>
          </form>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-2 space-y-5 reveal-right" use:reveal={{ delay: 200 }}>
          <!-- Direct contact -->
          <div class="glass-card p-6" use:tilt3d={{ max: 5, scale: 1.01 }}>
            <h3 class="font-bold text-slate-900 dark:text-white mb-4">{$t('contact.sidebar.direct')}</h3>
            <div class="space-y-3">
              {#each directContacts as c}
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : null}
                  rel="noopener noreferrer"
                  class="flex items-center gap-4 p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/80 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all group"
                >
                  <div
                    class="w-11 h-11 rounded-xl bg-gradient-to-br {c.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"
                  >
                    <i class="{c.icon}"></i>
                  </div>
                  <div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{c.label}</div>
                    <div class="font-semibold text-slate-800 dark:text-slate-100">{c.value}</div>
                  </div>
                </a>
              {/each}
            </div>
          </div>

          <!-- Info card -->
          <div class="glass-card p-6" use:tilt3d={{ max: 5, scale: 1.01 }}>
            <h3 class="font-bold text-slate-900 dark:text-white mb-4">{$t('contact.sidebar.quickInfo')}</h3>
            <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li class="flex items-center gap-3">
                <i class="fa-solid fa-clock text-purple-500 w-5"></i>
                {$t('contact.sidebar.responseTime')}
              </li>
              <li class="flex items-center gap-3">
                <i class="fa-solid fa-globe text-purple-500 w-5"></i>
                {$t('contact.sidebar.availability')}
              </li>
              <li class="flex items-center gap-3">
                <i class="fa-solid fa-language text-purple-500 w-5"></i>
                {$t('contact.sidebar.spoken')}
              </li>
              <li class="flex items-center gap-3">
                <i class="fa-solid fa-location-dot text-purple-500 w-5"></i>
                {$t('contact.sidebar.location')}
              </li>
            </ul>
          </div>

          <!-- Availability -->
          <div class="glass-card p-6 text-center" use:tilt3d={{ max: 6, scale: 1.02 }}>
            <div class="inline-flex items-center gap-2 badge-glass mb-3">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {$t('contact.sidebar.availableTitle')}
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              {$t('contact.sidebar.availableSubtitle')}
            </p>
          </div>
      </div>
    </div>
  </div>
</section>
