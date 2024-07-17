<script>
	import '../app.scss';
	import Titlebar from 'custom-tauri-titlebar';
	import { appWindow } from '@tauri-apps/api/window';
	import { readFromDisk, resetSession, writeToDisk } from '$lib/sessionStorage';
	import { routes } from '$lib/router';
	import { goto } from '$app/navigation';
	import { getPlatform } from '$lib/platform';

	const platform = getPlatform();

	if (platform === 'desktop') {
		const titlebar = new Titlebar({
			theme: {
				bgPrimary: '#3e3e3e',
				bgSecondary: '#2e2e2e',
				fontPrimary: '#ffffff',
				fontSecondary: '#ffffff'
			}
		});
		titlebar.addIcon({ type: 'html', data: '学' });
		titlebar.addButton(
			'btn-close',
			{ type: 'src', data: 'https://api.iconify.design/mdi:close.svg' },
			async (e) => {
				await writeToDisk();
				appWindow.close();
			}
		);
		titlebar.addTitle('Kana-Recall');
		titlebar.addMenu({
			label: 'File',
			items: [
				{
					type: 'item',
					label: 'Settings',
					action: () => {
						goto(routes.settings);
					}
					// shortcut: { key: 's', ctrl: true } TODO doesn't work
				},
				{
					type: 'item',
					label: 'Reset',
					action: () => {
						window.location.href = '#modal';
					}
				}
			]
		});
	}

	const promise = readFromDisk();

	const resetData = () => {
		resetSession();
		window.location.href = '#';
	};
</script>

{#await promise}
	<p>Loading...</p>
{:then}
	{#if platform === 'desktop'}
		<div class="absolute w-screen h-[calc(100vh-30px)]">
			<slot />
		</div>
	{:else if platform === 'web'}
		<div class="w-screen h-screen flex justify-center items-center">
			<slot />
		</div>
	{:else}
		<slot />
	{/if}

	<div class="modal" id="modal">
		<div class="modal-box">
			<h3 class="font-bold text-lg">Are you sure?</h3>
			<p class="py-4">
				Clicking confirm will reset <strong>all</strong> data to the default state.
			</p>
			<div class="modal-action">
				<a href="#" class="btn">Cancel</a>
				<button on:click|preventDefault={resetData} class="btn btn-error">Confirm</button>
			</div>
		</div>
	</div>
{:catch err}
	<p>Error loading page {err}</p>
{/await}
