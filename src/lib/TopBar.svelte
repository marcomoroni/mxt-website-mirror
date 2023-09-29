<script lang="ts">
	import WidthContainer from './WidthContainer.svelte';

	export let absolutePos = false;

	$: absolutePosClass = absolutePos ? 'abs' : '';
</script>

<div class="container {absolutePosClass}">
	<WidthContainer>
		<nav class="top-bar">
			<a href="/works">Works</a>
			<a href="/studio">Studio</a>
			<a href="/contacts">Contacts</a>
		</nav>
	</WidthContainer>
</div>

<style>
	.container {
		width: 100%;
	}

	.top-bar {
		display: block;
		height: 60px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		gap: 20px;
	}

	.abs {
		position: absolute;
	}
</style>
