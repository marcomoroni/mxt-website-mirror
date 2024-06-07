<script lang="ts">
	export let expanded: boolean;
	export let onClick: () => void;
</script>

<button on:click={onClick}>
	<div class="plus" class:rotate={expanded}>
		<div class="line vertical" />
		<div class="line horizontal" />
	</div>
</button>

<style>
	button {
		align-self: start;
		justify-self: start;
		margin-left: 60px;
		margin-top: 60px;
		background-color: var(--color-primary);
		width: var(--read-more-buttonn-size);
		height: var(--read-more-buttonn-size);
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

	@media (max-width: 600px) {
		button {
			margin-left: 20px;
			margin-top: 20px;
		}
	}
</style>
