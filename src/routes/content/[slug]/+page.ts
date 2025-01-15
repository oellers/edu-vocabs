import { error } from '@sveltejs/kit';
import type { Post } from '$lib/types/Post'

export async function load({ params }) {
  try {
		const mdFile = await import(`../../../posts/${params.slug}.md`)

    const post = {
      ...mdFile.metadata,
      content: mdFile.default,
      slug: params.slug
    };

		return {
			item: post
		};

	} catch (e) {
		error(404, `Could not find content ${params.slug}`)
	}
}