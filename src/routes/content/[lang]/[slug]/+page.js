import { error } from '@sveltejs/kit';
import { LANGUAGES } from '$lib/constants.js';

export async function load({ params }) {
	const lang = LANGUAGES.includes(params.lang) ? params.lang : LANGUAGES[0];

	try {
		const mdFile = await import(`../../../../posts/${lang}/${params.slug}.md`);

		const post = {
			...mdFile.metadata,
			content: mdFile.default,
			slug: params.slug
		};

		return {
			item: post
		};
	} catch (e) {
		error(404, `Could not find content ${params.slug} in language ${lang}`);
	}
}
