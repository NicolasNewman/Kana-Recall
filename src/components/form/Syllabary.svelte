<script lang="ts">
	import KanaGroup from './KanaGroup.svelte';
	import library, { type Syllabary } from '$lib/syllabary';
	import { union } from '$lib/set';

	/** Controls wheather to display hiragana or katakana */
	export let syllabary: Syllabary;
	export let selected: string[] = [];

	// ===== Primary Kana Variables =====

	/** Is primary toggle fully toggled? */
	let primaryFull = false;
	/** Is primary toggle partially toggled? */
	let primaryPartial = false;
	/** 2d array of kana belonging to the primary group and their subgroups */
	const primary = [
		Object.values(library[syllabary].vowel),
		Object.values(library[syllabary].k),
		Object.values(library[syllabary].s),
		Object.values(library[syllabary].t),
		Object.values(library[syllabary].n),
		Object.values(library[syllabary].h),
		Object.values(library[syllabary].m),
		Object.values(library[syllabary].r),
		Object.values(library[syllabary].y),
		Object.values(library[syllabary].w),
		Object.values(library[syllabary]._n)
	];
	/** Number of kana belonging to the primary group */
	const primarySize = primary.flat().length;
	/** Set of selected kana for the primary group */
	let primarySet = primary.map(() => new Set<string>());
	// update the state of the toggle if the number of selected kana changes
	$: {
		const primaryCount = primarySet.reduce((prev, curr) => prev + curr.size, 0);
		primaryFull = primaryCount === primarySize;
		primaryPartial = primaryCount > 0 && primaryCount < primarySize;
	}

	// ===== Dakuten Kana Variables =====

	/** Is dakuten toggle fully toggled? */
	let dakutenFull = false;
	/** Is dakuten toggle partially toggled? */
	let dakutenPartial = false;
	/** 2d array of kana belonging to the dakuten group and their subgroups */
	const dakuten = [
		Object.values(library[syllabary].g),
		Object.values(library[syllabary].z),
		Object.values(library[syllabary].d),
		Object.values(library[syllabary].b),
		Object.values(library[syllabary].p)
	];
	/** Number of kana belonging to the dakuten group */
	const dakutenSize = dakuten.flat().length;
	/** Set of selected kana for the dakuten group */
	let dakutenSet = dakuten.map(() => new Set<string>());
	// update the state of the toggle if the number of selected kana changes
	$: {
		const dakutenCount = dakutenSet.reduce((prev, curr) => prev + curr.size, 0);
		dakutenFull = dakutenCount === dakutenSize;
		dakutenPartial = dakutenCount > 0 && dakutenCount < dakutenSize;
	}

	$: selected = Array.from(union(...primarySet, ...dakutenSet));

	/**
	 * Handles updating the group's state whenever a toggle is clicked
	 * @param e - event
	 * @param group - which group was responsible for triggering the event
	 */
	function onToggleClick(e: any, group: 'primary' | 'dakuten') {
		const toggle = e.target as HTMLInputElement;

		// temp variable with the correct group for the current invocation
		const kanaList = group === 'primary' ? primary : dakuten;
		// temp variable with the correct set for the current invocation
		const setList = group === 'primary' ? primarySet : dakutenSet;

		// add/remove all kana to/from the set based on the state of the toggle
		if (toggle.checked) {
			kanaList.forEach((kanas, i) => kanas.forEach((kana) => setList[i].add(kana)));
		} else {
			kanaList.forEach((kanas, i) => kanas.forEach((kana) => setList[i].delete(kana)));
		}

		if (group === 'primary') primarySet = primarySet;
		if (group === 'dakuten') dakutenSet = dakutenSet;
	}
</script>

<div class="p-3">
	<div class="flex items-center">
		<input
			type="checkbox"
			class="toggle toggle-accent rotate-[270deg]"
			bind:checked={primaryFull}
			bind:indeterminate={primaryPartial}
			on:click={(e) => onToggleClick(e, 'primary')}
		/>
		<div class="flex mb-3 border-l-2 border-gray-400 pl-3">
			{#each primary as kanas, i}
				<KanaGroup {kanas} bind:set={primarySet[i]} />
			{/each}
		</div>
	</div>
	<div class="flex items-center">
		<input
			type="checkbox"
			class="toggle toggle-accent rotate-[270deg]"
			bind:checked={dakutenFull}
			bind:indeterminate={dakutenPartial}
			on:click={(e) => onToggleClick(e, 'dakuten')}
		/>
		<div class="flex border-l-2 border-gray-400 pl-3">
			{#each dakuten as kanas, i}
				<KanaGroup {kanas} bind:set={dakutenSet[i]} />
			{/each}
		</div>
	</div>
</div>
