<script lang="ts">
	import AccessibleHiddenHeader from '$lib/AccessibleHiddenHeader.svelte';
	import SecondaryPageLanding from '$lib/SecondaryPageLanding.svelte';
	import Section from '$lib/services_page/Section.svelte';
	import SideBarEntry from '$lib/services_page/SideBarEntry.svelte';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';
	import { servicesPageIntersectingSection } from '$lib/three_scene/threeStateStores';
	import { onMount } from 'svelte';
	import P from '$lib/services_page/P.svelte';
	import H3 from '$lib/services_page/H3.svelte';
	import H4 from '$lib/services_page/H4.svelte';

	let scrollY: number;
	let windowHeight: number;

	// Note that these are in order.
	const sections: Array<{
		el: HTMLElement;
		sectionStateForBackground: 'service-1' | 'service-2' | 'service-3';
	}> = [];

	function checkNewState() {
		let newSectionStateForBackground: undefined | 'service-1' | 'service-2' | 'service-3' =
			undefined;
		for (const section of sections) {
			const hasPassedHalfWindow = section.el.getBoundingClientRect().y < windowHeight / 2;
			if (hasPassedHalfWindow) {
				newSectionStateForBackground = section.sectionStateForBackground;
			} else {
				break;
			}
		}

		servicesPageIntersectingSection.set(newSectionStateForBackground);
	}

	$: {
		if (scrollY) {
			checkNewState();
		}
	}

	onMount(() => {
		checkNewState();
	});

	function scrollObserve(
		el: HTMLElement,
		sectionStateForBackground: 'service-1' | 'service-2' | 'service-3'
	) {
		sections.push({ el, sectionStateForBackground });
	}

	const sectionsData = [
		{
			title: 'Digital Infrastructure',
			subtitle: 'Improving decision-making and engagement through multidisciplinary visualisations',
			scrollTo: 's1',
			associatedState: 'service-1' as 'service-1'
		},
		{
			title: 'Driving Simulation',
			subtitle: 'Behavioural science and road safety research',
			scrollTo: 's2',
			associatedState: 'service-2' as 'service-2'
		},
		{
			title: 'Learning and Development',
			subtitle: 'Interactive and immersive learning environments',
			scrollTo: 's3',
			associatedState: 'service-3' as 'service-3'
		}
	];
</script>

<svelte:head>
	<title>{mxtHeadTitle('Services')}</title>
</svelte:head>

<svelte:window bind:scrollY bind:innerHeight={windowHeight} />

<AccessibleHiddenHeader text="Services" />

<SecondaryPageLanding
	text={'Our software platform and services help our customers solve complex transport challenges through advanced simulation environments for communication, research and learning.'}
/>
<div class="landing-spacer" />

