<script lang="ts">
	/** Kana character of this field */
	export let value: string;
	/** Internal checked state of the field */
	export let checked: boolean = false;
</script>

<label class="cursor-pointer label">
	<span class="label-text mr-2 text-lg">{value}</span>
	<input type="checkbox" class="checkbox" {value} {checked} on:click />
</label>
