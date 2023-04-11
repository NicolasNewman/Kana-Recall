import type { Statistic } from './syllabary';

/**
 * @param max - maximum number that can be generated
 * @returns random number between [0, max]
 */
export const rand = (max: number) => Math.floor(Math.random() * max);

export const accuracy = (stat: Statistic, mode: 'all' | 'recent' = 'all') => {
	let acc = -2;
	if (mode === 'recent') {
		acc = stat.recent.reduce((prev, curr) => prev + curr, 0) / stat.recent.length;
	} else {
		acc = stat.allTime.correct / (stat.allTime.correct + stat.allTime.incorrect);
	}

	return isNaN(acc) ? -2 : acc;
};
