<script lang="ts">
	export let overflow: number;
	export let cornerRadius: number | undefined = undefined;
</script>

<div
	class="focus-highlight"
	style:pointer-events={'none'}
	style:position={'absolute'}
	style:width={`calc(100% + (${overflow}px * 2))`}
	style:height={`calc(100% + (${overflow}px * 2))`}
	style:top={`calc(${overflow}px * -1)`}
	style:left={`calc(${overflow}px * -1)`}
	style:border={'var(--focus-thickness) solid var(--color-focus)'}
	style:border-radius={cornerRadius ? `${cornerRadius}px` : undefined}
/>

<style>
	:global(a) .focus-highlight {
		display: none;
	}

	:global(a:focus-visible) .focus-highlight {
		display: unset;
	}
</style>
