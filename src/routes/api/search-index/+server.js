import { Parser, Store } from 'n3';
import { config } from '$lib/config';
import pkg from 'flexsearch';
import { json } from '@sveltejs/kit';
import { VERCEL_URL, VERCEL_ENV, VERCEL_PROJECT_PRODUCTION_URL } from '$env/static/private';

const { Document: FlexDocument } = pkg;

let data = null;
const store = new Store();
const index = await load();
const exported = await exportedIndex(index);

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

/**
 * Asynchronously loads an RDF Turtle file, parses it, processes the RDF quads,
 * and indexes the resulting documents using a FlexSearch index.
 *
 * @async
 * @function load
 * @returns {Promise<FlexDocument>} A promise that resolves to a populated FlexSearch Document index
 */
async function load() {
	const index = new FlexDocument({ ...config.index });
	try {
		// Fetch the RDF Turtle file
		const baseURL = getBaseUrl();
		data = await fetch(`${baseURL}/vocs.ttl`, {
			headers: { Accept: 'text/turtle' }
		});
		const ttl = await data.text();
		console.log('✅ RDF File Loaded');

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
			const tags = [d?.['about'], d?.['educationalLevel']].filter(Boolean);
			index.add({
				...d,
				tag: tags
			});
		});
	} catch (error) {
		console.error('❌ Error loading RDF file:', error);
	}
	return index;
}

/**
 * Determines the base URL for the application based on the current Vercel environment.
 *
 * @returns {string} The base URL constructed according to the current environment.
 */
function getBaseUrl() {
	return VERCEL_ENV === 'production'
		? `https://${VERCEL_PROJECT_PRODUCTION_URL}`
		: VERCEL_ENV === 'preview'
			? `https://${VERCEL_URL}`
			: VERCEL_ENV === 'development'
				? `http://${VERCEL_URL}`
				: 'http://localhost:5173';
}

/**
 * Exports the data from the provided index.
 *
 * This function asynchronously exports the contents of a search index
 * @async
 * @param {Object} index - The index instance to export data from
 * @returns {Promise<Object>} A promise that resolves to an object containing the exported index data.
 */
async function exportedIndex(index) {
	const exportedIndex = {};

	await index.export((key, data) => {
		exportedIndex[key] = data;
	});

	return exportedIndex;
}

/**
 * HTTP GET handler for serving exported data.
 *
 * This function handles GET requests by returning a JSON response containing the exported data.
 * If the data has not been loaded, it returns an HTTP 500 error.
 *
 * @async
 * @returns {Promise<Response>} A promise that resolves to an HTTP response containing the exported data in JSON format,
 * or an error message if the data is not loaded.
 */
export async function GET() {
	if (!exported) {
		return new Response('Data not loaded', { status: 500 });
	}
	return json(exported);
}
