<script lang="ts">
	import { onMount } from 'svelte';
	import { match } from 'ts-pattern';
	import * as THREE from 'three';
	import { lerp } from './lerp';

	const DEV_debugLog = false;

	const dioramasData = [
		{
			color: 0xdb8c3f
		},
		{
			color: 0x000000
		},
		{
			color: 0xffffff
		}
	];

	export let state:
		| 'home'
		| 'case-studies'
		| 'case-studies-anchor-a303'
		| 'case-studies-anchor-p2'
		| 'case-studies-anchor-p3'
		| 'case-study-a303'
		| 'case-study-p2'
		| 'case-study-p3'
		| 'studio'
		| 'contacts';

	let logs: Array<string> = [];
	$: {
		if (mounted) {
			logs = [...logs, state];
		}
	}

	let mounted = false; // Keep in mind that three will be initialized on mount.
	$: color = match(state)
		.with('home', () => 'burlywood')
		.with('case-studies', () => 'aquamarine')
		.with('case-studies-anchor-a303', () => 'green')
		.with('case-studies-anchor-p2', () => 'tomato')
		.with('case-studies-anchor-p3', () => 'purple')
		.with('case-study-a303', () => 'red')
		.with('case-study-p2', () => 'cyan')
		.with('case-study-p3', () => 'black')
		.with('studio', () => 'coral')
		.with('contacts', () => 'white')
		.exhaustive();

	onMount(() => {
		mounted = true;
	});

	function initThreeScene(canvasEl: HTMLCanvasElement) {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);

		const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasEl, alpha: true });

		const dioramaInstances = dioramasData.reduce((out, dioramaData, i, array) => {
			const boxSize = 1;
			const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
			// `toneMapped: false` makes the colours match the ones in the HTML.
			const material = new THREE.MeshBasicMaterial({ color: dioramaData.color, toneMapped: false });
			const cube = new THREE.Mesh(geometry, material);
			cube.position.y = boxSize / 2;
			cube.position.x = lerp(-3, 3, i / (array.length - 1));

			return [
				...out,
				{
					cube,
					dispose: () => {
						geometry.dispose();
						material.dispose();
					}
				}
			];
		}, [] as Array<{ cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>; dispose: () => void }>);
		dioramaInstances.forEach(({ cube }) => {
			scene.add(cube);
		});

		camera.position.y = 3;
		camera.position.z = 5;
		camera.lookAt(0, 0, 0);

		const resize = () => {
			// --- should I use a resize observer?
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		};

		let previousTimeStamp = document.timeline.currentTime as DOMHighResTimeStamp;
		const animate = (timeStamp: DOMHighResTimeStamp) => {
			const dt = timeStamp - previousTimeStamp;
			previousTimeStamp = timeStamp;

			requestAnimationFrame(animate);

			dioramaInstances.forEach(({ cube }) => {
				cube.rotation.y += 0.0006 * dt;
			});

			renderer.render(scene, camera);
		};

		resize();
		animate(previousTimeStamp);

		window.addEventListener('resize', resize);

		return {
			destroy() {
				dioramaInstances.forEach(({ dispose }) => {
					dispose();
				});
				renderer.dispose();
			}
		};
	}
</script>

{#if mounted}
	<div class="container">
		<div class="three-model-placeholder" style:background-color={color} />
	</div>

	<canvas use:initThreeScene />

	{#if DEV_debugLog}
		<div class="debug-log">
			{#each logs as log}
				<li>{log}</li>
			{/each}
		</div>
	{/if}
{/if}

<style>
	.container {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	@keyframes placeholder-anim {
		0% {
			right: 30%;
		}
		100% {
			right: 70%;
		}
	}

	.three-model-placeholder {
		width: 600px;
		height: 600px;
		border-radius: 10000px;
		position: absolute;
		bottom: 90px;
		transition: background-color 1s var(--ease);
		transform: translate(50%, 50%);
		animation: placeholder-anim 10s ease-in-out 0s infinite alternate;
	}

	canvas {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.debug-log {
		position: fixed;
		top: 20px;
		left: 20px;
		font-size: 10px;
	}
</style>
