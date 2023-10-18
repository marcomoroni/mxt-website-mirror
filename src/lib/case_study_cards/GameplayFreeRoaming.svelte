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
				choices={choicesLocation}
				selected={selectionLocations}
			/>
			<SegmentedControl variant={'Normal'} choices={choicesPeriod} selected={selectionPeriod} />
			<SegmentedControl variant={'Normal'} choices={choicesSeason} selected={selectionSeason} />
			<SegmentedControl variant={'Normal'} choices={choicesPlane} selected={selectionPlane} />
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
