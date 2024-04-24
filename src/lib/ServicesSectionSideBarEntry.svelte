<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let backgroundColor: string;
	export let scrollTo: string;
</script>

<button
	class="container"
	style:background-color={backgroundColor}
	on:click={() => document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' })}
>
	<div class="title">{title}</div>
	<div class="subtitle">{subtitle}</div>
</button>

<style>
	.container {
		display: flex;
		flex-direction: column;
		background-color: yellow;
		padding-left: 26px;
		padding-right: 26px;
		padding-top: 26px;
		padding-bottom: 26px;
	}

	.title {
		font-size: 28px;
		text-wrap: balance;
		margin-bottom: 20px;
		font-weight: 700;
	}

	.subtitle {
		font-size: 20px;
		text-wrap: balance;
		opacity: 0.8;
	}
</style>
