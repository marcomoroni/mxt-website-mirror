<script lang="ts">
	import Carousel from '$lib/Carousel.svelte';
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
		{:else}
			<Carousel caption={bodySection.gallery.caption} entries={bodySection.gallery.images} />
		{/if}
	{/each}
</div>

<style>
	.body {
		display: contents;
		--body-width: 800px;
		--body-margin: var(--case-study-margin);
	}

	.body :global(p) {
		padding-left: var(--body-margin);
		padding-right: var(--body-margin);
		max-width: calc(var(--body-width) + (var(--body-margin) * 2));
		margin-left: auto;
		margin-right: auto;
	}
</style>
