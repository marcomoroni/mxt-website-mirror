<script lang="ts">
	import A303MapSection from '$lib/A303MapSection.svelte';
	import CaseStudyLanding from '$lib/CaseStudyLanding.svelte';
	import FillAspectRatio from '$lib/FillAspectRatio.svelte';
	import StonehengeInUk from '$lib/StonehengeInUk.svelte';
	import { caseStudiesData } from '$lib/caseStudiesData';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';

	const caseStudyData = caseStudiesData[0];
</script>

<svelte:head>
	<title>{mxtHeadTitle('Stonehenge')}</title>
</svelte:head>

<CaseStudyLanding title={caseStudyData.title} leadParagraph={caseStudyData.leadParagraph} />
<div class="landing-spacer" />
<div class="intro-container">
	<img class="img-stonehenge" src="/images/stonehenge.jpg" alt="Stonehenge." />
	<div class="intro">
		<p>
			Stonehenge, one of the world's most iconic prehistoric landscapes, has been the focus of over
			50 design iterations since 1991 to alleviate traffic congestion and enhance visitor
			experiences. The A303 Amesbury to Berwick Down (Stonehenge) Road Scheme presents a
			generational opportunity to remove much of the traffic from this iconic landscape and restore
			Stonehenge to something like its original setting.
		</p>
	</div>
	<div
		class="map-container"
		role="img"
		aria-label="A map of the UK showing the location of Stonehenge."
	>
		<!-- Same size as the svg -->
		<FillAspectRatio aspectRatio={{ x: 196, y: 304 }} ariaRoleHidden={true}>
			<StonehengeInUk />
		</FillAspectRatio>
	</div>
</div>
<div class="section-spacer" />
<div class="section-2-container">
	<div class="type-2">
		<p>
			Significant infrastructural interventions within a UNESCO world heritage site produce a
			complex communication challenge. With the responsibility of informing and assuring various
			stakeholders about the impact of the proposed tunnel, National Highways felt a method beyond
			traditional presentations and illustrations was needed.
		</p>
	</div>
</div>
<div class="section-spacer" />
<div class="section-results">
	<div class="type-results">
		<p>
			A collaboration between National Highways, their technical partner AmW (AECOM, Mace and WSP),
			and the human experience design company MXT, led to the production of an immersive Virtual
			Reality (VR) experience. This VR experience was designed with two core principles:
		</p>
		<ul class="with-disc">
			<li>
				Freedom: Users should be able to explore the entire World Heritage Site, getting a
				before-and-after view of the infrastructural changes.
			</li>
			<li>
				Accuracy: Every aspect of the virtual environment had to be supported by real-world data.
			</li>
		</ul>
		<p>
			The result was a x km<sup>2</sup> interactive environment synthesising a y of data to produce a
			digital mirror of Stonehenge and its surroundings accessible in virtual reality, desktop and shared
			immersive spaces.
		</p>
	</div>
	<div class="img-results-1">
		<video autoplay loop muted class="video-redered-scenes" tabindex="-1" aria-disabled="true">
			<source src="/videos/A303_Rendered_Scenes.mp4" type="video/mp4" />
		</video>
	</div>
	<img
		class="img-results-2"
		src="/images/HighresScreenshot00003.png"
		alt="Stonenge in the digital environment."
	/>
	<img
		class="img-results-3"
		src="/images/HighresScreenshot00009.png"
		alt="An entrance of the new A303 tunnel."
	/>
	<img
		class="img-results-4"
		src="/images/HighresScreenshot00007.png"
		alt="Cars on the current A303 interecting a walking path."
	/>
	<img
		class="img-results-5"
		src="/images/HighresScreenshot00013.png"
		alt="A roundabout at night."
	/>
	<img
		class="img-results-6"
		src="/images/HighresScreenshot00018.png"
		alt="The proposed Green Bridge."
	/>
	<img
		class="img-results-7"
		src="/images/HighresScreenshot00027.png"
		alt="The Countess Roundabout at night."
	/>
</div>
<div class="section-spacer" />
<div class="section-development">
	<div class="type-development">
		<p>
			The development phase spanned an initial three months, during which a data-driven and
			human-centered approach was adopted to create an immersive experience that respects the unique
			requirements and sensitivities of the Stonehenge landscape.
		</p>
	</div>
</div>
<div class="section-spacer" />
<A303MapSection />
<div class="section-spacer" />
<div class="section-gameplay">
	<div class="gameplay-type">
		<h2 class="case-study-section-header">Human-centered design approach</h2>
		<ul class="with-disc">
			<li>
				Early and continuing input from AmW’s heritage team and consistent two-weekly delivery of
				software changes to National Highways ensures new ideas could be tried and course
				corrections were small.
			</li>
			<li>
				Interactive workshops were convened early and often with external heritage professionals
				with working knowledge of the WHS landscape, and with audiences that had no heritage
				background or site-specific knowledge to ensure the truthfulness of the experience was
				accessible to all users.
			</li>
			<li>
				Various gameplay features were introduced as a result of their feedback including:
				<ul class="with-disc">
					<li>
						Presentation Modes: Both desktop and VR presentations were developed, accommodating
						users who sought immersive experiences in VR as well as those who preferred
						collaborative settings by way of large touchscreens and immersive domes.
					</li>
					<li>
						Time Transition: The users ability to alter the time of day. This showcased the visual
						relationships the heritage monuments share with the skies and astronomical events,
						enhancing the historical context.
					</li>
					<li>
						Aerial Perspective: Recognizing that some users are more familiar with the landscape
						topologically, an aerial view mode was added. This catered to users who preferred
						understanding the landscape akin to traditional maps.
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<div class="gameplay-illustration-1 thin-border" />
	<div class="gameplay-illustration-2 thin-border" />
	<img
		class="gameplay-illustration-3"
		src="/images/HighresScreenshot00001.png"
		alt="The controls in virtual reality."
	/>
	<img
		class="gameplay-illustration-4"
		src="/images/desktop_menu.jpg"
		alt="The controls in desktop."
	/>
	<img
		class="gameplay-illustration-5"
		src="/images/HighresScreenshot00005.png"
		alt="The environment seen from a high point with the Heritage Areas highlighted."
	/>
