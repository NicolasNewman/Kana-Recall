<script lang="ts">
	export let label: string;
	export let value: any;
	export let bind: string;
	export let name: string;
</script>

<div class="form-control">
	<label class="label cursor-pointer">
		<span class="label-text mr-1">{label}</span>
		<input type="radio" bind:group={bind} {name} class="radio" {value} />
	</label>
</div>
