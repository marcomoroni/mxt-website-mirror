<script lang="ts">
	import MxtLogoNoPadding from './MxtLogoNoPadding.svelte';
	import WidthContainer from './WidthContainer.svelte';

	export let absolutePos = false;
	export let background = false;
	export let foregroundColours: 'default' | 'monochromeLight' | 'monochromeDark' = 'default';
	export let showLogo = true;
	export let highlight: undefined | 'caseStudies' | 'studio' | 'contacts';

	let expanded = false;

	const pages = [
		{
			href: '/case-studies',
			label: 'Case studies',
			highlight: 'caseStudies'
		},
		{
			href: '/studio',
			label: 'Studio',
			highlight: 'studio'
		},
		{
			href: '/contacts',
			label: 'Contacts',
			highlight: 'contacts'
		}
	];

	function toggleMenu() {
		expanded = !expanded;
	}
</script>

<div
	class="container"
	class:expanded
	class:abs={absolutePos}
	class:bg={background}
	class:monochrome-light={foregroundColours === 'monochromeLight'}
	class:monochrome-dark={foregroundColours === 'monochromeDark'}
	class:any-selected={highlight !== undefined}
>
	<WidthContainer>
		<nav class="top-bar">
			<button class="nav-bar-toggle style-like-a" on:click={toggleMenu}>Menu</button>
			{#each pages as page}
				<a class="nav-link" href={page.href} class:current={page.highlight === highlight}
					>{page.label}</a
				>
			{/each}
			{#if showLogo}
				<a class="home-link" href="/"><MxtLogoNoPadding /></a>
			{/if}
		</nav>
	</WidthContainer>
</div>

<style>
	.container {
		width: 100%;
		z-index: 10;
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

	.any-selected .nav-link:not(.current) {
		opacity: 0.6;
	}

	.home-link {
		position: absolute;
		right: 0;
		top: 19px;
		width: 70px;
	}

	.abs {
		position: absolute;
		top: 0;
		left: 0;
	}

	.bg {
		background-color: var(--color-top-bar);
	}

	@media (min-width: 700px) {
		.monochrome-light .nav-link,
		.monochrome-light .nav-bar-toggle {
			color: var(--color-monochrome-light);
		}

		.monochrome-light .nav-bar-toggle::after {
			border-color: var(--color-monochrome-light);
		}

		.monochrome-light .home-link :global(*) {
			fill: var(--color-monochrome-light);
		}

		.monochrome-dark .nav-link,
		.monochrome-dark .nav-bar-toggle {
			color: var(--color-monochrome-dark);
		}

		.monochrome-dark .nav-bar-toggle::after {
			border-color: var(--color-monochrome-dark);
		}

		.monochrome-dark .home-link :global(*) {
			fill: var(--color-monochrome-dark);
		}
	}

	@media (max-width: 700px) {
		.container.expanded {
			/* Force color. */
			background-color: var(--color-top-bar);
		}

		.expanded.abs {
			position: relative;
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

		:not(.expanded).monochrome-light .nav-link,
		:not(.expanded).monochrome-light .nav-bar-toggle {
			color: var(--color-monochrome-light);
		}

		:not(.expanded).monochrome-light .nav-bar-toggle::after {
			border-color: var(--color-monochrome-light);
		}

		:not(.expanded).monochrome-light .home-link :global(*) {
			fill: var(--color-monochrome-light);
		}

		:not(.expanded).monochrome-dark .nav-link,
		:not(.expanded).monochrome-dark .nav-bar-toggle {
			color: var(--color-monochrome-dark);
		}

		:not(.expanded).monochrome-dark .nav-bar-toggle::after {
			border-color: var(--color-monochrome-dark);
		}

		:not(.expanded).monochrome-dark .home-link :global(*) {
			fill: var(--color-monochrome-dark);
		}
	}
</style>
