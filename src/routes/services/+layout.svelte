<script lang="ts">
	import { page } from '$app/stores';
	import AccessibleHiddenHeader from '$lib/AccessibleHiddenHeader.svelte';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';
	import { getCurrentSectionData, sectionsData } from '$lib/servicesData';
	import Tab from '$lib/services_page/Tab.svelte';
	import * as Content from '$lib/services_page/content';
	import { accentColourInServicesProps } from '$lib/three_scene/threeStateStores';

	$: currentSectionIndex = (() => {
		const sectionData = getCurrentSectionData($page.url.pathname);
		if (sectionData === undefined) {
			console.error('this should never happen');
			return 0;
		}
		return sectionData.index;
	})();
</script>

<svelte:head>
	<title>{mxtHeadTitle('Services')}</title>
	<meta property="og:title" content="Services" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://mxt.co.uk/services/" />
	<meta property="og:image" content="https://mxt.co.uk/preview.png" />
</svelte:head>

<AccessibleHiddenHeader text="Services" />

<div class="main-grid">
	<div class="landing-space" />

	<div class="tabs-container">
		<div class="tabs-margin-top" />

		<ul role="tablist" class="tabs">
			{#each sectionsData as sectionData, i}
				<li class="tab-item" data-col={i}>
					<Tab
						title={sectionData.title}
						subtitle={sectionData.subtitle}
						href={sectionData.href}
						isActive={currentSectionIndex === i}
					/>
				</li>
			{/each}
		</ul>

		<div
			class="bar"
			style:background-color={`color-mix(in oklab, var(--color-primary) 5%, ${$accentColourInServicesProps})`}
		/>
	</div>

	{#each sectionsData as _sectionData, i}
		<section
			class="section-content"
			role="tabpanel"
			inert={currentSectionIndex !== i}
			style:display={currentSectionIndex === i ? 'block' : 'none'}
		>
			{#if i === 0}
				<Content.DigitalInfrastructure />
			{:else if i === 1}
				<Content.DrivingSimulation />
			{:else if i === 2}
				<Content.LearningAndDevelopment />
			{/if}
		</section>
	{/each}
</div>

<slot />

<style>
	.main-grid {
		--tabs-line-size: 4px;
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: var(--case-study-margin) 1fr var(--case-study-margin);
		max-width: 1800px;
		margin-left: auto;
		margin-right: auto;
		overflow: hidden;
	}

	.main-grid > * {
		grid-column: 2 / 3;
	}

	.landing-space {
		grid-row: 1 / 2;
		min-height: calc(100dvh + var(--tabs-line-size));
	}

	.tabs-container {
		grid-column: 1 / 4;
		grid-row: 1 / 2;
		align-self: end;
		justify-self: stretch;
		display: grid;
		grid-template-rows: auto auto var(--tabs-line-size);
		overflow-x: scroll;
		scrollbar-width: none;
	}

	.tabs-margin-top {
		grid-row: 1 / 2;
		height: max(var(--nav-bar-height), calc(100dvh - 200px));
	}

	.tabs {
		--gap: 5px;
		grid-row: 2 / 3;
		display: grid;
		min-width: min(1020px, calc(300vw - (var(--case-study-margin) * 2) - (var(--gap) * (3 - 1))));
		grid-auto-flow: column;
		grid-auto-columns: minmax(0, 1fr);
		gap: var(--gap);
		padding-inline: var(--case-study-margin);
	}

	.tab-item {
		display: grid;
		overflow: hidden;
	}

	.bar {
		grid-row: 3 / 4;
		align-self: stretch;
		justify-self: stretch;
		margin-inline: var(--case-study-margin);
	}

	.section-content {
		grid-row: 3 / 4;
		min-height: 100dvh;
	}
</style>
