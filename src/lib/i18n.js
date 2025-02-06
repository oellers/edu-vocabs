import { browser } from '$app/environment';
import { init, locale, register, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('../locales/en.json'));
register('de', () => import('../locales/de.json'));

init({
	fallbackLocale: 'de',
	initialLocale: getLocaleFromNavigator() || 'de'
});
