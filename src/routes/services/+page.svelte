<script lang="ts">
	import { page } from '$app/stores';
	import AccessibleHiddenHeader from '$lib/AccessibleHiddenHeader.svelte';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';
	import { sectionsData } from '$lib/servicesData';
	import Tab from '$lib/services_page/Tab.svelte';
	import * as Content from '$lib/services_page/content/index';
	import { accentColourInServicesProps } from '$lib/three_scene/threeStateStores';

	$: currentSectionIndex = (() => {
		const index = sectionsData.findIndex((sectionData) => $page.url.hash === sectionData.hash);
		const found = index !== -1;
		return found ? index : 0;
	})();
</script>

<svelte:head>
	<title>{mxtHeadTitle('Services')}</title>
</svelte:head>

<AccessibleHiddenHeader text="Services" />

<div class="main-grid">
	<div class="landing-space" />

	<ul role="tablist" class="tabs">
		{#each sectionsData as sectionData, i}
			<li class="tab-item" data-col={i}>
				<Tab
					title={sectionData.title}
					subtitle={sectionData.subtitle}
					href={sectionData.hash}
					isActive={currentSectionIndex === i}
				/>
			</li>
		{/each}
	</ul>

	<div
		class="bar"
		style:background-color={`color-mix(in oklab, var(--color-primary) 5%, ${$accentColourInServicesProps})`}
	/>

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

<style>
	.main-grid {
		display: grid;
		grid-template-rows: auto 4px auto;
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
		min-height: 100dvh;
	}

	.tabs {
		grid-column: 1 / 4;
		grid-row: 1 / 2;
		align-self: end;
		justify-self: stretch;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		overflow-x: scroll;
		column-gap: 10px;
		scrollbar-width: none;
	}

	.tab-item {
		display: grid;
	}

	.tab-item:first-child {
		margin-left: var(--case-study-margin);
	}

	.tab-item:last-child {
		margin-right: var(--case-study-margin);
	}

	.bar {
		grid-column: 1 / 4;
		grid-row: 2 / 3;
		align-self: stretch;
		justify-self: stretch;
	}

	.section-content {
		grid-row: 3 / 4;
		min-height: 100dvh;
	}
</style>
