(function initTheme() {
	const themeAttribute = 'data-theme';
	const darkTheme = 'night';
	const lightTheme = 'light';

	const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const preferredTheme = prefersDarkMode ? darkTheme : lightTheme;
	const storedTheme = sessionStorage.getItem(themeAttribute);
	const theme = storedTheme || preferredTheme;

	document.documentElement.setAttribute(themeAttribute, theme);
})();
