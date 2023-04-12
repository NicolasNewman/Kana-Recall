<script lang="ts">
	import { getItem } from '$lib/sessionStorage';
	import { LogicalSize, appWindow } from '@tauri-apps/api/window';
	import { accuracy, sumArray } from '$lib/math';
	import type { Statistic, Syllabary } from '$lib/syllabary';
	import Radio from '../../components/form/Radio.svelte';
	import { routes } from '$lib/router';
	import Chart from '../../components/Chart.svelte';

	appWindow.setSize(new LogicalSize(1000, 600));

	const parseData = () => {
		return Object.entries(stats[selectedKana])
			.filter(([key, value]) => value.recent.length > 0)
			.sort((a, b) => accuracy(b[1], selectedMode) - accuracy(a[1], selectedMode));
	};

	const kana: Syllabary[] = ['hira', 'kata'];
	const modes = ['recent', 'all'];
	const stats = getItem('stats');
	let selectedKana: Syllabary = 'hira';
	let selectedMode: 'all' | 'recent' = 'all';
	let data = parseData();

	$: {
		selectedKana;
		selectedMode;
		data = parseData();
	}
</script>

<div class="flex h-[calc(100vh-30px)] overflow-hidden">
	<div class="flex flex-col p-2 h-[calc(100vh-30px)]">
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
			<Radio
				value={mode}
				label={mode === 'all' ? 'All Time' : 'Recent'}
				bind:bind={selectedMode}
				name="selectedMode"
			/>
		{/each}
		<a href={routes.home} class="btn btn-primary w-full mt-auto">Home</a>
	</div>
	<Chart
		options={{
			chart: {
				type: 'bar',
				// stacked: true,
				// stackType: '100%',
				background: 'rgba(0,0,0,0)',
				// width: 1000,
				height: 1000
			},
			plotOptions: {
				bar: {
					horizontal: true
				}
			},
			dataLabels: {
				style: {
					colors: ['#f00']
				},
				// @ts-ignore
				formatter: function (val, { dataPointIndex }) {
					// console.log(opts);
					const dat = data[dataPointIndex][1];
					if (selectedMode === 'recent') {
						return `${val}% (${sumArray(dat.recent)}/${dat.recent.length})`;
					}
					return `${val}% (${dat.allTime.correct}/${dat.allTime.correct + dat.allTime.incorrect})`;
				}
			},
			series: [
				{
					name: 'Accuracy',
					data: data.map(([key, value]) => ({ x: key, y: (accuracy(value) * 100).toFixed(2) })),
					color: '#0f0'
				}
				// {
				// 	name: 'Correct',
				// 	data: data.map(([key, value]) => {
				// 		return value.allTime.correct;
				// 	}),
				// 	color: '#0f0'
				// },
				// {
				// 	name: 'Incorrect',
				// 	data: data.map(([key, value]) => {
				// 		return value.allTime.incorrect;
				// 	}),
				// 	color: '#f00'
				// }
			],
			xaxis: {
				// categories: labels,
				max: 100
			},
			theme: {
				mode: 'dark'
			}
		}}
	/>
	<!-- <Chart
		options={{
			chart: {
				type: 'bar',
				stacked: true,
				stackType: '100%',
				background: 'rgba(0,0,0,0)',
				width: 1000,
				height: 550
			},
			dataLabels: {
				style: {}
			},
			series: [
				{
					name: 'Correct',
					data: data.map(([key, value]) => {
						return value.allTime.correct;
					}),
					color: '#0f0'
				},
				{
					name: 'Incorrect',
					data: data.map(([key, value]) => {
						return value.allTime.incorrect;
					}),
					color: '#f00'
				}
			],
			xaxis: {
				categories: labels
			},
			theme: {
				mode: 'dark'
			}
		}}
	/> -->
</div>

<!-- <style>
	:global(.apexcharts-data-labels) {
		transform-box: fill-box;
		transform-origin: center;
		transform: rotate(-90deg);
	}
</style> -->
