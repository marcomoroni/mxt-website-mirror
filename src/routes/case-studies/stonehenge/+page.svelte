<script lang="ts">
	import CaseStudyLanding from '$lib/CaseStudyLanding.svelte';
	import { caseStudiesData } from '$lib/caseStudiesData';

	const caseStudyData = caseStudiesData[0];
</script>

<CaseStudyLanding title={caseStudyData.title} leadParagraph={caseStudyData.leadParagraph} />
<div class="section-spacer" />
<div class="section-1">
	<div class="img-1">.....</div>
	<div class="type-1">
		Stonehenge, one of the world's most iconic prehistoric landscapes, has been the focus of over 50
		design iterations since 1991 to alleviate traffic congestion and enhance visitor experiences.
		The A303 Amesbury to Berwick Down (Stonehenge) Road Scheme presents a generational opportunity
		to remove much of the traffic from this iconic landscape and restore Stonehenge to something
		like its original setting.
	</div>
	<div class="illustration-1">.....</div>
</div>
<div class="section-spacer" />
<div class="section-2">
	<div class="img-2">.....</div>
</div>
<div class="small-spacer" />
<div class="section-3">
	<div class="img-3-1">.....</div>
	<div class="img-3-2">.....</div>
</div>
<div class="section-spacer" />
<div class="section-4">
	<div class="type-4">
		The development phase spanned an initial three months, during which a data-driven and
		human-centered approach was adopted to create an immersive experience that respects the unique
		requirements and sensitivities of the Stonehenge landscape.
	</div>
</div>
<div class="section-spacer" />
<div class="section-5">
	<div class="map-layer base">
		<div class="map-layer-img">...</div>
		<div class="map-layer-type">...</div>
	</div>
	<div class="map-layer l-1">
		<div class="map-layer-img">...</div>
		<div class="map-layer-type">...</div>
	</div>
	<div class="map-layer l-2">
		<div class="map-layer-img">...</div>
		<div class="map-layer-type">...</div>
	</div>
</div>

<style>
	.section-spacer {
		height: 80px;
	}

	.small-spacer {
		height: var(--case-study-margin);
	}

	.section-1 {
		width: 100%;
		min-height: calc(100dvh - (var(--case-study-margin) * 2));
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: min-content 1fr;
		gap: var(--case-study-margin);
		padding-left: var(--case-study-margin);
		padding-right: var(--case-study-margin);
		border: 2px solid salmon;
	}

	.img-1 {
		grid-area: 1 / 1 / 3 / 6;
		background-color: aqua;
	}

	.type-1 {
		grid-area: 1 / 6 / 2 / 10;
		background-color: antiquewhite;
	}

	.illustration-1 {
		grid-area: 2 / 6 / 3 / 11;
		background-color: burlywood;
	}

	.section-2 {
		width: 100%;
		min-height: calc(100dvh - (var(--case-study-margin) * 2));
		border: 2px solid salmon;
		display: grid;
		padding-left: var(--case-study-margin);
		padding-right: var(--case-study-margin);
	}

	.img-2 {
		background-color: aqua;
	}

	.section-3 {
		width: 100%;
		/* min-height: calc(100dvh - (var(--case-study-margin) * 2)); */
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
		padding-left: var(--case-study-margin);
		padding-right: var(--case-study-margin);
		border: 2px solid salmon;
	}

	.img-3-1 {
		grid-area: 1 / 1 / 2 / 6;
		background-color: aqua;
		aspect-ratio: 4 / 3;
	}

	.img-3-2 {
		grid-area: 1 / 6 / 2 / 11;
		background-color: aquamarine;
		aspect-ratio: 4 / 3;
	}

	.section-4 {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
		padding-left: var(--case-study-margin);
		padding-right: var(--case-study-margin);
		border: 2px solid salmon;
	}

	.type-4 {
		grid-area: 1 / 1 / 2 / 5;
	}

	.section-5 {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--case-study-margin);
		padding-left: var(--case-study-margin);
		padding-right: var(--case-study-margin);
		border: 2px solid cyan;
	}

	.map-layer {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
		border: 2px solid salmon;
	}

	.map-layer-img {
		min-height: calc(100dvh - (var(--case-study-margin) * 2));
		background-color: brown;
		grid-area: 1 / 1 / 2 / 8;
		position: sticky;
	}
</style>
