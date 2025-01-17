export function parseToSkos(input) {
	const lines = input.split('\n');
	const stack = [];
	const result = { hasTopConcept: [] };

	lines.forEach((line) => {
		const trimmedLine = line.trim();
		if (!trimmedLine) return;

		const indentLevel = line.match(/^ */)[0].length;
		const entry = {
			prefLabel: { de: trimmedLine },
			narrower: []
		};

		while (stack.length && stack[stack.length - 1].indentLevel >= indentLevel) {
			stack.pop();
		}

		if (stack.length) {
			const parent = stack[stack.length - 1].entry;
			parent.narrower.push(entry);
		} else {
			result.hasTopConcept.push(entry);
		}
		stack.push({ entry, indentLevel });
	});
	return result;
}
