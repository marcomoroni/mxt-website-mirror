<script lang="ts">
	export let text: string;
</script>

<div class="container">
	<div class="text">{text}</div>
</div>

<style>
	.container {
		min-height: 100dvh;
		width: 100%;
		display: grid;
	}

	.text {
		justify-self: center;
		align-self: end;
		margin-top: calc(var(--nav-bar-height) + 60px);
		margin-bottom: 80px;
		margin-left: 40px;
		margin-right: 40px;
		max-width: 1400px;
		filter: drop-shadow(0 0 15px var(--color-background));
		text-align: center;
		text-wrap: balance;
		font-size: 26px;
		font-weight: 560;
	}
</style>
