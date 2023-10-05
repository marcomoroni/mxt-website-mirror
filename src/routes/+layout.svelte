<script lang="ts">
	import TopBar from '$lib/TopBar.svelte';
	import { navBarData } from '$lib/topBarData';
	import { P, match } from 'ts-pattern';

	$: isCaseStudy = match($navBarData)
		.with({ caseStudies: P.select() }, (innerPage) => innerPage !== 'root')
		.otherwise(() => false);
	$: absolutePos = $navBarData === 'home' || isCaseStudy;
	$: background = $navBarData !== 'home' && !isCaseStudy;
	$: foregroundColours = match($navBarData)
		.returnType<'default' | 'monochromeLight' | 'monochromeDark'>()
		.with({ caseStudies: P.select() }, (caseStudy) =>
			match(caseStudy)
				.returnType<'default' | 'monochromeLight' | 'monochromeDark'>()
				.with('stonehenge', () => 'monochromeDark')
				.otherwise(() => 'default')
		)
		.otherwise(() => 'default');
	$: showLogo = $navBarData !== 'home';
	$: highlight = match($navBarData)
		.returnType<undefined | 'caseStudies' | 'studio' | 'contacts'>()
		.with('home', () => undefined)
		.with({ caseStudies: P._ }, () => 'caseStudies')
		.with('studio', () => 'studio')
		.with('contacts', () => 'contacts')
		.exhaustive();
</script>

<TopBar {absolutePos} {background} {foregroundColours} {showLogo} {highlight} />

<slot />
