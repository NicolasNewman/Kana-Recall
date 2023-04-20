<script lang="ts">
	import { routes } from '$lib/router';
	import { getItem, resetSession, setItem } from '$lib/sessionStorage';
	import { LogicalSize, appWindow } from '@tauri-apps/api/window';

	appWindow.setSize(new LogicalSize(350, 500));

	const settings = getItem('settings');

	function save(e: SubmitEvent) {
		const formData = new FormData(e.target as HTMLFormElement);
		const data: any = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		setItem('settings', data);
	}
</script>

<form
	class="flex flex-col p-6 w-screen titlebar-vh justify-between"
	on:submit|preventDefault={save}
>
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
			<label class="label" for="recentStatCount">
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
	<div>
		<a href={routes.home} class="btn btn-secondary">Cancel</a>
		<button type="submit" class="btn btn-primary">Save</button>
	</div>
</form>
