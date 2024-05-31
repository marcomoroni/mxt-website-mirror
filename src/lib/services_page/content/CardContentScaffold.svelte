<script lang="ts">
	export let width: '1' | '2';
</script>

<div class="scaffold" class:tight={width === '1'}>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.scaffold {
		align-self: stretch;
		display: grid;
		--horizontal-padding: 60px;
		grid-template-columns: var(--horizontal-padding) minmax(auto, 800px) auto var(
				--horizontal-padding
			);
		padding-block: 10px;
	}

	.scaffold.tight {
		grid-template-columns: var(--horizontal-padding) minmax(auto, 600px) auto var(
				--horizontal-padding
			);
	}

	.content {
		align-self: center;
		justify-self: stretch;
		grid-column: 2 / 3;
	}

	@media (max-width: 600px) {
		.scaffold {
			--horizontal-padding: 20px;
		}
	}
</style>
