<script lang="ts">
	import Kana from './Kana.svelte';

	/** Kana characters belonging to this group */
	export let kanas: string[];
	/** Subset of selected kana belonging to this group */
	export let set: Set<string> = new Set();

	/** Is the group's toggle fully toggled? */
	let toggleFull = false;
	/** Is the group's toggle fully partially? */
	let togglePartial = false;
	// update the state of the toggle bools if the size of the set changes
	$: toggleFull = set.size === kanas.length;
	$: togglePartial = set.size > 0 && set.size < kanas.length;

	function onCheckboxClick(e: any) {
		const checkbox = e.target as HTMLInputElement;

		// update the set with the targeted kana
		if (checkbox.checked) set.add(checkbox.value);
		else set.delete(checkbox.value);

		set = set;
	}

	function onToggleClick(e: any) {
		const toggle = e.target as HTMLInputElement;

		// add/remove all kana to/from the set based on the state of the toggle
		if (toggle.checked) {
			kanas.forEach((kana) => set.add(kana));
		} else {
			kanas.forEach((kana) => set.delete(kana));
		}
		set = set;
	}
</script>

<div class="flex flex-col items-center">
	<input
		type="checkbox"
		class="toggle toggle-accent"
		bind:checked={toggleFull}
		bind:indeterminate={togglePartial}
		on:click={onToggleClick}
	/>
	<div class="flex flex-col w-fit items-center grow-[1] justify-between">
		{#each kanas as kana}
			<Kana {kana} checked={set.has(kana)} on:click={onCheckboxClick} />
		{/each}
	</div>
</div>
