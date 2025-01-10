export const config = {
	filterKeys: ['about', 'educationalLevel'],
	index: {
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
	}
};
