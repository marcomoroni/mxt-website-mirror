<script lang="ts">
	import AccessibleHiddenHeader from '$lib/AccessibleHiddenHeader.svelte';
	import SecondaryPageLanding from '$lib/SecondaryPageLanding.svelte';
	import Section from '$lib/services_page/Section.svelte';
	import SideBarEntry from '$lib/services_page/SideBarEntry.svelte';
	import { accentColor2, accentColor3 } from '$lib/cssValues';
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

	const sideBarEntries = [
		{
			title: 'Digital Infrastructure',
			subtitle:
				'Our multidisciplinary visualisations bring projects to life, improving decision-making and engagement',
			backgroundColor: 'yellow',
			scrollTo: 's1',
			associatedState: 'service-1' as 'service-1'
		},
		{
			title: 'Research',
			subtitle: 'subtitle',
			backgroundColor: accentColor2,
			scrollTo: 's2',
			associatedState: 'service-2' as 'service-2'
		},
		{
			title: 'Learning and Development',
			subtitle: 'subtitle',
			backgroundColor: accentColor3,
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

<div class="two-col-container">
	<div class="left-col">
		<div class="left-bar">
			<div class="fill" />
			<div class="list">
				{#each sideBarEntries as entry}
					<SideBarEntry
						title={entry.title}
						subtitle={entry.subtitle}
						backgroundColor={entry.backgroundColor}
						scrollTo={entry.scrollTo}
						associatedState={entry.associatedState}
					/>
				{/each}
			</div>
			<div class="h-gap" />
		</div>
	</div>
	<div class="right-col">
		<SecondaryPageLanding
			text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id venenatis sapien. Sed maximus nisi quis nibh imperdiet, id efficitur velit eleifend. Curabitur euismod magna ut vehicula accumsan. Integer tempus luctus magna a placerat. Vivamus at luctus nulla. Morbi tristique sapien odio, in porttitor metus interdum quis.'}
		/>
		<div class="landing-spacer" />
		<div id="s1" class="section">
			<Section
				scrollObserveAction={(el) => scrollObserve(el, 'service-1')}
				associatedState="service-1"
			>
				<svelte:fragment slot="type">
					sticky title that needs to be visible on mobile... section 1...
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
		<div id="s2" class="section">
			<Section
				scrollObserveAction={(el) => scrollObserve(el, 'service-2')}
				associatedState="service-2"
			>
				<svelte:fragment slot="type">
					section 2
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
		<div id="s3" class="section">
			<Section
				scrollObserveAction={(el) => scrollObserve(el, 'service-3')}
				associatedState="service-3"
			>
				<svelte:fragment slot="type">
					section 3
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
		height: 120px;
	}

	.two-col-container {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 2fr;
	}

	.left-col {
		grid-column: 1 / 2;
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

	.h-gap {
		flex-basis: var(--horizontal-margin);
		flex-shrink: 0;
	}

	.left-bar::-webkit-scrollbar {
		display: none;
	}

	.fill {
		flex-grow: 1;
		min-height: calc(var(--nav-bar-height) + 40px);
	}

	.list {
		flex-shrink: 0;
		display: grid;
		grid-auto-flow: row;
		grid-auto-rows: 1fr;
		gap: 20px;
		margin-left: var(--horizontal-margin);
	}

	.right-col {
		grid-column: 2 / 3;
		grid-row: 1 / 1;
	}

	.section {
		min-height: 100dvh;
		padding-left: 70px;
		padding-right: 70px;
	}
</style>
