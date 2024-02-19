<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import * as d3 from 'd3';
	import { lerp } from './lerp';
	import { spring } from 'svelte/motion';
	import { derived, get, writable, type Unsubscriber } from 'svelte/store';
	import { vertexShader } from './three_scene/vertexShader';
	import { fragmentShader } from './three_scene/fragmentShader';
	import { match } from 'ts-pattern';

	// --- todo: move this file in folder

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
		{ accentColor1: '#db8c3f', accentColor2: '#badad5', accentColor3: '#b8c26c' },
		{ accentColor1: '#EDBD6B', accentColor2: '#F5DEE4', accentColor3: '#1D5755' },
		{ accentColor1: 'cyan', accentColor2: 'cyan', accentColor3: 'cyan' },
		{ accentColor1: 'yellow', accentColor2: 'yellow', accentColor3: 'yellow' }
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
			radius: derived(stateStore, ($s) => ($s === 'studio' ? 2 : 4))
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

		const springs = {
			camera: {
				pos: {
					y: spring(get(sceneSettings.camera.pos.y), { stiffness: 0.003, damping: 0.2 }),
					z: spring(get(sceneSettings.camera.pos.z), { stiffness: 0.003, damping: 0.2 })
				}
			},
			colorPaletteIndex: spring(get(sceneSettings.colorPaletteIndex), {
				stiffness: 0.003,
				damping: 0.2
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
			polarAngleRad: 0
		};
		const positionInCircumference = (
			circumference: { center: THREE.Vector3; radius: number; polarAngleRad: number },
			polarAngleDiplRad: number
		) => {
			return {
				x:
					Math.cos(circumference.polarAngleRad + polarAngleDiplRad) * circumference.radius +
					circumference.center.x,
				z:
					Math.sin(circumference.polarAngleRad + polarAngleDiplRad) * circumference.radius +
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
			const ownPolarAngle = lerp(0, 2 * Math.PI, i / array.length);
			return {
				mesh,
				ownPolarAngle,
				dispose: () => {
					geometry.dispose();
					material.dispose();
				}
			};
		});
		dioramaInstances.forEach(({ mesh, ownPolarAngle }) => {
			scene.add(mesh);
			const pos = positionInCircumference(railCircumference, ownPolarAngle);
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

			applySpringValues(camera, railCircumference, colorPalette);
			// railCircumference.polarAngleRad += 0.0003 * dt;
			railCircumference.polarAngleRad %= 2 * Math.PI; // Normalize angle.
			dioramaInstances.forEach(({ mesh, ownPolarAngle }) => {
				const pos = positionInCircumference(railCircumference, ownPolarAngle);
				mesh.position.x = pos.x;
				mesh.position.z = pos.z;
				mesh.rotation.y += 0.0007 * dt;
				mesh.material.uniforms.accentColor1.value = new THREE.Color(colorPalette.accentColor1);
				mesh.material.uniforms.accentColor2.value = new THREE.Color(colorPalette.accentColor2);
				mesh.material.uniforms.accentColor3.value = new THREE.Color(colorPalette.accentColor3);
			});
			camera.lookAt(0, 0, 1);

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
