<script lang="ts">
	import { fade } from 'svelte/transition';
	import MxtLogoNoPadding from './MxtLogoNoPadding.svelte';
	import WidthContainer from './WidthContainer.svelte';

	export let absolutePos = false;
	export let background = false;
	export let showLogo = true;

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

	$: absolutePosClass = absolutePos ? 'abs' : '';
	$: backgroundClass = background ? 'bg' : '';
</script>

<div class="container {absolutePosClass} {backgroundClass}">
	<WidthContainer>
		<nav class="top-bar">
			{#each pages as page}
				<a href={page.href}>{page.label}</a>
			{/each}
			<div class="spacer" />
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
		height: 60px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		gap: 30px;
	}

	.spacer {
		flex: 1;
	}

	.home-link {
		/* Visual adjustement. */
		margin-top: 3px;

		width: 70px;
	}

	.abs {
		position: absolute;
	}

	.bg {
		background-color: #ede9e6;
	}
</style>
