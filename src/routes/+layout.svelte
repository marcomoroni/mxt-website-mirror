<script lang="ts">
	import '../styles/reset.css';
	import '../styles/style.css';
	import { page } from '$app/stores';
	import MxtLogo from '$lib/MXTLogo.svelte';
	import Aurora from '$lib/Aurora.svelte';
	import ThreeScene from '$lib/three_scene/ThreeScene.svelte';
	import { P, match } from 'ts-pattern';
	import {
		caseStudiesPageIntersectingCard,
		servicesPageIntersectingSection
	} from '$lib/three_scene/threeStateStores';
	import { crossfade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import FocusHighlight from '$lib/FocusHighlight.svelte';
	import Footer from '$lib/Footer.svelte';
	import {
		getCurrentSectionData as getCurrentServicesSectionData,
		sectionsData as servicesSectionsData
	} from '$lib/servicesData';

	const navLinks = [
		{
			label: 'Services',
			href: '/services'
		},
		{
			label: 'Case studies',
			href: '/case-studies'
		},
		{
			label: 'Contacts',
			href: '/contacts'
		}
	];

	let hoveringHomeLink = false;

	let scrollY: number;
	$: atTopOfWindow = scrollY <= 70;

	$: threeState = match({
		path: $page.route.id,
		servicesSection: getCurrentServicesSectionData($page.route.id),
		caseStudiesPageIntersectingCard: $caseStudiesPageIntersectingCard,
		servicesPageIntersectingSection: $servicesPageIntersectingSection
	})
		.returnType<
			| 'home'
			| 'case-studies'
			| 'case-studies-anchor-a303'
			| 'case-studies-anchor-p2'
			| 'case-studies-anchor-p3'
			| 'case-study-a303'
			| 'case-study-p2'
			| 'case-study-p3'
			| 'service-1'
			| 'service-2'
			| 'service-3'
			| 'contacts'
		>()
		.with({ path: '/' }, () => 'home')
		.with(
			{ path: '/case-studies', caseStudiesPageIntersectingCard: P.select() },
			(s) => s ?? 'case-studies'
		)
		.with({ path: '/case-studies/stonehenge' }, () => 'case-study-a303')
		.with({ path: '/case-studies/p2' }, () => 'case-study-p2')
		.with({ path: '/case-studies/p3' }, () => 'case-study-p3')
		.with(
			{ servicesSection: { data: { associatedState: P.select() } } },
			(associatedState) => associatedState
		)
		.otherwise(() => 'contacts');

	$: threeHidden = match({
		path: $page.route.id,
		atTopOfWindow
	})
		.returnType<boolean>()
		.with({ path: '/contacts' }, () => true)
		.with(
			{ path: '/case-studies/stonehenge', atTopOfWindow: P.select() },
			(atTopOfWindow) => !atTopOfWindow
		)
		.with(
			{ path: '/case-studies/p2', atTopOfWindow: P.select() },
			(atTopOfWindow) => !atTopOfWindow
		)
		.with(
			{ path: '/case-studies/p3', atTopOfWindow: P.select() },
			(atTopOfWindow) => !atTopOfWindow
		)
		.with({ path: '/services', atTopOfWindow: P.select() }, (atTopOfWindow) => !atTopOfWindow)
		.with(
			{ path: servicesSectionsData[0].href, atTopOfWindow: P.select() },
			(atTopOfWindow) => !atTopOfWindow
		)
		.with(
			{ path: servicesSectionsData[1].href, atTopOfWindow: P.select() },
			(atTopOfWindow) => !atTopOfWindow
		)
		.with(
			{ path: servicesSectionsData[2].href, atTopOfWindow: P.select() },
			(atTopOfWindow) => !atTopOfWindow
		)
		.with({ path: '/privacy-policy' }, () => true)
		.otherwise(() => false);
	$: auroraHidden = $page.route.id !== '/contacts';

	const navLinkBackgroundKey = Symbol();
	const [navLinkBackgroundSend, navLinkBackgroundReceive] = crossfade({
		duration: 700,
		easing: quintInOut
	});
</script>

<svelte:window bind:scrollY />

<div class="aurora-container" aria-hidden="true">
	<Aurora visible={!auroraHidden} />
</div>

<div class="three-container" class:visible={!threeHidden} aria-hidden="true">
	<ThreeScene state={threeState} />
</div>

<nav class="top-bar">
	<div class="left">
		<a
			href="/"
			class="home-link"
			aria-label="Home"
			on:mouseenter={() => (hoveringHomeLink = true)}
			on:mouseleave={() => (hoveringHomeLink = false)}
		>
			<div class="logo-container">
				<MxtLogo style={hoveringHomeLink ? 'default' : 'glass'} />
			</div>
			<FocusHighlight overflow={-4} />
		</a>
	</div>
	<div
		class="central"
		class:one-is-selected={$page.route.id
			? navLinks.map(({ href }) => href).includes($page.route.id)
			: false}
	>
		{#each navLinks as navLink}
			{@const isCurrentPage = $page.route.id === navLink.href}
			<a href={navLink.href} class="page-link" class:current-page={isCurrentPage}>
				{navLink.label}
				{#if isCurrentPage}
					<div
						in:navLinkBackgroundSend={{ key: navLinkBackgroundKey }}
						out:navLinkBackgroundReceive={{ key: navLinkBackgroundKey }}
						class="page-link-background"
					/>
				{/if}
				<FocusHighlight overflow={6} cornerRadius={10000} />
			</a>
		{/each}
	</div>
	<div class="right">
		<div class="nav-right-margin" />
	</div>
</nav>

<slot />

<Footer />

<style>
	.aurora-container {
		z-index: -3;
		position: fixed;
		width: 100%;
		height: 100dvh;
	}

	.three-container {
		z-index: -1;
		position: fixed;
		width: 100%;
		height: 100dvh;
	}

	.three-container {
		transition: opacity 2s var(--ease);
	}

	.three-container:not(.visible) {
		opacity: 0;
	}

	.top-bar {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: var(--nav-bar-height);
		z-index: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow-x: scroll;
		scrollbar-width: none;
		transition: filter 0.5s var(--ease);
	}

	.left,
	.right {
		flex: 1 1 0px;
	}

	.central {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100%;
		gap: 10px;
		z-index: 2;
	}

	.page-link {
		position: relative;
		line-height: 40px;
		border-radius: 10000px;
		padding-left: 18px;
		padding-right: 18px;
		text-decoration: none;
		font-weight: 500;
		white-space: nowrap;
	}

	.one-is-selected .page-link:not(.current-page):not(:hover) {
		color: color-mix(in oklab, var(--color-primary), transparent 30%);
	}

	.page-link-background {
		background-color: white;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 10000px;
		z-index: -1;
	}

	.left {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		height: 100%;
	}

	.home-link {
		padding-left: 40px;
		padding-right: 40px;
		align-self: stretch;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.logo-container {
		width: 62px;
	}

	.nav-right-margin {
		width: 30px;
	}

	@media (prefers-reduced-motion: reduce) {
		.three-container {
			transition: none;
		}
	}
</style>
