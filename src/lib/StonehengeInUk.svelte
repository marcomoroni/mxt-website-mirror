<script lang="ts">
	import UkOutline from '$lib/UkOutline.svelte';
</script>

<div class="container">
	<div class="uk">
		<UkOutline />
		<div class="stonehenge-pin" />
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		padding: 20px;
	}

	.uk {
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: relative;
	}

	.uk :global(svg) {
		height: 100%;
	}

	.uk :global(svg path) {
		stroke: none;
		fill: #e7e3e0;
	}

	.stonehenge-pin {
		width: 10px;
		aspect-ratio: 1 /1;
		border-radius: 10000px;
		background-color: var(--color-primary);
		position: absolute;
		top: 88%;
		left: 53%;
		transform: translate(-50%, -50%);
	}
</style>
