<script lang="ts">
	import StonehengeInUk from './case_study_cards/StonehengeInUk.svelte';
</script>

<div class="gallery">
	<figure class="item">
		<div class="figure-container">
			<StonehengeInUk />
		</div>
		<figcaption>Stonehenge location in the UK.</figcaption>
	</figure>
	<figure class="item expand color">
		<div class="figure-container" />
	</figure>
</div>

<style>
	.gallery {
		position: relative;
		min-width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: var(--horizontal-margin);
		/* TODO: dvw does not include scrollbars, so if the scroolbar is visible the calculation in not correct. */
		--caluclated-padding: max(calc((100dvw - var(--content-width)) / 2), var(--horizontal-margin));
		--peek: 10px;
		overflow-x: scroll;
		scroll-snap-type: x proximity;
		--unit-1fr: var(--content-width);
		--unit-2fr: calc((var(--content-width) - var(--horizontal-margin)) / 2);
	}

	.gallery::-webkit-scrollbar {
		display: none;
	}

	.item {
		scroll-snap-align: start;
		scroll-margin-left: var(--caluclated-padding);
		display: table;
	}

	.item:first-child {
		margin-left: var(--caluclated-padding);
	}

	.item:last-child {
		margin-right: var(--caluclated-padding);
	}

	.figure-container {
		position: relative;
		height: min(var(--unit-2fr), calc(100dvw - (var(--horizontal-margin) * 2) - var(--peek)));
		aspect-ratio: 1 / 1;
	}

	.item.expand .figure-container {
		width: var(--unit-1fr);
	}

	.item.color .figure-container {
		background-image: url(/images/stonehenge.jpg);
		background-size: cover;
		background-position: center center;
	}

	.item figcaption {
		display: table-caption;
		caption-side: bottom;
		margin-top: 10px;
		font-size: 15px;
		color: #b3aaa6;
	}

	@media (max-width: 660px) {
		.item figcaption {
			font-size: 13.5px;
		}
	}
</style>
