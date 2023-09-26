<script>
	import MenuEntryText from '$lib/MenuEntryText.svelte';
	import MxtLogo from '$lib/MxtLogo.svelte';
</script>

<div class="work-page-background" />

<div class="top-left">
	<a href="/works">
		<MenuEntryText isCurrent={true}>Works</MenuEntryText>
	</a>
</div>

<div class="top-right"><MxtLogo /></div>

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

	.top-right {
		position: fixed;
		right: var(--top-right-menu-margin-right);
		top: var(--top-right-menu-margin-top);
	}

	:global(.top-right .mxt-logo) {
		width: 100px;
	}
</style>
