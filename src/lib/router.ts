import type { Syllabary } from './syllabary';

/** Valid params for the /test/ route */
export type TestParam = 'test' | 'practice';

/** Object mapping to valid routes with typed generators */
export const routes = {
	stats: '/stats',
	practice: '/practice',
	home: '/',
	test: (param: TestParam, library: Syllabary | '' = '') => `/test/${param}/${library}`
};
