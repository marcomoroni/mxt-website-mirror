<script lang="ts">
	import Card from './Card.svelte';
	import CardContentScaffold from './CardContentScaffold.svelte';
	import Content from './Content.svelte';
</script>

<Content>
	<div class="grid">
		<div class="card-container-1">
			<Card intro={true}>
				<div slot="front" class="intro">
					<p>
						MXT’s vehicle simulator was designed working alongside the UK Government company
						National Highways. It is a virtual validation solution to study the many circumstances
						that affect the performance of drivers and road transport systems and it does so in a
						safe, repeatable environment.
					</p>
				</div>
			</Card>
		</div>

		<div class="card-container-2 common-card-min-height">
			<Card>
				<svelte:fragment slot="front">
					<CardContentScaffold width="1">
						<h2 class="large-header">Human factors research</h2>
					</CardContentScaffold>
				</svelte:fragment>
				<svelte:fragment slot="back">
					<CardContentScaffold width="2">
						<p>
							The safety and satisfaction of road users is impacted by their interaction with
							vehicle and road transport technologies.
						</p>
						<p>
							By examining how drivers use proposed, and existing, transport systems through the
							measurement of distraction, fatigue and impairment factors. We can:
						</p>
						<ul class="with-disc">
							<li>
								Examine the attitudes and behaviour of drivers in a safe and controlled environment
							</li>
							<li>Test and measure drivers’ performance</li>
							<li>Inform legislation, transport policy, and road technology innovation</li>
						</ul>
					</CardContentScaffold>
				</svelte:fragment>
			</Card>
		</div>

		<div class="card-container-3 common-card-min-height">
			<Card
				backgroundImg={'/images/rig-diagram.png'}
				customBackgroundColor={'white'}
				backgroundCover={true}
			>
				<svelte:fragment slot="front" />
				<svelte:fragment slot="back">
					<CardContentScaffold width="2">
						<h2 class="small-header">Simulation Hardware</h2>
						<p>
							MXT driving simulation can be deployed across different platforms. The first
							incorporates our own compact motion platform and advanced mixed reality headset. The
							second is an “At Desk” simulator rig for flexible onsite deployment and multi-site
							deployments.
						</p>
						<p>
							Whichever the most appropriate deployment hardware our driving simulation service
							delivers:
						</p>
						<ul class="with-disc">
							<li>Highly realistic, compliant, infrastructure, assets, and delegate experience</li>
							<li>
								Bespoke scenario simulations rapidly developed and implemented to your
								specifications
							</li>
							<li>Testing of hypotheses and innovations under the same conditions</li>
							<li>Close control of scenarios providing robust evidence of cause and effect</li>
							<li>Safe testing of emergency situations</li>
							<li>Alignment with Department for Transport’s “Pilots and Trials” guidance</li>
							<li>A reduction in the time to get to on-road live trials</li>
						</ul>
					</CardContentScaffold>
				</svelte:fragment>
			</Card>
		</div>

		<div class="card-container-4 common-card-min-height">
			<Card>
				<svelte:fragment slot="front">
					<CardContentScaffold width="1">
						<h2 class="large-header">Data Collection and Analysis</h2>
					</CardContentScaffold>
				</svelte:fragment>
				<svelte:fragment slot="back">
					<CardContentScaffold width="2">
						<p>
							Our data collection and analysis integrates bespoke bio-metric and driver performance
							analysis with structured qualitative interviews delivered by Human-Centred Design
							(HCD) research partners.
						</p>
						<h3 class="small-header">Biometric Analysis</h3>
						<p>
							We incorporate eye tracking and physiological monitoring to gives an in-depth
							understanding of driver response.
						</p>
						<h3 class="small-header">Driver Performance</h3>
						<p>
							We measure how the piloted vehicle behaves and how it interacts with surrounding
							traffic.
						</p>
						<h3 class="small-header">Sentiment research</h3>
						<p>
							We collaborate with industry partners to provide a structured qualitative research
							component to enable an holistic understanding of driver behaviour.
						</p>
					</CardContentScaffold>
				</svelte:fragment>
			</Card>
		</div>

		<div class="card-container-5 common-card-min-height">
			<Card>
				<svelte:fragment slot="front">
					<CardContentScaffold width="1">
						<h2 class="large-header">Scenario Development</h2>
					</CardContentScaffold>
				</svelte:fragment>
				<svelte:fragment slot="back">
					<CardContentScaffold width="2">
						<p>
							The simulator’s underlying software is composed of a set of modular, interlinked,
							applications. These applications are designed to support MXT’s work by enabling the
							efficient recreation of compliant UK road networks and traffic simulations.
						</p>
						<p>
							This means we can routinely produce virtual road environments and scenarios that are
							faithful to their real-world counterparts.
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
		grid-template-columns: 1fr 1fr;
		gap: var(--grid-gap);
		align-items: stretch;
		justify-items: stretch;
	}

	.card-container-1 {
		grid-column: 1 / 3;
		grid-row: 1 / 2;
	}

	.card-container-2 {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
	}

	.card-container-3 {
		grid-column: 2 / 3;
		grid-row: 2 / 3;
	}

	.card-container-4 {
		grid-column: 1 / 2;
		grid-row: 3 / 4;
	}

	.card-container-5 {
		grid-column: 2 / 3;
		grid-row: 3 / 4;
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
