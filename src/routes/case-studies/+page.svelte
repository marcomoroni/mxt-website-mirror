<script lang="ts">
	import CaseStudyTitleBox from '$lib/CaseStudyTitleBox.svelte';
	import { caseStudiesData } from '$lib/caseStudiesData';
	import { caseStudiesPageIntersectingCard } from '$lib/three_scene/threeStateStores';
	import { onDestroy } from 'svelte';

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
	{#each caseStudiesData as caseStudy}
		<li class="case-study-card" use:scrollObserve={caseStudy.threeState}>
			<a class="box" href={caseStudy.href}>
				<div class="background" />
				<div class="case-study-title-box-container">
					<CaseStudyTitleBox title={caseStudy.title} leadParagraph={caseStudy.leadParagraph} />
				</div>
			</a>
			<div class="bottom-spacer" />
		</li>
	{/each}
</ul>

<style>
	.landing {
		height: 100dvh;
		width: 100%;
	}

	.case-study-card {
		--margin: 40px;
		width: 100%;
	}

	.background {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -2;
		border: 3px solid white;
	}

	.box {
		display: flex;
		position: relative;
		width: calc(100% - (var(--margin) * 2));
		min-height: calc(100dvh - (var(--margin) * 2));
		top: 0;
		left: var(--margin);
		text-decoration: none;
		flex-direction: column;
		justify-content: flex-end;
	}

	.bottom-spacer {
		height: var(--margin);
	}

	.case-study-title-box-container {
		margin-top: 50px;
		margin-left: 30px;
		margin-right: 30px;
		margin-bottom: 30px;
	}
</style>
