import { json } from '@sveltejs/kit'
import type { Post } from '$lib/types/Post'

async function getPost(slug: string) {
	let res: Post = {} as Post

	const paths = import.meta.glob('/src/posts/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const fileSlug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && fileSlug === slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>
			const post = { ...metadata, slug } satisfies Post
			return post
		}
	}
	
	return res
}

export async function GET({params}) {
	const post = await getPost(params.slug)
	return json(post)
}
