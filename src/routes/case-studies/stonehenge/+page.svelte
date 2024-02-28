<script lang="ts">
	import CaseStudyLanding from '$lib/CaseStudyLanding.svelte';
	import FillAspectRatio from '$lib/FillAspectRatio.svelte';
	import { caseStudiesData } from '$lib/caseStudiesData';

	const caseStudyData = caseStudiesData[0];
	const dataSources = [
		{
			img: '/images/A303Base_BW.png',
			fixedImg: false,
			type: 'Accuracy and transparency were ensured by using only publicly available data, particularly emphasizing the standard resources submitted as part of the planning application to the National Inspectorate. MXT has since used this approach to create other realistic environments, quickly, across the UK.'
		},
		{
			img: '/images/A303Roads_BW.png',
			fixedImg: true,
			type: 'Accuracy and transparency were ensured by using only publicly available data, particularly emphasizing the standard resources submitted as part of the planning application to the National Inspectorate. MXT has since used this approach to create other realistic environments, quickly, across the UK. Accuracy and transparency were ensured by using only publicly available data, particularly emphasizing the standard resources submitted as part of the planning application to the National Inspectorate. MXT has since used this approach to create other realistic environments, quickly, across the UK. Accuracy and transparency were ensured by using only publicly available data, particularly emphasizing the standard resources submitted as part of the planning application to the National Inspectorate. MXT has since used this approach to create other realistic environments, quickly, across the UK. Accuracy and transparency were ensured by using only publicly available data, particularly emphasizing the standard resources submitted as part of the planning application to the National Inspectorate. MXT has since used this approach to create other realistic environments, quickly, across the UK. Accuracy and transparency were ensured by using only publicly available data, particularly emphasizing the standard resources submitted as part of the planning application to the National Inspectorate. MXT has since used this approach to create other realistic environments, quickly, across the UK. Accuracy and transparency were ensured by using only publicly available data, particularly emphasizing the standard resources submitted as part of the planning application to the National Inspectorate. MXT has since used this approach to create other realistic environments, quickly, across the UK.'
		},
		{
			img: '/images/A303Trees_BW.png',
			fixedImg: true,
			type: 'Accuracy and transparency were ensured by using only publicly available data, particularly emphasizing the standard resources submitted as part of the planning application to the National Inspectorate. MXT has since used this approach to create other realistic environments, quickly, across the UK.'
		}
	];
</script>

<CaseStudyLanding title={caseStudyData.title} leadParagraph={caseStudyData.leadParagraph} />
<div class="landing-spacer" />
<div class="intro-container">
	<div class="img-stonehenge" />
	<div class="intro">
		Stonehenge, one of the world's most iconic prehistoric landscapes, has been the focus of over 50
		design iterations since 1991 to alleviate traffic congestion and enhance visitor experiences.
		The A303 Amesbury to Berwick Down (Stonehenge) Road Scheme presents a generational opportunity
		to remove much of the traffic from this iconic landscape and restore Stonehenge to something
		like its original setting.
	</div>
	<div class="map-container">
		<FillAspectRatio aspectRatio={{ x: 3, y: 4 }}>
			<div class="map" />
		</FillAspectRatio>
	</div>
</div>
<div class="section-spacer" />
<div class="section-2-container">
	<div class="type-2">
		Significant infrastructural interventions within a UNESCO world heritage site produce a complex
		communication challenge. With the responsibility of informing and assuring various stakeholders
		about the impact of the proposed tunnel, National Highways felt a method beyond traditional
		presentations and illustrations was needed.
	</div>
	<div class="img-road" />
</div>
<div class="section-spacer" />
<div class="section-results">
	<div class="type-results">
		A collaboration between National Highways, their technical partner AmW (AECOM, Mace and WSP),
		and the human experience design company MXT, led to the production of an immersive Virtual
		Reality (VR) experience. This VR experience was designed with two core principles:
		<ul>
			<li>
				Freedom: Users should be able to explore the entire World Heritage Site, getting a
				before-and-after view of the infrastructural changes.
			</li>
			<li>
				Accuracy: Every aspect of the virtual environment had to be supported by real-world data.
			</li>
		</ul>
		The result was a x km2 interactive environment synthesising a y of data to produce a digital mirror
		of Stonehenge and its surroundings accessible in virtual reality, desktop and shared immersive spaces.
	</div>
	<div class="img-results-1" />
	<div class="img-results-2" />
	<div class="img-results-3" />
</div>
<div class="section-spacer" />
<div class="section-development">
	<div class="type-development">
		The development phase spanned an initial three months, during which a data-driven and
		human-centered approach was adopted to create an immersive experience that respects the unique
		requirements and sensitivities of the Stonehenge landscape.
	</div>
