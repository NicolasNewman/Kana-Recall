<script lang="ts">
	import type ApexCharts from 'apexcharts';
	import type { ApexOptions } from 'apexcharts';
	import { onMount } from 'svelte';

	export let options: ApexOptions;

	let ApexChart: typeof ApexCharts;
	let loaded = false;
	let rendering = true;

	const chart = (node: HTMLElement, options: ApexOptions) => {
		if (!loaded) return;
		const chart = new ApexChart(node, options);
		chart.render().then(() => {
			rendering = false;
		});
		return {
			update(options: ApexOptions) {
				rendering = true;
				setTimeout(() => {
					chart.updateOptions(options).then(() => {
						rendering = false;
					});
				}, 1000);
			},
			destroy() {
				chart.destroy();
			}
		};
	};

	onMount(async () => {
		const module = await import('apexcharts');
		ApexChart = module.default;
		window.ApexCharts = ApexChart;
		loaded = true;
	});
</script>

{#if loaded}
	<div class={`${rendering ? 'spinner' : ''} w-full overflow-x-auto`}>
		<div style={rendering ? 'visibility: hidden;' : ''} use:chart={options} />
	</div>
{/if}
