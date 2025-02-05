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
		class="btn btn-circle btn-outline fixed bottom-5 right-2 shadow-lg max-lg:btn-sm lg:btn-md"
		on:click={scrollToTop}
	>
		<ArrowUpIcon />
	</button>
{/if}
