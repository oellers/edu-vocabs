export const VOCAB_PROPERTIES = {
	id: 'id',
	type: 'type', // http://www.w3.org/1999/02/22-rdf-syntax-ns#type
	name: 'name', // https://schema.org/name
	description: 'description', // https://schema.org/description
	about: 'about', // https://schema.org/about
	issued: 'issued', // http://purl.org/dc/terms/issued
	educationalLevel: 'educationalLevel', // https://schema.org/educationalLevel
	describedAt: 'P973', // http://www.wikidata.org/prop/direct/P973
	maintainedBy: 'P126', // http://www.wikidata.org/prop/direct/P126
	usedBy: 'P1535', // http://www.wikidata.org/prop/direct/P1535
	repo: 'P1324', // http://www.wikidata.org/prop/direct/P1324
	compliesWith: 'P5009', // http://www.wikidata.org/prop/direct/P5009
	format: 'P2701', // http://www.wikidata.org/prop/direct/P2701
	fileFormat: 'fileFormat', // https://schema.org/fileFormat
	distribution: 'distribution', // https://schema.org/distribution
	rawVocab: 'rawVocab',
	contentUrl: 'contentUrl' // https://schema.org/contentUrl
};

export const METADATA_KEYS = ['issued', 'compliesWith'];

export const LANGUAGES = ['en', 'de'];

export const LANGUAGE_KEY = 'sveltekit:locale';
