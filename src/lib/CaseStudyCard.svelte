<div class="card">
	<slot />
</div>

<style>
	.card {
		position: relative;
		width: 100%;
		height: 100%;
		border: var(--card-stroke) solid var(--color-card-primary);
		user-select: none;
		text-transform: uppercase;
		font-weight: 600;
		font-size: 12px;
		letter-spacing: 0.02rem;
	}
</style>
