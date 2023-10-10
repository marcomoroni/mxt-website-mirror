<script>
	import FillAspectRatio from '$lib/FillAspectRatio.svelte';
	import Gallery from '$lib/Gallery.svelte';
	import PlayVideoButton from '$lib/PlayVideoButton.svelte';
	import WidthContainer from '$lib/WidthContainer.svelte';
	import { navBarData } from '$lib/topBarData';

	navBarData.set({ caseStudies: 'stonehenge' });

	let videoIsVisible = false;

	function showVideo() {
		videoIsVisible = true;
	}
</script>

<svelte:head>
	<title>Stonehenge</title>
</svelte:head>

<div class="title-box-stack">
	<div class="title-image" style:background-image={'url(/images/stonehenge.jpg)'} />
	{#if videoIsVisible}
		<div class="video-container">
			<FillAspectRatio aspectRatio={{ x: 16, y: 9 }}>
				<iframe
					class="video-embed"
					src="https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?si=Ue7X_uGUbLlC4br3"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
				/>
			</FillAspectRatio>
		</div>
	{:else}
		<div class="title-box-container">
			<div class="play-video-button-container">
				<PlayVideoButton on:click={showVideo} />
			</div>
			<div class="flex-expand">
				<WidthContainer>
					<div class="title-box">
						<div class="title-context">Case study</div>

						<h1>Visualising the Stonehenge World Heritage site landscape</h1>

						<p class="lead-paragraph">
							Harnessing the power of immersive technologies for complex infrastructure projects
						</p>
					</div>
				</WidthContainer>
			</div>
		</div>
	{/if}
</div>

{#if videoIsVisible}
	<!-- TODO: remove code repetition. -->
	<WidthContainer>
		<div class="title-box when-video-is-visible">
			<div class="title-context">Case study</div>

			<h1>Visualising the Stonehenge World Heritage site landscape</h1>

			<p class="lead-paragraph">
				Harnessing the power of immersive technologies for complex infrastructure projects
			</p>
		</div>
	</WidthContainer>
{/if}

<h2 class="width-container">Background</h2>
<p class="width-container">
	Stonehenge, one of the world's most iconic prehistoric landscapes, has been the focus of over 50
	design iterations since 1991 to alleviate traffic congestion and enhance visitor experiences. The
	A303 Amesbury to Berwick Down (Stonehenge) Road Scheme presents a generational opportunity to
	remove much of the traffic from this iconic landscape and restore Stonehenge to something like its
	original setting.
</p>

<div>----- map -------</div>

<Gallery />

<h2 class="width-container">Challange</h2>
<p class="width-container">
	Significant infrastructural interventions within a UNESCO world heritage site produce a complex
	communication challenge. With the responsibility of informing and assuring various stakeholders
	about the impact of the proposed tunnel, National Highways felt a method beyond traditional
	presentations and illustrations was needed.
</p>

<div>----- photography -------</div>

<h2 class="width-container">Solution</h2>
<p class="width-container">
	A collaboration between National Highways, their technical partner AmW (AECOM, Mace and WSP), and
	the human experience design company MXT, led to the production of an immersive Virtual Reality
	(VR) experience. This VR experience was designed with two core principles:
</p>
<ul class="width-container">
	<li>
		Freedom: Users should be able to explore the entire World Heritage Site, getting a
		before-and-after view of the infrastructural changes.
	</li>
	<li>Accuracy: Every aspect of the virtual environment had to be supported by real-world data.</li>
</ul>
<p class="width-container">
	The result was a x km$^2$ interactive environment synthesising a y of data to produce a digital
	mirror of Stonehenge and its surroundings accessible in virtual reality, desktop and shared
	immersive spaces.
</p>

<div>----- screenshots of solution and video -------</div>

<h2 class="width-container">Development</h2>
<p class="width-container">
	The development phase spanned an initial three months, during which a data-driven and
	human-centered approach was adopted to create an immersive experience that respects the unique
	requirements and sensitivities of the Stonehenge landscape.
</p>

<h3 class="width-container">Data acquisition and usage</h3>
<ul class="width-container">
	<li>
		Accuracy and transparency were ensured by using only publicly available data, particularly
		emphasizing the standard resources submitted as part of the planning application to the National
		Inspectorate. MXT has since used this approach to create other realistic environments, quickly,
		across the UK.
	</li>
</ul>

<div>------- complex media/graphic of data sources in landscape---------</div>

<h3 class="width-container">Human-centered design approach</h3>
<ul class="width-container">
	<li>
		Early and continuing input from AmW’s heritage team and consistent two-weekly delivery of
		software changes to National Highways ensures new ideas could be tried and course corrections
		were small.
	</li>
	<li>
		Interactive workshops were convened early and often with external heritage professionals with
		working knowledge of the WHS landscape, and with audiences that had no heritage background or
		site-specific knowledge to ensure the truthfulness of the experience was accessible to all
		users.
	</li>
	<li>Various gameplay features were introduced as a result of their feedback including:</li>
	<ul>
		<li>
			Presentation Modes: Both desktop and VR presentations were developed, accommodating users who
			sought immersive experiences in VR as well as those who preferred collaborative settings by
			way of large touchscreens and immersive domes.
		</li>
		<li>
			Time Transition: The users ability to alter the time of day. This showcased the visual
			relationships the heritage monuments share with the skies and astronomical events, enhancing
			the historical context.
		</li>
		<li>
			Aerial Perspective: Recognizing that some users are more familiar with the landscape
			topologically, an aerial view mode was added. This catered to users who preferred
			understanding the landscape akin to traditional maps.
		</li>
	</ul>
</ul>

<h2 class="width-container">Results and impact</h2>
<p class="width-container">
	The coordinated efforts to marry scheme traffic and environmental data were described as
	remarkable by the joint world heritage centre and ICOMOS advisory mission and represents a first
	for a UK Government sponsored infrastructure project.
</p>

<h3 class="width-container">Engagements</h3>
<ul class="width-container">
	<li>ICOMOS Advisory Mission to UK</li>
	<li>
		UNESCO engagement: Extended 45th session of the World Heritage Committee in Riyadh, Kingdom of
		Saudi Arabia
	</li>
	<li>British Embassy, Paris: At the request of HE Laura Davies, the UK ambassador to UNESCO</li>
</ul>

<h3 class="width-container">Legacy</h3>
<p class="width-container">
	Basis for future development in learning and development, scenario planning and public
	consultation as scheme progresses.
</p>

<h2 class="width-container">Acknowledgments</h2>
<p class="width-container">
	The development of the experience was funded by National Highways, with technical contributions by
	AECOM, Mace and WSP and external feedback provided by National Trust, English Heritage and
	Wiltshire Council
</p>

<h3 class="width-container">Credits</h3>
<p class="width-container">
	With thanks to Caitlin Wentworth, Bonnie Pearce, Marcia Daniels (National Highways), Chris Moore
	(AECOM), Graham Martin (WSP) this work could not have been completed without your co-ordination,
	assurance and management.
</p>

<h3 class="width-container">Reference</h3>
<p class="width-container">
	Moore, C. and Pettinger, T. (2022). Proceedings of the 27th International Conference on Cultural
	Heritage and New Technologies. Heidelberg: Propylaeum.
</p>

<div>----- screenshot of solution ------</div>

<div>----- quote ------</div>

<style>
	.title-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100dvw;
		max-width: 100%;
		height: 100dvh;
		background-size: cover;
		background-position: center center;
		z-index: -1;
	}

	.title-box-stack {
		position: relative;
	}

	.title-box-container {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.play-video-button-container {
		padding-top: max(110px, 40dvh);
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.flex-expand {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.title-box {
		background-color: white;
		padding-left: 37px;
		padding-right: 37px;
		padding-top: 36px;
		padding-bottom: 36px;
		margin-top: 70px;
		margin-bottom: var(--horizontal-margin);
	}

	.title-box.when-video-is-visible {
		margin-top: var(--horizontal-margin);
	}

	.title-context {
		font-size: 25px;
		color: #b6a79b;
		margin-bottom: 27px;
	}

	.lead-paragraph {
		font-size: 21px;
		margin-top: 20px;
		text-wrap: balance;
	}

	.video-container {
		height: 100dvh;
		position: relative;
		padding-top: 90px;
		padding-bottom: 90px;
		padding-left: var(--horizontal-margin);
		padding-right: var(--horizontal-margin);
	}

	.video-embed {
		width: 100%;
		height: 100%;
	}

	h1 {
		font-size: 52px;
		line-height: 1.2;
		font-weight: 600;
		text-wrap: balance;
	}

	p:not(.lead-paragraph) {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	h2 {
		font-size: 29px;
		font-weight: 600;
		margin-top: 70px;
	}

	h3 {
		font-size: 21px;
		font-weight: 600;
		margin-top: 70px;
	}

	ul {
		list-style: disc;
		padding-left: 22px;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	li {
		margin: 0 0 5px;
	}

	@media (max-width: 700px) {
		.title-box {
			padding-left: 25px;
			padding-right: 25px;
			padding-top: 24px;
			padding-bottom: 24px;
			margin-top: 60px;
		}

		.title-context {
			font-size: 21px;
			margin-bottom: 19px;
		}

		.lead-paragraph {
			font-size: 17.5px;
			margin-top: 17px;
		}

		h1 {
			font-size: 40px;
			line-height: 1.2;
		}

		p:not(.lead-paragraph) {
			margin-top: 15px;
			margin-bottom: 15px;
		}

		h2 {
			margin-top: 20px;
		}

		h3 {
			margin-top: 17px;
		}

		ul {
			margin-top: 15px;
			margin-bottom: 15px;
		}
	}
</style>
