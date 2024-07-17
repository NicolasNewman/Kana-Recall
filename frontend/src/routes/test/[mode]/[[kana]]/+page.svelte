<script lang="ts">
	import { appWindow, LogicalSize } from '@tauri-apps/api/window';
	import { accuracy, rand, sumArray } from '$lib/math';
	import type { PageData } from './$types';
	import { convert } from 'jp-conversion';
	import { getItem, setItem } from '$lib/sessionStorage';
	import { kanaCharacters, type StoredStats } from '$lib/syllabary';
	import { routes } from '$lib/router';
	import Timer from '$lib/timer';
	import { getPlatform } from '$lib/platform';

	const platform = getPlatform();

	const bgStyle =
		platform === 'web'
			? 'aspect-[50/29] w-[700px] border border-gray rounded-md'
			: platform === 'desktop'
				? 'h-[calc(100vh-30px)]'
				: '';
	if (platform === 'desktop') {
		appWindow.setSize(new LogicalSize(700, 404));
	}

	export let data: PageData;

	const { mode, kana: kanaId } = data;
	// TODO: better fallback handling
	const charset = getItem('keyset', true) ?? kanaCharacters['hira'];
	const stats = getItem('stats');
	const settings = getItem('settings');
	const timer = new Timer();

	let keyState = '';
	let resetKeyState = false;
	let text = '';

	const sentence: string[] = [];
	let correct: boolean[] = [];
	let temp = [...charset];
	if (mode === 'test' || mode === 'practice') {
		for (let i = 0; i < 102; i++) {
			if (temp.length === 0) {
				temp = [...charset];
			}
			const n = rand(temp.length);
			sentence.push(temp[n]);
			temp.splice(n, 1);
		}
	} else if ((mode === 'recall' || mode === 'accuracy') && kanaId) {
		/*
            The weights for time mode are calculated by taking the average time for a kana
            and putting it through Sigmoid function. The calculates weights are stored in a
            list along with another var for the sum. Once the weights and sums have been
            computed, perform the following for each character needed in the sentence:
            1) Generate a random continuous number (w) in the range [0, weightedSum]
            2) Loop through the weights and keep track with an accumulator of the weights and an iterator
            3) If the random number (w) is greater then the accumulator and less then the
            accumulator + current weight from the list then return the iterator
            4) Retrive the kana at the selected iterator from the flattened list
            (the flattened list and weights list index's match up)
        */
		const weights = Object.entries(stats[kanaId]).map(([kana, stat]) => {
			let avg = accuracy(stat, mode);
			if (mode === 'accuracy') avg = 1 - avg;
			console.log(`${kana}: ${avg}`);
			return Math.tanh(0.25 * avg);
		});
		const weightSum = sumArray(weights);
		for (let i = 0; i < 102; i++) {
			const w = Math.random() * weightSum;
			let acc = 0;
			let j = 0;
			for (j = 0; j < weights.length; j++) {
				if (acc <= w && w <= acc + weights[j]) {
					break;
				}
				acc += weights[j];
			}
			sentence.push(temp[j]);
		}
	}

	function onKeyDown(e: KeyboardEvent) {
		// prevent going past the length of the entire sentence
		if (correct.length === sentence.length) return;

		const key = e.key;
		// handle deleting a character from the buffer
		if (key === 'Backspace') {
			if (keyState.length > 0) {
				keyState = keyState.slice(0, keyState.length - 1);
			}
			return;
		}

		let regex = key.match(/[a-z]/);
		// if we are finished, save the data
		if (correct.length === sentence.length - 1) {
			if (mode === 'test') {
				setItem('stats', stats);
			}
		}

		// if the entered key is lowercase and we haven't reached the end of our sentence:
		if (correct.length < sentence.length && regex && regex.input?.length === 1) {
			// reset the keyState to the newly entered key if the reset flag is set
			if (resetKeyState) {
				keyState = key;
				resetKeyState = false;
			} else {
				// otherwise update the keyState with the new key
				keyState = keyState + key;
			}
		} else {
			return;
		}

		// attempt to convert the text in the keyState to a kana character
		let kana = convert(keyState);
		// exception handling for "n"
		if (keyState === 'nn') {
			kana = convert('n');
		} else if (keyState === 'n') {
			kana = false;
		}

		// if a valid kana was entered:
		if (kana) {
			let isCorrect = false;
			let i = correct.length;
			// if the entered kana is the correct one, set the correct flag to true
			if (sentence[i] === kana['hiragana'] || sentence[i] === kana['katakana']) {
				isCorrect = true;
			}
			correct = [...correct, isCorrect];
			// indicate that the keyState needs to be reset on the next key press
			resetKeyState = true;
			keyState = '';

			// if we are in testing mode, update the statistics
			if (kanaId) {
				// obtain the correct stats for the current character
				const stat = stats[kanaId][sentence[i] as keyof StoredStats[typeof kanaId]];
				stat.allTime[isCorrect ? 'correct' : 'incorrect']++;
				// if we're storing more then the recent data can hold, remove the oldest entry
				if (stat.recent.accuracy.length >= settings.recentStatCount) {
					stat.recent.accuracy.shift();
				}
				stat.recent.accuracy.push(isCorrect ? 1 : 0);

				if (isCorrect) {
					if (stat.recent.recall.length >= settings.recentStatCount) {
						stat.recent.recall.shift();
					}
					let t = timer.end();
					if (t > settings.maxRecallDuration) {
						t = settings.maxRecallDuration;
					}
					stat.recent.recall.push(t);
				}
				timer.start();
			}
		}

		// if our state is greater than 2, reset the keyState as no more valid kana can be made
		if (keyState.length > 2) {
			keyState = '';
		}
	}

	$: {
		if (correct.length === sentence.length) {
			const nCorrect = sumArray(correct);
			text = `
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%">
				<span style="border-bottom: 2px solid #fff; padding-bottom: 5px; width: 40%; text-align: center">Finished!</span>
				<span>Correct: ${nCorrect}</span>
				<span>Incorrect: ${sentence.length - nCorrect}</span>
				<span>
					Accuracy: ${((nCorrect / correct.length) * 100).toFixed(1)}%
				</span>
			</div>`;
		} else {
			const start = correct.reduce(
				(prev, curr, i) =>
					`${prev}<span class="${curr ? 'correct' : 'wrong'}">${sentence[i]}</span>`,
				''
			);
			const curr = `<span class="underline">${sentence[correct.length] ?? ''}</span>`;
			const end = sentence.slice(correct.length + 1, sentence.length).join('');
			text = start + curr + end;
		}
	}
</script>

<div id="container" class={`p-8 bg-cover ${bgStyle}`}>
	<div
		id="content"
		class="flex flex-col items-center justify-between rounded-lg border-2 p-1 pl-2 border-gray-800 h-full bg-gray-900 text-[36px] leading-10 text-white"
	>
		<div class="NotoSansMono h-full w-full">{@html text}</div>
		<div class="mt-2 flex items-center">
			{#if correct.length === sentence.length}
				<a href={routes.home} class="btn btn-primary w-full mt-auto">Home</a>
			{:else}
				<div class="p-1 w-16 h-10 text-2xl text-center bg-slate-800 border border-gray-300 rounded">
					{keyState}
				</div>
			{/if}
		</div>
	</div>
</div>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<style>
	#container {
		background-image: url($lib/assets/bg-outer-sentence.jpg);
	}
</style>
