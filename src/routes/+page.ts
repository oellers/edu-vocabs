import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const homeSlug = 'home';
  try {
		const mdFile = await import(`../posts/${homeSlug}.md`)

    const post = {
      ...mdFile.metadata,
      content: mdFile.default,
      slug: homeSlug
    };

		return {
			item: post
		};

	} catch (e) {
		error(404, `Could not find home content`)
	}
}