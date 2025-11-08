<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Props pour personnaliser l'annonce
	export let client: string = 'ca-pub-XXXXXXXXXX'; // Votre ID AdSense
	export let slot: string = '';
	export let format: string = 'auto';
	export let responsive: boolean = true;
	export let style: string = 'display:block';

	let adLoaded = false;

	onMount(() => {
		if (browser && window.adsbygoogle) {
			try {
				(window.adsbygoogle = window.adsbygoogle || []).push({});
				adLoaded = true;
			} catch (e) {
				console.error('AdSense error:', e);
			}
		}
	});
</script>

<svelte:head>
	{#if browser}
		<script
			async
			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={client}"
			crossorigin="anonymous"
		></script>
	{/if}
</svelte:head>

<div class="adsense-container">
	<ins
		class="adsbygoogle"
		{style}
		data-ad-client={client}
		data-ad-slot={slot}
		data-ad-format={format}
		data-full-width-responsive={responsive}
	></ins>
</div>

<style>
	.adsense-container {
		margin: 1rem 0;
		min-height: 50px;
	}
</style>

