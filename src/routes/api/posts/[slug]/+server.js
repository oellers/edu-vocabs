import { json } from '@sveltejs/kit';

/**
 * Fetches a post by its slug.
 *
 * This function searches through markdown files in the `/src/posts/` directory,
 * and returns the post metadata if a file with the matching slug is found.
 *
 * @param {string} slug - The slug of the post to fetch.
 * @returns {Promise<Object>} A promise that resolves to the post object if found, otherwise an empty post object.
 */
async function getPost(slug) {
	let post = {};

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const fileSlug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && fileSlug === slug) {
			const metadata = file.metadata;
			post = { ...(typeof metadata === 'object' ? metadata : {}), slug };
			return post;
		}
	}

	return post;
}

export async function GET({ params }) {
	const post = await getPost(params.slug);
	return json(post);
}
