<script lang="ts">
	import { onMount } from 'svelte';

	const colours = [
		{
			label: 'Background',
			cssVariable: '--color-background'
		},
		{
			label: 'Text',
			cssVariable: '--color-primary'
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
		},
		{
			label: 'Logo base',
			cssVariable: '--color-logo-base'
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
		{#each colours as { label, cssVariable }}
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
