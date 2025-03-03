<script lang="ts">
	// The trick to animate the accordion height is to wrap the content in a grid row, and then animate
	// such row, which is animatable.
	// Source: https://www.youtube.com/watch?v=B_n4YONte5A

	import Chevron from './Chevron.svelte';

	export let expanded = false;

	function toggleExpand() {
		expanded = !expanded;
	}
</script>

<div class="root">
	<div class="top">
		<h3 class="title">
			<slot name="title" />
		</h3>
		<button class="expand-button" on:click={toggleExpand}>
			<div class="expand-button-icon"><Chevron flipped={expanded} /></div>
		</button>
	</div>
	<div class="body-collapsable-container" aria-hidden={!expanded}>
		<div class="body">
			<div class="body-spacer-top" />
			<slot name="body" />
			<div class="body-spacer-bottom" />
		</div>
	</div>
</div>

<style>
	.root {
		background-color: #efe9e6;
		--padding-horizontal: 18px;
	}

	.top {
		display: grid;
	}

	.title,
	.expand-button {
		grid-row: 1;
		grid-column: 1;
	}

	.title {
		padding-left: var(--padding-horizontal);
		padding-right: 80px;
		padding-block: 14px;
		font-weight: 600;
	}

	.expand-button {
		display: grid;
		overflow: hidden;
	}

	.expand-button-icon {
		justify-self: end;
		align-self: start;
		--icon-margin: 15px;
		margin-top: var(--icon-margin);
		margin-right: var(--icon-margin);
	}

	.body-collapsable-container {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 500ms;
	}

	.body {
		overflow: hidden;
		padding-inline: var(--padding-horizontal);
	}

	.body-collapsable-container[aria-hidden='false'] {
		grid-template-rows: 1fr;
	}

	.body-spacer-top {
		height: 6px;
	}

	.body-spacer-bottom {
		height: 15px;
	}
</style>
