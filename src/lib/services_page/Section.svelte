<script lang="ts">
	export let scrollObserveAction: (el: HTMLElement) => void;
</script>

<div use:scrollObserveAction class="container">
	<slot name="type" />
</div>

<style>
	.container {
		padding-bottom: 100px;
	}
</style>
