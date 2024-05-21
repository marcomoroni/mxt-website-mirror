<script>
	import MxtLogo from '$lib/MXTLogo.svelte';
</script>

<div class="a">
	<div class="a-a" />
	<div class="a-b">
		<div class="a-b-a" />
		<div class="logo-container">
			<MxtLogo />
		</div>
		<div class="a-b-c" />
	</div>
	<div class="a-c">
		<div class="a-c-a" />
		<div class="a-c-b">
			<div class="a-c-b-a" />
			<div class="a-c-b-b">
				We are an immersive technology company providing learning, research and visualisation
				services to transport and infrastructure partners.
			</div>
			<div class="a-c-b-c" />
		</div>
		<div class="a-c-c" />
	</div>
</div>

<style>
	.a {
		width: 100%;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		filter: var(--strong-drop-shadow);
	}

	.a-a {
		/* Make it 0.9 for visual balance. */
		flex: 0.9 1 0px;
	}

	.a-c {
		flex: 1 1 0px;
	}

	.a-a,
	.a-c {
		min-height: calc(var(--nav-bar-height) + 40px);
	}

	.a-c {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: center;
	}

	.a-c-a,
	.a-c-c {
		width: 40px;
	}

	.a-c-b {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.a-c-b-a {
		height: 80px;
	}

	.a-c-b-b {
		font-size: 26px;
		max-width: 900px;
		text-wrap: balance;
		text-align: center;
		font-weight: 560;
	}

	.a-c-b-c {
		height: 90px;
	}

	.a-b {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.a-b-a,
	.a-b-c {
		width: 40px;
	}

	.logo-container {
		width: 550px;
	}
</style>
