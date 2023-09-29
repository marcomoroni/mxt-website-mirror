<div class="container"><slot /></div>

<style>
	.container {
		max-width: 960px;
		margin-left: auto;
		margin-right: auto;
	}

	/* The value is 960 + (30 * 2).
       960 is the max width
       30 is the margin */
	@media (max-width: 1020px) {
		.container {
			max-width: unset;
			margin-left: var(--horizontal-margin);
			margin-right: var(--horizontal-margin);
		}
	}
</style>
