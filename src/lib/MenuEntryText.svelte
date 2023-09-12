<script lang="ts">
	export let isCurrent: Boolean;

	$: currentClass = isCurrent ? 'current' : '';
</script>

<span class="menu-entry-text {currentClass}">
	<slot />
</span>

<style>
	.menu-entry-text {
		color: var(--color-nav-not-current);
		font-weight: 600;
		text-transform: uppercase;
		font-size: 16px;
		letter-spacing: 0.4px;
		transition: color 0.2s ease-in-out;
		user-select: none;
	}

	.menu-entry-text.current {
		color: #3f3b38;
	}
</style>
