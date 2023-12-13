<script lang="ts">
	import CaseStudyCard from '$lib/CaseStudyCard.svelte';
	import { onMount } from 'svelte';
	import SegmentedControl from './pieces/SegmentedControl.svelte';

	const layers = [
		{
			img: 'img...',
			label: 'Roads',
			backgroundColor: 'tomato'
		},
		{
			img: 'img...',
			label: 'Traffic',
			backgroundColor: 'green'
		},
		{
			img: 'img...',
			label: 'Land',
			backgroundColor: 'yellowgreen'
		},
		{
			img: 'img...',
			label: 'Trees',
			backgroundColor: 'cyan'
		},
		{
			img: 'img...',
			label: 'New road',
			backgroundColor: 'salmon'
		}
	];

	$: layerLabels = layers.map((layer) => layer.label);

	let currentLayer = 0;

	onMount(() => {
		const interval = setInterval(() => {
			let newCurrentLayer = currentLayer + 1;
			if (newCurrentLayer >= layers.length) {
				newCurrentLayer = 0;
			}
			currentLayer = newCurrentLayer;
		}, 3000);

		return {
			destroy() {
				clearInterval(interval);
			}
		};
	});
</script>

<CaseStudyCard border={false}>
	<div class="container">
		<div class="map">
			{#each layers as { img, backgroundColor }, i (i)}
				<div
					class="map-layer"
					class:hidden={i !== currentLayer}
					style:background-color={backgroundColor}
				>
					{img}
				</div>
			{/each}
		</div>
		<div class="legend">
			<SegmentedControl
				variant={'MapLegend'}
				accentColor={1}
				choices={layerLabels}
				selected={currentLayer}
			/>
		</div>
	</div>
</CaseStudyCard>

<style>
	.container {
		width: 100%;
		user-select: none;
	}

	.map {
		margin-left: var(--horizontal-margin);
		margin-right: var(--horizontal-margin);
		aspect-ratio: 4 / 3;
		margin-bottom: 15px;
		position: relative;
	}

	.map-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: opacity 1s ease-in-out;
	}

	.map-layer.hidden {
		opacity: 0;
	}

	.legend {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>
