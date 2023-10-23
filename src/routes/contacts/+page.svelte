<script>
	import SecondaryPageHeader from '$lib/SecondaryPageHeader.svelte';
	import WidthContainer from '$lib/WidthContainer.svelte';
	import { navBarData } from '$lib/topBarData';

	navBarData.set('contacts');
</script>

<svelte:head>
	<title>Contacts</title>
</svelte:head>

<SecondaryPageHeader
	title="Contacts"
	leadingParagraphs={[
		`We’re experts in creating realistic, immersive, and captivating Virtual Reality and Mixed Reality experiences for our clients, for training, education, and consultation purposes, particularly in the realms of HR, emergency services, and construction.`,
		`If you are interested in learning more about MXT, our expertise, and how we can partner to solve your challenges, get in touch!`
	]}
/>

<WidthContainer>
	<div class="box email">
		<div class="box-label">E-mail</div>
		<div class="box-content">
			<a href="mailto:info@mxt.co.uk">info@mxt.co.uk</a>
		</div>
	</div>
	<div class="box phone">
		<div class="box-label">Phone</div>
		<div class="box-content">
			<a href="tel: 0203 633 5450">0203 633 5450</a>
		</div>
	</div>
	<div class="box address">
		<div class="box-label">Address</div>
		<div class="box-content">
			The Courtyard<br />4 Evelyn Road<br />London<br />W4 5JL
		</div>
	</div>
</WidthContainer>

<style>
	.box {
		padding: 30px;
		margin-bottom: var(--horizontal-margin);

		--stripe-size: 10px;
		--stripe-gap-size: 4px;
		--stripe-color: transparent;
		--stripe-gap-color: white;
		--fade: 0.5px;
		background: repeating-linear-gradient(
			135deg,
			var(--stripe-gap-color),
			var(--stripe-gap-color) var(--stripe-gap-size),
			var(--stripe-color) calc(var(--stripe-gap-size) + var(--fade)),
			var(--stripe-color) calc(var(--stripe-gap-size) + var(--stripe-size)),
			var(--stripe-gap-color) calc(var(--stripe-gap-size) + var(--stripe-size) + var(--fade))
		);
	}

	.box:last-child {
		margin-bottom: var(--bottom-page-margin);
	}

	.box-label {
		color: #af9b8d;
		margin-bottom: 6px;
	}

	.box-content {
		font-weight: 650;
		font-size: 18px;
	}
</style>
