<script lang="ts">
	export let scrollObserveAction: (el: HTMLElement) => void;
	export let color: string;
</script>

<div use:scrollObserveAction class="section">
	<div class="type" style:color>
		<slot name="type" />
		<div class="type-bottom-margin" />
	</div>
</div>

<style>
	.section {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		gap: var(--case-study-margin);
		margin-left: var(--case-study-margin);
		margin-right: var(--case-study-margin);
	}

	.type {
		grid-column: 5 / 10;
		grid-row: 1;
	}

	.type-bottom-margin {
		height: 70px;
	}

	@media (max-width: 900px) {
		.section {
			grid-template-columns: unset;
			grid-auto-flow: row;
		}

		.type {
			grid-column: unset;
			grid-row: 2;
		}
	}
</style>
