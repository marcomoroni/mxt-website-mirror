<script lang="ts">
	import CaseStudyCard from '$lib/CaseStudyCard.svelte';
	import { onDestroy, onMount } from 'svelte';
	import SegmentedControl from './pieces/SegmentedControl.svelte';

	const guidedTourParts = [
		{
			location: 1,
			period: 0
		},
		{
			location: 1,
			period: 1
		},
		{
			location: 2,
			period: 0
		},
		{
			location: 2,
			period: 1
		},
		{
			location: 0,
			period: 0
		},
		{
			location: 0,
			period: 1
		},
		{
			location: 3,
			period: 0
		},
		{
			location: 3,
			period: 1
		}
	];

	const choicesLocation = ['Stonehenge', 'Tunnel East', 'Tunnel West', 'Green Bridge'];
	const choicesPeriod = ['Present', 'Future'];
	const choicesSeason = ['Summer', 'Winter'];
	const choicesPlane = ['Ground', 'Sky'];

	let currentGuidedTourPart = 0;
	$: animateParts = currentGuidedTourPart !== 0;
	$: animateRestart = currentGuidedTourPart === guidedTourParts.length - 1;

	let interval: undefined | number = undefined;

	onMount(() => {
		interval = setInterval(() => {
			let newCurrentGuidedTourPart = currentGuidedTourPart + 1;
			if (newCurrentGuidedTourPart >= guidedTourParts.length) {
				newCurrentGuidedTourPart = 0;
			}
			currentGuidedTourPart = newCurrentGuidedTourPart;
		}, 3000);
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<CaseStudyCard>
	<div class="container" class:animate-parts={animateParts} class:animate-restart={animateRestart}>
		<div class="tablet">
			<div class="col">
				<SegmentedControl
					variant={'Normal'}
					containerZIndex={4}
					choices={choicesLocation}
					textZIndex={4}
				/>
				<SegmentedControl
					variant={'Normal'}
					containerZIndex={4}
					textZIndex={4}
					choices={choicesPeriod}
				/>
				<SegmentedControl variant={'Normal'} containerZIndex={4} choices={choicesSeason} />
				<SegmentedControl variant={'Normal'} containerZIndex={4} choices={choicesPlane} />
			</div>
		</div>
		<div class="guide-tour-parts">
			{#each guidedTourParts as part, i (i)}
				<div
					class="c"
					class:part-current={currentGuidedTourPart === i}
					class:part-previous={currentGuidedTourPart === i + 1}
					class:part-previous-previous={currentGuidedTourPart > i + 1}
					class:part-next={currentGuidedTourPart === i - 1}
					class:part-next-next={currentGuidedTourPart < i - 1}
				>
					<div class="col">
						<SegmentedControl
							variant={'GuidedTourSchema'}
							choices={choicesLocation}
							selected={part.location}
						/>
						<SegmentedControl
							variant={'GuidedTourSchema'}
							choices={choicesPeriod}
							selected={part.period}
						/>
						<SegmentedControl variant={'GuidedTourSchema'} choices={choicesSeason} />
						<SegmentedControl variant={'GuidedTourSchema'} choices={choicesPlane} />
						<div class="tablet-outline card-stripe-pattern" />
					</div>
				</div>
			{/each}
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
		position: relative;
		overflow: hidden;
		transition: opacity 0.3s ease-in-out;
		transition-delay: 0s;
	}

	.animate-restart {
		opacity: 0;
		transition-delay: 2.6s;
	}

	.col {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;
		position: relative;
	}

	.guide-tour-parts {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.c {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.animate-parts .c {
		transition: transform 1.1s var(--curve);
	}

	.part-current {
		transform: translateX(0%);
	}

	.part-previous {
		transform: translateX(-310px);
	}

	.part-previous-previous {
		transform: translateX(-620px);
	}

	.part-next {
		transform: translateX(310px);
	}

	.part-next-next {
		transform: translateX(620px);
	}

	.tablet-outline {
		position: absolute;
		width: calc(100% + 40px);
		height: calc(100% + 40px);
		border: var(--card-stroke) solid var(--color-card-primary);
	}
</style>
