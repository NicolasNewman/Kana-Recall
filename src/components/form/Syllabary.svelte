<script lang="ts">
	import KanaGroup from './KanaGroup.svelte';
	import library, { type Syllabary } from '$lib/syllabary';

	/** Controls wheather to display hiragana or katakana */
	export let syllabary: Syllabary;

	let set = new Set<string>();
</script>

<div>
	<div class="flex gap-8">
		<div class="flex">
			<KanaGroup characters={Object.values(library[syllabary].vowel)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary].k)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary].s)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary].t)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary].n)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary].h)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary].m)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary].r)} bind:characterSet={set} />
		</div>
		<div class="flex">
			<KanaGroup characters={Object.values(library[syllabary].g)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary].z)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary].d)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary].b)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary].p)} bind:characterSet={set} />
		</div>
	</div>
	<div>
		<div class="flex">
			<KanaGroup characters={Object.values(library[syllabary].y)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary].w)} bind:characterSet={set} />
			<KanaGroup characters={Object.values(library[syllabary]._n)} bind:characterSet={set} />
		</div>
		<p>{[...set]}</p>
	</div>
</div>
