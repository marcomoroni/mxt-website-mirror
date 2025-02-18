<script lang="ts">
	import CaseStudyLanding from '$lib/CaseStudyLanding.svelte';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';

	export let data;
	const { caseStudy } = data;
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

{@html caseStudy.body}
