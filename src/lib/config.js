export const config = {
	filterKeys: ['about', 'educationalLevel', 'P126'],
	sortKeys: ['name', 'issued', 'maintainedBy', 'about', 'educationalLevel'],
	index: {
		tokenize: 'full',
		language: 'de',
		encoder: 'advanced',
		charset: 'latin',
		document: {
			id: 'id',
			index: ['id', 'title', 'about'],
			tag: 'tag',
			store: true
		}
	}
};
