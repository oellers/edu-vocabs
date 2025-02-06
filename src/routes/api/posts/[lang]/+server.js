import { json } from '@sveltejs/kit';
import { LANGUAGES } from '$lib/constants.js';

async function getPosts(lang = 'de') {
	let posts = [];
	lang = LANGUAGES.includes(lang) ? lang : LANGUAGES[0];

	// Import all .md files recursively from /src/posts/
	const paths = import.meta.glob('/src/posts/**/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		// Get language from path
		const match = path.match(/\/src\/posts\/([^/]+)\/[^/]+\.md$/);
		const fileLang = match ? match[1] : null;

		// Only include posts matching the requested language
		if (file && typeof file === 'object' && fileLang === lang && 'metadata' in file && slug) {
			const metadata = file.metadata || {};
			const post = { ...(typeof metadata === 'object' ? metadata : {}), slug };
			posts.push(post);
		}
	}

	// Sort posts by date (newest first)
	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

export async function GET({ params }) {
	const posts = await getPosts(params.lang);
	return json(posts);
}
