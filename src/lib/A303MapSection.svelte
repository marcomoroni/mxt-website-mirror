<script lang="ts">
	const dataSources = [
		{
			img: '/images/A303Satellite.png',
			fixedImg: false,
			wideType: true,
			type: [
				{ h2: 'Data acquisition and usage' },
				{
					p: 'Accuracy and transparency were ensured by using only publicly available data, particularly emphasizing the standard resources submitted as part of the planning application to the National Inspectorate. MXT has since used this approach to create other realistic environments, quickly, across the UK.'
				}
			],
			scale: 1
		},
		{
			img: '/images/A303Elevation_Alpha.png',
			fixedImg: true,
			wideType: false,
			type: [{ p: 'Elevation...' }],
			scale: 1
		},
		{
			img: '/images/A303Roads_BW.png',
			fixedImg: true,
			wideType: false,
			type: [{ p: 'Roads...' }],
			scale: 1
		},
		{
			img: '/images/A303NewRoads_BW.png',
			fixedImg: true,
			wideType: false,
			type: [{ p: 'New roads...' }],
			scale: 1
		},
		{
			img: '/images/A303LandUse.png',
			fixedImg: true,
			wideType: false,
			type: [{ p: 'Land use...' }],
			scale: 2
		},
		{
			img: '/images/A303Trees_BW.png',
			fixedImg: true,
			wideType: false,
			type: [{ p: 'Trees...' }],
			scale: 1
		}
	];
</script>

<section class="section-data-sources">
	<!-- Make two copied overlapping elements -->
	<div class="map-layers-images">
		<div class="hide-behind-top-margin-container">
			<div class="hide-behind-top-margin" />
		</div>
		{#each dataSources as dataSource}
			<div class="map-layer">
				<div class="solid-gap" />
				<div class="map-layer-img-mask" class:fixed={dataSource.fixedImg}>
					<div class="map-layer-img-scaffold">
						<div
							class="map-layer-img"
							style:background-image={`url(${dataSource.img})`}
							class:add-small-right-inset-margin={dataSource.fixedImg}
						/>
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
			<div class="m-map-layer-img" style:background-image={`url(${dataSource.img})`} />
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

	.map-layer-img {
		background-color: var(--color-background);
		grid-column: 1 / 8;
		grid-row: 1;
		background-size: cover;
		background-position: center center;
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

		.m-map-layer-img {
			aspect-ratio: 16 / 9;
			background-size: cover;
			background-position: center center;
			position: sticky;
			top: var(--case-study-margin);
			align-self: start;
			background-color: var(--color-background);
		}
	}
</style>
