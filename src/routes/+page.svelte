<script>
	import MxtLogo from '$lib/MXTLogo.svelte';
</script>

<div class="container">
	<div class="margin-top" />
	<div class="logo-container">
		<MxtLogo />
	</div>
	<div class="type">
		We are an immersive technology company providing learning, research and visualisation services
		to transport and infrastructure partners.
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: 36dvh min-content 1fr;
		grid-template-columns: 1fr minmax(max-content, 550px) 1fr;
		min-height: 100dvh;
		padding-inline: 40px;
		margin-inline: auto;
		filter: var(--strong-drop-shadow);
	}

	.margin-top {
		height: calc(var(--nav-bar-height) + 40px);
	}

	.logo-container {
		justify-self: stretch;
		grid-row: 2;
		grid-column: 2;
	}

	.type {
		grid-row: 3;
		grid-column: 1 / 4;
		font-size: 26px;
		max-width: 900px;
		text-wrap: balance;
		text-align: center;
		font-weight: 560;
		margin-top: 80px;
		margin-bottom: 90px;
		justify-self: center;
	}
</style>
