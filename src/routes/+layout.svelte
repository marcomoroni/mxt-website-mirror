<script>
	import TopBar from '$lib/TopBar.svelte';
	import { navBarData } from '$lib/topBarData';

	$: absolutePos = $navBarData === 'home';
	$: background = $navBarData === 'innerPage';
</script>

<TopBar {absolutePos} {background} />

<slot />
