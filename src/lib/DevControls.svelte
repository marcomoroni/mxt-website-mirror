<script lang="ts">
	import { onMount } from 'svelte';
	import { colors as gridColors } from '$lib/dotsEffectData';
	import * as THREE from 'three';
	import { get } from 'svelte/store';

	const cssColours = [
		{
			label: 'Background',
			cssVariable: '--color-background'
		},
		{
			label: 'Text',
			cssVariable: '--color-primary'
		},
		{
			label: 'Logo base',
			cssVariable: '--color-logo-base'
		},
		{
			label: 'Accent 1',
			cssVariable: '--color-accent-1'
		},
		{
			label: 'Accent 2',
			cssVariable: '--color-accent-2'
		},
		{
			label: 'Accent 3',
			cssVariable: '--color-accent-3'
		},
		{
			label: 'Accent 4',
			cssVariable: '--color-accent-4'
		}
	];
	let gridColours_ = [
		{
			label: 'Grid base',
			set: (value: string) =>
				gridColors.update((old) => ({ ...old, base: new THREE.Color(value) })),
			get: () => '#' + get(gridColors).base.getHexString()
		},
		{
			label: 'Grid accent 1',
			set: (value: string) =>
				gridColors.update((old) => ({ ...old, accent1: new THREE.Color(value) })),
			get: () => '#' + get(gridColors).accent1.getHexString()
		},
		{
			label: 'Grid accent 2',
			set: (value: string) =>
				gridColors.update((old) => ({ ...old, accent2: new THREE.Color(value) })),
			get: () => '#' + get(gridColors).accent2.getHexString()
		},
		{
			label: 'Grid accent 3',
			set: (value: string) =>
				gridColors.update((old) => ({ ...old, accent3: new THREE.Color(value) })),
			get: () => '#' + get(gridColors).accent3.getHexString()
		},
		{
			label: 'Grid accent 4',
			set: (value: string) =>
				gridColors.update((old) => ({ ...old, accent4: new THREE.Color(value) })),
			get: () => '#' + get(gridColors).accent4.getHexString()
		}
	];

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function getCSSPropertyValue(propertyName: string): string {
		if (!mounted) return '';
		let html = document.querySelector('html');
		if (html === null) return '';
		var style = getComputedStyle(html);
		return style.getPropertyValue(propertyName);
	}

	function setCSSProperty(propertyName: string, value: string) {
		if (!mounted) return '';
		let html = document.querySelector('html');
		if (html === null) return;
		html.style.setProperty(propertyName, value);
	}
</script>

{#if mounted}
	<div class="container">
		{#each cssColours as { label, cssVariable }}
			<div class="row">
				<div>{label}</div>
				<input
					value={getCSSPropertyValue(cssVariable)}
					on:change={(e) => {
						setCSSProperty(cssVariable, e.currentTarget.value);
					}}
				/>
			</div>
		{/each}
		{#each gridColours_ as { label, get, set }}
			<div class="row">
				<div>{label}</div>
				<input
					value={get()}
					on:change={(e) => {
						set(e.currentTarget.value);
					}}
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.container {
		position: fixed;
		bottom: 10px;
		left: 10px;
		background-color: #0000006f;
		backdrop-filter: blur(10px);
		color: white;
		padding: 15px;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 20px;
	}
</style>
