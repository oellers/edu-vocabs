export const config = {
	filterKeys: ['about', 'educationalLevel'],
	index: {
		tokenize: 'forward',
		language: 'de',
		encoder: 'advanced',
		charset: 'latin',
		document: {
			id: 'id',
			index: ['id', 'name', 'about'],
			tag: 'tag',
			store: true
		}
	}
};
