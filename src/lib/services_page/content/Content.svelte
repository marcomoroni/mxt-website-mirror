<script lang="ts">
	import { caseStudiesData } from '$lib/caseStudiesData';

	export let caseStudyIndexes: Array<number> = [];
</script>

<div class="content">
	<div class="fade" />
	<div class="fade-gap" />
	<slot />
	{#if caseStudyIndexes.length > 0}
		<h2 class="case-study-links-header">Related case studies</h2>
		<ul class="case-study-links">
			{#each caseStudyIndexes as caseStudyIndex}
				{@const caseStudyData = caseStudiesData[caseStudyIndex]}
				<li><a href={caseStudyData.href}>{caseStudyData.title}</a></li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.content {
		padding-bottom: 140px;
		--grid-gap: 10px;
	}

	.fade {
		position: sticky;
		top: 0;
		left: 0;
		width: 100%;
		height: 80px;
		background: linear-gradient(0deg, transparent 0%, var(--color-background) 25%);
		z-index: 1;
	}

	.fade-gap {
		padding-top: 20px;
	}

	.content :global(.intro) {
		font-size: 19px;
		padding-block: 30px;
		padding-inline: 60px;
		max-width: 800px;
		margin-inline: auto;
		justify-self: stretch;
		align-self: center;
	}

	.content :global(.large-header) {
		font-size: 36px;
		margin-bottom: 30px;
	}

	.content :global(.small-header) {
		font-size: 19px;
		margin-bottom: 11px;
		margin-top: 20px;
		font-weight: 650;
	}

	.content :global(.common-card-min-height) {
		min-height: max(400px, 45dvh);
	}

	.content :global(ul) {
		margin-block: 7px;
	}

	.content :global(*) {
		text-wrap: pretty;
	}

	.case-study-links-header {
		text-align: unset;
		font-size: 14px;
		text-transform: uppercase;
		letter-spacing: 3px;
		font-weight: 620;
		margin-top: 130px;
		margin-bottom: 30px;
		color: color-mix(in oklab, var(--color-primary) 30%, var(--color-background));
	}
</style>
