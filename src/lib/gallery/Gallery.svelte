<script lang="ts">
	import WidthContainer from '../WidthContainer.svelte';

	// The `:has` selector is not supported in Firefox, and adding a class relative the number of children
	// using `use` is not immediate, so in a few initial frames there is an icorrect layout.
	// For the time being, hardcode this value.
	export let childCount: number;

	let childCountClass = `child-count-${childCount}`;
</script>

<WidthContainer>
	<div class="gallery {childCountClass}">
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

	:global(.gallery.child-count-1) {
		grid-template-columns: 1fr;
	}

	:global(.gallery.child-count-2) {
		grid-template-columns: 1fr 1fr;
	}

	:global(.gallery .item) {
		display: table;
	}

	:global(.gallery.child-count-1 .figure-container) {
		aspect-ratio: calc(2) / 1;
	}

	:global(.gallery.child-count-2 .figure-container) {
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
		:global(.gallery.child-count-2) {
			grid-template-columns: 1fr;
		}

		:global(.gallery.child-count-1 .figure-container) {
			aspect-ratio: 1 / 1;
		}
	}
</style>
