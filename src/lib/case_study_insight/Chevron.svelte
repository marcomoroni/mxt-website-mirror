<script lang="ts">
	export let flipped: boolean;
</script>

<svg
	class:flipped
	xmlns="http://www.w3.org/2000/svg"
	width="20"
	height="20"
	viewBox="0 0 24 24"
	fill="none"
	stroke="#f02828"
	stroke-width="1.75"
	stroke-linecap="round"
	stroke-linejoin="round"
	class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg
>

<style>
	svg {
		stroke: color-mix(in srgb, var(--color-primary), transparent 40%);
		rotate: -90deg;
		transform-origin: center center;
		transition: all 400ms;
	}

	svg.flipped {
		rotate: 0deg;
	}
</style>
