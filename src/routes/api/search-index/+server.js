import fs from 'fs/promises';
import $rdf from 'rdflib';
import pkg from 'flexsearch';
import { json } from '@sveltejs/kit';

const { Document } = pkg;

const index = new Document({
	tokenize: 'forward',
  depth: 3,
	document: {
		id: 'id',
		index: ['name', 'about'],
		store: true
	}
});

let data = null;

async function loadData() {
	try {
		data = await fs.readFile('static/vocs.ttl', 'utf-8');
		console.log('✅ RDF File Loaded');

		var mimeType = 'text/turtle';
		var store = $rdf.graph();
		var uri = 'https://example.org/resource.ttl';

		try {
			$rdf.parse(data, store, uri, mimeType);
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

		docs.forEach((d) => index.add(d));
	} catch (error) {
		console.error('❌ Error loading RDF file:', error);
	}
}

await loadData();

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
