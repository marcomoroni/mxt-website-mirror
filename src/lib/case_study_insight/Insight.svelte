<script lang="ts">
</script>

<div class="container">
	<slot />
</div>

<style>
	.container {
		display: flex;
		flex-flow: column;
		gap: 3px;
		margin-left: auto;
		margin-right: auto;
		margin-block: 50px;
		padding-left: var(--body-margin);
		padding-right: var(--body-margin);
		max-width: calc(var(--body-width) + 160px + (var(--body-margin) * 2));
	}
</style>
