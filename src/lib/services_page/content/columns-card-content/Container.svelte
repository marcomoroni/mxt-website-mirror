<div class="container">
	<slot />
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
	}

	@media (max-width: 1100px) {
		.container {
			flex-direction: column;
			gap: var(--small-header-margin-top);
		}

		.container :global(.divider) {
			display: none;
		}
	}
</style>
