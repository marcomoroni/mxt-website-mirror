<script lang="ts">
	import Aurora from '$lib/Aurora.svelte';
	import MxtLogo from '$lib/MXTLogo.svelte';
</script>

<svelte:head>
	<title>MXT</title>
</svelte:head>

<div class="aurora-container">
	<Aurora />
</div>

<div class="container">
	<div class="vertical-margin" />
	<div class="inner">
		<div class="horizontal-margin" />
		<div class="coming-soon">New website coming soon</div>
		<div class="horizontal-margin" />
	</div>
	<div class="vertical-margin" />
</div>

<div class="logo-container">
	<MxtLogo style="glass" />
</div>

<style>
	.aurora-container {
		position: fixed;
		width: 100%;
		height: 100dvh;
	}

	.logo-container {
		position: absolute;
		width: 60px;
		top: 30px;
		left: 30px;
	}

	.container {
		width: 100%;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
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
		min-width: 24px;
	}

	.coming-soon {
		text-align: center;
	}
</style>
