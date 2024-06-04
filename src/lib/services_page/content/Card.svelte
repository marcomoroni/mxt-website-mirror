<script lang="ts">
	import { accentColourInServicesProps } from '$lib/three_scene/threeStateStores';
	import ReadMoreButton from './ReadMoreButton.svelte';

	export let backgroundImg: string | undefined = undefined;
	export let intro = false;
	export let backgroundCover = false;
	export let customBackgroundColor: string | undefined = undefined;

	let isShowingBack = false;

	function flipSide() {
		isShowingBack = !isShowingBack;
	}
</script>

<div
	class="card"
	style:background-image={backgroundImg !== undefined ? `url('${backgroundImg}')` : undefined}
	class:background-cover={backgroundCover}
	class:no-background={intro}
	style:color={intro
		? `color-mix(in oklab, var(--color-primary) 50%, ${$accentColourInServicesProps})`
		: undefined}
	style:background-color={customBackgroundColor}
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
		--read-more-buttonn-size: 48px;
		--horizontal-padding: calc(60px + 48px);
		grid-template-rows: var(--horizontal-padding) 1fr var(--horizontal-padding);
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #fcfbfa;
		background-size: cover;
		background-position: center;
	}

	.background-cover {
		background-size: contain;
		background-repeat: no-repeat;
	}

	.no-background {
		background-color: unset;
	}

	.front-content,
	.back-content {
		grid-row: 2 / 3;
		grid-column: 1 / 2;
		justify-self: stretch;
		display: grid;
	}

	.front-content {
		align-self: start;
		margin-top: 30px;
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
		align-self: stretch;
		color: white;
		opacity: 0;
		transition: opacity 0.5s var(--ease);
		transition-delay: 0s;
	}

	.back-content :global(p),
	.back-content :global(ul) {
		opacity: 0.9;
	}

	.back-content.visible {
		opacity: 1;
		transition-delay: 0.6s;
	}

	.read-more-button-container {
		grid-row: 1 / 2;
		grid-column: 1 / 2;
		align-self: stretch;
		justify-self: start;
		z-index: 1;
		display: grid;
	}

	@media (max-width: 600px) {
		.card {
			--horizontal-padding: calc(20px + 48px);
		}

		.front-content {
			margin-top: 16px;
		}
	}
</style>
