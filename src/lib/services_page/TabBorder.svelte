<script lang="ts">
	import { sectionsData } from '$lib/servicesData';
	import { accentColourInServicesProps } from '$lib/three_scene/threeStateStores';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	export let currentSectionIndex: number;

	const tabBorderKey = Symbol();
	const [tabBorderSend, tabBorderReceive] = crossfade({
		duration: 700,
		easing: quintOut
	});
</script>

{#each sectionsData as _, i}
	{#if currentSectionIndex === i}
		<div
			in:tabBorderSend={{ key: tabBorderKey }}
			out:tabBorderReceive={{ key: tabBorderKey }}
			class="tab-border"
			data-col={i}
			style:background-color={`color-mix(in oklab, var(--color-primary) 5%, ${$accentColourInServicesProps})`}
		/>
	{/if}
{/each}

<style>
	.tab-border {
		grid-row: 1 / 2;
		align-self: end;
		justify-self: stretch;
		height: 4px;
		position: sticky;
		top: var(--case-study-margin);
		z-index: 2;
	}
</style>