<div class="two-col-container">
	<div class="left-col">
		<div class="left-bar">
			<div class="list">
				{#each sectionsData as entry}
					<SideBarEntry
						title={entry.title}
						subtitle={entry.subtitle}
						scrollTo={entry.scrollTo}
						associatedState={entry.associatedState}
					/>
				{/each}
			</div>
		</div>
	</div>
	<div class="right-col">
		<div class="section">
			<Section
				scrollObserveAction={(el) => scrollObserve(el, 'service-1')}
				associatedState={sectionsData[0].associatedState}
				title={sectionsData[0].title}
				subtitle={sectionsData[0].subtitle}
				isLast={false}
				isFirst={true}
				scrollToId={sectionsData[0].scrollTo}
			>
				<svelte:fragment slot="type">
					<P>
						MXT produce interactive visualisations for Nationally Significant Infrastructure
						Projects (NSIPs). Understanding planning applications can be challenging. Our work is to
						transform your existing data into intuitive and immersive experiences for diverse
						stakeholders from public and policy-making to, design, engineering and operational
						audiences alike.
					</P>
					<H3>Benefits across the project lifecycle</H3>
					<H4>Digital Communication</H4>
					<P>
						Engagement is more impactful when you demonstrate your thinking visually, audibly and
						experientially.
					</P>
					<P>(((list)))</P>
					<H4>Improve Planning</H4>
					<P>
						We provide a safe, repeatable digital project twin for operations teams to address
						uncertainty in decision-making, conduct scenario planning and develop immersive training
						programs.
					</P>
					<H4>Cost Saving</H4>
					Our software recycles and reuses existing data and delivers new digital assets that add value
					throughout the project lifecycle.
					<H3>Designed for accuracy at speed</H3>
					<P>
						MXT’s semi-automated approach combines geospatial and physical sciences with game and
						film technologies to generates assurable environments, that can be delivered at pace.
					</P>
					<H4>Natural Environment</H4>
					<P>
						MXT are specialists at transforming geographic information into natural and believable
						computer generated imagery.
					</P>
					<P>
						Our environmental workflow incorporates data from an environmental statement with
						national surveys by Defra, UKCEH and Ordinance Survey.
					</P>
					<P>
						Combined, these resources underpin the generation of natural landscapes that visualises,
						terrain, land use, ecology and archaeology information.
					</P>
					<P>--- images ---</P>
					<H4>Built Environment</H4>
					<P>
						We specialise in preparing our client's building information modelling (BIM) for
						interactive use, collaborating with engineers and architects to realise a project’s
						design ambitions for public consultation. Post-decision, we efficiently handle detailed
						design updates and maintain value during delivery by utilizing our environments and
						assets in operational contexts.
					</P>
					<H4>Road User Modelling</H4>
					<P>
						Transport schemes are designed to make customer journeys safer, greener, quicker and
						more reliable. The most impactful way of communicating those benefits is to show those
						customers how their journey’s will change.
					</P>
					<P>--- images ---</P>
					<P>
						To-date MXT are the only UK government provider to marry building information and
						traffic modelling to give customers a complete and immersive view of the improved
						effects from a scheme.
					</P>
					<P>
						Our interactive mobility simulations ingest standard two-dimensional, origin-destination
						data and return believable, three-dimensional results; faithfully recreating the
						physics, graphics and traffic management of real transport environments.
					</P>
					<P>--- Download technical specification here ---</P>
				</svelte:fragment>
			</Section>
		</div>
		<div class="section">
			<Section
				scrollObserveAction={(el) => scrollObserve(el, 'service-2')}
				associatedState={sectionsData[1].associatedState}
				title={sectionsData[1].title}
				subtitle={sectionsData[1].subtitle}
				isLast={false}
				isFirst={false}
				scrollToId={sectionsData[1].scrollTo}
			>
				<svelte:fragment slot="type">
					<P>
						MXT’s vehicle simulator was designed working alongside the UK Government company
						National Highways. It is a virtual validation solution to study the many circumstances
						that affect the performance of drivers and road transport systems and it does so in a
						safe, repeatable environment.
					</P>
					<H3>Human factors research</H3>
					<P>
						The safety, satisfaction, and behaviour of road users is impacted by their interaction
						with vehicle and road transport technologies. A vehicle simulator enables our customers
						to improve design and reduce risk by examining how drivers use proposed, and existing,
						transport systems through investigating and measuring distraction, fatigue and
						impairment factors. We can:
					</P>
					<H4>Simulation Hardware</H4>
					<P>
						The driving simulator incorporates an ergonomic cabin package with a compact motion
						platform and mixed reality camera technology.
					</P>
					<P>
						Our software immerses drivers in a digital scene, whilst simultaneously incorporating
						elements of the real world. This provides a convincing combination of both immersivity
						and presence as drivers can see themselves as they operate the virtual vehicle.
					</P>
					<P>(((image)))</P>
					<P>In comparison to on-road trials, our compact driving simulator enables:</P>
					<H3>Data Collection and Analysis</H3>
					<P>
						Our data collection and analysis integrates bespoke bio-metric and driver performance
						analysis with structured qualitative interviews delivered by Human-Centred Design (HCD)
						research partners.
					</P>
					<H4>Biometric Analysis</H4>
					<P
						>We incorporate eye tracking and physiological monitoring to gives an in-depth
						understanding of driver response.</P
					>
					<H4>Driver Performance</H4>
					<P
						>We measure how the piloted vehicle behaves and how it interacts with surrounding
						traffic.</P
					>
					<H4>Sentiment research</H4>
					<P
						>We collaborate with industry partners to provide a structured qualitative research
						component to enable an holistic understanding of driver behaviour.</P
					>
					<H3>Scenario Development</H3>
					<P
						>The simulator’s underlying software is composed of a set of modular, interlinked,
						applications. These applications are designed to support MXT’s work by enabling the
						efficient recreation of compliant UK road networks and traffic simulations.</P
					>
					<P
						>This means we can routinely produce virtual road environments and scenarios that are
						faithful to their real-world counterparts.</P
					>
				</svelte:fragment>
			</Section>
		</div>
		<div class="section">
			<Section
				scrollObserveAction={(el) => scrollObserve(el, 'service-3')}
				associatedState={sectionsData[2].associatedState}
				title={sectionsData[2].title}
				subtitle={sectionsData[2].subtitle}
				isLast={true}
				isFirst={false}
				scrollToId={sectionsData[2].scrollTo}
			>
				<svelte:fragment slot="type">
					<P>
						MXT produce interactive visualisations for Nationally Significant Infrastructure
						Projects (NSIPs). Understanding planning applications can be challenging. Our work is to
						transform your existing data into intuitive and immersive experiences for diverse
						stakeholders from public and policy-making to, design, engineering and operational
						audiences alike.
					</P>
					<H3>Benefits across the project lifecycle</H3>
					<P>
						Visualisations are cost effective when they recycle existing data and build digital
						assets that add value across the project lifecycle, from public and scientific
						communication to decision making and operational simulations.
					</P>
					<H4>Digital Communication</H4>
					<P>
						Engagement is more impactful when you can demonstrate your thinking visually, audibly
						and experientially. Our tools empower customers to explore and learn about a project for
						themselves. Our free-to-roam and data-led environments give assurance that what they see
						is a transparent reflection of what’s to come.
					</P>
					<H4>Operational Simulations</H4>
					<P>
						By providing a safe environment to interact with digital assets, operations are able to
						address uncertainty in strategic decision making, and build immersive training
						programmes with capability and confidence, before moving to a real-world, live
						environment.
					</P>
					<H3>Designed for reliability at speed</H3>
					<P>
						Our semi-automated approach combines geospatial and physical sciences with game and film
						technologies to generates assurable environments, deliverable with speed.
					</P>
					<H4>Natural Environment</H4>
					<P>
						MXT are specialists at transforming geographic information into natural and believable
						computer generated imagery.
					</P>
					<P>
						Our environmental workflow incorporates data from an environmental statement with
						national surveys by Defra, UKCEH and Ordinance Survey.
					</P>
					<P>
						Combined, these resources underpin the generation of natural landscapes that visualises,
						terrain, land use, ecology and archaeology information.
					</P>
					<P>--- images ---</P>
					<H4>Built Environment</H4>
					<P>
						We specialise in preparing our client's building information modelling (BIM) for
						interactive use, collaborating with engineers and architects to realise a project’s
						design ambitions for public consultation. Post-decision, we efficiently handle detailed
						design updates and maintain value during delivery by utilizing our environments and
						assets in operational contexts.
					</P>
					<H4>Road User Modelling</H4>
					<P>
						Transport schemes are designed to make customer journeys safer, greener, quicker and
						more reliable. The most impactful way of communicating those benefits is to show those
						customers how their journey’s will change.
					</P>
					<P>--- images ---</P>
					<P>
						To-date MXT are the only UK government provider to marry building information and
						traffic modelling to give customers a complete and immersive view of the improved
						effects from a scheme.
					</P>
					<P>
						Our interactive mobility simulations ingest standard two-dimensional, origin-destination
						data and return believable, three-dimensional results; faithfully recreating the
						physics, graphics and traffic management of real transport environments.
					</P>
					<P>--- Download technical specification here ---</P>
				</svelte:fragment>
			</Section>
		</div>
	</div>
</div>

<style>
	.landing-spacer {
		height: 150px;
	}

	.two-col-container {
		width: 100%;
		display: grid;
		grid-template-columns: 0 1fr 2.3fr 0;
		overflow-x: clip;
	}

	@media (min-width: 1800px) {
		.two-col-container {
			grid-template-columns: 1fr calc(1800px / 3) calc(1800px / 3 * 2) 1fr;
		}
	}

	.left-col {
		grid-column: 2 / 3;
		grid-row: 1 / 1;
		position: sticky;
		top: 0;
		left: 0;
		align-self: start;
	}

	.left-bar {
		height: 100dvh;
		width: 100%;
		display: flex;
		flex-direction: column;
		min-height: 0;
		overflow-y: scroll;
		scrollbar-width: none;
	}

	.left-bar::-webkit-scrollbar {
		display: none;
	}

	.list {
		flex-shrink: 0;
		display: grid;
		grid-auto-flow: row;
		grid-auto-rows: 1fr;
		gap: 20px;
		margin-left: var(--horizontal-margin);
		position: sticky;
		align-self: start;
		top: 0px;
		padding-top: var(--horizontal-margin);
		padding-bottom: var(--horizontal-margin);
	}

	.right-col {
		grid-column: 3 / 4;
		grid-row: 1 / 1;
	}

	.section:last-child {
		min-height: calc(100dvh - 40px);
	}

	@media (max-width: 1000px) {
		.two-col-container {
			grid-template-columns: 1fr;
		}

		.left-col {
			display: none;
		}

		.right-col {
			grid-column: 1 / 2;
		}
	}
</style>
