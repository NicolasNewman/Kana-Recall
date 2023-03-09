<div id="container" class="absolute w-screen h-screen">
	<div class="flex flex-col items-center justify-center h-[390px] m-10">
		<h1 class="text-3xl mb-2">Kana-Learn</h1>
		<a href="/learn" class="btn btn-primary mb-2 w-1/2">Learn</a>
		<div class="dropdown dropdown-end mb-2 w-1/2">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<span tabindex="0" class="btn btn-primary w-full">Practice</span>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
				<li><a href="/practice/hira">Hiragana</a></li>
				<li><a href="/practice/kata">Katakana</a></li>
			</ul>
		</div>
		<a href="/stats" class="btn btn-primary mb-2 w-1/2">Stats</a>
	</div>
</div>

<style>
	#container {
		background-image: url($lib/assets/bg-homescreen.jpg);
	}
</style>
