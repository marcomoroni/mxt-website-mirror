<script lang="ts">
	import '../styles/reset.css';
	import '../styles/style.css';
	import { page } from '$app/stores';
	import MxtLogo from '$lib/MXTLogo.svelte';
	import Aurora from '$lib/Aurora.svelte';
	import ThreeScene from '$lib/three_scene/ThreeScene.svelte';
	import { P, match } from 'ts-pattern';
	import { servicesPageIntersectingSection } from '$lib/three_scene/threeStateStores';
	import { crossfade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import FocusHighlight from '$lib/FocusHighlight.svelte';
	import Footer from '$lib/Footer.svelte';
	import {
		getCurrentSectionData as getCurrentServicesSectionData,
		sectionsData as servicesSectionsData
	} from '$lib/servicesData';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const { caseStudies } = data;

	const navLinks = [
		{
			label: 'Services',
			href: '/services/'
		},
		{
			label: 'Case studies',
			href: '/case-studies/'
		},
		{
			label: 'Contacts',
			href: '/contacts/'
		}
	];

	let hoveringHomeLink = false;

	let scrollY: number;
	$: atTopOfWindow = scrollY <= 70;

	$: threeState = (() => {
		const path = $page.url.pathname;
		const caseStudy = caseStudies.find(({ slug }) => `/case-studies/${slug}/` == path);
		if (caseStudy) {
			if (caseStudy.threeState === 'none') {
				return 'case-studies';
			} else {
				return caseStudy.threeState;
			}
		} else {
			return match({
				path: path,
				servicesSection: getCurrentServicesSectionData(path),
				servicesPageIntersectingSection: $servicesPageIntersectingSection
			})
				.returnType<
					'home' | 'case-studies' | 'service-1' | 'service-2' | 'service-3' | 'contacts'
				>()
				.with({ path: '/' }, () => 'home')
				.with({ path: '/case-studies/' }, () => 'case-studies')
				.with(
					{ servicesSection: { data: { associatedState: P.select() } } },
					(associatedState) => associatedState
				)
				.otherwise(() => 'contacts');
		}
	})();

	$: threeHidden = match({
		url: $page.url.pathname,
		atTopOfWindow
	})
		.returnType<boolean>()
		.with({ url: '/contacts/' }, () => true)
		.with({ url: '/case-studies/', atTopOfWindow: P.select() }, (atTopOfWindow) => !atTopOfWindow)
		.with({ url: '/services/', atTopOfWindow: P.select() }, (atTopOfWindow) => !atTopOfWindow)
		.with(
			{ url: servicesSectionsData[0].href, atTopOfWindow: P.select() },
			(atTopOfWindow) => !atTopOfWindow
		)
		.with(
			{ url: servicesSectionsData[1].href, atTopOfWindow: P.select() },
			(atTopOfWindow) => !atTopOfWindow
		)
		.with(
			{ url: servicesSectionsData[2].href, atTopOfWindow: P.select() },
			(atTopOfWindow) => !atTopOfWindow
		)
		.with({ url: '/privacy-policy/' }, () => true)
		.otherwise(({ url, atTopOfWindow }) => {
			if (url.startsWith('/case-studies/')) {
				return !atTopOfWindow;
			}
			return false;
		});
	$: auroraHidden = $page.url.pathname !== '/contacts/';

	const navLinkBackgroundKey = Symbol();
	const [navLinkBackgroundSend, navLinkBackgroundReceive] = crossfade({
		duration: 700,
		easing: quintInOut
	});

	let topBarContainerWidth: number = 0;
	let topBarWidth: number = 0;
	let topBarOffsetX: number = 0;
	function useToShowScrollHints(el: HTMLElement) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				topBarWidth = entry.target.scrollWidth;
			});
		});
		observer.observe(el);

		el.onscroll = () => {
			topBarOffsetX = el.scrollLeft;
		};

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
	$: topBarIsScrollable = topBarContainerWidth < topBarWidth;
	$: showScrollHintLeft = topBarIsScrollable && topBarOffsetX > 0;
	$: showScrollHintRight = topBarIsScrollable && topBarOffsetX < topBarWidth - topBarContainerWidth;
</script>

<svelte:window bind:scrollY />

<div class="aurora-container" aria-hidden="true">
	<Aurora visible={!auroraHidden} />
</div>

<div class="three-container" class:visible={!threeHidden} aria-hidden="true">
	<ThreeScene state={threeState} />
</div>

<div class="top-bar-container" bind:clientWidth={topBarContainerWidth}>
	<div class="scroll-hint l" class:hidden={!showScrollHintLeft}>
		<div class="scroll-hint-icon-container">
			<div class="scroll-hint-icon" />
		</div>
	</div>
	<div class="scroll-hint r" class:hidden={!showScrollHintRight}>
		<div class="scroll-hint-icon-container">
			<div class="scroll-hint-icon" />
		</div>
	</div>
	<nav class="top-bar" use:useToShowScrollHints>
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
			class:one-is-selected={$page.url.pathname
				? navLinks.map(({ href }) => href).includes($page.url.pathname)
				: false}
		>
			{#each navLinks as navLink}
				{@const isCurrentPage = $page.url.pathname.startsWith(navLink.href)}
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
</div>

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

	.top-bar-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.top-bar {
		height: var(--nav-bar-height);
		z-index: 1;
		overflow-x: scroll;
		scrollbar-width: none;
		display: flex;
		flex-direction: row;
		align-items: center;
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

	.scroll-hint {
		position: absolute;
		top: 0;
		height: 100%;
		width: 50px;
		z-index: 5;
		pointer-events: none;
		display: grid;
		transition: opacity 0.5s ease-in-out;
	}

	.scroll-hint.hidden {
		opacity: 0;
	}

	.scroll-hint.l {
		left: 0;
	}

	.scroll-hint.r {
		right: 0;
	}

	.scroll-hint-icon-container {
		align-self: center;
		justify-self: center;
		width: 21px;
		height: 56px;
		background: #bcbcbc2c;
		display: grid;
		border-radius: 99999px;
		backdrop-filter: blur(10px);
	}

	.scroll-hint.l .scroll-hint-icon-container {
		transform: rotate(180deg);
	}

	.scroll-hint-icon {
		align-self: center;
		justify-self: center;
		border-right: 2px solid var(--color-primary);
		border-top: 2px solid var(--color-primary);
		height: 10px;
		-webkit-transform: translateY(0) rotate(45deg) scale(1);
		-ms-transform: translateY(0) rotate(45deg) scale(1);
		transform: translateY(0) rotate(45deg) scale(1);
		width: 10px;
		margin-right: 5px;
	}

	@media (prefers-reduced-motion: reduce) {
		.three-container {
			transition: none;
		}
	}
</style>
