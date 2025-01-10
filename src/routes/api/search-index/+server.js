import $rdf from 'rdflib';
import { ttlStore } from '$lib/db';
import pkg from 'flexsearch';
import { json } from '@sveltejs/kit';
import { VERCEL_URL, VERCEL_ENV, VERCEL_PROJECT_PRODUCTION_URL } from '$env/static/private';

const { Document } = pkg;

let data = null;

async function load() {
	const index = new Document({
		tokenize: 'forward',
		language: 'de',
		encoder: 'advanced',
		charset: 'latin',
		document: {
			id: 'id',
			index: ['name', 'about'],
			tag: 'tag',
			store: true
		}
	});
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

		var mimeType = 'text/turtle';
		var store = $rdf.graph();
		var uri = 'https://example.org/resource.ttl';

		try {
			$rdf.parse(ttl, store, uri, mimeType);
		} catch (err) {
			console.log(err);
		}

		const subjects = new Set(store.statements.map((statement) => statement.subject.value));

		const docs = [...subjects].map((subjectURI) => {
			const subjectNode = $rdf.sym(subjectURI);
			const properties = store.match(subjectNode, null, null);

			const obj = { id: subjectURI };
			properties.forEach(({ predicate, object }) => {
				const key = predicate.value.split('/').pop();
				obj[key] = object.value;
			});

			return obj;
		});

		docs.forEach((d) => {
			const tags = [d?.['about'], d?.['educationalLevel']].filter(Boolean);
			index.add({
				...d,
				tag: tags
			});
		});
    return index
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

const exported = await exportedIndex(index)

export async function GET() {
	if (!exported) {
		return new Response('Data not loaded', { status: 500 });
	}

	return json(exported);
}
