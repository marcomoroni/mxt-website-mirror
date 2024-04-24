<script lang="ts">
	import AccessibleHiddenHeader from '$lib/AccessibleHiddenHeader.svelte';
	import SecondaryPageLanding from '$lib/SecondaryPageLanding.svelte';
	import ServicesSection from '$lib/ServicesSection.svelte';
	import ServicesSectionSideBarEntry from '$lib/ServicesSectionSideBarEntry.svelte';
	import { accentColor2, accentColor3 } from '$lib/cssValues';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';
	import { servicesPageIntersectingSection } from '$lib/three_scene/threeStateStores';
	import { onMount } from 'svelte';

	let scrollY: number;
	let windowHeight: number;

	// Note that these are in order.
	const sections: Array<{
		el: HTMLElement;
		sectionStateForBackground: 'service-1' | 'service-2' | 'service-3';
	}> = [];

	function checkNewState() {
		let newSectionStateForBackground: undefined | 'service-1' | 'service-2' | 'service-3' =
			undefined;
		for (const section of sections) {
			const hasPassedHalfWindow = section.el.getBoundingClientRect().y < windowHeight / 2;
			if (hasPassedHalfWindow) {
				newSectionStateForBackground = section.sectionStateForBackground;
			} else {
				break;
			}
		}

		servicesPageIntersectingSection.set(newSectionStateForBackground);
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
		sectionStateForBackground: 'service-1' | 'service-2' | 'service-3'
	) {
		sections.push({ el, sectionStateForBackground });
	}

	const sideBarEntries = [
		{
			title: 'Digital Infrastructure',
			subtitle:
				'Our multidisciplinary visualisations bring projects to life, improving decision-making and engagement',
			backgroundColor: 'yellow',
			scrollTo: 's1'
		},
		{ title: 'Research', subtitle: 'subtitle', backgroundColor: accentColor2, scrollTo: 's2' },
		{
			title: 'Learning and Development',
			subtitle: 'subtitle',
			backgroundColor: accentColor3,
			scrollTo: 's3'
		}
	];
</script>

<svelte:head>
	<title>{mxtHeadTitle('Services')}</title>
</svelte:head>

<svelte:window bind:scrollY bind:innerHeight={windowHeight} />

<AccessibleHiddenHeader text="Services" />

<div class="two-col-container">
	<div class="left-col">
		<div class="left-bar">
			<div class="fill" />
			<div class="list">
				{#each sideBarEntries as entry}
					<ServicesSectionSideBarEntry
						title={entry.title}
						subtitle={entry.subtitle}
						backgroundColor={entry.backgroundColor}
						scrollTo={entry.scrollTo}
					/>
				{/each}
			</div>
			<div class="h-gap" />
		</div>
	</div>
	<div class="right-col">
		<SecondaryPageLanding
			text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id venenatis sapien. Sed maximus nisi quis nibh imperdiet, id efficitur velit eleifend. Curabitur euismod magna ut vehicula accumsan. Integer tempus luctus magna a placerat. Vivamus at luctus nulla. Morbi tristique sapien odio, in porttitor metus interdum quis.'}
		/>
		<div class="landing-spacer" />
		<div id="s1" class="section">
			<ServicesSection scrollObserveAction={(el) => scrollObserve(el, 'service-1')}>
				<svelte:fragment slot="type">section 1</svelte:fragment>
			</ServicesSection>
		</div>
		<div id="s2" class="section">
			<ServicesSection scrollObserveAction={(el) => scrollObserve(el, 'service-2')}>
				<svelte:fragment slot="type">section 2</svelte:fragment>
			</ServicesSection>
		</div>
		<div id="s3" class="section">
			<ServicesSection scrollObserveAction={(el) => scrollObserve(el, 'service-3')}>
				<svelte:fragment slot="type">section 3</svelte:fragment>
			</ServicesSection>
		</div>
	</div>
</div>

<style>
	.landing-spacer {
		height: 120px;
	}

	.two-col-container {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 2fr;
	}

	.left-col {
		grid-column: 1 / 2;
		grid-row: 1 / 1;
		position: sticky;
		top: 0;
		left: 0;
		align-self: start;
	}

	.left-bar {
		height: 100dvh;
		width: 100%;
		display: flex;
		flex-direction: column;
		min-height: 0;
		overflow-y: scroll;
		scrollbar-width: none;
	}

	.h-gap {
		flex-basis: var(--horizontal-margin);
		flex-shrink: 0;
	}

	.left-bar::-webkit-scrollbar {
		display: none;
	}

	.fill {
		flex-grow: 1;
		min-height: calc(var(--nav-bar-height) + 40px);
	}

	.list {
		flex-shrink: 0;
		display: grid;
		grid-auto-flow: row;
		grid-auto-rows: 1fr;
		gap: 20px;
		margin-left: var(--horizontal-margin);
	}

	.right-col {
		grid-column: 2 / 3;
		grid-row: 1 / 1;
	}

	.section {
		min-height: 100dvh;
		border: 2px solid green;
	}
</style>
