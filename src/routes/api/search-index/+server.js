import $rdf from 'rdflib';
import pkg from 'flexsearch';
import { json } from '@sveltejs/kit';
import { VERCEL_URL, VERCEL_ENV } from '$env/static/private';

const { Document } = pkg;

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

let data = null;

async function load() {
	try {

    const baseURL = VERCEL_ENV === "production" 
    ? `https://${VERCEL_URL}`
    : `http://${VERCEL_URL}`;
		data = await fetch(`${baseURL}/vocs.ttl`);
    const ttl = await data.text()
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
	} catch (error) {
		console.error('❌ Error loading RDF file:', error);
	}
}

await load();

export async function GET() {
	if (!data) {
		return new Response('File not loaded', { status: 500 });
	}
	const exportedIndex = {};

	await index.export((key, data) => {
		exportedIndex[key] = data;
	});

	return json(exportedIndex);
}
