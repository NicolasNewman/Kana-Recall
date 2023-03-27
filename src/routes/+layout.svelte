<script>
	import '../app.css';
	import Titlebar from 'custom-tauri-titlebar';
	import { appWindow } from '@tauri-apps/api/window';
	const titlebar = new Titlebar({
		theme: {
			bgPrimary: '#3e3e3e',
			bgSecondary: '',
			fontPrimary: '#ffffff',
			fontSecondary: ''
		}
	});
	titlebar.addIcon({ type: 'html', data: '学' });
	titlebar.addButton('', { type: 'src', data: 'https://api.iconify.design/mdi:close.svg' }, (e) =>
		appWindow.close()
	);
	titlebar.addTitle('Kana-Learn');
</script>

<slot />
