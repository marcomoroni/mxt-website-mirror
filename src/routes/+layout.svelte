<script lang="ts">
	import TopBar from '$lib/TopBar.svelte';
	import { navBarData } from '$lib/topBarData';
	import { P, match } from 'ts-pattern';

	$: absolutePos = $navBarData === 'home';
	$: background = $navBarData !== 'home';
	$: showLogo = $navBarData !== 'home';
	$: highlight = match($navBarData)
		.returnType<undefined | 'works' | 'studio' | 'contacts'>()
		.with('home', () => undefined)
		.with({ works: P._ }, () => 'works')
		.with('studio', () => 'studio')
		.with('contacts', () => 'contacts')
		.exhaustive();
</script>

<TopBar {absolutePos} {background} {showLogo} {highlight} />

<slot />
