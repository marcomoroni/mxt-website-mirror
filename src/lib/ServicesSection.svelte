<script lang="ts">
	import ServicesThreeScene from './services_three_scene/ServicesThreeScene.svelte';

	export let cssBackgroundColor: string;
	let windowHeight: number;
	let scrollY: number;

	let withMargin: boolean;

	function xxx(el: HTMLElement) {
		let stopAnimation = false;

		const updateMargin = () => {
			const treshold = 30;
			const distanceFromBottomOfScreen = windowHeight - el.getBoundingClientRect().bottom;
			withMargin = distanceFromBottomOfScreen >= treshold;

			if (!stopAnimation) {
				requestAnimationFrame(() => {
					updateMargin();
				});
			}
		};

		updateMargin();

		return {
			destroy() {
				stopAnimation = true;
			}
		};
	}
</script>

<svelte:window bind:scrollY bind:innerHeight={windowHeight} />

<section
	use:xxx
	class="section"
	class:with-margin={withMargin}
	style:background={`linear-gradient(to bottom, transparent 10%, ${cssBackgroundColor} 80%)`}
>
	<div class="type-container">
		<div class="type">
			<slot name="type" />
			<div class="type-bottom-margin" />
		</div>
	</div>
	<div class="illustration">
		<ServicesThreeScene moveAwayFromCamera={withMargin} />
	</div>
	<div class="vertical-margin left" />
	<div class="vertical-margin right" />
</section>

<style>
	.section {
		display: grid;
		--inner-margin: 14px;
	}

	.type-container {
		grid-column: 1 / 11;
		grid-row: 1;

		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
		margin-left: calc(var(--case-study-margin)+ var(--inner-margin));
		margin-right: calc(var(--case-study-margin)+ var(--inner-margin));
	}

	.type {
		grid-column: 5 / 9;
		grid-row: 1;
	}

	.type-bottom-margin {
		height: 70px;
	}

	.illustration {
		grid-column: 1 / 11;
		grid-row: 1;
		height: max(500px, 100dvh);
		position: sticky;
		top: 0;
		align-self: start;
		pointer-events: none;
	}

	.vertical-margin {
		grid-column: 1 / 11;
		grid-row: 1;
		width: 0px;
		background-color: var(--color-background);
		z-index: 1;
		transition: width 1s var(--ease);
	}

	.vertical-margin.left {
		justify-self: start;
	}

	.vertical-margin.right {
		justify-self: end;
	}

	.with-margin .vertical-margin {
		width: var(--case-study-margin);
	}

	@media (max-width: 900px) {
		.section {
			grid-template-columns: unset;
			grid-auto-flow: row;
		}

		.illustration {
			grid-column: unset;
			grid-row: 1;
			width: 100%;
			height: unset;
			aspect-ratio: 1 / 1;
			position: relative;
		}

		.type {
			grid-column: unset;
			grid-row: 2;
		}
	}
</style>
