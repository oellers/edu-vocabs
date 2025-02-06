<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { locale } from 'svelte-i18n';

	onMount(() => {
		const homeSlug = 'home';
		goto(`/content/${$locale.slice(0, 2)}/${homeSlug}`);
	});
</script>
