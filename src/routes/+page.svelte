<svelte:head>
	<title>MXT</title>
</svelte:head>

<div class="container">
	<div class="vertical-margin" />
	<div class="inner">
		<div class="horizontal-margin" />
		<div class="coming-soon">Coming soon</div>
		<div class="horizontal-margin" />
	</div>
	<div class="vertical-margin" />
</div>

<style>
	.container {
		width: 100%;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.vertical-margin {
		flex: 1;
		min-height: 40px;
	}

	.inner {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.horizontal-margin {
		flex: 1;
		min-width: 20px;
	}

	.coming-soon {
		text-align: center;
	}
</style>
