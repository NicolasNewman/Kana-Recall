import type { Statistic } from './syllabary';

/**
 * @param max - maximum number that can be generated
 * @returns random number between [0, max]
 */
export const rand = (max: number) => Math.floor(Math.random() * max);

export const accuracy = (stat: Statistic, mode: 'all' | 'accuracy' | 'recall' = 'all') => {
	let acc = 0;
	if (mode === 'accuracy') {
		acc = stat.recent.accuracy.reduce((prev, curr) => prev + curr, 0) / stat.recent.accuracy.length;
	} else if (mode === 'all') {
		acc = stat.allTime.correct / (stat.allTime.correct + stat.allTime.incorrect);
	} else if (mode === 'recall') {
		acc = stat.recent.recall.reduce((prev, curr) => prev + curr, 0) / stat.recent.recall.length;
	}

	return isNaN(acc) ? 0 : acc;
};

export const sumArray = (arr: (number | boolean)[]) =>
	arr.reduce((prev: number, curr) => {
		if (typeof curr === 'boolean') return prev + (curr === true ? 1 : 0);
		return prev + curr;
	}, 0);
