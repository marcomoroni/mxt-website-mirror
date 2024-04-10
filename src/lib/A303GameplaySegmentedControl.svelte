<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	export let choices: Array<string>;
	export let selected: number | undefined = undefined;
	export let variant: 'Normal' | 'GuidedTourSchema' | 'MapLegend';
	export let textZIndex: undefined | number = undefined;
	export let containerZIndex: undefined | number = undefined;

	export const [send, receive] = crossfade({
		duration: 600,
		easing: quintOut
	});
</script>

<div
	class="segmented-control"
	style:grid-template-columns={'1fr '.repeat(
		variant === 'MapLegend' ? choices.length : Math.min(2, choices.length)
	)}
	class:guided-tour-schema={variant === 'GuidedTourSchema'}
	class:map-legend={variant === 'MapLegend'}
	style:z-index={containerZIndex === undefined ? 'auto' : containerZIndex}
>
	{#each choices as choice, i (i)}
		<div class="choice" style:z-index={textZIndex === undefined ? 'auto' : textZIndex}>
			{choice}
			{#if selected === i}
				<div in:receive={{ key: 'aaaaa' }} out:send={{ key: 'aaaaa' }} class="selection" />
			{/if}
		</div>
	{/each}
</div>

<style>
	.segmented-control {
		--choice-height: 36px;
		--p: 6px;
		--stroke: 1.5px;
		display: grid;
		grid-auto-flow: row;
		grid-auto-rows: 1fr;
		padding: var(--p);
		align-self: stretch;
		border: var(--stroke) solid
			color-mix(in srgb, var(--color-primary) 35%, var(--color-background));
		border-radius: calc((var(--choice-height) / 2) + var(--p) + (var(--stroke)));
	}

	.segmented-control.guided-tour-schema,
	.segmented-control.map-legend {
		border-color: transparent;
	}

	.segmented-control.map-legend {
		padding: 0;
	}

	.guided-tour-schema .choice {
		color: transparent;
	}

	.choice {
		display: flex;
		align-items: center;
		justify-content: center;
		--m: 16px;
		padding-inline-start: var(--m);
		padding-inline-end: var(--m);
		position: relative;
		height: var(--choice-height);

		text-transform: uppercase;
		font-weight: 600;
		font-size: 12px;
		letter-spacing: 0.02rem;
	}

	.selection {
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 999999px;
		width: 100%;
		height: 100%;
		z-index: -1;
		background-color: color-mix(in srgb, var(--color-primary) 15%, var(--color-background));
	}

	.guided-tour-schema .selection {
		background-color: transparent;
		background-color: var(--color-background);
		z-index: 2;
	}
</style>
