<script lang="ts">
	import { onMount } from 'svelte';
	import TrafficSimulation from './TrafficSimulation.svelte';

	const defaultScale = 1;
	const dataSources = [
		{
			media: { Img: { path: '/images/A303_Map_Features_Base.png' } },
			fixedImg: false,
			wideType: true,
			type: [
				{ h2: 'Data acquisition and usage' },
				{
					p: 'Accuracy and transparency were ensured by using only publicly available data, particularly emphasizing the standard resources submitted as part of the planning application to the National Inspectorate. MXT has since used this approach to create other realistic environments, quickly, across the UK.'
				}
			],
			scale: defaultScale
		},
		{
			media: { Img: { path: '/images/A303_Map_Features_Natural.png' } },
			fixedImg: true,
			wideType: false,
			type: [{ p: 'Nature...' }],
			scale: defaultScale
		},
		{
			media: { Img: { path: '/images/A303_Map_Features_Human-made.png' } },
			fixedImg: true,
			wideType: false,
			type: [{ p: 'Human-made...' }],
			scale: defaultScale
		},
		{
			media: 'Traffic' as 'Traffic',
			fixedImg: true,
			wideType: false,
			type: [{ p: 'Traffic...' }],
			scale: 1.1
		}
	];
	const zoomPivot = { x: 0.8, y: 0.6 };

	let scrollY: number;
	let windowHeight: number;
	let zoom = 1;

	// Note that these are in order.
	const layers: Array<{
		el: HTMLElement;
		zoom: number;
	}> = [];

	function checkNewZoom() {
		let newZoom = layers.at(0)?.zoom ?? 1;
		for (const layer of layers) {
			const hasPassedHalfWindow = layer.el.getBoundingClientRect().y < windowHeight / 2;
			if (hasPassedHalfWindow) {
				newZoom = layer.zoom;
			} else {
				break;
			}
		}

		zoom = newZoom;
	}

	$: {
		if (scrollY) {
			checkNewZoom();
		}
	}

	onMount(() => {
		checkNewZoom();
	});

	function scrollObserve(el: HTMLElement, zoom: number) {
		layers.push({ el, zoom });
	}
</script>

<svelte:window bind:scrollY bind:innerHeight={windowHeight} />

