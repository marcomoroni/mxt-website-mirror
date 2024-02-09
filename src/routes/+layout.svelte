<script lang="ts">
	import '../styles/reset.css';
	import '../styles/style.css';
	import { page } from '$app/stores';
	import MxtLogo from '$lib/MXTLogo.svelte';
	import Aurora from '$lib/Aurora.svelte';

	$: inHome = $page.url.pathname === '/';
	let hoveringHomeLink = false;
</script>

<svelte:head>
	<title>MXT</title>
</svelte:head>

<div class="aurora-container">
	<Aurora visible={$page.url.pathname === '/contacts/'} />
</div>

<nav class="top-bar">
	<div class="left">
		<a
			href={inHome ? undefined : '/'}
			class="home-link"
			class:current-page={inHome}
			aria-hidden={inHome}
			aria-label="Home"
			on:mouseenter={() => (hoveringHomeLink = true)}
			on:mouseleave={() => (hoveringHomeLink = false)}
		>
			<div class="logo-container">
				<MxtLogo style={hoveringHomeLink && !inHome ? 'default' : 'glass'} />
			</div>
		</a>
	</div>
	<div class="central">
		<a
			href="/case-studies"
			class="page-link"
			class:current-page={$page.url.pathname === '/case-studies/'}
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
	<div class="right" />
</nav>

<slot />

<style>
	.aurora-container {
		z-index: -1;
		position: fixed;
		width: 100%;
		height: 100dvh;
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
		align-content: center;
		align-items: center;
		transition: opacity 1s var(--ease);
	}

	.home-link.current-page {
		opacity: 0;
		transition-delay: 2s;
	}

	.logo-container {
		width: 60px;
	}
</style>
