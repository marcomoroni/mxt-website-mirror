<script lang="ts">
	import MenuEntryText from './MenuEntryText.svelte';
	import MxtLogo from './MxtLogo.svelte';

	export let isCurrent: Boolean;
	export let href: string;
	export let anchorId: string;
	export let useLogo = false;

	$: isCurrentClass = isCurrent ? 'current' : '';
</script>

<div class="menu-entry {isCurrentClass}">
	<a class="nav-button" {href} id={anchorId} data-sveltekit-noscroll>
		{#if useLogo}
			<MxtLogo />
		{:else}
			<MenuEntryText {isCurrent}><slot name="anchorInner" /></MenuEntryText>
		{/if}
	</a>
	<div class="collapsable"><slot name="collapsable" /></div>
</div>

<style>
	.collapsable {
		position: relative;

		/* You can't transition a height from `0` to `auto`, so wrap
        everything in a grid row. */
		display: grid;
		grid-template-rows: 1fr;
		transition: grid-template-rows 0.4s var(--curve);
	}

	.menu-entry:not(.current) .collapsable {
		grid-template-rows: 0fr;
	}

	:global(.sub-sections) {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 13px;
		margin-left: 10px;
	}

	:global(.sub-section-link) {
		user-select: none;
		color: var(--color-nav-not-current);
		transition: opacity 0.4s ease-out, color 0.2s ease-in-out;
	}

	:global(.sub-section-link.current) {
		color: var(--color-primary);
	}

	:global(.sub-sections :nth-child(1) .sub-section-link) {
		transition-delay: 0.2s, 0s;
	}

	:global(.sub-sections :nth-child(2) .sub-section-link) {
		transition-delay: 0.3s, 0s;
	}

	:global(.sub-sections :nth-child(3) .sub-section-link) {
		transition-delay: 0.4s, 0s;
	}

	/* Add more as needed. */

	:global(.sub-sections > :first-child) {
		margin-top: 26px;
	}

	:global(.sub-sections > :last-child) {
		margin-bottom: 12px;
	}

	:global(.sections-list-entry:not(.current) .sub-section-link) {
		opacity: 0;
		transition-delay: 0s, 0s;
		transition-duration: 0.2s, 0.2s;
	}
</style>
