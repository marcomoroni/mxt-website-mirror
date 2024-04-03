<script lang="ts">
	export let state: 'default' | 'services1' | 'services2' | 'services3';
</script>

<div
	class="background"
	class:state-1={state === 'services1'}
	class:state-2={state === 'services2'}
	class:state-3={state === 'services3'}
/>

<style>
	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100dvw;
		height: 100dvh;
		background-color: var(--color-background);
		z-index: -100;
		transition: background-color 2s ease-in-out;
	}

	.state-1 {
		background-color: aqua;
	}

	.state-2 {
		background-color: red;
	}

	.state-3 {
		background-color: green;
	}
</style>
