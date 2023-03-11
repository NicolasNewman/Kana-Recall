<script lang="ts">
	import { routes } from '$lib/router';
	import { setItem } from '$lib/sessionStorage';
	import { kanaCharacters, type Syllabary } from '$lib/syllabary';

	function onTestClicked(mode: Syllabary) {
		setItem('keyset', kanaCharacters[mode]);
		window.location.href = routes.test('test');
	}
</script>

<div id="container" class="absolute w-screen h-screen">
	<div class="flex flex-col items-center justify-center h-[390px] m-10">
		<h1 class="text-3xl mb-2">Kana-Learn</h1>
		<a href={routes.practice} class="btn btn-primary mb-2 w-1/2">Practice</a>
		<div class="dropdown dropdown-end mb-2 w-1/2">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<span tabindex="0" class="btn btn-primary w-full">Test</span>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
				<li><button on:click={(e) => onTestClicked('hira')}>Hiragana</button></li>
				<li><button on:click={(e) => onTestClicked('kata')}>Katakana</button></li>
			</ul>
		</div>
		<a href={routes.stats} class="btn btn-primary mb-2 w-1/2">Stats</a>
	</div>
</div>

<style>
	#container {
		background-image: url($lib/assets/bg-homescreen.jpg);
	}
</style>
