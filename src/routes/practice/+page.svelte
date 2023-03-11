<script lang="ts">
	import { setItem } from '$lib/sessionStorage';
	import Syllabary from '../../components/form/Syllabary.svelte';
	import { appWindow, LogicalSize } from '@tauri-apps/api/window';
	import { routes } from '$lib/router';
	appWindow.setSize(new LogicalSize(900, 556));

	let active: 'hira' | 'kata' = 'hira';

	let hiragana: string[] = [];
	let katakana: string[] = [];

	function onStartClicked() {
		setItem('keyset', [...hiragana, ...katakana]);
		window.location.href = routes.test('practice');
	}
</script>

<div class="flex p-4">
	<div class="flex flex-col justify-between">
		<ul class="menu bg-base-100 min-w-[10rem]">
			<li>
				<button on:click={() => (active = 'hira')} class={`${active === 'hira' ? 'active' : ''}`}
					>Hiragana ({hiragana.length})</button
				>
			</li>
			<li>
				<button on:click={() => (active = 'kata')} class={`${active === 'kata' ? 'active' : ''}`}
					>Katakana ({katakana.length})</button
				>
			</li>
		</ul>
		<button class="btn btn-primary" on:click={onStartClicked}>Start</button>
	</div>
	<div hidden={active === 'kata'}>
		<Syllabary syllabary={'hira'} bind:selected={hiragana} />
	</div>
	<div hidden={active === 'hira'}>
		<Syllabary syllabary={'kata'} bind:selected={katakana} />
	</div>
</div>
