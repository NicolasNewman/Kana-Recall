export const flatten = <T>(obj: Record<string, Record<string, T>>): T[] =>
	Object.values(obj).reduce((prev, curr) => [...prev, ...Object.values(curr)], [] as T[]);
