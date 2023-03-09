import type { Syllabary } from '$lib/syllabary';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	let syllabary = params.syllabary;
	if (!(syllabary === 'hira' || syllabary === 'kata')) {
		syllabary = 'hira';
	}
	return {
		syllabary: syllabary as Syllabary
	};
};
