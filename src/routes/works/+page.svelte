<script>
	import SecondaryPageHeader from '$lib/SecondaryPageHeader.svelte';
	import WidthContainer from '$lib/WidthContainer.svelte';
	import WorkCard from '$lib/WorkCard.svelte';
	import { worksData } from '$lib/worksData';
</script>

<svelte:head>
	<title>Works</title>
</svelte:head>

<SecondaryPageHeader
	title="Works"
	leadingParagraphs={[
		`Our work in Immersive Technologies is being used to reduce business costs, accelerate
			learning, enhance experiences, mitigate risk, simulate, evaluate, and much more across a range
			of clients.`,
		`The case studies that you see here are all live solutions delivering measurable results. We’d
			love to discuss them with you and we’re happy to connect you with our clients to hear their
			stories of working with us.`
	]}
/>

<WidthContainer>
	<ul class="cards">
		{#each worksData as card}
			<WorkCard
				href={card.href}
				title={card.title}
				leadingParagraph={card.leadParagraph}
				imageUrl={card.imageUrl}
			/>
		{/each}
	</ul>
</WidthContainer>

<style>
	.cards {
		display: grid;
		grid-auto-flow: row;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 1fr;
		column-gap: var(--horizontal-margin);
		row-gap: 50px;
		margin-bottom: var(--horizontal-margin);
		margin-top: 50px;
	}

	@media (max-width: 800px) {
		.cards {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 660px) {
		.cards {
			row-gap: 40px;
		}
	}
</style>
