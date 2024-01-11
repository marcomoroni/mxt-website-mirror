<script lang="ts">
	import CaseStudyCard from '$lib/CaseStudyCard.svelte';
	import { onMount } from 'svelte';
	import SegmentedControl from './pieces/SegmentedControl.svelte';

	const layers = [
		{
			img: '/images/A303Elevation_Alpha.png',
			label: 'Terrain'
		},
		{
			img: '/images/A303Roads_BW.png',
			label: 'Roads'
		},
		{
			img: 'img...',
			label: 'Traffic'
		},
		{
			img: '/images/A303LandUse.png',
			label: 'Land'
		},
		{
			img: '/images/A303Trees_BW.png',
			label: 'Trees'
		},
		{
			img: '/images/A303NewRoads_BW.png',
			label: 'New road'
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
			<div class="map-layer" style:background-image={`url(/images/A303Base_BW.png)`} />
			<div class="map-layer solid-color" />
			{#each layers as { img }, i (i)}
				<div
					class="map-layer tinted"
					class:hidden={i !== currentLayer}
					style:background-image={`url(${img})`}
				/>
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
		display: flex;
		flex-direction: column;
		align-items: center;
		max-height: 100dvh;
		margin-top: 60px;
		margin-bottom: 60px;
	}

	.map {
		margin-left: var(--horizontal-margin);
		margin-right: var(--horizontal-margin);
		margin-bottom: 20px;
		position: relative;
		flex: 1;
		align-self: stretch;
		aspect-ratio: 8 / 4;
	}

	.map-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: opacity 1s ease-in-out;
		background-size: cover;
		background-position: center center;
	}

	.tinted {
		filter: sepia(100%) hue-rotate(159deg);
	}

	.solid-color {
		background-color: color-mix(in srgb, var(--color-background), transparent 30%);
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
