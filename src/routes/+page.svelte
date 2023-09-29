<script>
	import MxtLogoNoPadding from '$lib/MxtLogoNoPadding.svelte';
	import WidthContainer from '$lib/WidthContainer.svelte';
	import { navBarData } from '$lib/topBarData';

	navBarData.set('home');
</script>

<svelte:head>
	<title>MXT</title>
</svelte:head>

<div class="landing-container">
	<div>
		<WidthContainer>
			<div class="logo">
				<MxtLogoNoPadding />
			</div>
			<p class="text">
				MXT are an immersive experience design and technology specialists, creating extended reality
				environments for public sector and infrastructure partners.
			</p>
		</WidthContainer>
	</div>
</div>

<style>
	.landing-container {
		width: 100dvw;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: stretch;
	}

	.logo {
		width: 520px;
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

	@media (max-width: 460px) {
		.logo {
			width: 270px;
		}
	}

	.text {
		margin-top: min(max(4vw, 60px), 130px);
		max-width: 80%;
		font-size: 30px;
		margin-right: auto;
	}

	@media (max-width: 660px) {
		.text {
			max-width: unset;
			font-size: 25px;
		}
	}
</style>
