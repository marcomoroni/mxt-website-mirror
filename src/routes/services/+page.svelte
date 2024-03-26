<script lang="ts">
	import AccessibleHiddenHeader from '$lib/AccessibleHiddenHeader.svelte';
	import SecondaryPageLanding from '$lib/SecondaryPageLanding.svelte';
	import ServicesSection from '$lib/ServicesSection.svelte';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';
</script>

<svelte:head>
	<title>{mxtHeadTitle('Services')}</title>
</svelte:head>

<AccessibleHiddenHeader text="Services" />

<SecondaryPageLanding text={'-------------------------'} />

<div class="landing-spacer" />

<ServicesSection cssBackgroundColor={'white'}>
	<svelte:fragment slot="type">
		<h2 class="services-page-h2">Digital infrastructure</h2>
		<p>
			MXT produce interactive visualisations for Nationally Signficant Infrastructure Projects
			(NSIPs). Understanding complex scientific and industrial data visualisations in 2D can be
			challenging. Our work is to transform your existing surveying, mapping and modelling into
			intuitive and immersive, human-centred experiences for diverse stakeholders from public and
			policy-making to, design, engineering and operational audiences alike.
		</p>
		<h3 class="services-page-h3">Benefits across the project lifecycle</h3>
		<p>
			Visualisations are cost effective when they recycle existing data and build digital assets
			that add value across the project lifecycle, from public and scientific communication to
			decision making and operational simulations.
		</p>
		<h4 class="services-page-h4">Digital Communication</h4>
		<p>
			Engagement is more impactful when you can demonstrate your thinking visually, audibly and
			experientially. Our tools empower customers to explore and learn about a project for
			themselves. Our free-to-roam and data-led environments give assurance that what they see is a
			transparent reflection of what’s to come.
		</p>
		<h4 class="services-page-h4">Operational Simulations</h4>
		<p>
			By providing a safe environment to interact with digital assets, operations are able to
			address uncertainty in stategic decision making, and build immersive training programmes with
			capability and confidence, before moving to a real-world, live environment.
		</p>
		<h3 class="services-page-h3">Designed for reliability at speed</h3>
		<p>
			Our approach combines geospatial and physical sciences with game and film technologies to
			produce a semi-automated workflow that generates assurable environments, deliverable at pace.
		</p>
		<h4 class="services-page-h4">Natural Environment</h4>
		<p>
			MXT are specialists at transforming geomatic and geographic information into natural and
			believable computer generated imagery.
		</p>
		<p>
			Our environmental workflow incorporates both masterplans from a statutory planning process and
			data from national survey programmes by Defra, UKCEH and Ordinance Survey.
		</p>
		<p>
			Combined, these resources underpin the generation of natural landscapes that visualises,
			terrain, land use, ecology and archaeology information.
		</p>
		<p>[IMAGES]</p>
		<h4 class="services-page-h4">Built Environment</h4>
		<p>
			We specialise in preparing our client's building information modelling (BIM) for interactive
			use, collaborating with engineers and architects from early stages to realise a project’s
			design ambitions. Post-approval, we efficiently handle detailed design updates and maintain
			value during delivery by utilizing our environments and assets in operational contexts.
		</p>
		<h4 class="services-page-h4">Road User Modelling</h4>
		<p>
			Transport schemes are designed to make customer journeys safer, greener, quicker and more
			reliable. The most impactful way of communicating those benefits is to show those customers
			how their journey’s will change.
		</p>
		<p>
			To-date MXT are the only UK government provider to marry building information and traffic
			modelling to give customers a complete and immersive view of the improved effects from a
			scheme.
		</p>
		<p>
			Our interactive mobility simulations ingest standard two-dimensional, origin-destination data
			and return believable, three-dimensional results; faithfully recreating the physics, graphics
			and traffic management of real transport environments.
		</p>
	</svelte:fragment>
</ServicesSection>
<div class="section-gap" />
<ServicesSection cssBackgroundColor={'white'}>
	<svelte:fragment slot="type">...</svelte:fragment>
</ServicesSection>
<div class="section-gap" />
<ServicesSection cssBackgroundColor={'white'}>
	<svelte:fragment slot="type">...</svelte:fragment>
</ServicesSection>
<div class="bottom-page-spacer" />

<style>
	.landing-spacer {
		height: 120px;
	}

	.section-gap {
		height: 120px;
	}

	.services-page-h2 {
		font-size: 34px;
		font-weight: 600;
		margin-bottom: 60px;
		text-align: center;
	}

	.services-page-h3 {
		font-size: 23px;
		font-weight: 500;
		margin-top: 50px;
		margin-bottom: 12px;
	}

	.services-page-h4 {
		font-size: 17px;
		font-weight: 650;
		margin-top: 22px;
		margin-bottom: 12px;
	}

	.bottom-page-spacer {
		height: 100px;
	}
</style>
