import $rdf from 'rdflib';

export async function load({ fetch }) {
	const response = await fetch('/vocs.ttl');
	const data = await response.text();
	var mimeType = 'text/turtle';
	var store = $rdf.graph();
	var uri = 'https://example.org/resource.ttl';

	try {
		$rdf.parse(data, store, uri, mimeType);
	} catch (err) {
		console.log(err);
	}

	const subjects = new Set(store.statements.map((statement) => statement.subject.value));

	const result = [...subjects].map((subjectURI) => {
		const subjectNode = $rdf.sym(subjectURI);
		const properties = store.match(subjectNode, null, null);

		const obj = { id: subjectURI };
		properties.forEach(({ predicate, object }) => {
			const key = predicate.value.split('/').pop();
			obj[key] = object.value;
		});

		return obj;
	});
	return { result };
}
