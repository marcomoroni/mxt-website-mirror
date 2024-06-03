<script lang="ts">
	import Card from './Card.svelte';
	import CardContentScaffold from './CardContentScaffold.svelte';
	import Content from './Content.svelte';
</script>

<Content caseStudyIndexes={[0]}>
	<div class="grid">
		<div class="card-container-1">
			<Card intro={true}>
				<div slot="front" class="intro">
					<p>
						MXT produce interactive visualisations for Nationally Significant Infrastructure
						Projects (NSIPs). Understanding planning applications can be challenging. Our work is to
						transform your existing data into intuitive and immersive experiences for diverse
						stakeholders ranging from members of the public and policy makers to designers,
						engineers and operational teams.
					</p>
				</div>
			</Card>
		</div>

		<div class="card-container-2 common-card-min-height">
			<Card>
				<svelte:fragment slot="front">
					<CardContentScaffold width="1">
						<h2 class="large-header">Benefits spanning the project life cycle</h2>
					</CardContentScaffold>
				</svelte:fragment>
				<svelte:fragment slot="back">
					<CardContentScaffold width="2">
						<h3 class="small-header">Enhance Communication</h3>
						<p>
							Engagement is more impactful when you demonstrate your thinking visually, audibly and
							experientially.
						</p>
						<ul class="with-disc">
							<li>Deliver key messages about client scheme requirements</li>
							<li>
								Free-to-roam, data led environments build trust that a visualisation is a
								transparent reflection of what’s to come
							</li>
							<li>Gain insight into customer sentiment through in-built analytics</li>
						</ul>
						<h3 class="small-header">Improve Planning</h3>
						<p>
							We provide a safe, repeatable digital project twin for operations teams to address
							uncertainty in decision-making, conduct scenario planning and develop immersive
							training programs.
						</p>
						<h3 class="small-header">Cost Saving</h3>
						<p>
							Our software recycles and reuses existing data and delivers new digital assets that
							add value throughout the project lifecycle.
						</p>
					</CardContentScaffold>
				</svelte:fragment>
			</Card>
		</div>

		<div class="card-container-3 common-card-min-height">
			<Card backgroundImg={'/images/HighresScreenshot00027.png'}>
				<svelte:fragment slot="front">
					<CardContentScaffold width="1">
						<h2 class="large-header white">Designed for accuracy at speed</h2>
						<p class="white">
							MXT’s semi-automated approach combines geospatial and physical sciences with game and
							film technologies to generates assurable environments, that can be delivered at pace.
						</p>
					</CardContentScaffold>
				</svelte:fragment>
				<svelte:fragment slot="back">
					<CardContentScaffold width="2">
						<h3 class="small-header">Natural Environment</h3>
						<p>
							MXT are specialists in transforming geographic information into natural and believable
							computer-generated imagery.
						</p>
						<p>
							Our environmental workflow incorporates data from both environmental impact
							assessments and national surveys.
						</p>
						<p>
							Combined, these resources underpin the generation of natural landscapes that
							visualise, terrain, land use, ecology and archaeology information.
						</p>
						<h3 class="small-header">Built Environment</h3>
						<p>
							MXT specialise in preparing our clients’ Building Information Modelling (BIM) for
							interactive use, collaborating with engineers and architects to realise a project’s
							design ambitions for public consultation. Post-decision, we efficiently handle
							detailed design updates and extend value, during delivery, by using our environments
							and assets in operational contexts.
						</p>
						<h3 class="small-header">Road User Modelling</h3>
						<p>
							Transport schemes are designed to make customer journeys safer, greener, quicker, and
							more reliable. The most impactful way of communicating those benefits is to show those
							customers how their journey’s will change.
						</p>
						<p>
							MXT are the first, and currently only, UK government provider to combine building
							information and traffic modelling in a single solution that gives customers a complete
							and immersive view of the journey time and congestion improvements a scheme might
							bring.
						</p>
						<p>
							Our interactive mobility simulations ingest standard two-dimensional,
							origin-destination data and output believable, three-dimensional results that
							faithfully recreate the physics, graphics and traffic management of real transport
							environments.
						</p>
					</CardContentScaffold>
				</svelte:fragment>
			</Card>
		</div>
	</div>
</Content>

<style>
	.grid {
		display: grid;
		grid-template-columns: 2fr 3fr;
		gap: var(--grid-gap);
		align-items: stretch;
		justify-items: stretch;
	}

	.card-container-1 {
		grid-row: 1 / 2;
		grid-column: 1 / 2;
	}

	.card-container-2 {
		grid-row: 1 / 2;
		grid-column: 2 / 3;
	}

	.card-container-3 {
		grid-row: 2 / 3;
		grid-column: 1 / 3;
	}

	.white {
		color: white;
	}

	@media (max-width: 1000px) {
		.grid {
			grid-template-columns: unset;
			grid-auto-flow: row;
		}

		.grid > * {
			grid-column: unset;
			grid-row: unset;
		}
	}
</style>
