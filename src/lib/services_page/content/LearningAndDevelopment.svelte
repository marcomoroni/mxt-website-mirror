<script lang="ts">
	import Card from './Card.svelte';
	import CardContentScaffold from './CardContentScaffold.svelte';
	import Content from './Content.svelte';
	import * as ColumnsCardContent from './columns-card-content';
</script>

<Content>
	<div class="grid">
		<div class="card-container-1">
			<Card intro={true}>
				<div slot="front" class="intro">
					<p>
						Games technologies, simulation, transform scenario planning, learning and development.
						MXT’s intuitive, interactive, and immersive simulations are cost-effective, flexible,
						and memorable. They are deliverable at scale, offering effective results throughout your
						organisation, into your partners and other key stakeholders.
					</p>
				</div>
			</Card>
		</div>

		<div class="card-container-2 common-card-min-height">
			<Card backgroundImg={'/images/SS1 Medway Tunnel.JPG'}>
				<svelte:fragment slot="front">
					<CardContentScaffold width="1">
						<h2 class="large-header white">Digital Rehearsals</h2>
					</CardContentScaffold>
				</svelte:fragment>
				<svelte:fragment slot="back">
					<CardContentScaffold width="2">
						<p>
							MXT’s simulation capabilities and models are used to enable road-transport planning,
							human-centred design, operational exercises, inductions, planning, and training. One
							single model, such as those MXT produce for tunnels, can be used for multiple use
							cases ranging from maintenance operations through to emergency planning and can host
							an array of our simulation capabilities from traffic flows to cyber attacks, from
							asset locations to data representations.
						</p>
						<p>
							Simulated exercises enable participants to build procedural knowledge and confidence,
							in their roles, in a safe and repeatable environment before being subjected to the
							stresses and risks of a costly, one-and-done, live rehearsal.
						</p>
						<p>
							MXT’s networked software architecture enables scenarios to simulate the division
							between responders who need to communicate, and be coordinated, in complex
							environments. These are great facilitators of collaboration between stakeholders such
							as infrastructure operators and the emergency services.
						</p>
					</CardContentScaffold>
				</svelte:fragment>
			</Card>
		</div>

		<div class="card-container-3 common-card-min-height">
			<Card>
				<svelte:fragment slot="front">
					<CardContentScaffold width="1">
						<h2 class="large-header">Soft Skills</h2>
						<p>
							Beyond procedural knowledge, a modern corporate environment necessitates a workforce
							with a robust set of soft skills; empathy, leadership, resilience and the ability to
							manage through change. It’s often possible — and highly advantageous — to teach teams
							through immersive, virtual reality experiences.
						</p>
					</CardContentScaffold>
				</svelte:fragment>
				<svelte:fragment slot="back">
					<CardContentScaffold width="3">
						<ColumnsCardContent.Container>
							<ColumnsCardContent.Column>
								<h3 class="small-header">Memorable</h3>
								<p>
									Emotion has a substantial influence on our cognitive processes, including
									perception, attention, learning, memory, reasoning and problem solving. By forming
									deeper, emotional, connections to the learning material, MXT’s solutions can
									achieve increased information retention compared to traditional methods. Higher
									retention also means learners may need less frequent refreshers.
								</p>
							</ColumnsCardContent.Column>
							<ColumnsCardContent.Divider />
							<ColumnsCardContent.Column>
								<h3 class="small-header">Enjoyable</h3>
								<p>
									MXT has found that our delegates find interactive, immersive, problem-based
									training to be more enjoyable than traditional classroom-based learning methods.
								</p>
								<p>
									We wanted our learners to feel like their time was spent doing something valuable
									and enjoyable. If learners feel that training is effective, it leads to improved
									employee satisfaction and retention.
								</p>
							</ColumnsCardContent.Column>
							<ColumnsCardContent.Divider />
							<ColumnsCardContent.Column>
								<h3 class="small-header">Flexible</h3>
								<p>
									People are our clients’ most valuable asset. Having teams travel to attend (often)
									off-site, in person, training can be disruptive and difficult. It is also costly.
								</p>
								<p>
									Digital and cloud-based-delivery is flexible to remote and hybrid working
									environments. MXT’s solutions are delivered peripatetically, whether that is
									remote, to a person’s home or their place of work.
								</p>
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
