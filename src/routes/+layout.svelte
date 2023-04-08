<script>
	import '../app.css';
	import Titlebar from 'custom-tauri-titlebar';
	import { appWindow } from '@tauri-apps/api/window';
	import { getItem, readFromDisk, writeToDisk } from '$lib/sessionStorage';

	const titlebar = new Titlebar({
		theme: {
			bgPrimary: '#3e3e3e',
			bgSecondary: '',
			fontPrimary: '#ffffff',
			fontSecondary: ''
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
	titlebar.addTitle('Kana-Learn');

	const promise = readFromDisk();
</script>

{#await promise}
	<p>Loading...</p>
{:then}
	<slot />
{:catch err}
	<p>Error loading page {err}</p>
{/await}
