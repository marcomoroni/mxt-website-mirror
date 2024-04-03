<script lang="ts">
	import { accentColor1, accentColor2, accentColor3, backgroundColor } from '$lib/cssValues';
	import { smoothDampAnimation } from '$lib/smoothDamp';
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import { match } from 'ts-pattern';
	import { backgroundColorStore } from './backgroundStateStore';

	export let state: 'default' | 'services1' | 'services2' | 'services3';
	const coloursCount = 4;
	const colours = [backgroundColor, accentColor1, accentColor2, accentColor3];
	$: colorPaletteIndex = match(state)
		.with('default', () => 0)
		.with('services1', () => 1)
		.with('services2', () => 2)
		.with('services3', () => 3)
		.exhaustive();

	const colorPaletteIndexAnimation = smoothDampAnimation(colorPaletteIndex, 0.02);
	$: {
		colorPaletteIndexAnimation.target = colorPaletteIndex;
	}

	const interpolateFunction = (colorList: Array<string>, normalizedI: number) =>
		d3.piecewise(d3.interpolateRgb.gamma(2.2), colorList)(normalizedI);

	onMount(() => {
		let previousTimeStamp = document.timeline.currentTime as DOMHighResTimeStamp;
		let shouldRequestNewAnimationFrame = true;
		const animate = (timeStamp: DOMHighResTimeStamp) => {
			const dt = timeStamp - previousTimeStamp;
			previousTimeStamp = timeStamp;

			if (shouldRequestNewAnimationFrame) {
				requestAnimationFrame(animate);
			}

			colorPaletteIndexAnimation.tick(dt);
			const normalizedI = colorPaletteIndexAnimation.current / (coloursCount - 1);
			const interpolatedColor = interpolateFunction(colours, normalizedI);
			backgroundColorStore.set(interpolatedColor);
		};
		animate(previousTimeStamp);

		return {
			destroy() {
				shouldRequestNewAnimationFrame = false;
			}
		};
	});
</script>

<div class="background" style:background-color={$backgroundColorStore} />

<style>
	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100dvw;
		height: 100dvh;
		/* background-color: var(--color-background); */
		z-index: -100;
		transition: background-color 2s ease-in-out;
	}
</style>
