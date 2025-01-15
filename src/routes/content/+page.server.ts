import type { Post } from '$lib/types/Post';

export async function load({ fetch }) {
	const response = await fetch('api/posts');
	const posts: Post[] = await response.json();
	return {
		items: posts
	};
}
