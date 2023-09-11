<script>
	import MxtLogo from '$lib/MxtLogo.svelte';
</script>

<div class="landing">
	<MxtLogo />
</div>
<p class="intro-text">
	MXT are an immersive experience design and technology specialists, creating extended reality
	environments for public sector and infrastructure partners.
</p>

<style>
	:global(.mxt-logo) {
		width: 500px;
		/* Seems more visually pleasing. */
		transform: translate(0px, -14px);
	}

	.landing {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.intro-text {
		color: var(--color-primary-2);
		font-size: 32px;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 20vh;
		margin-bottom: 20vh;
	}
</style>
