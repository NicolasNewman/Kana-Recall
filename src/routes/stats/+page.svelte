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
	let selectedKana: Syllabary = 'hira';
	let selectedMode: 'all' | 'accuracy' | 'recall' = 'all';
	const modeName: { [key in Mode]: string } = {
		all: 'All Time',
		accuracy: 'Accuracy',
		recall: 'Recall'
	};
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
			<Radio value={mode} label={modeName[mode]} bind:bind={selectedMode} name="selectedMode" />
		{/each}
		<a href={routes.home} class="btn btn-primary w-full mt-auto">Home</a>
	</div>
	<Chart
		options={{
			chart: {
				type: 'bar',
				background: 'rgba(0,0,0,0)',
				height: 1250
			},
			plotOptions: {
				bar: {
					horizontal: true,
					dataLabels: {
						position: '-200px'
					}
				}
			},
			dataLabels: {
				style: {
					colors: ['#f00']
				},
				// @ts-ignore
				formatter: function (val, { dataPointIndex }) {
					const dat = data[dataPointIndex][1];
					if (selectedMode === 'accuracy') {
						return `${val}% (${sumArray(dat.recent.accuracy)}/${dat.recent.accuracy})`;
					} else if (selectedMode === 'recall') {
						return `${val}s`;
					}
					return `${val}% (${dat.allTime.correct}/${dat.allTime.correct + dat.allTime.incorrect})`;
				},
				textAnchor: 'start'
			},
			series: [
				{
					name: selectedMode === 'recall' ? 'Recall' : 'Accuracy',
					data: data.map(([key, value]) => ({
						x: key,
						y: (selectedMode === 'recall'
							? accuracy(value, 'recall')
							: accuracy(value, selectedMode) * 100
						).toFixed(2)
					})),
					color: '#0f0'
				}
			],
			xaxis: {
				max: selectedMode === 'recall' ? undefined : 100
			},
			yaxis: {
				labels: {
					style: {
						fontSize: '16'
					},
					offsetX: -4,
					align: 'center',
					offsetY: 3
				}
			},
			theme: {
				mode: 'dark'
			}
		}}
	/>
</div>

<!-- <style>
	:global(.apexcharts-data-labels) {
		transform-box: fill-box;
		transform-origin: center;
		transform: rotate(-90deg);
	}
</style> -->
