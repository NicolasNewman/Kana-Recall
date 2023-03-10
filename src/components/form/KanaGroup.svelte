<script lang="ts">
	import Kana from './Kana.svelte';

	/** Kana characters belonging to this group */
	export let characters: string[];
	/** Subset of selected characters belonging to this group */
	export let characterSet: Set<string> = new Set();

	let indeterminate = false;
	let checked = false;

	/** Computes the numbers of kana belonging to this group that appear in the set */
	const getCharactersInSet = () =>
		characters.reduce((prev, cur) => (characterSet.has(cur) ? prev + 1 : prev), 0);

	function onCheckboxClick(e: any) {
		const checkbox = e.target as HTMLInputElement;

		// update the set with the targeted kana
		if (checkbox.checked) characterSet.add(checkbox.value);
		else characterSet.delete(checkbox.value);

		// update the toggle based on the number of kana selected
		console.log([...characterSet]);

		const charsInSet = getCharactersInSet();
		if (charsInSet === characters.length) {
			checked = true;
			indeterminate = false;
		} else if (charsInSet > 0) {
			checked = false;
			indeterminate = true;
		} else {
			checked = false;
			indeterminate = false;
		}
		characterSet = characterSet;
	}

	function onToggleClick(e: any) {
		const toggle = e.target as HTMLInputElement;

		// add/remove all kana to/from the set based on the state of the toggle
		if (toggle.checked) {
			characters.forEach((character) => characterSet.add(character));
			checked = true;
			indeterminate = false;
		} else {
			characters.forEach((character) => characterSet.delete(character));
			checked = false;
			indeterminate = false;
		}
		characterSet = characterSet;
	}
</script>

<div class="flex flex-col w-fit items-center">
	<input
		type="checkbox"
		class="toggle toggle-accent"
		bind:indeterminate
		bind:checked
		on:click={onToggleClick}
	/>
	{#each characters as value}
		<Kana {value} checked={characterSet.has(value)} on:click={onCheckboxClick} />
	{/each}
</div>
