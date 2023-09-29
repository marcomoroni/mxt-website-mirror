<script>
	import TopBar from '$lib/TopBar.svelte';
	import { navBarData } from '$lib/topBarData';

	$: absolutePos = $navBarData === 'home';
	$: background = $navBarData === 'innerPage';
	$: showLogo = $navBarData !== 'home';
</script>

<TopBar {absolutePos} {background} {showLogo} />

<slot />
