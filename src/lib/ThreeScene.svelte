<script lang="ts">
	import { onMount } from 'svelte';
	import { match } from 'ts-pattern';

	export let state:
		| 'home'
		| 'case-studies'
		| 'case-studies-anchor-a303'
		| 'case-studies-anchor-p2'
		| 'case-studies-anchor-p3'
		| 'case-study-a303'
		| 'case-study-p2'
		| 'case-study-p3'
		| 'studio'
		| 'hidden';

	let logs: Array<string> = [];
	$: {
		if (mounted) {
			logs = [...logs, state];
		}
	}

	let mounted = false; // Keep in mind that three will be initialized on mount.
	$: color = match(state)
		.with('home', () => 'burlywood')
		.with('case-studies', () => 'aquamarine')
		.with('case-studies-anchor-a303', () => 'green')
		.with('case-studies-anchor-p2', () => 'tomato')
		.with('case-studies-anchor-p3', () => 'purple')
		.with('case-study-a303', () => 'red')
		.with('case-study-p2', () => 'cyan')
		.with('case-study-p3', () => 'black')
		.with('studio', () => 'coral')
		.with('hidden', () => 'white')
		.exhaustive();

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<div class="container">
		<div class="three-model-placeholder" style:background-color={color} />
	</div>

	<div class="debug-log">
		{#each logs as log}
			<li>{log}</li>
		{/each}
	</div>
{/if}

<style>
	.container {
		width: 100%;
		height: 100%;
	}

	.three-model-placeholder {
		width: 600px;
		height: 600px;
		border-radius: 10000px;
		position: absolute;
		bottom: -200px;
		right: -200px;
		transition: background-color 1s var(--ease);
	}

	.debug-log {
		position: fixed;
		top: 20px;
		left: 20px;
		font-size: 10px;
	}
</style>
