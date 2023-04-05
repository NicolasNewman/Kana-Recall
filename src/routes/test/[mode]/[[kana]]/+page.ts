import type { TestParam } from '$lib/router';
import type { Syllabary } from '$lib/syllabary';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	let mode = params.mode;
	if (!(mode === 'test' || mode === 'practice')) {
		mode = 'test';
	}
	return {
		mode: mode as TestParam,
		kana: params.kana as Syllabary | undefined
	};
};
