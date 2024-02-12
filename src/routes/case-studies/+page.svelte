<script lang="ts">
	import { caseStudiesPageIntersectingCard } from '$lib/threeStateStores';
	import { onDestroy, onMount } from 'svelte';

	const caseStudies: Array<{
		title: string;
		leadParagraph: string;
		threeState: 'case-studies-anchor-a303' | 'case-studies-anchor-p2' | 'case-studies-anchor-p3';
	}> = [
		{
			title: 'Visualising the Stonehenge World Heritage site landscape',
			leadParagraph:
				'Harnessing the power of immersive technologies for complex infrastructure projects',
			threeState: 'case-studies-anchor-a303'
		},
		{
			title: 'Case study 2',
			leadParagraph: 'Lead paragraph ',
			threeState: 'case-studies-anchor-p2'
		},
		{
			title: 'Case study 3',
			leadParagraph:
				'Harnessing the power of immersive technologies for complex infrastructure projects',
			threeState: 'case-studies-anchor-p3'
		}
	];

	// Every case study has an intersection observer, but on their own they are not enough.
	// This map, along with the following $ is needed to compensate for:
	//  - I also need to know when none of them are intersecting
	//  - the intersection observer threshold does not distingush between top 50% or bottom 50%,
	//    so I'm going to check which element has the lowest maxBoundingClientRect y.
	let intersectingCards: Map<
		'case-studies-anchor-a303' | 'case-studies-anchor-p2' | 'case-studies-anchor-p3',
		{ boundingClientRectY: number }
	> = new Map();
	$: {
		const newThreeState:
			| undefined
			| 'case-studies-anchor-a303'
			| 'case-studies-anchor-p2'
			| 'case-studies-anchor-p3' = Array.from(intersectingCards.entries()).reduce(
			(previous, current) => {
				if (previous === undefined) {
					return {
						stateName: current[0],
						maxBoundingClientRectY: current[1].boundingClientRectY
					};
				} else if (current[1].boundingClientRectY > previous.maxBoundingClientRectY) {
					return {
						stateName: current[0],
						maxBoundingClientRectY: current[1].boundingClientRectY
					};
				} else {
					return previous;
				}
			},
			undefined as
				| undefined
				| {
						stateName:
							| 'case-studies-anchor-a303'
							| 'case-studies-anchor-p2'
							| 'case-studies-anchor-p3';
						maxBoundingClientRectY: number;
				  }
		)?.stateName;

		caseStudiesPageIntersectingCard.set(newThreeState);
	}

	function scrollObserve(
		el: HTMLElement,
		threeState: 'case-studies-anchor-a303' | 'case-studies-anchor-p2' | 'case-studies-anchor-p3'
	) {
		const observer = new IntersectionObserver(
			(entries) => {
				console.assert(entries.length === 1);
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						intersectingCards.set(threeState, { boundingClientRectY: entry.boundingClientRect.y });
						intersectingCards = intersectingCards;
					} else {
						intersectingCards.delete(threeState);
						intersectingCards = intersectingCards;
					}
				});
			},
			{
				rootMargin: '0px',
				threshold: 0.5
			}
		);

		observer.observe(el);

		return {
			destroy() {
				observer.disconnect();
				intersectingCards.delete(threeState);
			}
		};
	}

	onDestroy(() => {
		intersectingCards.clear();
	});
</script>

<div class="landing">Case studies</div>

<ul class="case-studies-list">
	{#each caseStudies as caseStudy}
		<li class="case-study-card" use:scrollObserve={caseStudy.threeState}>
			<div class="box">
				<div class="background" />
				<div class="title">{caseStudy.title}</div>
				<div class="lead-paragraph">{caseStudy.leadParagraph}</div>
			</div>
		</li>
	{/each}
</ul>

<style>
	.landing {
		border: 2px solid cyan;
		height: 100dvh;
		width: 100%;
	}

	.case-study-card {
		--margin: 40px;
		height: calc(100dvh - var(--margin));
		width: 100%;
		scroll-snap-align: start;
		border: 2px solid green;
	}

	.background {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -2;
		background-color: rgba(0, 0, 0, 0.322);
	}

	.box {
		position: relative;
		width: calc(100% - (var(--margin) * 2));
		height: calc(100% - var(--margin));
		top: 0;
		left: var(--margin);
	}
</style>
