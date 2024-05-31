<script lang="ts">
	import { page } from '$app/stores';
	import AccessibleHiddenHeader from '$lib/AccessibleHiddenHeader.svelte';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';
	import { sectionsData } from '$lib/servicesData';
	import Tab from '$lib/services_page/Tab.svelte';
	import TabBorder from '$lib/services_page/TabBorder.svelte';
	import * as Content from '$lib/services_page/content/index';

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

	<TabBorder {currentSectionIndex} />

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
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: auto var(--case-study-margin) auto;
		column-gap: 25px;
		padding-left: var(--case-study-margin);
		padding-right: var(--case-study-margin);
		max-width: 1800px;
		margin-left: auto;
		margin-right: auto;
	}

	.landing-space {
		grid-column: 1 / 4;
		grid-row: 1 / 3;
		min-height: 100dvh;
	}

	.tabs {
		grid-column: 1 / 4;
		grid-row: 1 / 2;
		align-self: end;
		display: grid;
		grid-template-columns: subgrid;
	}

	.tab-item {
		display: grid;
	}

	:global([data-col='0']) {
		grid-column: 1 / 2;
	}

	:global([data-col='1']) {
		grid-column: 2 / 3;
	}

	:global([data-col='2']) {
		grid-column: 3 / 4;
	}

	.section-content {
		grid-row: 3 / 4;
		grid-column: 1 / 4;
		min-height: 100dvh;
	}
</style>
