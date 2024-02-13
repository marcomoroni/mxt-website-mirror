<script lang="ts">
	import CaseStudyLanding from '$lib/CaseStudyLanding.svelte';
	import { caseStudiesData } from '$lib/caseStudiesData';

	const caseStudyData = caseStudiesData[0];
</script>

<CaseStudyLanding title={caseStudyData.title} leadParagraph={caseStudyData.leadParagraph} />
<div class="spacer-landing-content" />
<div>Content...</div>

<style>
	.spacer-landing-content {
		height: 60px;
	}
</style>
