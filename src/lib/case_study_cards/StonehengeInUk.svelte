<script lang="ts">
	import CaseStudyCard from '$lib/CaseStudyCard.svelte';
	import UkOutline from '$lib/svg/UkOutline.svelte';
</script>

<CaseStudyCard>
	<div class="container card-stripe-pattern">
		<div class="uk">
			<UkOutline />
			<div class="stonehenge-pin" />
		</div>
	</div>
</CaseStudyCard>

<style>
	.container {
		width: 100%;
		height: 100%;
		padding: 20px;
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
		stroke-width: var(--card-stroke);
		fill: var(--color-background);
	}

	.stonehenge-pin {
		width: 3.4%;
		aspect-ratio: 1 /1;
		border-radius: 10000px;
		background-color: var(--color-accent-1);
		border: var(--card-stroke) solid var(--color-card-primary);
		position: absolute;
		top: 88%;
		left: 53%;
		transform: translate(-50%, -50%);
	}
</style>
