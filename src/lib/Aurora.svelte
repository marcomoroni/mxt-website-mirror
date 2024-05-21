<script lang="ts">
	const shapes = [
		{
			class: 's1'
		},
		{
			class: 's2'
		},
		{
			class: 's3'
		}
	];

	export let visible = false;
</script>

<div class="container">
	<div class="shapes-pivot">
		{#each shapes as shape}
			<div class="shape {shape.class}" class:visible />
		{/each}
	</div>
	<div class="blur" class:visible />
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		--color-anim-duration: 25s;
	}

	.shapes-pivot {
		width: 0px;
		height: 0px;
		position: absolute;
		left: 50%;
		top: 50%;
	}

	.shape {
		aspect-ratio: 1 / 1;
		position: absolute;
		border-radius: 100%;
		transform: translate(-50%, -50%);
		opacity: 0.7;
		transition: opacity 5s var(--ease);
	}

	.shape.visible {
		transition-delay: 1s;
	}

	.shape:not(.visible) {
		opacity: 0;
	}

	@keyframes s1-anim-1 {
		0% {
			background-color: var(--color-accent-1);
		}
		50% {
			background-color: var(--color-accent-2);
		}
		100% {
			background-color: var(--color-accent-3);
		}
	}

	@keyframes s1-anim-2 {
		0% {
			top: -500px;
		}
		100% {
			top: 200px;
		}
	}

	@keyframes s1-anim-3 {
		0% {
			left: 500px;
		}
		100% {
			left: -700px;
		}
	}

	@keyframes s1-anim-4 {
		0% {
			width: 500px;
		}
		100% {
			width: 1200px;
		}
	}

	.s1 {
		background-color: var(--color-accent-1);
		animation: s1-anim-1 var(--color-anim-duration) ease-in-out 0s infinite alternate,
			s1-anim-2 18s ease-in-out 0s infinite alternate,
			s1-anim-3 20s ease-in-out 0s infinite alternate,
			s1-anim-4 15s ease-in-out 0s infinite alternate;
	}

	@keyframes s2-anim-1 {
		0% {
			background-color: var(--color-accent-2);
		}
		50% {
			background-color: var(--color-accent-3);
		}
		100% {
			background-color: var(--color-accent-1);
		}
	}

	@keyframes s2-anim-2 {
		0% {
			top: 200px;
		}
		100% {
			top: -600px;
		}
	}

	@keyframes s2-anim-3 {
		0% {
			left: 200px;
		}
		100% {
			left: 800px;
		}
	}

	@keyframes s2-anim-4 {
		0% {
			width: 900px;
		}
		100% {
			width: 600px;
		}
	}

	.s2 {
		background-color: var(--color-accent-2);
		top: 20%;
		left: 20%;
		animation: s2-anim-1 var(--color-anim-duration) ease-in-out 0s infinite alternate,
			s2-anim-2 20s ease-in-out 0s infinite alternate,
			s2-anim-3 27s ease-in-out 0s infinite alternate,
			s2-anim-4 18s ease-in-out 0s infinite alternate;
	}

	@keyframes s3-anim-1 {
		0% {
			background-color: var(--color-accent-3);
		}
		50% {
			background-color: var(--color-accent-1);
		}
		100% {
			background-color: var(--color-accent-2);
		}
	}

	@keyframes s3-anim-2 {
		0% {
			top: 100px;
		}
		100% {
			top: 300px;
		}
	}

	@keyframes s3-anim-3 {
		0% {
			left: -600px;
		}
		100% {
			left: 200px;
		}
	}

	@keyframes s3-anim-4 {
		0% {
			width: 600px;
		}
		100% {
			width: 1300px;
		}
	}

	.s3 {
		background-color: var(--color-accent-3);
		top: 60%;
		left: 60%;
		animation: s3-anim-1 var(--color-anim-duration) ease-in-out 0s infinite alternate,
			s3-anim-2 21s ease-in-out 0s infinite alternate,
			s3-anim-3 28s ease-in-out 0s infinite alternate,
			s3-anim-4 20s ease-in-out 0s infinite alternate;
	}

	.blur {
		position: absolute;
		width: 100%;
		/* For some reason I need this hack in order to make the blur effect work properly
        on the lower edge. */
		height: calc(100% - 1px);
		backdrop-filter: blur(170px);
		-webkit-backdrop-filter: blur(170px);
		background-color: color-mix(in srgb, var(--color-background), transparent 70%);
	}

	/* Hide this as well for better performance. */
	.blur:not(.visible) {
		transition-delay: 6s;
		opacity: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.s1,
		.s2,
		.s3 {
			animation: none;
		}

		.s1 {
			animation: s1-anim-1 30s ease-in-out 0s infinite alternate;
			top: 500px;
			left: -200px;
			width: 1000px;
		}

		.s2 {
			animation: s2-anim-1 30s ease-in-out 0s infinite alternate;
			top: -200px;
			left: 300px;
			width: 500px;
		}

		.s3 {
			animation: s3-anim-1 30s ease-in-out 0s infinite alternate;
			top: 300px;
			left: -1000px;
			width: 1600px;
		}

		.blur,
		.shape {
			transition: none;
		}
	}
</style>
