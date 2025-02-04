<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import ArrowUpIcon from '$lib/icons/ArrowUpIcon.svelte';

	let showScrollButton = false;

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleScroll = () => {
		showScrollButton = window.scrollY > 300;
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

{#if showScrollButton}
	<button
		aria-label={$t('sidebar.top')}
		transition:fade
		class="btn btn-outline btn-accent fixed bottom-6 shadow-lg max-lg:left-4 lg:right-4"
		on:click={scrollToTop}
	>
		<ArrowUpIcon />
	</button>
{/if}
