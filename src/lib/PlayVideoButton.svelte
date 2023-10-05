<script>
	import Play from './icons/Play.svelte';
</script>

<button>
	<div class="icon"><Play /></div>
	<div class="label">Play video</div>
</button>

<style>
	button {
		color: white;
		background-color: #2c2a28e6;
		height: 50px;
		border-radius: 10000px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.icon {
		--size: 22px;
		width: var(--size);
		height: var(--size);
		margin-left: 18px;
	}

	.icon :global(*) {
		fill: white;
	}

	.label {
		margin-right: 26px;
		margin-left: 8px;
	}
</style>
