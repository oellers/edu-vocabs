<script>
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import BrandIcon from '$lib/icons/BrandIcon.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { t } from 'svelte-i18n';
	let open = false;
</script>

<button class="btn btn-primary lg:hidden" onclick={() => (open = !open)}>
	<MenuIcon />
</button>
<button
	type="button"
	class={`fixed inset-0 z-40 bg-gray-800 bg-opacity-75 transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
	onclick={() => (open = false)}
	aria-label={$t('sidebar.close')}
	onkeydown={(e) => e.key === 'Enter' && (open = false)}
></button>
<div
	class={`fixed inset-y-0 left-0 z-50 w-64 transform bg-base-100 shadow-md transition-transform lg:static lg:inset-0 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
>
	<nav class="flex flex-col gap-2 p-4">
		<a aria-label={$t('menu.home')} href="/"><BrandIcon /></a>
		<div class="flex justify-center">
			<ThemeToggle />
		</div>
		<a aria-label={$t('menu.search')} href="/search" class="btn btn-ghost">{$t('menu.search')}</a>
		<a aria-label={$t('menu.contact')} href="/content/contact" class="btn btn-ghost"
			>{$t('menu.contact')}</a
		>
	</nav>
</div>
