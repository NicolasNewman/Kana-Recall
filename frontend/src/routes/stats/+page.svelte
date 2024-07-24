<script lang="ts">
	import { getItem } from '$lib/sessionStorage';
	import { LogicalSize, appWindow } from '@tauri-apps/api/window';
	import { accuracy, count } from '$lib/math';
	import type { Statistic, Syllabary } from '$lib/syllabary';
	import Radio from '../../components/form/Radio.svelte';
	import { routes } from '$lib/router';
	import Chart from '../../components/Chart.svelte';
	import { getContainerHeight, getPlatform } from '$lib/platform';
	import type { EChartOption } from 'echarts';

	type Formatter = EChartOption.Tooltip.Formatter;

	const platform = getPlatform();

	if (platform === 'desktop') {
		appWindow.setSize(new LogicalSize(1000, 600));
	}

	const parseData = () => {
		const data = Object.entries(stats[selectedKana])
			.filter(([key, value]) =>
				selectedMode === 'recall'
					? value.recent.recall.length > 0
					: value.recent.accuracy.length > 0
			)
			.sort((a, b) => accuracy(b[1], selectedMode) - accuracy(a[1], selectedMode));
		return selectedMode === 'recall' ? data.reverse() : data;
	};

	type Mode = 'accuracy' | 'all' | 'recall';
	const kana: Syllabary[] = ['hira', 'kata'];
	const modes: Mode[] = ['accuracy', 'all', 'recall'];
	const stats = getItem('stats');
	const settings = getItem('settings');
	let selectedKana: Syllabary = 'hira';
	let selectedMode: 'all' | 'accuracy' | 'recall' = 'all';
	const modeName: { [key in Mode]: string } = {
		all: 'All Time',
		accuracy: 'Accuracy',
		recall: 'Recall'
	};
	let data = parseData();
	let dataFlat: Record<string, Statistic> = data
		.map((arr) => ({ [arr[0]]: arr[1] }))
		.reduce((prev, curr) => ({ ...prev, ...curr }), {});
	let max = 0;
	let unit = '%';
	let multiplyer = 100;
	$: {
		selectedKana;
		selectedMode;
		data = parseData();
		dataFlat = data
			.map((arr) => ({ [arr[0]]: arr[1] }))
			.reduce((prev, curr) => ({ ...prev, ...curr }), {});

		const tempMaxRecall = data
			.map(([_, value]) => accuracy(value, 'recall'))
			.sort((a, b) => b - a)[0];

		max =
			selectedMode === 'recall'
				? settings.maxRecallDuration < tempMaxRecall
					? settings.maxRecallDuration
					: tempMaxRecall
				: 100;
		unit = selectedMode === 'recall' ? 's' : '%';
		multiplyer = selectedMode === 'recall' ? 1 : 100;
	}

	const bgStyle =
		platform === 'web' ? 'h-[calc(100vh-30px)] mx-4' : platform === 'desktop' ? '' : '';

	const isList = <T,>(x: T | T[]): x is T[] => {
		const temp = x as T[];
		return temp?.length ? true : false;
	};
	const chartTooltipFormatter: Formatter = (params, ticket, callback) => {
		const paramList = isList(params) ? params : [params];
		const datapoint = paramList.map(
			(row) => `
			<div class="tooltip-row">
				<div class="tooltip-circle">
					<span class="circle" style="background-color: ${row.color}"></span>
					<span class="tooltip-series">${row.seriesName}</span>
				</div>
				<div>
					<strong>${row.value}${unit}</strong>
					(n=${Math.round(
						selectedMode === 'recall'
							? count(dataFlat[row.axisValueLabel ?? ''], selectedMode)
							: // @ts-ignore - value is string, incorrect type
								(count(dataFlat[row.axisValueLabel ?? ''], selectedMode) * parseFloat(row.value)) /
									100
					)})
				</div>
			</div>
		`
		);
		return `
		<div>
			<div>${paramList[0].axisValueLabel}</div>
			${datapoint.join('')}
		</div>
		`;
	};
</script>

<div class={`flex w-full overflow-hidden ${bgStyle} ${getContainerHeight()}`}>
	<div class="flex flex-col p-2 ${getContainerHeight()}">
		<span class="border-b border-gray-500">Syllabary</span>
		{#each kana as syllabary}
			<Radio
				value={syllabary}
				label={syllabary === 'hira' ? 'Hiragana' : 'Katakana'}
				bind:bind={selectedKana}
				name="selectedKana"
			/>
		{/each}
		<span class="border-b border-gray-500">Mode</span>
		{#each modes as mode}
			<Radio value={mode} label={modeName[mode]} bind:bind={selectedMode} name="selectedMode" />
		{/each}
		<a href={routes.home} class="btn btn-primary w-full mt-auto">Home</a>
	</div>
	<div class="w-full">
		<Chart
			options={{
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					},
					formatter: chartTooltipFormatter
				},
				grid: {
					top: 80,
					bottom: 30
				},
				dataZoom: [
					{
						type: 'inside',
						yAxisIndex: [0],
						orient: 'vertical',
						start: 25,
						end: 100
					},
					{
						type: 'slider',
						yAxisIndex: [0],
						orient: 'vertical'
					}
				],
				xAxis: [
					{
						type: 'value',
						name: `${selectedMode}`,
						position: 'bottom',
						axisLine: {
							show: true
						},
						axisLabel: {
							formatter: `{value}${unit}`
						},
						splitLine: {
							// lineStyle: {
							// 	type: 'dashed'
							// }
						},
						min: 0,
						max
					}
				],
				yAxis: {
					type: 'category',
					axisTick: {
						alignWithLabel: true
					},
					data: data.map(([key, _]) => key)
				},
				series: [
					{
						name: `${selectedMode} ${selectedMode !== 'recall' ? 'correct' : ''}`,
						type: 'bar',
						stack: 'Total',
						label: {
							// show: true,
							// formatter: '{b}'
						},
						data: data.map(([key, value]) => {
							return {
								value: (accuracy(value, selectedMode) * multiplyer).toFixed(1),

								label: {
									// position: 'right',
								}
							};
						})
					},
					selectedMode === 'all' || selectedMode === 'accuracy'
						? {
								name: `${selectedMode} incorrect`,
								type: 'bar',
								stack: 'Total',
								label: {
									// show: true,
									// formatter: '{b}'
								},
								data: data.map(([key, value]) => {
									return {
										value: (100 - accuracy(value, selectedMode) * multiplyer).toFixed(1),
										label: {
											position: 'right'
										}
									};
								})
							}
						: {}
				]
			}}
		/>
	</div>
</div>

<style>
	:global(.circle) {
		display: block;
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	:global(.tooltip-circle) {
		display: flex;
		align-items: center;
		column-gap: 8px;
	}

	:global(.tooltip-series) {
		line-height: 12px;
	}

	:global(.tooltip-row) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		column-gap: 16px;
	}
</style>
