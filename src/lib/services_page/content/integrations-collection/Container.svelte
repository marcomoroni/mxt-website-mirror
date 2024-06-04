<div class="margin-top" />
<ul class="container" aria-label="Integrations">
	<slot />
</ul>

<style>
	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		min-width: 0;
		gap: 10px;
		max-width: 500px;
		margin-inline: auto;
	}

	.margin-top {
		height: 20px;
	}
</style>
