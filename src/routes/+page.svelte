<script>
	import MxtLogo from '$lib/MxtLogo.svelte';
</script>

<div class="landing-container">
	<div class="logo">
		<MxtLogo />
	</div>
	<p class="text">
		MXT are an immersive experience design and technology specialists, creating extended reality
		environments for public sector and infrastructure partners.
	</p>
</div>

<style>
	.landing-container {
		width: 100dvw;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.logo {
		width: 540px;
		margin-left: var(--horizontal-margin);
		margin-right: var(--horizontal-margin);
	}

	@media (max-width: 1500px) {
		.logo {
			width: 500px;
		}
	}

	@media (max-width: 660px) {
		.logo {
			width: 400px;
		}
	}

	@media (max-width: 440px) {
		.logo {
			width: 270px;
		}
	}

	.text {
		margin-top: min(max(4vw, 60px), 130px);
		max-width: var(--main-width);
		font-size: 30px;
		margin-left: var(--horizontal-margin);
		margin-right: var(--horizontal-margin);
	}

	@media (max-width: 660px) {
		.text {
			font-size: 25px;
		}
	}
</style>
