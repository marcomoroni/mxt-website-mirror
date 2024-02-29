<script lang="ts">
	import AccessibleHiddenHeader from '$lib/AccessibleHiddenHeader.svelte';
	import CaseStudyTitleBox from '$lib/CaseStudyTitleBox.svelte';
	import { caseStudiesData } from '$lib/caseStudiesData';
	import { caseStudiesPageIntersectingCard } from '$lib/three_scene/threeStateStores';
	import { onMount } from 'svelte';

	// `IntersectionObserver` does not work well in this situation becasue getting the first state asyncronously
	// is not enough.

	let scrollY: number;
	let windowHeight: number;

	// Note that these are in order.
	const cards: Array<{
		el: HTMLElement;
		threeState: 'case-studies-anchor-a303' | 'case-studies-anchor-p2' | 'case-studies-anchor-p3';
	}> = [];

	function checkNewState() {
		let newThreeState:
			| undefined
			| 'case-studies-anchor-a303'
			| 'case-studies-anchor-p2'
			| 'case-studies-anchor-p3' = undefined;
		for (const card of cards) {
			const hasPassedHalfWindow = card.el.getBoundingClientRect().y < windowHeight / 2;
			if (hasPassedHalfWindow) {
				newThreeState = card.threeState;
			} else {
				break;
			}
		}

		caseStudiesPageIntersectingCard.set(newThreeState);
	}

	$: {
		if (scrollY) {
			let newThreeState:
				| undefined
				| 'case-studies-anchor-a303'
				| 'case-studies-anchor-p2'
				| 'case-studies-anchor-p3' = undefined;
			for (const card of cards) {
				const hasPassedHalfWindow = card.el.getBoundingClientRect().y < windowHeight / 2;
				if (hasPassedHalfWindow) {
					newThreeState = card.threeState;
				} else {
					break;
				}
			}

			caseStudiesPageIntersectingCard.set(newThreeState);
		}
	}

	onMount(() => {
		checkNewState();
	});

	function scrollObserve(
		el: HTMLElement,
		threeState: 'case-studies-anchor-a303' | 'case-studies-anchor-p2' | 'case-studies-anchor-p3'
	) {
		cards.push({ el, threeState });
	}
</script>

<svelte:window bind:scrollY bind:innerHeight={windowHeight} />

<AccessibleHiddenHeader text="Case studies" />

<div class="landing" />

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
