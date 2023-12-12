<script lang="ts">
	import DevControls from '$lib/DevControls.svelte';
	import TopBar from '$lib/TopBar.svelte';
	import Dots from '$lib/three_vanilla/Dots.svelte';
	import { navBarData } from '$lib/topBarData';
	import { derived, writable, type Writable } from 'svelte/store';
	import { P, match } from 'ts-pattern';

	$: isCaseStudy = match($navBarData)
		.with({ caseStudies: P.select() }, (innerPage) => innerPage !== 'root')
		.otherwise(() => false);
	$: absolutePos = $navBarData === 'home' || isCaseStudy;
	// $: background = $navBarData !== 'home' && !isCaseStudy;
	$: background = false;
	// $: foregroundColours = match($navBarData)
	// 	.returnType<'default' | 'monochromeLight' | 'monochromeDark'>()
	// 	.with({ caseStudies: P.select() }, (caseStudy) =>
	// 		match(caseStudy)
	// 			.returnType<'default' | 'monochromeLight' | 'monochromeDark'>()
	// 			.with('stonehenge', () => 'monochromeDark')
	// 			.otherwise(() => 'default')
	// 	)
	// 	.otherwise(() => 'default');
	$: foregroundColours = (() => {
		return 'default' as 'default' | 'monochromeLight' | 'monochromeDark';
	})();
	$: showLogo = $navBarData !== 'home';
	$: highlight = match($navBarData)
		.returnType<undefined | 'caseStudies' | 'studio' | 'contacts'>()
		.with(undefined, () => undefined)
		.with('home', () => undefined)
		.with({ caseStudies: P._ }, () => 'caseStudies')
		.with('studio', () => 'studio')
		.with('contacts', () => 'contacts')
		.exhaustive();

	let modelLoaded = false;

	const dotsEffectScenario = derived(navBarData, ($navBarData) =>
		$navBarData === undefined
			? undefined
			: {
					accentColorsActive: $navBarData === 'home',
					fitModel: match($navBarData)
						.returnType<'No' | { Yes: { name: string } }>()
						.with({ caseStudies: 'stonehenge' }, () => ({
							Yes: {
								name: 'stonehenge'
							}
						}))
						.otherwise(() => 'No')
			  }
	);
</script>

<div class="three-container" class:loading={!modelLoaded}>
	<Dots
		scenario={$dotsEffectScenario}
		on:modelLoaded={() => {
			modelLoaded = true;
		}}
	/>
</div>

<TopBar {absolutePos} {background} {foregroundColours} {showLogo} {highlight} />

<slot />

<DevControls />

<style>
	.three-container {
		position: fixed;
		width: 100dvw;
		height: 100dvh;
		overflow: hidden;
		z-index: -10; /* todo: it is not interactable */
		transition: opacity 2s var(--curve);
	}

	.three-container.loading {
		opacity: 0;
	}
</style>
