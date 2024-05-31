<script lang="ts">
	import { accentColourInServicesProps } from '$lib/three_scene/threeStateStores';

	export let title: string;
	export let subtitle: string;
	export let href: string;
	export let isActive: boolean;
</script>

<a
	class="container"
	{href}
	on:click={() => {
		window.scrollTo({ top: 0 });
	}}
	role="tab"
	style:background-color={isActive
		? `color-mix(in oklab, var(--color-primary) 5%, ${$accentColourInServicesProps})`
		: undefined}
	style:color={isActive ? 'white' : undefined}
>
	<div class="title">
		{title}
	</div>
	<div class="subtitle">
		{subtitle}
	</div>
</a>

<style>
	.container {
		align-self: stretch;
		justify-self: stretch;
		display: flex;
		flex-direction: column;
		padding-top: 30px;
		padding-bottom: 36px;
		text-decoration: none;
		padding-inline: 30px;
		background-color: #e9e1deeb;
		--border-radius: 40px;
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
	}

	.title {
		font-size: 38px;
		text-wrap: pretty;
		margin-bottom: 16px;
		font-weight: 650;
		line-height: 1.3;
	}

	.subtitle {
		font-size: 20px;
		text-wrap: pretty;
		font-weight: 600;
	}
</style>