</div>
<div class="section-spacer" />
<div class="section-data-sources">
	<!-- Make two copied overlapping elements -->
	<div class="map-layers-images">
		<div class="hide-behind-top-margin-container">
			<div class="hide-behind-top-margin" />
		</div>
		{#each dataSources as dataSource}
			<div class="map-layer">
				<div class="solid-gap" />
				<div class="map-layer-img-mask" class:fixed={dataSource.fixedImg}>
					<div class="map-layer-img-scaffold">
						<div
							class="map-layer-img"
							style:background-image={`url(${dataSource.img})`}
							class:add-small-right-inset-margin={dataSource.fixedImg}
						/>
					</div>
				</div>
				<div class="map-layer-type" aria-hidden="true">{dataSource.type}</div>
			</div>
		{/each}
	</div>
	<div class="map-layers-type">
		{#each dataSources as dataSource}
			<div class="map-layer">
				<div class="solid-gap" />
				<div class="map-layer-img-mask" class:fixed={dataSource.fixedImg}>
					<!-- no need for the rest of the content -->
				</div>
				<div class="map-layer-type">{dataSource.type}</div>
			</div>
		{/each}
	</div>
</div>
<div class="section-spacer" />
<div class="section-gameplay">
	<div class="gameplay-type">
		Early and continuing input from AmW’s heritage team and consistent two-weekly delivery of
		software changes to National Highways ensures new ideas could be tried and course corrections
		were small. Interactive workshops were convened early and often with external heritage
		professionals with working knowledge of the WHS landscape, and with audiences that had no
		heritage background or site-specific knowledge to ensure the truthfulness of the experience was
		accessible to all users. Various gameplay features were introduced as a result of their feedback
		including: Presentation Modes: Both desktop and VR presentations were developed, accommodating
		users who sought immersive experiences in VR as well as those who preferred collaborative
		settings by way of large touchscreens and immersive domes. Time Transition: The users ability to
		alter the time of day. This showcased the visual relationships the heritage monuments share with
		the skies and astronomical events, enhancing the historical context. Aerial Perspective:
		Recognizing that some users are more familiar with the landscape topologically, an aerial view
		mode was added. This catered to users who preferred understanding the landscape akin to
		traditional maps.
	</div>
	<div class="gameplay-illustration-1" />
	<div class="gameplay-illustration-2" />
	<div class="gameplay-illustration-3" />
	<div class="gameplay-illustration-4" />
</div>
<div class="section-spacer" />
<div class="section-events">
	<div class="events-type">
		The coordinated efforts to marry scheme traffic and environmental data were described as
		remarkable by the joint world heritage centre and ICOMOS advisory mission and represents a first
		for a UK Government sponsored infrastructure project.
	</div>
	<div class="events-img-1" />
	<div class="events-img-2" />
</div>
<div class="bottom-page-spacer" />

<style>
	.landing-spacer {
		height: 110px;
	}

	.bottom-page-spacer {
		height: 100px;
	}

	.section-spacer {
		height: 100px;
	}

	.intro-container {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: min-content 1fr;
		gap: var(--case-study-margin);
		margin-left: var(--case-study-margin);
		margin-right: var(--case-study-margin);
	}

	.img-stonehenge {
		grid-column: 1 / 7;
		grid-row: 1 / 3;
		border: 10px solid red;
		height: max(500px, calc(100dvh - (var(--case-study-margin) * 2)));
		position: sticky;
		top: var(--case-study-margin);
		left: 0;
		align-self: start;
	}

	.intro {
		grid-column: 7 / 10;
		grid-row: 1;
	}

	.map-container {
		grid-column: 7 / 11;
		grid-row: 2;
		border: 10px solid salmon;
		min-height: max(500px, calc(100dvh - (var(--case-study-margin) * 2)));
	}

	.map {
		border: 10px solid firebrick;
		width: 100%;
		height: 100%;
	}

	.section-2-container {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
		margin-left: var(--case-study-margin);
		margin-right: var(--case-study-margin);
	}

	.type-2 {
		grid-column: 3 / 7;
		grid-row: 1;
	}

	.img-road {
		grid-column: 3 / 11;
		grid-row: 2;
		height: max(500px, calc(100dvh - (var(--case-study-margin) * 2)));
		border: 10px solid salmon;
	}

	.section-results {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
		margin-left: var(--case-study-margin);
		margin-right: var(--case-study-margin);
	}

	.type-results {
		grid-column: 4 / 8;
		grid-row: 1;
	}

	.img-results-1 {
		grid-column: 1 / 11;
		grid-row: 2;
		border: 10px solid greenyellow;
		aspect-ratio: 16 / 9;
	}

	.img-results-2 {
		grid-column: 2 / 10;
		grid-row: 3;
		border: 10px solid rebeccapurple;
		aspect-ratio: 16 / 9;
	}

	.img-results-3 {
		grid-column: 2 / 10;
		grid-row: 4;
		border: 10px solid aquamarine;
		aspect-ratio: 16 / 9;
	}

	.section-development {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
		margin-left: var(--case-study-margin);
		margin-right: var(--case-study-margin);
	}

	.type-development {
		grid-column: 1 / 5;
		grid-row: 1;
	}

	.section-data-sources {
		position: relative;
		margin-left: var(--case-study-margin);
		margin-right: var(--case-study-margin);
	}

	.map-layers-type,
	.map-layers-images {
		display: grid;
		grid-auto-flow: row;
		gap: var(--case-study-margin);
	}

	.map-layers-images {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.map-layer {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
	}

	.map-layers-images .map-layer {
		position: sticky;
		top: var(--case-study-margin);
	}

	.map-layer-img-mask {
		grid-column: 1 / 11;
		grid-row: 1;
		height: max(500px, calc(100dvh - (var(--case-study-margin) * 2)));
		position: sticky;
		top: var(--case-study-margin);
		align-self: start;
		clip-path: inset(0);
	}

	.map-layer-img-scaffold {
		position: fixed;
		top: var(--case-study-margin);
		left: var(--case-study-margin);
		width: calc(100% - (var(--case-study-margin) * 2));
		height: max(500px, calc(100dvh - (var(--case-study-margin) * 2)));
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
	}

	.map-layer-img-mask:not(.fixed) .map-layer-img-scaffold {
		position: relative;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.map-layer-img {
		background-color: var(--color-background);
		grid-column: 1 / 8;
		grid-row: 1;
		background-size: cover;
		background-position: center center;
	}

	.map-layers-type .map-layer-img-mask {
		opacity: 0;
	}

	/* To fix a small visual errors where you can see part of the first image behind a subsequent one. */
	.add-small-right-inset-margin {
		margin-right: -1px;
	}

	.map-layer-type {
		grid-column: 8 / 10;
		grid-row: 1;
		min-height: max(500px, calc(100dvh - (var(--case-study-margin) * 2)));
		z-index: 2;
	}

	.solid-gap {
		position: absolute;
		top: calc(var(--case-study-margin) * -1);
		height: var(--case-study-margin);
		width: 100%;
		background-color: var(--color-background);
	}

	.hide-behind-top-margin-container {
		position: absolute;
		top: calc(var(--case-study-margin) * -1);
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1;
	}

	.hide-behind-top-margin {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		height: var(--case-study-margin);
		background-color: var(--color-background);
	}

	.map-layers-images .map-layer-type {
		opacity: 0;
	}

	.section-gameplay {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
		margin-left: var(--case-study-margin);
		margin-right: var(--case-study-margin);
	}

	.gameplay-type {
		grid-column: 4 / 8;
		grid-row: 1;
	}

	.gameplay-illustration-1 {
		grid-column: 2 / 6;
		grid-row: 2;
		border: 10px solid rgba(124, 104, 238, 0.365);
	}

	.gameplay-illustration-2 {
		grid-column: 6 / 10;
		grid-row: 2;
		border: 10px solid rgba(124, 104, 238, 0.365);
	}

	.gameplay-illustration-1,
	.gameplay-illustration-2 {
		aspect-ratio: 1 / 1;
	}

	.gameplay-illustration-3 {
		grid-column: 2 / 10;
		grid-row: 3;
		border: 10px solid rgba(124, 104, 238, 0.365);
		aspect-ratio: 16 / 9;
	}

	.gameplay-illustration-4 {
		grid-column: 2 / 10;
		grid-row: 4;
		border: 10px solid rgba(124, 104, 238, 0.365);
		aspect-ratio: 16 / 9;
	}

	.section-events {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
		margin-left: var(--case-study-margin);
		margin-right: var(--case-study-margin);
	}

	.events-type {
		grid-column: 2 / 5;
		grid-row: 1 / 2;
		position: sticky;
		top: var(--case-study-margin);
		align-self: start;
	}

	.events-img-1 {
		grid-column: 5 / 11;
		grid-row: 1;
		border: 10px solid rgba(124, 104, 238, 0.365);
		aspect-ratio: 16 / 9;
	}

	.events-img-2 {
		grid-column: 5 / 11;
		grid-row: 2;
		border: 10px solid rgba(124, 104, 238, 0.365);
		aspect-ratio: 16 / 9;
	}
</style>
