<script>
	import Play from './icons/Play.svelte';
</script>

<button on:click>
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

	button:hover,
	button:focus {
		background-color: #42403fe6;
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
		margin-right: 24px;
		margin-left: 9px;
	}

	@media (max-width: 660px) {
		button {
			height: 45px;
		}

		.icon {
			--size: 19px;
			margin-left: 17px;
		}

		.label {
			margin-right: 22px;
			margin-left: 7px;
		}
	}
</style>
