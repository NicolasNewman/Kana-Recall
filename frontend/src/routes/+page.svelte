<script lang="ts">
	import { goto } from '$app/navigation';
	import { getPlatform } from '$lib/platform';
	import { routes, type TestParam } from '$lib/router';
	import { setItem } from '$lib/sessionStorage';
	import { kanaCharacters, type Syllabary } from '$lib/syllabary';
	import { appWindow, LogicalSize } from '@tauri-apps/api/window';

	const platform = getPlatform();
	if (platform === 'desktop') {
		appWindow.setSize(new LogicalSize(350, 500));
	}

	function onTestClicked(mode: TestParam, kana: Syllabary) {
		setItem('keyset', kanaCharacters[kana]);
		goto(routes.test(mode, kana));
	}

	const bgStyle = platform === 'desktop' ? 'h-[calc(100vh-30px)]' : 'aspect-[3/4] h-[390px]';
	const containerStyle = platform === 'desktop' ? 'h-[calc(100vh-30px)]' : 'h-[390px]';
</script>

<div class={`${bgStyle}`}>
	<div id="container">
		<!-- m-10? -->
		<div class={`flex flex-col items-center justify-center ${containerStyle}`}>
			<h1 class="text-3xl mb-2 text-white-stroke">Kana-Recall</h1>
			<div class="dropdown dropdown-end mb-2 w-1/2">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<summary tabindex="0" class="btn btn-primary w-full">Practice</summary>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
				>
					<li><a href={routes.practice}>Custom</a></li>
					<li><a href="#modalAccuracy">Low Accuracy</a></li>
					<li><a href="#modalRecall">Slow Recall</a></li>
				</ul>
			</div>
			<div class="dropdown dropdown-end mb-2 w-1/2">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<summary tabindex="0" class="btn btn-primary w-full">Test</summary>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
				>
					<li><button on:click={(e) => onTestClicked('test', 'hira')}>Hiragana</button></li>
					<li><button on:click={(e) => onTestClicked('test', 'kata')}>Katakana</button></li>
				</ul>
			</div>
			<a href={routes.stats} class="btn btn-secondary mb-2 w-1/2">Stats</a>
		</div>
		<div class="modal" id="modalAccuracy">
			<div class="modal-box">
				<h3 class="font-bold text-lg">Accuracy</h3>
				<p class="py-4">Which syllabary would you like to practice?</p>
				<div class="modal-action">
					<button on:click|preventDefault={() => onTestClicked('accuracy', 'hira')} class="btn"
						>Hiragana</button
					>
					<button on:click|preventDefault={() => onTestClicked('accuracy', 'kata')} class="btn"
						>Katakana</button
					>
				</div>
			</div>
		</div>
		<div class="modal" id="modalRecall">
			<div class="modal-box">
				<h3 class="font-bold text-lg">Recall</h3>
				<p class="py-4">Which syllabary would you like to practice?</p>
				<div class="modal-action">
					<button on:click|preventDefault={() => onTestClicked('recall', 'hira')} class="btn"
						>Hiragana</button
					>
					<button on:click|preventDefault={() => onTestClicked('recall', 'kata')} class="btn"
						>Katakana</button
					>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	#container {
		background-image: url($lib/assets/bg-homescreen.jpg);
		background-size: cover;
	}
</style>
