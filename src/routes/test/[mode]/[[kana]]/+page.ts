import type { TestParam } from '$lib/router';
import type { Syllabary } from '$lib/syllabary';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const mode = params.mode;
	// TODO fallback for invalid modes
	return {
		mode: mode as TestParam,
		kana: params.kana as Syllabary | undefined
	};
};
