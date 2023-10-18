<script lang="ts">
	import CaseStudyCard from '$lib/CaseStudyCard.svelte';
	import SegmentedControl from './pieces/SegmentedControl.svelte';
	import { randomIntFromInterval } from '$lib/randIntFromInterval';
	import { onDestroy, onMount } from 'svelte';

	const choicesLocation = ['Stonehenge', 'Tunnel East', 'Tunnel West', 'Green Bridge'];
	const choicesPeriod = ['Present', 'Future'];
	const choicesSeason = ['Summer', 'Winter'];
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
		}, 1200);
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<CaseStudyCard>
	<div class="container">
		<div class="col">
			<SegmentedControl
				variant={'Normal'}
				accentColor={1}
				choices={choicesLocation}
				selected={selectionLocations}
			/>
			<SegmentedControl
				variant={'Normal'}
				accentColor={2}
				choices={choicesPeriod}
				selected={selectionPeriod}
			/>
			<SegmentedControl
				variant={'Normal'}
				accentColor={3}
				choices={choicesSeason}
				selected={selectionSeason}
			/>
			<SegmentedControl
				variant={'Normal'}
				accentColor={4}
				choices={choicesPlane}
				selected={selectionPlane}
			/>
		</div>
	</div>
</CaseStudyCard>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.col {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;
	}
</style>
