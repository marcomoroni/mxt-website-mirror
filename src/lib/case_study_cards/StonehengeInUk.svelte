<script lang="ts">
	import CaseStudyCard from '$lib/CaseStudyCard.svelte';
	import UkOutline from '$lib/svg/UkOutline.svelte';
</script>

<CaseStudyCard>
	<div class="container">
		<div class="uk">
			<UkOutline />
			<div class="stonehenge-pin" />
		</div>
	</div>
</CaseStudyCard>

<style>
	.container {
		aspect-ratio: 1 / 1;
		padding: 20px;

		--stripe-size: calc(var(--card-stroke) * 0.9);
		--stripe-gap-size: 5px;
		--stripe-color: var(--color-card-primary);
		background: repeating-linear-gradient(
			135deg,
			transparent,
			transparent var(--stripe-gap-size),
			var(--stripe-color) calc(var(--stripe-gap-size) + 0.2px),
			var(--stripe-color) calc(var(--stripe-gap-size) + var(--stripe-size)),
			transparent calc(var(--stripe-gap-size) + var(--stripe-size) + 0.2px)
		);
	}

	.uk {
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: relative;
	}

	.uk :global(svg) {
		height: 100%;
	}

	.uk :global(svg path) {
		stroke: var(--color-card-primary);
		stroke-width: 1.1px;
		fill: var(--color-background);
	}

	.stonehenge-pin {
		--size: 3.4%;
		width: var(--size);
		height: var(--size);
		border-radius: 10000px;
		background-color: #dfa638;
		border: var(--card-stroke) solid var(--color-card-primary);
		position: absolute;
		top: 88%;
		left: 53%;
		transform: translate(-50%, -50%);
	}
</style>
