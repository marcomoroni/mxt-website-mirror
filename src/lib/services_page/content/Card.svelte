<script lang="ts">
	import { accentColourInServicesProps } from '$lib/three_scene/threeStateStores';
	import ReadMoreButton from './ReadMoreButton.svelte';

	export let backgroundImg: string | undefined = undefined;
	export let intro = false;

	let isShowingBack = false;

	function flipSide() {
		isShowingBack = !isShowingBack;
	}
</script>

<div
	class="card"
	style:background-image={`url(${backgroundImg})`}
	class:no-background={intro}
	style:color={intro
		? `color-mix(in oklab, var(--color-primary) 50%, ${$accentColourInServicesProps})`
		: undefined}
>
	<div class="front-content" inert={isShowingBack}>
		<slot name="front" />
	</div>

	{#if $$slots.back}
		<div
			class="back-background"
			inert={!isShowingBack}
			class:visible={isShowingBack}
			style:background-color={`color-mix(in oklab, var(--color-primary) 10%, ${$accentColourInServicesProps})`}
		/>
		<div class="back-content" inert={!isShowingBack} class:visible={isShowingBack}>
			<slot name="back" />
		</div>
	{/if}

	{#if $$slots.back}
		<div class="read-more-button-container">
			<ReadMoreButton expanded={isShowingBack} onClick={flipSide} />
		</div>
	{/if}
</div>

<style>
	.card {
		display: grid;
		--horizontal-padding: 70px;
		grid-template-rows: var(--horizontal-padding) 1fr var(--horizontal-padding);
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #fcfbfa;
		background-size: cover;
		background-position: center;
	}

	.no-background {
		background-color: unset;
	}

	.front-content,
	.back-content {
		grid-row: 2 / 3;
		grid-column: 1 / 2;
		align-self: stretch;
		justify-self: stretch;
		display: grid;
	}

	.back-background {
		grid-row: 1 / 4;
		grid-column: 1 / 2;
		opacity: 0;
		transition: opacity 0.5s var(--ease);
		transition-delay: 0.55s;
	}

	.back-background.visible {
		opacity: 1;
		transition-delay: 0s;
	}

	.back-content {
		color: white;
		opacity: 0;
		transition: opacity 0.5s var(--ease);
		transition-delay: 0s;
	}

	.back-content :global(p),
	.back-content :global(ul) {
		opacity: 0.8;
	}

	.back-content.visible {
		opacity: 1;
		transition-delay: 0.6s;
	}

	.read-more-button-container {
		grid-row: 3 / 4;
		grid-column: 1 / 2;
		align-self: stretch;
		justify-self: end;
		z-index: 1;
		display: grid;
	}
</style>