</div>
<div class="section-spacer" />
<div class="section-events">
	<div class="events-type">
		<h2 class="case-study-section-header">Results and impact</h2>
		<p>
			The coordinated efforts to marry scheme traffic and environmental data were described as
			remarkable by the joint world heritage centre and ICOMOS advisory mission and represents a
			first for a UK Government sponsored infrastructure project.
		</p>
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
		height: max(500px, calc(100dvh - (var(--case-study-margin) * 2)));
		position: sticky;
		top: var(--case-study-margin);
		left: 0;
		align-self: start;
		object-fit: cover;
	}

	.intro {
		grid-column: 7 / 10;
		grid-row: 1;
	}

	.map-container {
		grid-column: 7 / 11;
		grid-row: 2;
		min-height: max(500px, calc(100dvh - (var(--case-study-margin) * 2)));
	}

	.section-2-container {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
		margin-left: var(--case-study-margin);
		margin-right: var(--case-study-margin);
	}

	.type-2 {
		grid-column: 2 / 6;
		grid-row: 1;
	}

	.section-results {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
		margin-left: var(--case-study-margin);
		margin-right: var(--case-study-margin);
	}

	.type-results {
		grid-column: 6 / 10;
		grid-row: 1;
	}

	.img-results-1 {
		grid-column: 1 / 11;
		grid-row: 2;
	}

	.video-redered-scenes {
		width: 100%;
	}

	.img-results-2 {
		grid-column: 1 / 6;
		grid-row: 3;
	}

	.img-results-3 {
		grid-column: 6 / 11;
		grid-row: 3;
	}

	.img-results-4 {
		grid-column: 1 / 6;
		grid-row: 4;
	}

	.img-results-5 {
		grid-column: 6 / 11;
		grid-row: 4;
	}

	.img-results-6 {
		grid-column: 6 / 11;
		grid-row: 5;
	}

	.img-results-7 {
		grid-column: 1 / 6;
		grid-row: 5;
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
	}

	.gameplay-illustration-2 {
		grid-column: 6 / 10;
		grid-row: 2;
	}

	.gameplay-illustration-1,
	.gameplay-illustration-2 {
		aspect-ratio: 1 / 1;
	}

	.gameplay-illustration-3 {
		grid-column: 2 / 10;
		grid-row: 3;
	}

	.gameplay-illustration-4 {
		grid-column: 2 / 10;
		grid-row: 4;
	}

	.gameplay-illustration-5 {
		grid-column: 2 / 10;
		grid-row: 5;
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

	@media (max-width: 900px) {
		.intro-container {
			grid-template-columns: unset;
			grid-auto-flow: row;
		}

		.img-stonehenge {
			grid-column: unset;
			grid-row: 1;
			position: relative;
			top: 0;
		}

		.intro {
			grid-column: unset;
			grid-row: 2;
		}

		.map-container {
			grid-column: unset;
			grid-row: 3;
		}

		.section-2-container {
			grid-template-columns: unset;
			grid-auto-flow: row;
		}

		.type-2 {
			grid-column: unset;
			grid-row: 1;
		}

		.section-results {
			grid-template-columns: unset;
			grid-auto-flow: row;
		}

		.type-results {
			grid-column: unset;
			grid-row: 1;
		}

		.img-results-1 {
			grid-column: unset;
			grid-row: 2;
		}

		.img-results-2 {
			grid-column: unset;
			grid-row: 3;
		}

		.img-results-3 {
			grid-column: unset;
			grid-row: 4;
		}

		.img-results-4 {
			grid-column: unset;
			grid-row: 5;
		}

		.img-results-5 {
			grid-column: unset;
			grid-row: 6;
		}

		.img-results-6 {
			grid-column: unset;
			grid-row: 7;
		}

		.img-results-7 {
			grid-column: unset;
			grid-row: 8;
		}

		.section-development {
			grid-template-columns: unset;
			grid-auto-flow: row;
		}

		.type-development {
			grid-column: unset;
			grid-row: 1;
		}

		.section-gameplay {
			grid-template-columns: unset;
			grid-auto-flow: row;
		}

		.gameplay-type {
			grid-column: unset;
			grid-row: 1;
		}

		.gameplay-illustration-1 {
			grid-column: unset;
			grid-row: 2;
		}

		.gameplay-illustration-2 {
			grid-column: unset;
			grid-row: 3;
		}

		.gameplay-illustration-3 {
			grid-column: unset;
			grid-row: 4;
		}

		.gameplay-illustration-4 {
			grid-column: unset;
			grid-row: 5;
		}

		.gameplay-illustration-5 {
			grid-column: unset;
			grid-row: 6;
		}

		.section-events {
			grid-template-columns: unset;
			grid-auto-flow: row;
		}

		.events-type {
			grid-column: unset;
			grid-row: 1;
			position: relative;
			top: 0;
		}

		.events-img-1 {
			grid-column: unset;
			grid-row: 2;
		}

		.events-img-2 {
			grid-column: unset;
			grid-row: 3;
		}
	}
</style>
