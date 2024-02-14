<script lang="ts">
	import '../styles/reset.css';
	import '../styles/style.css';
	import { page } from '$app/stores';
	import MxtLogo from '$lib/MXTLogo.svelte';
	import Aurora from '$lib/Aurora.svelte';
	import ThreeScene from '$lib/ThreeScene.svelte';
	import { P, match } from 'ts-pattern';
	import { caseStudiesPageIntersectingCard } from '$lib/threeStateStores';
	import { onMount } from 'svelte';

	let mounted = false;

	let hoveringHomeLink = false;

	let scrollY: number;
	$: atTopOfWindow = scrollY <= 40;

	$: threeState = match({
		path: $page.url.pathname,
		caseStudiesPageIntersectingCard: $caseStudiesPageIntersectingCard
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
			| 'studio'
			| 'contacts'
		>()
		.with({ path: '/' }, () => 'home')
		.with(
			{ path: '/case-studies/', caseStudiesPageIntersectingCard: P.select() },
			(s) => s ?? 'case-studies'
		)
		.with({ path: '/case-studies/stonehenge/' }, () => 'case-study-a303')
		.with({ path: '/case-studies/p2/' }, () => 'case-study-p2')
		.with({ path: '/case-studies/p3/' }, () => 'case-study-p3')
		.with({ path: '/studio/' }, () => 'studio')
		.otherwise(() => 'contacts');

	$: threeHidden = match({
		path: $page.url.pathname,
		atTopOfWindow
	})
		.returnType<boolean>()
		.with({ path: '/' }, () => false)
		.with({ path: '/case-studies/' }, () => false)
		.with(
			{ path: '/case-studies/stonehenge/', atTopOfWindow: P.select() },
			(atTopOfWindow) => !atTopOfWindow
		)
		.with(
			{ path: '/case-studies/p2/', atTopOfWindow: P.select() },
			(atTopOfWindow) => !atTopOfWindow
		)
		.with(
			{ path: '/case-studies/p3/', atTopOfWindow: P.select() },
			(atTopOfWindow) => !atTopOfWindow
		)
		.with({ path: '/studio/', atTopOfWindow: P.select() }, (atTopOfWindow) => !atTopOfWindow)
		.otherwise(() => false);

	function initialScroll(el: HTMLElement) {
		let w = el.getElementsByClassName('home-link')[0]!.clientWidth;
		w -= 30;
		el.scroll(w, 0);

		// Since this scroll happens when the element is mounted, the the nav bar until it is mounted.
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title>MXT</title>
</svelte:head>

<div class="aurora-container">
	<Aurora visible={$page.url.pathname === '/contacts/'} />
</div>

<div class="three-container" class:hidden={threeHidden}>
	<ThreeScene state={threeState} />
</div>

<nav class="top-bar" use:initialScroll class:not-ready={!mounted}>
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
		</a>
	</div>
	<div class="central">
		<a
			href="/case-studies"
			class="page-link"
			class:current-page={$page.url.pathname.startsWith('/case-studies/')}
		>
			Case studies
		</a>
		<a href="/studio" class="page-link" class:current-page={$page.url.pathname === '/studio/'}>
			Studio
		</a>
		<a href="/contacts" class="page-link" class:current-page={$page.url.pathname === '/contacts/'}>
			Contacts
		</a>
	</div>
	<div class="right">
		<div class="nav-right-margin" />
	</div>
</nav>

<slot />

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
		transition: opacity 1s var(--ease) 0.2s;
	}

	.three-container.hidden {
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
		transition: opacity 1s var(--ease) 0.5s;
	}

	.top-bar.not-ready {
		opacity: 0;
	}

	.left,
	.right {
		flex: 1 1 0px;
	}

	.central {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.page-link {
		line-height: 40px;
		border-radius: 10000px;
		padding-left: 18px;
		padding-right: 18px;
		text-decoration: none;
		font-weight: 500;
		white-space: nowrap;
	}

	.page-link.current-page {
		background-color: white;
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
	}

	.logo-container {
		width: 62px;
	}

	.nav-right-margin {
		width: 30px;
	}
</style>
