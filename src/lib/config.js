export const config = {
	filterKeys: ['about', 'educationalLevel', 'P126'],
	sortKeys: ['name', 'issued', 'maintainedBy', 'about', 'educationalLevel'],
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
