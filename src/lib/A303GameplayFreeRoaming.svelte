<script lang="ts">
	import { randomIntFromInterval } from '$lib/randomIntFromInterval';
	import { onDestroy, onMount } from 'svelte';
	import A303GameplaySegmentedControl from './A303GameplaySegmentedControl.svelte';

	const choicesLocation = ['Stonehenge', 'Tunnel East', 'Tunnel West', 'Green Bridge'];
	const choicesPeriod = ['Present', 'Future'];
	const choicesSeason = ['Day', 'Night'];
	const choicesPlane = ['Ground', 'Sky'];

	let selectionLocations = 0;
	let selectionPeriod = 0;
	let selectionSeason = 0;
	let selectionPlane = 0;

	let interval: undefined | number = undefined;

	onMount(() => {
		interval = setInterval(() => {
			selectionLocations = randomIntFromInterval(0, choicesLocation.length - 1);
			selectionPeriod = randomIntFromInterval(0, choicesPeriod.length - 1);
			selectionSeason = randomIntFromInterval(0, choicesSeason.length - 1);
			selectionPlane = randomIntFromInterval(0, choicesPlane.length - 1);
		}, 1500);
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<div class="container">
	<div class="col">
		<A303GameplaySegmentedControl
			variant={'Normal'}
			choices={choicesLocation}
			selected={selectionLocations}
		/>
		<A303GameplaySegmentedControl
			variant={'Normal'}
			choices={choicesPeriod}
			selected={selectionPeriod}
		/>
		<A303GameplaySegmentedControl
			variant={'Normal'}
			choices={choicesSeason}
			selected={selectionSeason}
		/>
		<A303GameplaySegmentedControl
			variant={'Normal'}
			choices={choicesPlane}
			selected={selectionPlane}
		/>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
	}

	.col {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;
	}
</style>
