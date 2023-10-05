<script lang="ts">
	import StonehengeInUk from './case_study_cards/StonehengeInUk.svelte';
	import StonehengeNewOldMap from './case_study_cards/StonehengeNewOldMap.svelte';

	export let defaultScrollToEnd = false;
</script>

<div class="gallery" class:flex-direction-reverse={defaultScrollToEnd}>
	<div class="placeholder">
		<StonehengeInUk />
	</div>
	<div class="placeholder">
		<StonehengeNewOldMap />
	</div>
	<div class="placeholder expand color" />
</div>

<style>
	.gallery {
		position: relative;
		min-width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: var(--horizontal-margin);
		padding-left: var(--horizontal-margin);
		padding-right: var(--horizontal-margin);
		--peek: 10px;
		height: min(400px, calc(100dvw - (var(--horizontal-margin) * 2) - var(--peek)));
		overflow-x: scroll;
		scroll-snap-type: x proximity;
	}

	.flex-direction-reverse {
		flex-direction: row-reverse;
	}

	.placeholder {
		height: 100%;
		aspect-ratio: 1 / 1;
	}

	.placeholder.expand {
		aspect-ratio: 1.5 / 1;
	}

	.placeholder.color {
		background-color: aquamarine;
	}
</style>
