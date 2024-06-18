<script lang="ts">
	import Card from './Card.svelte';
	import CardContentScaffold from './CardContentScaffold.svelte';
	import Content from './Content.svelte';
	import * as ColumnsCardContent from './columns-card-content';
	import * as IntegrationsCollection from './integrations-collection';
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
					<CardContentScaffold width="3">
						<ColumnsCardContent.Container>
							<ColumnsCardContent.Column>
								<h3 class="small-header">Enhance Communication</h3>
								<p>
									Engagement is more impactful when you demonstrate your thinking visually, audibly
									and experientially.
								</p>
								<ul class="with-disc">
									<li>Deliver key messages about client scheme requirements</li>
									<li>
										Free-to-roam, data led environments build trust that a visualisation is a
										transparent reflection of what’s to come
									</li>
									<li>Gain insight into customer sentiment through in-built analytics</li>
								</ul>
							</ColumnsCardContent.Column>
							<ColumnsCardContent.Divider />
							<ColumnsCardContent.Column>
								<h3 class="small-header">Improve Planning</h3>
								<p>
									We provide a safe, repeatable digital project twin for operations teams to address
									uncertainty in decision-making, conduct scenario planning and develop immersive
									training programs.
								</p>
							</ColumnsCardContent.Column>
							<ColumnsCardContent.Divider />
							<ColumnsCardContent.Column>
								<h3 class="small-header">Cost Saving</h3>
								<p>
									Our software recycles and reuses existing data and delivers new digital assets
									that add value throughout the project lifecycle.
								</p>
							</ColumnsCardContent.Column>
						</ColumnsCardContent.Container>
					</CardContentScaffold>
				</svelte:fragment>
			</Card>
		</div>

		<div class="card-container-3 common-card-min-height">
			<Card backgroundImg={'/images/CountessJ_Sequence01.0000_colours.jpeg'}>
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
					<CardContentScaffold width="3">
						<ColumnsCardContent.Container>
							<ColumnsCardContent.Column>
								<h3 class="small-header">Natural Environment</h3>
								<p>
									MXT are specialists in transforming geographic information into natural and
									believable computer-generated imagery.
								</p>
								<p>
									Our environmental workflow incorporates data from both environmental impact
									assessments and national surveys.
								</p>
								<p>
									Combined, these resources underpin the generation of natural landscapes that
									visualise, terrain, land use, ecology and archaeology information.
								</p>
								<IntegrationsCollection.Container>
									<IntegrationsCollection.Entry
										img="/images/dep.png"
										alt="Logo of the Department for Environment, Food and Rural Affairs."
									/>
									<IntegrationsCollection.Entry
										img="/images/bluesky-international.x46346564.webp"
										alt="Logo of BlueSky."
									/>
									<IntegrationsCollection.Entry
										img="/images/ukceh_logo_long_720x170_rgb.png"
										alt="Logo of UK Centre for Ecology & Hydrology."
									/>
								</IntegrationsCollection.Container>
							</ColumnsCardContent.Column>
							<ColumnsCardContent.Divider />
							<ColumnsCardContent.Column>
								<h3 class="small-header">Built Environment</h3>
								<p>
									MXT specialise in preparing our clients’ Building Information Modelling (BIM) for
									interactive use, collaborating with engineers and architects to realise a
									project’s design ambitions for public consultation. Post-decision, we efficiently
									handle detailed design updates and extend value, during delivery, by using our
									environments and assets in operational contexts.
								</p>
								<IntegrationsCollection.Container>
									<IntegrationsCollection.Entry
										img="/images/ord.png"
										alt="Logo of Ordinance Survey."
									/>
									<IntegrationsCollection.Entry
										img="/images/nh.png"
										alt="Logo of National Highways."
									/>
									<IntegrationsCollection.Entry img="/images/verisk.png" alt="Logo of Verisk." />
								</IntegrationsCollection.Container>
							</ColumnsCardContent.Column>
							<ColumnsCardContent.Divider />
							<ColumnsCardContent.Column>
								<h3 class="small-header">Road User Modelling</h3>
								<p>
									Transport schemes are designed to make customer journeys safer, greener, quicker,
									and more reliable. The most impactful way of communicating those benefits is to
									show those customers how their journey’s will chang.
								</p>
								<p>
									MXT is the first and currently the only UK government provider to combine building
									information and traffic modelling into a single solution. This unique approach
									offers customers a complete and immersive view of a projects journey time and
									congestion improvements.
								</p>
								<p>
									Our interactive mobility simulations ingest standard two-dimensional,
									origin-destination data and return believable, three-dimensional results;
									faithfully recreating the physics, graphics and traffic management of real
									transport environments.
								</p>
								<IntegrationsCollection.Container>
									<IntegrationsCollection.Entry img="/images/asam.png" alt="Logo of ASAM." />
									<IntegrationsCollection.Entry img="/images/sumo.png" alt="Logo of SUMO." />
									<IntegrationsCollection.Entry img="/images/ptv.jpg" alt="Logo of PTV." />
								</IntegrationsCollection.Container>
							</ColumnsCardContent.Column>
						</ColumnsCardContent.Container>
					</CardContentScaffold>
				</svelte:fragment>
			</Card>
		</div>
	</div>
</Content>

<style>
	.grid {
		display: grid;
		gap: var(--grid-gap);
		align-items: stretch;
		justify-items: stretch;
	}

	.card-container-1 {
		grid-row: 1;
	}

	.card-container-2 {
		grid-row: 2;
	}

	.card-container-3 {
		grid-row: 3;
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
