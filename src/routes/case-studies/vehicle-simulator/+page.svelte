<script lang="ts">
	import CaseStudyLanding from '$lib/CaseStudyLanding.svelte';
	import { caseStudiesData } from '$lib/caseStudiesData';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';

	const caseStudyData = caseStudiesData[1];
</script>

<svelte:head>
	<title>{mxtHeadTitle('Vehicle Simulator')}</title>
</svelte:head>

<CaseStudyLanding title={caseStudyData.title} leadParagraph={caseStudyData.leadParagraph} />
