<script lang="ts">
	import { appWindow, LogicalSize } from '@tauri-apps/api/window';
	appWindow.setSize(new LogicalSize(700, 374));
	import { rand } from '$lib/math';
	import { kanaCharacters } from '$lib/syllabary';
	import type { PageData } from './$types';
	export let data: PageData;
	const { syllabary } = data;
	const charset = kanaCharacters[syllabary];

	const sentence: string[] = [];
	const correct: boolean[] = [];
	for (let i = 0; i < 100; i++) {
		sentence.push(charset[rand(charset.length)]);
	}
</script>

<div id="container" class="p-8 bg-contain h-screen">
	<div id="content" class="rounded-lg border-2 border-gray-800 h-full bg-gray-900">
		<p class="text-4xl text-white">{sentence.join('')}</p>
	</div>
</div>

<style>
	#container {
		background-image: url($lib/assets/bg-outer-sentence.jpg);
	}

	@keyframes underlined {
		0% {
			text-decoration: none;
		}

		100% {
			text-decoration: underline;
		}
	}

	.underline {
		animation: underlined 1.5s infinite;
	}

	.correct {
		color: #00ff00;
	}

	.wrong {
		color: #ff0000;
	}
</style>
