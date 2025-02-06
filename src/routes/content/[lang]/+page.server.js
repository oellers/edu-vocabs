import { LANGUAGES } from '$lib/constants.js';

export async function load({ fetch, params }) {
	const lang = LANGUAGES.includes(params.lang) ? params.lang : LANGUAGES[0];
	const response = await fetch('/api/posts/' + lang);
	const posts = await response.json();
	return {
		items: posts
	};
}
