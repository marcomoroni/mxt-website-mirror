<script lang="ts">
	import { servicesPageIntersectingSection } from '$lib/three_scene/threeStateStores';
	import { match } from 'ts-pattern';

	export let title: string;
	export let subtitle: string;
	export let backgroundColor: string;
	export let scrollTo: string;
	export let associatedState: 'service-1' | 'service-2' | 'service-3';
	const scrollOffset = 40;

	$: currentState = match($servicesPageIntersectingSection)
		.with(undefined, () => 'none')
		.with(associatedState, () => 'current')
		.otherwise(() => 'another');

	function scrollHere() {
		window.scrollTo({
			behavior: 'smooth',
			top:
				document.getElementById(scrollTo)!.getBoundingClientRect().top -
				document.body.getBoundingClientRect().top -
				scrollOffset
		});
	}
</script>

<button class="container" style:background-color={backgroundColor} on:click={scrollHere}>
	<div class="title" class:fade={currentState === 'another'}>{title}</div>
	<div class="subtitle" class:fade={currentState === 'another'}>{subtitle}</div>
</button>

<style>
	.container {
		scroll-margin-top: 40px;
		display: flex;
		flex-direction: column;
		background-color: yellow;
		padding-left: 26px;
		padding-right: 26px;
		padding-top: 26px;
		padding-bottom: 26px;
	}

	.title {
		font-size: 30px;
		text-wrap: balance;
		margin-bottom: 16px;
		font-weight: 700;
		transition: opacity 0.3s var(--ease);
	}

	.title.fade {
		opacity: 0.5;
	}

	.subtitle {
		font-size: 20px;
		text-wrap: balance;
		opacity: 0.8;
		font-weight: 550;
		transition: opacity 0.3s var(--ease);
	}

	.subtitle.fade {
		opacity: 0.4;
	}
</style>
