<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as d3 from 'd3';
	import { spring } from 'svelte/motion';
	import { derived, get, writable, type Unsubscriber } from 'svelte/store';
	import { vertexShader } from './vertexShader';
	import { fragmentShader } from './fragmentShader';
	import { P, match } from 'ts-pattern';
	import {
		accentColor1,
		accentColor2,
		accentColor3,
		accentColor4,
		accentColor5,
		accentColor6
	} from '$lib/accentColors';
	import { lerp } from '$lib/lerp';
	import { toRadians } from '$lib/angleConversions';

	const DEV_debugLog = false;

	const dioramasData = [
		{
			geometry: () => new THREE.SphereGeometry(1)
		},
		{
			geometry: () => new THREE.BoxGeometry(1, 1, 1)
		},
		{
			geometry: () => new THREE.TorusKnotGeometry(1, 0.2, 300, 8, 5, 11)
		}
	];
	const colorPalettes = [
		{ accentColor1: accentColor2, accentColor2: accentColor3, accentColor3: accentColor1 },
		{ accentColor1: accentColor4, accentColor2: '#DCDAC3', accentColor3: '#BDD2D5' },
		{ accentColor1: '#CAA98B', accentColor2: '#6B796A', accentColor3: accentColor5 },
		{ accentColor1: '#CDD9C5', accentColor2: accentColor6, accentColor3: '#FFE8B0' }
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

	// This is needed because I need some reactivity that I can't have with implicit Svelte
	// component reactivity.
	const stateStore = writable<
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
	>(state);
	$: {
		stateStore.set(state);
	}
	// --- todo: proxy this state as a delayed state

	// Given a state, calculate all values in the 3D scene.
	// Note that I can only use simple numbers as the stores values and not objects otherwise reactivity
	// will be triggered even if the leaves o the object are the same.
	const sceneSettings = {
		camera: {
			pos: {
				y: derived(stateStore, ($s) => ($s === 'studio' ? 7 : 3)),
				z: derived(stateStore, ($s) => ($s === 'studio' ? 0 : 5))
			}
		},
		colorPaletteIndex: derived(stateStore, ($s) =>
			match($s)
				.with('case-studies-anchor-a303', () => 1)
				.with('case-studies-anchor-p2', () => 2)
				.with('case-studies-anchor-p3', () => 3)
				.with('case-study-a303', () => 1)
				.with('case-study-p2', () => 2)
				.with('case-study-p3', () => 3)
				.otherwise(() => 0)
		),
		railCircumference: {
			center: {
				x: derived(stateStore, ($s) => ($s === 'case-studies' ? -3 : 0)),
				z: derived(stateStore, ($s) => 0)
			},
			radius: derived(stateStore, ($s) => ($s === 'studio' ? 2 : 4)),
			polarAngleDeg: derived(stateStore, ($s) => ($s === 'home' ? 'KeepRotating' : { At: 0 }))
		}
	};

	let logs: Array<string> = [];
	$: {
		if (mounted) {
			logs = [...logs, state];
		}
	}

	let mounted = false; // Keep in mind that three will be initialized on mount.

	onMount(() => {
		mounted = true;
	});

	function initThreeScene(canvasEl: HTMLCanvasElement) {
		const storeUnsubscribers: Array<Unsubscriber> = [];

		// A store that can be updated every frame when there is a continuous rotation.
		const railCircumferencePolarAngleRad = writable(
			match(get(sceneSettings.railCircumference.polarAngleDeg))
				.with('KeepRotating', () => 350) // --- temp. will be 0
				.with({ At: P.select() }, (to) => to)
				.exhaustive()
		);
		storeUnsubscribers.push(
			sceneSettings.railCircumference.polarAngleDeg.subscribe((v) => {
				railCircumferencePolarAngleRad.update((currentAngle) =>
					match(get(sceneSettings.railCircumference.polarAngleDeg))
						.with('KeepRotating', () => currentAngle)
						.with({ At: P.select() }, (to) => to)
						.exhaustive()
				);
			})
		);

		// LERP ANGLE?

		const springs = {
			camera: {
				pos: {
					y: spring(get(sceneSettings.camera.pos.y), { stiffness: 0.003, damping: 0.2 }),
					z: spring(get(sceneSettings.camera.pos.z), { stiffness: 0.003, damping: 0.2 })
				}
			},
			colorPaletteIndex: spring(get(sceneSettings.colorPaletteIndex), {
				stiffness: 0.003,
				damping: 0.2,
				precision: 0.001
			}),
			railCircumference: {
				center: {
					x: spring(get(sceneSettings.railCircumference.center.x), {
						stiffness: 0.003,
						damping: 0.2
					}),
					z: spring(get(sceneSettings.railCircumference.center.z), {
						stiffness: 0.003,
						damping: 0.2
					})
				},
				radius: spring(get(sceneSettings.railCircumference.radius), {
					stiffness: 0.001,
					damping: 0.2
				})
			}
		};

		// Update every spring store when its associated raw value changes.
		storeUnsubscribers.push(
			sceneSettings.camera.pos.y.subscribe((v) => springs.camera.pos.y.set(v))
		);
		storeUnsubscribers.push(
			sceneSettings.camera.pos.z.subscribe((v) => springs.camera.pos.z.set(v))
		);
		storeUnsubscribers.push(
			sceneSettings.colorPaletteIndex.subscribe((v) => springs.colorPaletteIndex.set(v))
		);
		storeUnsubscribers.push(
			sceneSettings.railCircumference.center.x.subscribe((v) =>
				springs.railCircumference.center.x.set(v)
			)
		);
		storeUnsubscribers.push(
			sceneSettings.railCircumference.center.z.subscribe((v) =>
				springs.railCircumference.center.z.set(v)
			)
		);
		storeUnsubscribers.push(
			sceneSettings.railCircumference.radius.subscribe((v) =>
				springs.railCircumference.radius.set(v)
			)
		);

		// The values of the springs are not applied by the stores themselves. Instead, this function
		// is called every frame and it manually reads values from the stores.
		const applySpringValues = (
			camera: THREE.PerspectiveCamera,
			railCircumference: { center: THREE.Vector3; radius: number },
			colorPalette: { accentColor1: string; accentColor2: string; accentColor3: string }
		) => {
			camera.position.y = get(springs.camera.pos.y);
			camera.position.z = get(springs.camera.pos.z);

			railCircumference.center = new THREE.Vector3(
				get(springs.railCircumference.center.x),
				0,
				get(springs.railCircumference.center.z)
			);
			railCircumference.radius = get(springs.railCircumference.radius);

			const colorPaletteI = get(springs.colorPaletteIndex) / (colorPalettes.length - 1);
			colorPalette.accentColor1 = d3.piecewise(
				d3.interpolateRgb.gamma(2.2),
				colorPalettes.map((p) => p.accentColor1)
			)(colorPaletteI);
			colorPalette.accentColor2 = d3.piecewise(
				d3.interpolateRgb.gamma(2.2),
				colorPalettes.map((p) => p.accentColor2)
			)(colorPaletteI);
			colorPalette.accentColor3 = d3.piecewise(
				d3.interpolateRgb.gamma(2.2),
				colorPalettes.map((p) => p.accentColor3)
			)(colorPaletteI);
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
			polarAngleDeg: get(railCircumferencePolarAngleRad)
		};
		const positionInCircumference = (
			circumference: { center: THREE.Vector3; radius: number; polarAngleDeg: number },
			polarAngleDiplDeg: number
		) => {
			return {
				x:
					Math.cos(toRadians(circumference.polarAngleDeg + polarAngleDiplDeg)) *
						circumference.radius +
					circumference.center.x,
				z:
					Math.sin(toRadians(circumference.polarAngleDeg + polarAngleDiplDeg)) *
						circumference.radius +
					circumference.center.z
			};
		};

		const colorPalette = { ...colorPalettes[0] };

		const dioramaInstances = dioramasData.map((dioramaData, i, array) => {
			const geometry = dioramaData.geometry();
			// --- todo: make only one instance of the material
			const material = new THREE.ShaderMaterial({
				vertexShader: vertexShader,
				fragmentShader: fragmentShader,
				uniforms: {
					baseColor: { value: new THREE.Color('white') },
					baseColorShadow: { value: new THREE.Color('#C0BBB1') },
					accentColor1: { value: new THREE.Color(colorPalette.accentColor1) },
					accentColor2: { value: new THREE.Color(colorPalette.accentColor2) },
					accentColor3: { value: new THREE.Color(colorPalette.accentColor3) }
				},
				// `toneMapped: false` makes the colours match the ones in the HTML.
				toneMapped: false
			});
			const mesh = new THREE.Mesh(geometry, material);
			const ownPolarAngleDeg = lerp(0, 360, i / array.length);
			return {
				mesh,
				ownPolarAngleDeg,
				dispose: () => {
					geometry.dispose();
					material.dispose();
				}
			};
		});
		dioramaInstances.forEach(({ mesh, ownPolarAngleDeg }) => {
			scene.add(mesh);
			const pos = positionInCircumference(railCircumference, ownPolarAngleDeg);
			mesh.position.x = pos.x;
			mesh.position.z = pos.z;
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

			// Rotation.
			match(get(sceneSettings.railCircumference.polarAngleDeg)).with('KeepRotating', () => {
				railCircumferencePolarAngleRad.update((v) => {
					const newAngle = v + 0.02 * dt;
					return newAngle;
				});
			});
			const clockwise = true;
			const currentRotation = railCircumference.polarAngleDeg;
			const targetRotation = get(railCircumferencePolarAngleRad);
			let shortestAngle = (targetRotation - currentRotation + 360) % 360;
			if (shortestAngle > 360 / 2) {
				shortestAngle -= 360;
			}
			const direction = clockwise ? 1 : -1;
			const maxRotationDelta = 300; // Maximum rotation change per second.
			const rotationDelta =
				Math.min(maxRotationDelta * dt * 0.01, Math.abs(shortestAngle)) * direction;
			const dampFactor = 0.1; // Adjust damping factor as needed
			const dampedRotationDelta = rotationDelta * (1 - Math.exp(-dampFactor * dt * 0.01));
			const newRotation = (currentRotation + dampedRotationDelta + 360) % 360;
			railCircumference.polarAngleDeg = newRotation;

			applySpringValues(camera, railCircumference, colorPalette);
			dioramaInstances.forEach(({ mesh, ownPolarAngleDeg }) => {
				const pos = positionInCircumference(railCircumference, ownPolarAngleDeg);
				mesh.position.x = pos.x;
				mesh.position.z = pos.z;
				mesh.rotation.y += 0.0007 * dt;
				mesh.material.uniforms.accentColor1.value = new THREE.Color(colorPalette.accentColor1);
				mesh.material.uniforms.accentColor2.value = new THREE.Color(colorPalette.accentColor2);
				mesh.material.uniforms.accentColor3.value = new THREE.Color(colorPalette.accentColor3);
			});
			camera.lookAt(0, 0, 0);

			renderer.render(scene, camera);
		};

		resize();
		animate(previousTimeStamp);

		window.addEventListener('resize', resize);

		return {
			destroy() {
				shouldRequestNewAnimationFrame = false;
				storeUnsubscribers.forEach((unsubscribe) => unsubscribe());
				dioramaInstances.forEach(({ dispose }) => {
					dispose();
				});
				renderer.dispose();
				renderer.forceContextLoss();
			}
		};
	}
</script>

{#if mounted}
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
	@keyframes placeholder-anim {
		0% {
			right: 30%;
		}
		100% {
			right: 70%;
		}
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
