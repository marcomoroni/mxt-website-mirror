<script lang="ts">
	import CaseStudyCard from '$lib/CaseStudyCard.svelte';

	const simulationParts = [
		'Accurate terrain data',
		'Simulated traffic',
		'Simulated noise',
		'Simulated light'
	];
</script>

<CaseStudyCard>
	<div class="container">
		{#each simulationParts as part, i}
			{#if i !== 0}
				<div class="plus">+</div>
			{/if}
			<div>{part}</div>
		{/each}
	</div>
</CaseStudyCard>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.plus {
		font-size: 22px;
		margin-top: 4px;
		margin-bottom: 7px;
		font-weight: 380;
	}
</style>
