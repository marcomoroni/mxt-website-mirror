<script lang="ts">
	import AccessibleHiddenHeader from '$lib/AccessibleHiddenHeader.svelte';
	import CaseStudyTitleBox from '$lib/CaseStudyTitleBox.svelte';
	import FocusHighlight from '$lib/FocusHighlight.svelte';
	import SecondaryPageLanding from '$lib/SecondaryPageLanding.svelte';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';

	export let data;
</script>

<svelte:head>
	<title>{mxtHeadTitle('Case studies')}</title>
	<meta property="og:title" content="Case studies" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://mxt.co.uk/case-studies/" />
	<meta property="og:image" content="https://mxt.co.uk/preview.png" />
</svelte:head>

<AccessibleHiddenHeader text="Case studies" />

<SecondaryPageLanding
	text={'From leading industrial firms to UK public sector organisations, we support our clients through meaningful partnerships.'}
/>

<div class="landing-spacer" />

<ul class="case-studies-list">
	{#each data.caseStudies as caseStudy}
		<li class="case-study-card">
			<a
				class="box"
				href={caseStudy.comingSoon ? undefined : caseStudy.slug}
				class:coming-soon={caseStudy.comingSoon}
			>
				<div class="border-when-hovered" class:coming-soon={caseStudy.comingSoon} />
				<div class="background" class:coming-soon={caseStudy.comingSoon} />
				<div class="case-study-title-box-container">
					<CaseStudyTitleBox
						title={caseStudy.title}
						leadParagraph={caseStudy.leadParagraph}
						comingSoon={caseStudy.comingSoon}
					/>
				</div>
				{#if !caseStudy.comingSoon}
					<div class="disclosure-indicator" />
				{/if}
				<FocusHighlight overflow={8} />
			</a>
			<div class="bottom-spacer" />
		</li>
	{/each}
</ul>

<style>
	.landing-spacer {
		height: 100px;
	}

	.case-study-card {
		--margin: 40px;
		--box-margin: var(--margin);
		filter: var(--strong-drop-shadow);
		margin-inline: var(--box-margin);
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
		min-height: 450px;
		max-width: 1000px;
		margin-inline: auto;
		text-decoration: none;
		flex-direction: column;
		justify-content: flex-end;
	}

	@media (max-width: 650px) {
		.case-study-card {
			--box-margin: 10px;
		}
	}

	.box:hover .background:not(.coming-soon),
	.box:focus-visible .background:not(.coming-soon) {
		display: none;
	}

	.border-when-hovered {
		pointer-events: none;
		border-width: 4px;
		border-style: solid;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: none;
		border-color: var(--color-primary);
	}

	.box:hover .border-when-hovered:not(.coming-soon),
	.box:focus-visible .border-when-hovered:not(.coming-soon) {
		display: block;
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

	.disclosure-indicator {
		border-right: 2.5px solid var(--color-primary);
		border-top: 2.5px solid var(--color-primary);
		height: 12px;
		position: absolute;
		right: 16px;
		top: 50%;
		margin-top: 5px;
		-webkit-transform: translateY(0) rotate(45deg) scale(1);
		-ms-transform: translateY(0) rotate(45deg) scale(1);
		transform: translateY(0) rotate(45deg) scale(1);
		width: 12px;
	}
</style>
