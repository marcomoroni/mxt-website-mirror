<script lang="ts">
	import WidthContainer from '../WidthContainer.svelte';
</script>

<WidthContainer>
	<div class="gallery">
		<slot />
	</div>
</WidthContainer>

<style>
	.gallery {
		display: grid;
		grid-auto-flow: row;
		grid-auto-rows: 1fr;
		column-gap: var(--horizontal-margin);
		row-gap: var(--horizontal-margin);
	}

	/* https://stackoverflow.com/questions/8720931/can-css-detect-the-number-of-children-an-element-has */
	/* 1 child */
	:global(.gallery:has(.item:first-child:nth-last-child(1))) {
		grid-template-columns: 1fr;
	}

	/* 2 children */
	:global(.gallery:has(.item:first-child:nth-last-child(2))),
	:global(.gallery:has(.item:first-child:nth-last-child(2) ~ .item)) {
		grid-template-columns: 1fr 1fr;
	}

	:global(.gallery .item) {
		display: table;
	}

	/* 1 child */
	:global(.gallery:has(.item:first-child:nth-last-child(1)) .figure-container) {
		aspect-ratio: calc(2) / 1;
	}

	/* 2 children */
	:global(.gallery:has(.item:first-child:nth-last-child(2)) .figure-container),
	:global(.gallery:has(.item:first-child:nth-last-child(2) ~ .item) .figure-container) {
		aspect-ratio: 1 / 1;
	}

	:global(.gallery .item figcaption) {
		margin-top: 10px;
		font-size: 15px;
		color: #b3aaa6;
	}

	@media (max-width: 660px) {
		:global(.gallery .item figcaption) {
			font-size: 13.5px;
		}
	}

	@media (max-width: 770px) {
		/* 2 children */
		:global(.gallery:has(.item:first-child:nth-last-child(2))),
		:global(.gallery:has(.item:first-child:nth-last-child(2) ~ .item)) {
			grid-template-columns: 1fr;
		}

		/* 1 child */
		:global(.gallery:has(.item:first-child:nth-last-child(1)) .figure-container) {
			aspect-ratio: 1 / 1;
		}
	}
</style>