<section class="section-data-sources">
	<!-- Make two copied overlapping elements -->
	<div class="map-layers-images">
		<div class="hide-behind-top-margin-container">
			<div class="hide-behind-top-margin" />
		</div>
		{#each dataSources as dataSource}
			<div class="map-layer" use:scrollObserve={dataSource.scale}>
				<div class="solid-gap" />
				<div class="map-layer-img-mask" class:fixed={dataSource.fixedImg}>
					<div class="map-layer-img-scaffold">
						<div class="map-layer-img-zoom-container">
							<div
								class="map-layer-img"
								style:background-image={dataSource.media !== 'Traffic'
									? `url(${dataSource.media.Img.path})`
									: undefined}
								class:add-small-right-inset-margin={dataSource.fixedImg}
								style:transform={`scale(${zoom})`}
								style:transform-origin={`${zoomPivot.x * 100}% ${zoomPivot.y * 100}%`}
							>
								{#if dataSource.media === 'Traffic'}
									<TrafficSimulation />
								{/if}
							</div>
						</div>
					</div>
				</div>
				<div class="map-layer-type" class:wide={dataSource.wideType}>
					{dataSource.type} aria-hidden="true">
					{#each dataSource.type as t}
						{#if 'h2' in t}
							<h2 class="case-study-section-header">{t.h2}</h2>
						{:else if 'p' in t}
							<p>{t.p}</p>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<div class="map-layers-type">
		{#each dataSources as dataSource}
			<div class="map-layer">
				<div class="solid-gap" />
				<div class="map-layer-img-mask" class:fixed={dataSource.fixedImg}>
					<!-- no need for the rest of the content -->
				</div>
				<div class="map-layer-type" class:wide={dataSource.wideType}>
					{#each dataSource.type as t}
						{#if 'h2' in t}
							<h2 class="case-study-section-header">{t.h2}</h2>
						{:else if 'p' in t}
							<p>{t.p}</p>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
<section class="m-section-data-sources">
	{#each dataSources as dataSource}
		<div class="m-map-layer">
			<div class="m-map-layer-img-zoom-container">
				<div
					class="m-map-layer-img"
					style:background-image={dataSource.media !== 'Traffic'
						? `url(${dataSource.media.Img.path})`
						: undefined}
					style:transform={`scale(${dataSource.scale})`}
					style:transform-origin={`${zoomPivot.x * 100}% ${zoomPivot.y * 100}%`}
				>
					{#if dataSource.media === 'Traffic'}
						<TrafficSimulation />
					{/if}
				</div>
			</div>
			<div class="m-map-layer-type" class:wide={dataSource.wideType}>
				{#each dataSource.type as t}
					{#if 'h2' in t}
						<h2 class="case-study-section-header">{t.h2}</h2>
					{:else if 'p' in t}
						<p>{t.p}</p>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</section>

<style>
	.section-data-sources {
		position: relative;
		margin-left: var(--case-study-margin);
		margin-right: var(--case-study-margin);
	}

	.map-layers-type,
	.map-layers-images {
		display: grid;
		grid-auto-flow: row;
		gap: var(--case-study-margin);
	}

	.map-layers-images {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.map-layer {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
	}

	.map-layers-images .map-layer {
		position: sticky;
		top: var(--case-study-margin);
	}

	.map-layer-img-mask {
		grid-column: 1 / 11;
		grid-row: 1;
		height: max(500px, calc(100dvh - (var(--case-study-margin) * 2)));
		position: sticky;
		top: var(--case-study-margin);
		align-self: start;
		clip-path: inset(0);
	}

	.map-layer-img-scaffold {
		position: fixed;
		top: var(--case-study-margin);
		left: var(--case-study-margin);
		width: calc(100% - (var(--case-study-margin) * 2));
		height: max(500px, calc(100dvh - (var(--case-study-margin) * 2)));
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
	}

	.map-layer-img-mask:not(.fixed) .map-layer-img-scaffold {
		position: relative;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.map-layer-img-zoom-container {
		background-color: var(--color-background);
		grid-column: 1 / 8;
		grid-row: 1;
		overflow: hidden;
	}

	.map-layer-img {
		position: relative;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center center;
		transition: transform 2.5s ease-in-out;
	}

	.map-layers-type .map-layer-img-mask {
		opacity: 0;
	}

	/* To fix a small visual errors where you can see part of the first image behind a subsequent one. */
	.add-small-right-inset-margin {
		margin-right: -1px;
	}

	.map-layer-type {
		grid-column: 8 / 10;
		grid-row: 1;
		min-height: max(500px, calc(100dvh - (var(--case-study-margin) * 2)));
		z-index: 2;
	}

	.map-layer-type.wide {
		grid-column: 8 / 11;
	}

	.solid-gap {
		position: absolute;
		top: calc(var(--case-study-margin) * -1);
		height: var(--case-study-margin);
		width: 100%;
		background-color: var(--color-background);
	}

	.hide-behind-top-margin-container {
		position: absolute;
		top: calc(var(--case-study-margin) * -1);
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1;
	}

	.hide-behind-top-margin {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		height: var(--case-study-margin);
		background-color: var(--color-background);
	}

	.map-layers-images .map-layer-type {
		opacity: 0;
	}

	.m-section-data-sources {
		display: none;
	}

	@media (max-width: 900px) {
		.section-data-sources {
			display: none;
		}

		.m-section-data-sources {
			display: unset;
			display: grid;
			grid-auto-flow: row;
			gap: var(--case-study-margin);
			margin-left: var(--case-study-margin);
			margin-right: var(--case-study-margin);
		}

		.m-map-layer {
			display: grid;
			grid-auto-flow: row;
			gap: var(--case-study-margin);
		}

		.m-map-layer-img-zoom-container {
			aspect-ratio: 16 / 9;
			position: sticky;
			top: var(--case-study-margin);
			align-self: start;
			background-color: var(--color-background);
			overflow: hidden;
		}

		.m-map-layer-img {
			position: relative;
			width: 100%;
			height: 100%;
			background-size: cover;
			background-position: center center;
		}
	}
</style>
