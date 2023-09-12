<script>
	import MenuEntryText from '$lib/MenuEntryText.svelte';
</script>

<div class="work-page-background" />

<div class="top-left">
	<a href="/works">
		<MenuEntryText isCurrent={true}>Works</MenuEntryText>
	</a>
</div>

<slot />

<style>
	.work-page-background {
		position: absolute;
		background-color: white;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -10;
	}

	.top-left {
		position: fixed;
		left: var(--top-left-menu-margin-left);
		top: var(--top-left-menu-margin-top);
	}
</style>
