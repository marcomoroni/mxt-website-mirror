<script lang="ts">
	// Same size as the images on the other layers.
	const layerSize = { width: 3507, height: 2055 };

	const roads = [
		{
			pos: { x: '1500px', y: '1094px' },
			rot: '-13deg',
			cars: [
				{ delay: 0 },
				{ delay: 0.4 },
				{ delay: 1 },
				{ delay: 2 },
				{ delay: 4 },
				{ delay: 6 },
				{ delay: 10 },
				{ delay: 15 },
				{ delay: 16 },
				{ delay: 19 }
			]
		},
		{
			pos: { x: '1500px', y: '1098px' },
			rot: '167deg',
			cars: [
				{ delay: 0 },
				{ delay: 1 },
				{ delay: 3 },
				{ delay: 4 },
				{ delay: 4.5 },
				{ delay: 8 },
				{ delay: 9 },
				{ delay: 9.5 },
				{ delay: 10 },
				{ delay: 16 },
				{ delay: 18.5 }
			]
		}
	];

	export let hideImageAroundSimulation: boolean;

	// https://css-tricks.com/scaled-proportional-blocks-with-css-and-javascript/.
	function scaledToCover(el: HTMLElement, size: { width: number; height: number }) {
		const parentEl = el.parentElement!;

		const resizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const availableWidth = parentEl.clientWidth;
				const availableHeight = parentEl.clientHeight;
				const contentWidth = size.width;
				const contentHeight = size.height;
				const scale = Math.max(availableWidth / contentWidth, availableHeight / contentHeight);
				el.style.transform = `translate(-50%, -50%) scale(${scale})`;
			});
		});
		resizeObserver.observe(parentEl);

		return {
			destroy() {
				resizeObserver.disconnect();
			}
		};
	}
</script>

<div class="container">
	<div
		class="image-like-container"
		use:scaledToCover={layerSize}
		style:width={`${layerSize.width}px`}
		style:height={`${layerSize.height}px`}
	>
		{#each roads as road, i}
			<div class="road-pivot" style:top={road.pos.y} style:left={road.pos.x}>
				{#if i === 0}
					<div
						class="road-border"
						class:hidden={hideImageAroundSimulation}
						style:transform={`translate(-50%, -50%) rotate(${road.rot})`}
					/>
				{/if}
				<div class="road" style:transform={`translate(-50%, -50%) rotate(${road.rot})`}>
					{#each road.cars as car}
						<div class="car-pivot" style:animation-delay={`${car.delay}s`}>
							<div class="car-light-front" />
							<div class="car-light-back" />
							<div class="car-sound" style:animation-delay={`${Math.random() * 4}s`} />
							<div class="car-shape" />
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.image-like-container {
		/* background-color: #ffffff; */
		position: relative;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		transform-origin: center center;
	}

	.road-pivot {
		position: absolute;
		width: 0;
		height: 0;
	}

	.road-border {
		position: absolute;
		width: 500px;
		height: 300px;
		background: var(--color-background);
		transform: translate(-50%, -50%);
		transform-origin: center center;
		transition: opacity 2s ease-in-out;
	}

	.road-border.hidden {
		opacity: 0;
	}

	.road {
		position: absolute;
		width: 500px;
		height: 3px;
		background: #dfd9d5;
		transform: translate(-50%, -50%);
		transform-origin: center center;
	}

	@keyframes car-anim {
		from {
			left: 0%;
		}
		to {
			left: 100%;
		}
	}

	.car-pivot {
		position: absolute;
		width: 0;
		height: 0;
		top: 1.7px;
		animation-name: car-anim;
		animation-duration: 20s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	@keyframes car-sound-anim {
		0% {
			width: 5px;
			height: 5px;
			opacity: 0;
		}
		5% {
			opacity: 1;
		}
		50% {
			width: 50px;
			height: 50px;
			opacity: 0;
		}
		100% {
			width: 50px;
			height: 50px;
			opacity: 0;
		}
	}

	.car-sound {
		position: absolute;
		border: 1px solid #5c5c5c59;
		transform: translate(-50%, -50%);
		transform-origin: center center;
		border-radius: 1000px;
		animation-name: car-sound-anim;
		animation-duration: 4s;
		animation-iteration-count: infinite;
		animation-timing-function: ease-out;
	}

	.car-shape {
		position: absolute;
		width: 2.8px;
		height: 1.6px;
		background-color: var(--color-primary);
		transform: translate(-50%, -50%);
		transform-origin: center center;
	}

	.car-light-front {
		position: absolute;
		width: 5px;
		height: 1.6px;
		top: 50%;
		left: 4px;
		background: linear-gradient(to right, #ffffffc8, transparent);
		transform: translate(-50%, -50%);
		transform-origin: center center;
	}

	.car-light-back {
		position: absolute;
		width: 3px;
		height: 1.6px;
		top: 50%;
		left: -2px;
		background: linear-gradient(to left, #ff000094, transparent);
		transform: translate(-50%, -50%);
		transform-origin: center center;
	}
</style>
