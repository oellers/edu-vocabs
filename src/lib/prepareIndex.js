import { Parser, Store } from 'n3';
import { config } from '$lib/config';
import pkg from 'flexsearch';

const { Document: FlexDocument } = pkg;

const store = new Store();

/**
 * Processes an RDF subject node by extracting its properties from the store and
 * building a simplified object representation suitable for indexing or further processing.
 *
 * @param {Object} subjectNode - The RDF subject node to process. It is expected to have a `value` property as id.
 * @returns {Object} An object representing the subject
 */
function processSubject(subjectNode) {
	const properties = store.getQuads(subjectNode, null, null, null);
	const obj = { id: subjectNode.value };
	properties.forEach(({ predicate, object }) => {
		// Extract the last part of the predicate URI as the key.
		let key = predicate.value.split('/').pop();
		// Normalize any type predicate key to 'type'
		if (key.includes('#type')) key = 'type';
		// Initialize the array for this key if it doesn't exist.
		if (!obj[key]) {
			obj[key] = [];
		}
		// Accumulate the object value.
		obj[key].push(object.value);
	});
	return obj;
}

async function exportedIndex(index) {
	const exportedIndex = {};

	await index.export((key, data) => {
		exportedIndex[key] = data;
	});

	return exportedIndex;
}

/**
 * Asynchronously loads an RDF Turtle file, parses it, processes the RDF quads,
 * and indexes the resulting documents using a FlexSearch index.
 *
 * @async
 * @function load
 * @returns {Promise<FlexDocument>} A promise that resolves to a populated FlexSearch Document index
 */
export async function prepareAndExportIndex(ttl) {
	console.log('preparing index...');
	const index = new FlexDocument({ ...config.index });
	try {
		// Parse the Turtle content into RDF quads
		const parser = new Parser();
		console.log('Parsing Turtle...');
		const quads = parser.parse(ttl);
		store.addQuads(quads);

		// Extract unique subjects from the store
		const subjects = new Set(store.getQuads(null, null, null, null).map((quad) => quad.subject));

		// Process each subject into a document
		const docs = [...subjects].map((subject) => {
			return {
				id: subject.id,
				...processSubject(subject)
			};
		});

		// Add each document to the index
		docs.forEach((d) => {
			const tags = config.filterKeys.map((key) => d?.[key]).filter(Boolean);
			index.add({
				...d,
				tag: tags
			});
		});
	} catch (error) {
		console.error('❌ Error loading RDF file:', error);
	}

	const exportIndex = exportedIndex(index);
	return exportIndex;
}
