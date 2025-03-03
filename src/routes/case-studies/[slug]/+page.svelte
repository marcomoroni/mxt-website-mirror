<script lang="ts">
	import Carousel from '$lib/Carousel.svelte';
	import Insight from '$lib/case_study_insight/Insight.svelte';
	import InsightItem from '$lib/case_study_insight/InsightItem.svelte';
	import CaseStudyLanding from '$lib/CaseStudyLanding.svelte';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';
	import { micromark } from 'micromark';

	export let data;
	const { caseStudy } = data;

	function markdownToHTML(text: string): string {
		return micromark(text, { allowDangerousHtml: true });
	}
</script>

<svelte:head>
	<title>{mxtHeadTitle(caseStudy.title)}</title>
	<meta property="og:title" content={caseStudy.title} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={`https://mxt.co.uk/case-studies/${caseStudy.slug}/`} />
	{#if caseStudy.linkPreviewImage}
		<meta property="og:image" content={`https://mxt.co.uk/images/${caseStudy.linkPreviewImage}`} />
	{/if}
</svelte:head>

<CaseStudyLanding title={caseStudy.title} leadParagraph={caseStudy.leadParagraph} />

<div class="body">
	{#each caseStudy.body as bodySection}
		{#if typeof bodySection === 'string'}
			{@html markdownToHTML(bodySection)}
		{:else if 'gallery' in bodySection}
			<Carousel caption={bodySection.gallery.caption} entries={bodySection.gallery.images} />
		{:else}
			<Insight>
				{#each bodySection.insight.sections as insightSection}
					<InsightItem expanded={insightSection.expanded}>
						<svelte:fragment slot="title">{insightSection.title}</svelte:fragment>
						<svelte:fragment slot="body">
							{@html markdownToHTML(insightSection.body)}
						</svelte:fragment>
					</InsightItem>
				{/each}
			</Insight>
		{/if}
	{/each}
</div>
<div class="margin-end" />

<style>
	.body {
		display: contents;
		--body-width: 800px;
		--body-margin: var(--case-study-margin);
	}

	.body > :global(p),
	.body > :global(h2),
	.body > :global(ul) {
		padding-left: var(--body-margin);
		padding-right: var(--body-margin);
		max-width: calc(var(--body-width) + (var(--body-margin) * 2));
		margin-left: auto;
		margin-right: auto;
	}

	.body > :global(h2) {
		font-weight: 640;
		font-size: 19px;
		margin-top: 50px;
		margin-bottom: 20px;
	}

	.body > :global(ul) {
		list-style-type: disc;
		margin-block: 8px;
	}

	.body > :global(ul) > :global(li) {
		margin-left: 25px;
	}

	.margin-end {
		margin-top: 80px;
	}
</style>
