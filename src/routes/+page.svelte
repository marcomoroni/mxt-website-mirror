<script lang="ts">
	import MainPageCard from '$lib/MainPageCard.svelte';
	import MxtLogoNoPadding from '$lib/MxtLogoNoPadding.svelte';
	import WidthContainer from '$lib/WidthContainer.svelte';
	import Three from '$lib/three/Three.svelte';
	import { navBarData } from '$lib/topBarData';
	import Scene from '$lib/three/scenes/VRHeadset.svelte';

	navBarData.set('home');

	const cards = [
		{
			title: 'Case studies',
			descirption: 'Who we are and how we work with you',
			href: '/case-studies'
		},
		{
			title: 'Studio',
			descirption: 'Check out what we’ve been building',
			href: '/studio'
		},
		{
			title: 'Contacts',
			descirption: 'Drop us a message',
			href: '/contacts'
		}
	];
</script>

<svelte:head>
	<title>MXT</title>
</svelte:head>

<div class="landing-container">
	<WidthContainer>
		<div class="logo">
			<MxtLogoNoPadding animate={true} />
		</div>
		<p class="text">
			MXT are an immersive experience design and technology specialists, creating extended reality
			environments for public sector and infrastructure partners.
		</p>
	</WidthContainer>
	<div class="three-container">
		<div class="three-slot a">
			<Three>
				<Scene />
			</Three>
		</div>
		<div class="three-slot b">
			<Three>
				<Scene />
			</Three>
		</div>
	</div>
</div>
<WidthContainer>
	<ul class="link-cards">
		{#each cards as card}
			<MainPageCard href={card.href} title={card.title} desription={card.descirption} />
		{/each}
	</ul>
</WidthContainer>

<style>
	.landing-container {
		width: 100dvw;
		max-width: 100%;
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
		text-wrap: balance;
		font-weight: 500;
		line-height: 1.5;
	}

	@media (max-width: 660px) {
		.text {
			max-width: unset;
			font-size: 22px;
		}
	}

	.link-cards {
		display: none;
		grid-auto-flow: row;
		grid-template-columns: 1fr 1fr 1fr;
		grid-auto-rows: 1fr;
		gap: var(--horizontal-margin);
		margin-bottom: var(--horizontal-margin);
	}

	@media (max-width: 800px) {
		.link-cards {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 700px) {
		.link-cards {
			display: grid;
		}
	}

	.three-container {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.three-slot {
		position: absolute;
	}

	.three-slot.a {
		top: 0;
		right: 0;
		width: 600px;
		height: 700px;
		border: 2px dashed red;
	}

	.three-slot.b {
		bottom: 0;
		left: 0;
		width: 800px;
		height: 600px;
		border: 2px dashed green;
	}
</style>
