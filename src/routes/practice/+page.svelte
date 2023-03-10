<script lang="ts">
	import { appWindow, LogicalSize } from '@tauri-apps/api/window';
	import Syllabary from '../../components/form/Syllabary.svelte';
	appWindow.setSize(new LogicalSize(900, 556));
</script>

<div class="flex p-4">
	<Syllabary syllabary={'hira'} />
</div>
