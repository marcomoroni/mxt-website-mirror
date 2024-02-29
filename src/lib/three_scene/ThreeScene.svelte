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
		accentColor6,
		backgroundColor,
		primaryColor
	} from '$lib/cssValues';
	import { lerp } from '$lib/lerp';
	import { toRadians } from '$lib/angleConversions';
	import { rotationAnimation } from './rotationAnimation';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
	import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
	import { newTextMaterial } from './textMaterial';
	import { smoothDamp } from '$lib/smoothDamp';

	const DEV_debugLog = false;

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

	const headersData = [
		{
			content: 'Case studies',
			scale: 0.2
		},
		{
			content: 'Studio',
			scale: 0.2
		},
		{
			content: 'Contacts',
			scale: 0.2
		}
	];
	const radDisplWhenAway = 5;
	const dioramasData = [
		{
			mesh: '/models/Diorama_Stonehenge.gltf',
			ambientOcclusionTexture: '/models/stonehenge_AO_2048.png',
			sceneSettings: {
				polarAngleDegAnimatedClockwise: derived(stateStore, ($s) =>
					match($s)
						.returnType<'KeepRotating' | { At: number }>()
						.with('case-studies-anchor-a303', () => ({ At: 0 }))
						.with('case-study-a303', () => ({ At: 0 }))
						.otherwise(() => 'KeepRotating')
				),
				radiusDispl: derived(stateStore, ($s) =>
					match($s)
						.with('case-study-p2', () => radDisplWhenAway)
						.with('case-study-p3', () => radDisplWhenAway)
						.otherwise(() => 0)
				),
				blendWithBackground: derived(stateStore, ($s) =>
					match($s)
						.with('case-study-p2', () => 1)
						.with('case-study-p3', () => 1)
						.otherwise(() => 0)
				)
			}
		},
		{
			mesh: '/models/Diorama_Stonehenge.gltf',
			ambientOcclusionTexture: '/models/stonehenge_AO_2048.png',
			sceneSettings: {
				polarAngleDegAnimatedClockwise: derived(stateStore, ($s) =>
					match($s)
						.returnType<'KeepRotating' | { At: number }>()
						.with('case-studies-anchor-p2', () => ({ At: 0 }))
						.with('case-study-p2', () => ({ At: 0 }))
						.otherwise(() => 'KeepRotating')
				),
				radiusDispl: derived(stateStore, ($s) =>
					match($s)
						.with('case-study-a303', () => radDisplWhenAway)
						.with('case-study-p3', () => radDisplWhenAway)
						.otherwise(() => 0)
				),
				blendWithBackground: derived(stateStore, ($s) =>
					match($s)
						.with('case-study-a303', () => 1)
						.with('case-study-p3', () => 1)
						.otherwise(() => 0)
				)
			}
		},
		{
			geometry: () => new THREE.TorusKnotGeometry(1, 0.2, 300, 8, 5, 11),
			mesh: '/models/Diorama_Stonehenge.gltf',
			ambientOcclusionTexture: '/models/stonehenge_AO_2048.png',
			sceneSettings: {
				polarAngleDegAnimatedClockwise: derived(stateStore, ($s) =>
					match($s)
						.returnType<'KeepRotating' | { At: number }>()
						.with('case-studies-anchor-p3', () => ({ At: 0 }))
						.with('case-study-p3', () => ({ At: 0 }))
						.otherwise(() => 'KeepRotating')
				),
				radiusDispl: derived(stateStore, ($s) =>
					match($s)
						.with('case-study-p2', () => radDisplWhenAway)
						.with('case-study-a303', () => radDisplWhenAway)
						.otherwise(() => 0)
				),
				blendWithBackground: derived(stateStore, ($s) =>
					match($s)
						.with('case-study-p2', () => 1)
						.with('case-study-a303', () => 1)
						.otherwise(() => 0)
				)
			}
		}
	];
	const colorPalettes = [
		{ accentColor1: accentColor2, accentColor2: accentColor3, accentColor3: accentColor1 },
		{ accentColor1: accentColor4, accentColor2: '#DCDAC3', accentColor3: '#BDD2D5' },
		{ accentColor1: '#CAA98B', accentColor2: '#6B796A', accentColor3: accentColor5 },
		{ accentColor1: '#CDD9C5', accentColor2: accentColor6, accentColor3: '#FFE8B0' }
	];
	const dioramaOwnPolarAngleMultWhenSmall = 0.28;
	const gltfScaleMult = 0.01;

	// Given a state, calculate all values in the 3D scene.
	// Note that I can only use simple numbers as the stores values and not objects otherwise reactivity
	// will be triggered even if the leaves o the object are the same.
	const sceneSettings = {
		camera: {
			pos: {
				y: derived(stateStore, ($s) => {
					if ($s === 'studio') {
						return 30;
					} else if ($s === 'case-studies') {
						return 5;
					} else if ($s.includes('anchor')) {
						return 5;
					} else if ($s.startsWith('case-study')) {
						return 1;
					} else if ($s === 'contacts') {
						return 0.5;
					} else {
						return 13;
					}
				}),
				z: derived(stateStore, ($s) => {
					if ($s === 'studio') {
						return 0.1;
					} else if ($s === 'case-studies') {
						return 40;
					} else if ($s.includes('anchor')) {
						return 20;
					} else if ($s.startsWith('case-study')) {
						return 8;
					} else if ($s === 'contacts') {
						return 0.1;
					} else {
						return 18;
					}
				})
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
				x: derived(stateStore, ($s) => {
					if ($s.includes('anchor')) {
						return 16;
					} else if ($s.startsWith('case-study')) {
						return 15;
					} else {
						return 0;
					}
				}),
				z: derived(stateStore, ($s) => {
					if ($s == 'case-studies') {
						return 21;
					} else if ($s.includes('anchor')) {
						return 3;
					} else if ($s.startsWith('case-study')) {
						return 1;
					} else {
						return 0;
					}
				})
			},
			radius: derived(stateStore, ($s) => {
				if ($s === 'studio') {
					return 4.5;
				} else if ($s.startsWith('case-st')) {
					return 14;
				} else {
					return 6;
				}
			}),
			// An angle animated always clockwise.
			polarAngleDegAnimatedClockwise: derived(stateStore, ($s) =>
				match($s)
					.returnType<'KeepRotating' | { At: number }>()
					.with('case-studies', () => ({ At: 180 }))
					.with('case-studies-anchor-a303', () => ({ At: 180 }))
					.with('case-studies-anchor-p2', () => ({ At: 180 }))
					.with('case-studies-anchor-p3', () => ({ At: 180 }))
					.with('case-study-a303', () => ({ At: 180 }))
					.with('case-study-p2', () => ({ At: 180 }))
					.with('case-study-p3', () => ({ At: 180 }))
					.otherwise(() => 'KeepRotating')
			),
			// A displacement added after the above. Always animated towards the closest value.
			polarAngleDegAnimatedToClosest: derived(stateStore, ($s) =>
				match($s)
					.with('case-studies', () => (360 / 3) * 1 * dioramaOwnPolarAngleMultWhenSmall - 90)
					.with('case-studies-anchor-a303', () => 0 * dioramaOwnPolarAngleMultWhenSmall)
					.with('case-studies-anchor-p2', () => (360 / 3) * 1 * dioramaOwnPolarAngleMultWhenSmall)
					.with('case-studies-anchor-p3', () => (360 / 3) * 2 * dioramaOwnPolarAngleMultWhenSmall)
					.with('case-study-a303', () => 0 * dioramaOwnPolarAngleMultWhenSmall)
					.with('case-study-p2', () => (360 / 3) * 1 * dioramaOwnPolarAngleMultWhenSmall)
					.with('case-study-p3', () => (360 / 3) * 2 * dioramaOwnPolarAngleMultWhenSmall)
					.otherwise(() => 0)
			)
		},
		dioramasOwnPolarAngleMult: derived(stateStore, ($s) =>
			match($s)
				.with('case-studies', () => dioramaOwnPolarAngleMultWhenSmall)
				.with('case-studies-anchor-a303', () => dioramaOwnPolarAngleMultWhenSmall)
				.with('case-studies-anchor-p2', () => dioramaOwnPolarAngleMultWhenSmall)
				.with('case-studies-anchor-p3', () => dioramaOwnPolarAngleMultWhenSmall)
				.with('case-study-a303', () => dioramaOwnPolarAngleMultWhenSmall)
				.with('case-study-p2', () => dioramaOwnPolarAngleMultWhenSmall)
				.with('case-study-p3', () => dioramaOwnPolarAngleMultWhenSmall)
				.otherwise(() => 1)
		),
		// Header by index.
		headerVisibility: derived(stateStore, ($s) =>
			match($s)
				.with('case-studies', () => [true, false, false])
				.with('studio', () => [false, true, false])
				.with('contacts', () => [false, false, true])
				.otherwise(() => [false, false, false])
		)
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
		const railCircumferencePolarAngleDegAnimatedClockwiseTarget = writable(
			match(get(sceneSettings.railCircumference.polarAngleDegAnimatedClockwise))
				// Use this value as a starting one so that it less likely that you'll have to make a
				// full circle animation when navigating to the case studies page.
				.with('KeepRotating', () => 180)
				.with({ At: P.select() }, (to) => to)
				.exhaustive()
		);
		storeUnsubscribers.push(
			sceneSettings.railCircumference.polarAngleDegAnimatedClockwise.subscribe((v) => {
				railCircumferencePolarAngleDegAnimatedClockwiseTarget.update((currentAngle) =>
					match(v)
						.with('KeepRotating', () => currentAngle)
						.with({ At: P.select() }, (to) => to)
						.exhaustive()
				);
			})
		);

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
				}),
				polarAngleDegAnimatedToClosest: spring(
					get(sceneSettings.railCircumference.polarAngleDegAnimatedToClosest),
					{
						stiffness: 0.003,
						damping: 0.2,
						precision: 0.001
					}
				)
			},
			dioramasOwnPolarAngleMult: spring(get(sceneSettings.dioramasOwnPolarAngleMult), {
				stiffness: 0.003,
				damping: 0.2,
				precision: 0.001
			})
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
		storeUnsubscribers.push(
			sceneSettings.railCircumference.polarAngleDegAnimatedToClosest.subscribe((v) =>
				springs.railCircumference.polarAngleDegAnimatedToClosest.set(v)
			)
		);
		storeUnsubscribers.push(
			sceneSettings.dioramasOwnPolarAngleMult.subscribe((v) =>
				springs.dioramasOwnPolarAngleMult.set(v)
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
			30,
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
			polarAngleDeg: rotationAnimation(
				get(railCircumferencePolarAngleDegAnimatedClockwiseTarget),
				true,
				500
			)
		};
		const positionInCircumference = (circumference: {
			center: THREE.Vector3;
			radius: number;
			polarAngleDeg: number;
		}) => {
			return {
				x:
					Math.cos(toRadians(-circumference.polarAngleDeg)) * circumference.radius +
					circumference.center.x,
				z:
					Math.sin(toRadians(-circumference.polarAngleDeg)) * circumference.radius +
					circumference.center.z
			};
		};

		const colorPalette = { ...colorPalettes[0] };

		const dioramaInstances = dioramasData.map((dioramaData, i, array) => {
			const storeUnsubscribers: Array<Unsubscriber> = [];

			const material = new THREE.ShaderMaterial({
				vertexShader: vertexShader,
				fragmentShader: fragmentShader,
				uniforms: {
					backgroundColor: { value: new THREE.Color(backgroundColor) },
					blendWithBackground: { value: 0 },
					baseColor: { value: new THREE.Color(backgroundColor) },
					baseColorShadow: { value: new THREE.Color('#C0BBB1') },
					accentColor1: { value: new THREE.Color(colorPalette.accentColor1) },
					accentColor2: { value: new THREE.Color(colorPalette.accentColor2) },
					accentColor3: { value: new THREE.Color(colorPalette.accentColor3) },
					tAmbientOcclusion: {
						value: new THREE.TextureLoader().load(dioramaData.ambientOcclusionTexture)
					}
				},
				// `toneMapped: false` makes the colours match the ones in the HTML.
				toneMapped: false
			});
			let mesh: undefined | THREE.Mesh = undefined;
			const ownPolarAngleDeg = lerp(0, 360, i / array.length);

			const loader = new GLTFLoader();
			loader.load(dioramaData.mesh, function (gltf) {
				for (const child of gltf.scene.children) {
					child.traverseVisible((child) => {
						if (child instanceof THREE.Mesh) {
							mesh = child;
							mesh.scale.set(gltfScaleMult, gltfScaleMult, gltfScaleMult);
							child.material = material;
						}

						scene.add(child);
					});
				}
			});

			// A store that can be updated every frame when there is a continuous rotation.
			const rotDegAnimatedClockwiseTarget = writable(
				match(get(dioramaData.sceneSettings.polarAngleDegAnimatedClockwise))
					.with('KeepRotating', () => 0)
					.with({ At: P.select() }, (to) => to)
					.exhaustive()
			);
			storeUnsubscribers.push(
				dioramaData.sceneSettings.polarAngleDegAnimatedClockwise.subscribe((v) => {
					rotDegAnimatedClockwiseTarget.update((currentAngle) =>
						match(v)
							.with('KeepRotating', () => currentAngle)
							.with({ At: P.select() }, (to) => to)
							.exhaustive()
					);
				})
			);
			const rotDegAnimatedClockwiseAnim = rotationAnimation(
				get(rotDegAnimatedClockwiseTarget),
				false,
				200
			);

			const springs = {
				radiusDispl: spring(get(dioramaData.sceneSettings.radiusDispl), {
					stiffness: 0.001,
					damping: 0.2
				}),
				blendWithBackground: spring(get(dioramaData.sceneSettings.blendWithBackground), {
					stiffness: 0.006,
					damping: 0.2,
					precision: 0.001
				})
			};
			storeUnsubscribers.push(
				dioramaData.sceneSettings.radiusDispl.subscribe((v) => springs.radiusDispl.set(v))
			);
			storeUnsubscribers.push(
				dioramaData.sceneSettings.blendWithBackground.subscribe((v) =>
					springs.blendWithBackground.set(v)
				)
			);

			storeUnsubscribers.push(
				springs.blendWithBackground.subscribe((v) => {
					material.uniforms.blendWithBackground.value = v;
				})
			);

			return {
				get mesh() {
					return mesh;
				},
				material,
				ownPolarAngleDeg,
				rotDegAnimatedClockwiseTarget,
				rotDegAnimatedClockwiseAnim,
				sceneSettings: dioramaData.sceneSettings,
				get radiusDispl() {
					return get(springs.radiusDispl);
				},
				dispose: () => {
					material.dispose();
					storeUnsubscribers.forEach((unsubscribe) => unsubscribe());
				}
			};
		});

		let headerInstances: undefined | Array<{ dispose: () => void; tick: (dt: number) => void }> =
			undefined;
		new FontLoader().load('/fontsJson/Figtree_Freeze.json', function (font) {
			headersData.forEach((headerData, i) => {
				const {
					material,
					dispose: disposeMaterial,
					setColor: setMaterialColor
				} = newTextMaterial();
				const textGeometry = new TextGeometry(headerData.content, {
					font: font,
					size: 4,
					height: 0.2
				});
				const textMesh = new THREE.Mesh(textGeometry, [
					material, // Front.
					material // Side.
				]);
				textMesh.scale.set(headerData.scale, headerData.scale, headerData.scale);
				textGeometry.computeBoundingBox();
				const centerOffset =
					-0.5 * (textGeometry.boundingBox!.max.x - textGeometry.boundingBox!.min.x);
				textMesh.position.x = centerOffset * headerData.scale;
				scene.add(textMesh);

				const initialVisibility = get(sceneSettings.headerVisibility)[i] ? 1 : 0;
				const visibility = {
					target: initialVisibility,
					current: initialVisibility,
					velocity: 0
				};
				storeUnsubscribers.push(
					sceneSettings.headerVisibility.subscribe((v) => {
						visibility.target = v[i] ? 1 : 0;
					})
				);

				const tick = (dt: number) => {
					const smoothDampResult = smoothDamp(
						visibility.current,
						visibility.target,
						visibility.velocity,
						0.3,
						dt
					);
					visibility.velocity = smoothDampResult.currentVelocity;
					visibility.current = smoothDampResult.output;
					const color = d3.interpolateRgb(backgroundColor, primaryColor)(visibility.current);
					setMaterialColor(color);
				};

				const instance = {
					dispose: disposeMaterial,
					setColor: setMaterialColor,
					tick
				};
				if (headerInstances) {
					headerInstances.push(instance);
				} else {
					headerInstances = [instance];
				}
			});
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
			match(get(sceneSettings.railCircumference.polarAngleDegAnimatedClockwise)).with(
				'KeepRotating',
				() => {
					railCircumferencePolarAngleDegAnimatedClockwiseTarget.update((v) => v + 0.01 * dt);
				}
			);
			railCircumference.polarAngleDeg.setTargetRotation(
				get(railCircumferencePolarAngleDegAnimatedClockwiseTarget)
			);
			railCircumference.polarAngleDeg.tick(dt);

			applySpringValues(camera, railCircumference, colorPalette);
			dioramaInstances.forEach(
				({
					mesh,
					material,
					ownPolarAngleDeg,
					rotDegAnimatedClockwiseTarget,
					rotDegAnimatedClockwiseAnim,
					radiusDispl,
					sceneSettings: dioramaSceneSettings
				}) => {
					match(get(dioramaSceneSettings.polarAngleDegAnimatedClockwise)).with(
						'KeepRotating',
						() => {
							rotDegAnimatedClockwiseTarget.update((v) => v - 0.012 * dt);
						}
					);
					rotDegAnimatedClockwiseAnim.setTargetRotation(get(rotDegAnimatedClockwiseTarget));
					rotDegAnimatedClockwiseAnim.tick(dt);
					const pos = positionInCircumference({
						center: railCircumference.center,
						radius: railCircumference.radius + radiusDispl,
						polarAngleDeg:
							railCircumference.polarAngleDeg.rotation -
							ownPolarAngleDeg * get(springs.dioramasOwnPolarAngleMult) +
							get(springs.railCircumference.polarAngleDegAnimatedToClosest)
					});
					if (mesh) {
						mesh.position.x = pos.x;
						mesh.position.z = pos.z;
						mesh.rotation.y = toRadians(rotDegAnimatedClockwiseAnim.rotation);
					}
					material.uniforms.accentColor1.value = new THREE.Color(colorPalette.accentColor1);
					material.uniforms.accentColor2.value = new THREE.Color(colorPalette.accentColor2);
					material.uniforms.accentColor3.value = new THREE.Color(colorPalette.accentColor3);
				}
			);
			headerInstances?.forEach(({ tick }) => tick(dt * 0.001));
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
				dioramaInstances.forEach(({ dispose }) => dispose());
				headerInstances?.forEach(({ dispose }) => dispose());
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
