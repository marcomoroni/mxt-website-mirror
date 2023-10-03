<script lang="ts">
	import { fade } from 'svelte/transition';
	import MxtLogoNoPadding from './MxtLogoNoPadding.svelte';
	import WidthContainer from './WidthContainer.svelte';

	export let absolutePos = false;
	export let background = false;
	export let showLogo = true;

	let expanded = false;

	const pages = [
		{
			href: '/works',
			label: 'Works'
		},
		{
			href: '/studio',
			label: 'Studio'
		},
		{
			href: '/contacts',
			label: 'Contacts'
		}
	];

	function toggleMenu() {
		expanded = !expanded;
	}
</script>

<div class="container" class:expanded class:abs={absolutePos} class:bg={background}>
	<WidthContainer>
		<nav class="top-bar">
			<button class="nav-bar-toggle style-like-a" on:click={toggleMenu}>Menu</button>
			{#each pages as page}
				<a class="nav-link" href={page.href}>{page.label}</a>
			{/each}
			{#if showLogo}
				<a transition:fade={{ duration: 100 }} class="home-link" href="/"><MxtLogoNoPadding /></a>
			{/if}
		</nav>
	</WidthContainer>
</div>

<style>
	.container {
		width: 100%;
		transition: background-color 1s var(--curve);
	}

	.top-bar {
		display: block;
		padding-top: 19px;
		padding-bottom: 22px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		gap: 30px;
		position: relative;
	}

	.nav-bar-toggle {
		display: none;
	}

	.nav-bar-toggle::after {
		transform: translateY(-35%) rotate(45deg) scale(1);
		border-bottom: 1.5px solid var(--color-primary);
		border-right: 1.5px solid var(--color-primary);
		content: '';
		display: inline-block;
		height: 8px;
		margin: 0 2px 0 8px;
		vertical-align: middle;
		width: 8px;
	}

	.expanded .nav-bar-toggle::after {
		transform: translateY(1px) rotate(225deg) scale(1);
	}

	.home-link {
		position: absolute;
		right: 0;
		top: 19px;
		width: 70px;
	}

	:not(.expanded).abs {
		position: absolute;
	}

	.bg {
		background-color: var(--color-top-bar);
	}

	@media (max-width: 700px) {
		.container.expanded {
			/* Force color. */
			background-color: var(--color-top-bar);
		}

		.top-bar {
			flex-direction: column;
			height: unset;
			align-items: flex-start;
			gap: 19px;
		}

		.nav-bar-toggle {
			display: block;
		}

		.nav-link {
			display: none;
		}

		.expanded .nav-link {
			display: block;
		}
	}
</style>
