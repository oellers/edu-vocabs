import { Parser, Store } from 'n3';
import { config } from '$lib/config';
import pkg from 'flexsearch';
import { json } from '@sveltejs/kit';
import { VERCEL_URL, VERCEL_ENV, VERCEL_PROJECT_PRODUCTION_URL } from '$env/static/private';

const { Document } = pkg;

let data = null;
const store = new Store();

function processSubject(subjectNode) {
	const properties = store.getQuads(subjectNode, null, null, null);
	const obj = { id: subjectNode.value };
	properties.forEach(({ predicate, object }) => {
		let key = predicate.value.split('/').pop();
		if (key.includes('#type')) key = 'type';
		if (!obj[key]) {
			obj[key] = [];
		}
		obj[key].push(object.value); // Add the value to the array
	});

	return obj;
}

async function load() {
	const index = new Document({ ...config.index });
	try {
		const baseURL =
			VERCEL_ENV === 'production'
				? `https://${VERCEL_PROJECT_PRODUCTION_URL}`
				: VERCEL_ENV === 'preview'
					? `https://${VERCEL_URL}`
					: VERCEL_ENV === 'development'
						? `http://${VERCEL_URL}`
						: 'http://localhost:5173';
		data = await fetch(`${baseURL}/vocs.ttl`, {
			headers: { Accept: 'text/turtle' }
		});
		const ttl = await data.text();
		console.log('✅ RDF File Loaded');

		const parser = new Parser();
		console.log('Parsing Turtle...');
		const quads = parser.parse(ttl);
		store.addQuads(quads);

		const subjects = new Set(store.getQuads(null, null, null, null).map((quad) => quad.subject));

		const docs = [...subjects].map((subject) => {
			return {
				id: subject.id,
				...processSubject(subject)
			};
		});

		docs.forEach((d) => {
			const tags = [d?.['about'], d?.['educationalLevel']].filter(Boolean);
			index.add({
				...d,
				tag: tags
			});
		});
		return index;
	} catch (error) {
		console.error('❌ Error loading RDF file:', error);
	}
}

const index = await load();

async function exportedIndex(index) {
	const exportedIndex = {};

	await index.export((key, data) => {
		exportedIndex[key] = data;
	});

	return exportedIndex;
}

const exported = await exportedIndex(index);

export async function GET() {
	if (!exported) {
		return new Response('Data not loaded', { status: 500 });
	}

	return json(exported);
}
