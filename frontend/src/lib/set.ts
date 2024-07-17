/**
 * Returns a set of the union of the input sets
 * @param sets - variable number of sets
 * @returns - union of input sets
 */
function union<T>(...sets: Set<T>[]) {
	const temp = new Set<T>();
	for (const set of sets) {
		for (const item of set) {
			temp.add(item);
		}
	}
	return temp;
}

export { union };
