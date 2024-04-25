<script lang="ts">
	import { servicesPageIntersectingSection } from '$lib/three_scene/threeStateStores';
	import { match } from 'ts-pattern';

	export let scrollObserveAction: (el: HTMLElement) => void;
	export let associatedState: 'service-1' | 'service-2' | 'service-3';

	$: currentState = match($servicesPageIntersectingSection)
		.with(undefined, () => 'none')
		.with(associatedState, () => 'current')
		.otherwise(() => 'another');
</script>

<div use:scrollObserveAction class="container" class:fade={currentState !== 'current'}>
	<slot name="type" />
</div>

<style>
	.container {
		padding-bottom: 180px;
	}

	.container.fade {
		opacity: 0.5;
	}
</style>
