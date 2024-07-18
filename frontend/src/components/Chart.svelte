<script lang="ts">
	import { BarChart } from 'echarts/charts';
	import { type EChartOption } from 'echarts';
	import { GridComponent, TitleComponent } from 'echarts/components';
	import { init, use } from 'echarts/core';
	import { CanvasRenderer } from 'echarts/renderers';
	import { Chart } from 'svelte-echarts';

	export let options: EChartOption;

	use([BarChart, GridComponent, CanvasRenderer, TitleComponent]);
</script>

<div class="h-full w-full">
	<Chart {init} {options} />
</div>
