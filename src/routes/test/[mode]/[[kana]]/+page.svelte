<script lang="ts">
	import { appWindow, LogicalSize } from '@tauri-apps/api/window';
	import { rand, sumArray } from '$lib/math';
	import type { PageData } from './$types';
	import { convert } from 'jp-conversion';
	import { getItem, setItem } from '$lib/sessionStorage';
	import { kanaCharacters, type StoredStats } from '$lib/syllabary';
	import { routes } from '$lib/router';
	appWindow.setSize(new LogicalSize(700, 404));

	export let data: PageData;

	const { mode, kana: kanaId } = data;
	// TODO: better fallback handling
	const charset = getItem('keyset', true) ?? kanaCharacters['hira'];
	const stats = getItem('stats');
	const settings = getItem('settings');

	let keyState = '';
	let resetKeyState = false;
	let text = '';

	const sentence: string[] = [];
	let correct: boolean[] = [];
	for (let i = 0; i < 102; i++) {
		sentence.push(charset[rand(charset.length)]);
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
				if (stat.recent.length >= settings.recentStatCount) {
					stat.recent.shift();
				}
				stat.recent.push(isCorrect ? 1 : 0);
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
			<div style="display: flex; flex-direction: column; align-items: center;">
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

<div id="container" class="p-8 bg-contain h-[calc(100vh-30px)]">
	<div
		id="content"
		class="flex flex-col items-center justify-between rounded-lg border-2 p-1 pl-2 border-gray-800 h-full bg-gray-900 text-[36px] leading-10 text-white"
	>
		<div class="NotoSansMono w-full">{@html text}</div>
		<div class="mt-2 flex items-center h-full">
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
