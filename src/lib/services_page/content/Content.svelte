<script lang="ts">
	export let caseStudies: Array<{ title: string; slug: string }>;
	export let relatedCaseStudies: Array<string> = [];
</script>

<div class="content">
	<slot />
	{#if relatedCaseStudies.length > 0}
		<h2 class="case-study-links-header">Related case studies</h2>
		<ul class="case-study-links with-disc">
			{#each relatedCaseStudies as relatedCaseStudy}
				{@const caseStudyData = caseStudies.find(({ slug }) => slug === relatedCaseStudy)}
				{#if caseStudyData}
					<li><a href={`/case-studies/${caseStudyData.slug}/`}>{caseStudyData.title}</a></li>
				{/if}
			{/each}
		</ul>
	{/if}
</div>

<style>
	.content {
		padding-bottom: 140px;
		padding-top: 60px;
		--grid-gap: var(--case-study-margin);
		--small-header-margin-top: 20px;
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

	@media (max-width: 600px) {
		.content :global(.intro) {
			padding-inline: unset;
		}
	}

	.content :global(.large-header) {
		font-size: 36px;
		margin-bottom: 30px;
		line-height: 1.4;
	}

	.content :global(.small-header) {
		font-size: 19px;
		margin-bottom: 11px;
		font-weight: 650;
	}

	.content :global(.small-header:not(:first-child)) {
		margin-top: var(--small-header-margin-top);
	}

	.content :global(.common-card-min-height) {
		min-height: max(400px, 70dvh);
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
		margin-bottom: 20px;
		color: color-mix(in oklab, var(--color-primary) 30%, var(--color-background));
	}
</style>
