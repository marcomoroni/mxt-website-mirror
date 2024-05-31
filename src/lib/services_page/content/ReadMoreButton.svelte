<script lang="ts">
	export let expanded: boolean;
	export let onClick: () => void;
</script>

<div class="alignment-helper">
	<button on:click={onClick}>
		<div class="plus" class:rotate={expanded}>
			<div class="line vertical" />
			<div class="line horizontal" />
		</div>
	</button>
</div>

<style>
	.alignment-helper {
		align-self: stretch;
		aspect-ratio: 1 / 1;
		display: grid;
	}

	button {
		align-self: start;
		justify-self: start;
		background-color: var(--color-primary);
		--size: 48px;
		width: var(--size);
		height: var(--size);
		border-radius: 100000px;
		z-index: 1;
		display: grid;
	}

	.plus {
		justify-self: center;
		align-self: center;
		--size: 20px;
		width: var(--size);
		height: var(--size);
		display: grid;
		--stroke-size: 2px;
		transition: transform 0.5s var(--ease);
	}

	.line {
		grid-row: 1 / 2;
		grid-column: 1 / 2;
		background-color: white;
	}

	.horizontal {
		align-self: center;
		justify-self: stretch;
		height: var(--stroke-size);
	}

	.vertical {
		align-self: stretch;
		justify-self: center;
		width: var(--stroke-size);
	}

	.rotate {
		transform-origin: center center;
		transform: rotate(45deg);
	}
</style>
