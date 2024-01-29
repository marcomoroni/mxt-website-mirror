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
</script>

<div class="container">
	<div class="shapes-pivot">
		{#each shapes as shape}
			<div class="shape {shape.class}" />
		{/each}
	</div>
	<div class="blur" />
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
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
			left: -100px;
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
		animation: s1-anim-1 22s ease-in-out 0s infinite alternate,
			s1-anim-2 18s ease-in-out 0s infinite alternate,
			s1-anim-3 20s ease-in-out 0s infinite alternate,
			s1-anim-4 15s ease-in-out 0s infinite alternate;
	}

	@keyframes s2-anim-1 {
		0% {
			background-color: var(--color-accent-6);
		}
		50% {
			background-color: var(--color-accent-4);
		}
		100% {
			background-color: var(--color-accent-2);
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
		animation: s2-anim-1 25s ease-in-out 0s infinite alternate,
			s2-anim-2 20s ease-in-out 0s infinite alternate,
			s2-anim-3 27s ease-in-out 0s infinite alternate,
			s2-anim-4 18s ease-in-out 0s infinite alternate;
	}

	@keyframes s3-anim-1 {
		0% {
			background-color: var(--color-accent-5);
		}
		50% {
			background-color: var(--color-accent-3);
		}
		100% {
			background-color: var(--color-accent-1);
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
		animation: s3-anim-1 30s ease-in-out 0s infinite alternate,
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
		backdrop-filter: blur(150px);
		-webkit-backdrop-filter: blur(150px);
		background-color: color-mix(in srgb, var(--color-background), transparent 80%);
	}
</style>
