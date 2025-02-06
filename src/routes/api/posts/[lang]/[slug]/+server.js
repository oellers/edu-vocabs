import { json } from '@sveltejs/kit';
import { LANGUAGES } from '$lib/constants.js';

/**
 * Fetches a post by its slug.
 *
 * This function searches through markdown files in the `/src/posts/` directory,
 * and returns the post metadata if a file with the matching slug is found.
 *
 * @param {string} slug - The slug of the post to fetch.
 * @param {string} lang - The language of the post to fetch.
 * @returns {Promise<Object>} A promise that resolves to the post object if found, otherwise an empty post object.
 */
async function getPost(lang = 'de', slug = 'home') {
	let post = {};
	lang = LANGUAGES.includes(lang) ? lang : LANGUAGES[0];

	// Import all .md files recursively from /src/posts/
	const paths = import.meta.glob('/src/posts/**/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const fileSlug = path.split('/').at(-1)?.replace('.md', '');

		// Get language from path
		const match = path.match(/\/src\/posts\/([^/]+)\/[^/]+\.md$/);
		const fileLang = match ? match[1] : null;

		// Only include posts matching the requested language and slug
		if (
			file &&
			typeof file === 'object' &&
			'metadata' in file &&
			fileLang === lang &&
			fileSlug === slug
		) {
			const metadata = file.metadata || {};
			post = { ...(typeof metadata === 'object' ? metadata : {}), slug };
			return post;
		}
	}

	return post;
}

export async function GET({ params }) {
	const post = await getPost(params.lang, params.slug);
	return json(post);
}
