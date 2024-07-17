<script lang="ts">
	import { setItem } from '$lib/sessionStorage';
	import Syllabary from '../../components/form/Syllabary.svelte';
	import { routes } from '$lib/router';
	import { goto } from '$app/navigation';
	import { getPlatform } from '$lib/platform';
	import { appWindow, LogicalSize } from '@tauri-apps/api/window';

	const platform = getPlatform();
	const bgStyle = platform === 'web' ? 'border-gray border rounded-md' : '';

	if (platform === 'desktop') {
		appWindow.setSize(new LogicalSize(900, 586));
	}

	let active: 'hira' | 'kata' = 'hira';

	let hiragana: string[] = [];
	let katakana: string[] = [];

	function onStartClicked() {
		setItem('keyset', [...hiragana, ...katakana]);
		goto(routes.test('practice'));
	}
</script>

<div class={`flex p-4 aspect-[20/13] w-[900px] ${bgStyle}`}>
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
		<div class="flex flex-col">
			<a href={routes.home} class="btn btn-secondary mb-4">Back</a>
			<button class="btn btn-primary" on:click={onStartClicked}>Start</button>
		</div>
	</div>
	<div hidden={active === 'kata'}>
		<Syllabary syllabary={'hira'} bind:selected={hiragana} />
	</div>
	<div hidden={active === 'hira'}>
		<Syllabary syllabary={'kata'} bind:selected={katakana} />
	</div>
</div>
