<script lang="ts">
	import { onMount } from 'svelte';
	import { match } from 'ts-pattern';
	import * as THREE from 'three';
	import { lerp } from './lerp';
	import { spring } from 'svelte/motion';
	import { get } from 'svelte/store';

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

	const sceneSettings = (
		state:
			| 'home'
			| 'case-studies'
			| 'case-studies-anchor-a303'
			| 'case-studies-anchor-p2'
			| 'case-studies-anchor-p3'
			| 'case-study-a303'
			| 'case-study-p2'
			| 'case-study-p3'
			| 'studio'
			| 'contacts'
	) => {
		return {
			camera: {
				pos: {
					y: state === 'studio' ? 7 : 3,
					z: state === 'studio' ? 0 : 5
				}
			}
		};
	};

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
		const initialSceneSettings = sceneSettings(state);

		// Springs.
		const cameraPosYSpring = spring(initialSceneSettings.camera.pos.y, { stiffness: 0.01 });
		const cameraPosZSpring = spring(initialSceneSettings.camera.pos.z, { stiffness: 0.01 });

		const udpateSpringTargets = () => {
			const currentSceneSettings = sceneSettings(state);
			cameraPosYSpring.set(currentSceneSettings.camera.pos.y);
			cameraPosZSpring.set(currentSceneSettings.camera.pos.z);
		};

		const applySpringValues = (camera: THREE.PerspectiveCamera) => {
			camera.position.y = get(cameraPosYSpring);
			camera.position.z = get(cameraPosZSpring);
		};

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			65,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);

		const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasEl, alpha: true });

		// Dioramas are placed in a circumference at equal distances.
		// To create the illusion of them moving around diverse dispositions animate the control points
		// of this circumference, along with the camera.
		const railCircumference = {
			center: new THREE.Vector3(0, 0, 0),
			radius: 4,
			polarAngleRad: 0
		};
		const positionInCircumference = (
			circumference: { center: THREE.Vector3; radius: number; polarAngleRad: number },
			polarAngleDiplRad: number
		) => {
			return {
				x: Math.cos(circumference.polarAngleRad + polarAngleDiplRad) * circumference.radius,
				z: Math.sin(circumference.polarAngleRad + polarAngleDiplRad) * circumference.radius
			};
		};

		const dioramaInstances = dioramasData.reduce((out, dioramaData, i, array) => {
			const boxSize = 1;
			const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
			// `toneMapped: false` makes the colours match the ones in the HTML.
			const material = new THREE.MeshBasicMaterial({ color: dioramaData.color, toneMapped: false });
			const cube = new THREE.Mesh(geometry, material);
			cube.position.y = boxSize / 2;
			const ownPolarAngle = lerp(0, 2 * Math.PI, i / array.length);

			return [
				...out,
				{
					cube,
					ownPolarAngle,
					dispose: () => {
						geometry.dispose();
						material.dispose();
					}
				}
			];
		}, [] as Array<{ cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>; ownPolarAngle: number; dispose: () => void }>);
		dioramaInstances.forEach(({ cube, ownPolarAngle }) => {
			scene.add(cube);
			const pos = positionInCircumference(railCircumference, ownPolarAngle);
			cube.position.x = pos.x;
			cube.position.z = pos.z;
		});

		const resize = () => {
			// --- should I use a resize observer?
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		};

		let previousTimeStamp = document.timeline.currentTime as DOMHighResTimeStamp;
		let shouldRequestNewAnimationFrame = true;
		const animate = (timeStamp: DOMHighResTimeStamp) => {
			const dt = timeStamp - previousTimeStamp;
			previousTimeStamp = timeStamp;

			if (shouldRequestNewAnimationFrame) {
				requestAnimationFrame(animate);
			}

			railCircumference.polarAngleRad += 0.0003 * dt;
			railCircumference.polarAngleRad %= 2 * Math.PI; // Normalize angle.
			dioramaInstances.forEach(({ cube, ownPolarAngle }) => {
				const pos = positionInCircumference(railCircumference, ownPolarAngle);
				cube.position.x = pos.x;
				cube.position.z = pos.z;
			});
			udpateSpringTargets();
			applySpringValues(camera);
			camera.lookAt(0, 0, 0);

			renderer.render(scene, camera);
		};

		resize();
		animate(previousTimeStamp);

		window.addEventListener('resize', resize);

		return {
			destroy() {
				shouldRequestNewAnimationFrame = false;
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
