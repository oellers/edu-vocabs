<script>
	import { onMount } from 'svelte';
	import SunIcon from '$lib/icons/SunIcon.svelte';
	import MoonIcon from '$lib/icons/MoonIcon.svelte';

	const themeAttribute = 'data-theme';
	const lightTheme = 'light';
	const darkTheme = 'night';

	let theme = $state(lightTheme);
	let isDarkMode = $derived(theme === darkTheme);

	const toggleTheme = () => {
		theme = isDarkMode ? lightTheme : darkTheme;
		sessionStorage.setItem(themeAttribute, theme);
		document.documentElement.setAttribute(themeAttribute, theme);
	};

	onMount(() => {
		const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const prefTheme = prefersDarkMode ? darkTheme : lightTheme;
		const currentTheme =
			document.documentElement.getAttribute(themeAttribute) === darkTheme ? darkTheme : lightTheme;
		const storedTheme = sessionStorage.getItem(themeAttribute);
		theme = storedTheme || currentTheme || prefTheme;
	});
</script>

<button class="btn btn-square btn-ghost">
	<label class="swap swap-rotate h-12 w-12">
		<input type="checkbox" onchange={toggleTheme} checked={!isDarkMode} />
		<span class="swap-on" title="Zum Light Mode wechseln"><MoonIcon /></span>
		<span class="swap-off" title="Zum Dark Mode wechseln"><SunIcon /></span>
	</label>
</button>
