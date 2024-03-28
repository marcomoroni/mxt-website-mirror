<script lang="ts">
	import AccessibleHiddenHeader from '$lib/AccessibleHiddenHeader.svelte';
	import CaseStudyTitleBox from '$lib/CaseStudyTitleBox.svelte';
	import FocusHighlight from '$lib/FocusHighlight.svelte';
	import { caseStudiesData } from '$lib/caseStudiesData';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';
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
			checkNewState();
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

<svelte:head>
	<title>{mxtHeadTitle('Case studies')}</title>
</svelte:head>

<svelte:window bind:scrollY bind:innerHeight={windowHeight} />

<AccessibleHiddenHeader text="Case studies" />

<div class="landing" />

<ul class="case-studies-list">
	{#each caseStudiesData as caseStudy}
		<li class="case-study-card" use:scrollObserve={caseStudy.threeState}>
			<a
				class="box"
				href={caseStudy.comingSoon ? undefined : caseStudy.href}
				class:coming-soon={caseStudy.comingSoon}
			>
				<div class="background" class:coming-soon={caseStudy.comingSoon} />
				<div class="case-study-title-box-container">
					<CaseStudyTitleBox
						title={caseStudy.title}
						leadParagraph={caseStudy.leadParagraph}
						comingSoon={caseStudy.comingSoon}
					/>
				</div>
				<FocusHighlight overflow={8} />
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
		border: 2px solid var(--color-primary);
	}

	.background.coming-soon {
		border-style: dashed;
		opacity: 0.3;
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

	.box:hover .background:not(.coming-soon) {
		border-width: 4px;
	}

	.box.coming-soon {
		cursor: not-allowed;
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
