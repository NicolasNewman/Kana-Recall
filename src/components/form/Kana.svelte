<script lang="ts">
	/** Kana character of this field */
	export let kana: string;
	/** Is the checkbox checked? */
	export let checked: boolean = false;
</script>

<label class="cursor-pointer label">
	<span class="label-text mr-2 text-lg">{kana}</span>
	<input type="checkbox" class="checkbox" value={kana} {checked} on:click />
</label>
