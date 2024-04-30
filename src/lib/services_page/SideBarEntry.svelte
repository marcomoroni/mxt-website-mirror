<script lang="ts">
	import { servicesPageIntersectingSection } from '$lib/three_scene/threeStateStores';
	import { match } from 'ts-pattern';

	export let title: string;
	export let subtitle: string;
	export let color: string;
	export let scrollTo: string;
	export let associatedState: 'service-1' | 'service-2' | 'service-3';

	$: currentState = match($servicesPageIntersectingSection)
		.with(undefined, () => 'none')
		.with(associatedState, () => 'current')
		.otherwise(() => 'another');

	function scrollHere() {
		document.getElementById(scrollTo)!.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<button
	class="container"
	style:background-color={currentState === 'current'
		? `color-mix(in oklab, var(--color-primary) 30%, ${color})`
		: undefined}
	on:click={scrollHere}
>
	<div
		class="title"
		style:color={currentState === 'current'
			? `color-mix(in oklab, white 90%, ${color})`
			: undefined}
	>
		{title}
	</div>
	<div
		class="subtitle"
		style:color={currentState === 'current'
			? `color-mix(in oklab, white 90%, ${color})`
			: undefined}
	>
		{subtitle}
	</div>
</button>

<style>
	.container {
		scroll-margin-top: 40px;
		display: flex;
		flex-direction: column;
		padding-left: 26px;
		padding-right: 26px;
		padding-top: 26px;
		padding-bottom: 27px;
		border-left: 4px solid var(--color-primary);
	}

	.title {
		font-size: 36px;
		text-wrap: balance;
		margin-bottom: 16px;
		font-weight: 650;
		line-height: 1.3;
	}

	.subtitle {
		font-size: 20px;
		text-wrap: balance;
		opacity: 0.8;
		font-weight: 600;
	}
</style>
