<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	export let choices: Array<string>;
	export let selected: number | undefined = undefined;
	export let variant: 'Normal' | 'GuidedTourSchema';
	export let textZIndex: undefined | number = undefined;
	export let containerZIndex: undefined | number = undefined;
	export let accentColor: 1 | 2 | 3 | 4 = 1;

	export const [send, receive] = crossfade({
		duration: 600,
		easing: quintOut
	});
</script>

<div
	class="segmented-control"
	style:grid-template-columns={'1fr '.repeat(Math.min(2, choices.length))}
	class:guided-tour-schema={variant === 'GuidedTourSchema'}
	style:z-index={containerZIndex === undefined ? 'auto' : containerZIndex}
>
	{#each choices as choice, i (i)}
		<div class="choice" style:z-index={textZIndex === undefined ? 'auto' : textZIndex}>
			{choice}
			{#if selected === i}
				<div
					in:receive={{ key: 'aaaaa' }}
					out:send={{ key: 'aaaaa' }}
					class="selection c{accentColor}"
				/>
			{/if}
		</div>
	{/each}
</div>

<style>
	.segmented-control {
		--choice-height: 36px;
		--p: 2px;
		display: grid;
		grid-auto-flow: row;
		grid-auto-rows: 1fr;
		padding: var(--p);
		align-self: stretch;
		border: var(--card-stroke) solid var(--color-card-primary);
		border-radius: calc((var(--choice-height) / 2) + (var(--p) * 2));
	}

	.segmented-control.guided-tour-schema {
		border-color: transparent;
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
	}

	.selection {
		position: absolute;
		top: 0;
		left: 0;
		border: var(--card-stroke) solid var(--color-card-primary);
		border-radius: 999999px;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.c1 {
		background-color: var(--color-accent-1);
	}

	.c2 {
		background-color: var(--color-accent-2);
	}

	.c3 {
		background-color: var(--color-accent-3);
	}

	.c4 {
		background-color: var(--color-accent-4);
	}

	.guided-tour-schema .selection {
		background-color: transparent;
		border: var(--card-stroke) solid var(--color-card-primary);
		background-color: var(--color-background);
		z-index: 2;
	}
</style>
