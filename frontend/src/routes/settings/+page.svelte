<script lang="ts">
	import { goto } from '$app/navigation';
	import { getPlatform } from '$lib/platform';
	import { routes } from '$lib/router';
	import { getItem, setItem } from '$lib/sessionStorage';
	import { LogicalSize, appWindow } from '@tauri-apps/api/window';

	const platform = getPlatform();

	if (platform === 'desktop') {
		appWindow.setSize(new LogicalSize(350, 500));
	}

	const settings = getItem('settings');

	function save(e: SubmitEvent) {
		const formData = new FormData(e.target as HTMLFormElement);
		const data: any = {};
		for (let field of formData) {
			const [key, value] = field;
			const n = Number.parseInt(value as string);
			data[key] = Number.isNaN(n) ? value : n;
		}
		setItem('settings', data);
		goto(routes.home);
	}

	const bgStyle =
		platform === 'desktop'
			? 'titlebar-vh w-screen'
			: 'aspect-[7/10] w-[350px] border border-gray rounded-md';
</script>

<form class={`flex flex-col p-6 ${bgStyle} justify-between`} on:submit|preventDefault={save}>
	<div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="recentStatCount">
				<span class="label-text text-base">Number of recent answers to save</span>
			</label>
			<input
				type="number"
				name="recentStatCount"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				value={settings.recentStatCount}
			/>
		</div>
	</div>
	<div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="maxRecallDuration">
				<span class="label-text text-base">Maximum amount of time for recalling a kana</span>
			</label>
			<input
				type="number"
				name="maxRecallDuration"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				value={settings.maxRecallDuration}
			/>
		</div>
	</div>
	<div class="mt-4">
		<a href={routes.home} class="btn btn-secondary">Cancel</a>
		<button type="submit" class="btn btn-primary">Save</button>
	</div>
</form>
