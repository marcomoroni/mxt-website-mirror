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
		<div class="type-container coming-soon">
			<p>Our new website is coming soon.</p>
			<p>
				Contact us at <a href="mailto:info@mxt.co.uk">info@mxt.co.uk</a>.
			</p>
			<p>
				The old website is still available
				<a href="https://old.mxt.co.uk">here</a>.
			</p>
		</div>
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

	.type-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.coming-soon {
		text-align: center;
		line-height: 1.8;
	}
</style>
