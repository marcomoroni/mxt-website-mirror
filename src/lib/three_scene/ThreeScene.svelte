<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { derived, get, writable, type Unsubscriber } from 'svelte/store';
	import { P, match } from 'ts-pattern';
	import { backgroundColor, primaryColor } from '$lib/cssValues';
	import { lerp } from '$lib/lerp';
	import { toRadians } from '$lib/angleConversions';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
	import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
	import { newTextMaterial } from './textMaterial';
	import { perpetualSmoothDampAngleAnimation, smoothDampAnimation } from '$lib/smoothDamp';
	import { newDioramaMaterial } from './dioramaMaterial';
	import { newFoliageMaterial } from './foliageMaterial';
	import { degToRad } from 'three/src/math/MathUtils.js';
	import { colorPalettes as newColorPalettes } from './colorPalettes';

	const DEV_debugLog = false;
	const FLAG_useHeaders = false;

	export let state:
		| 'home'
		| 'case-studies'
		| 'case-studies-anchor-a303'
		| 'case-studies-anchor-p2'
		| 'case-studies-anchor-p3'
		| 'case-study-a303'
		| 'case-study-p2'
		| 'case-study-p3'
		| 'services'
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
		| 'services'
		| 'contacts'
	>(state);
	$: {
		stateStore.set(state);
	}

	const headersData = FLAG_useHeaders
		? [
				{
					content: 'Case studies',
					position: { x: 0, y: 0.002, z: 20 },
					rotation: { x: -Math.PI / 2 + 0.2, y: 0, z: 0 },
					scale: 0.21
				},
				{
					content: 'Services',
					position: { x: 0, y: 3, z: 0 },
					rotation: { x: -Math.PI / 2, y: 0, z: 0 },
					scale: 0.2
				},
				{
					content: 'Contacts',
					position: { x: 0, y: 0, z: 0 },
					rotation: { x: 0, y: 0, z: 0 },
					scale: 0.2
				}
		  ]
		: [];
	const radDisplWhenAway = 5;
	const dioramasData = [
		{
			mesh: '/models/Diorama_Stonehenge.gltf',
			ambientOcclusionTextureAndHighlight: '/models/stonehenge_AO_2048.png',
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
				palette: derived(stateStore, ($s) =>
					match($s)
						.returnType<'default' | 'dim' | 'hidden'>()
						.with('case-study-p2', () => 'hidden')
						.with('case-study-p3', () => 'hidden')
						.with('case-studies-anchor-p3', () => 'dim')
						.with('case-studies-anchor-p2', () => 'dim')
						.otherwise(() => 'default')
				)
			}
		},
		{
			mesh: '/models/Investigation_Diorama.gltf',
			ambientOcclusionTextureAndHighlight: '/models/Investigation_AO_mask.png',
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
				palette: derived(stateStore, ($s) =>
					match($s)
						.returnType<'default' | 'dim' | 'hidden'>()
						.with('case-study-p3', () => 'hidden')
						.with('case-study-a303', () => 'hidden')
						.with('case-studies-anchor-a303', () => 'dim')
						.with('case-studies-anchor-p3', () => 'dim')
						.otherwise(() => 'default')
				)
			}
		},
		{
			geometry: () => new THREE.TorusKnotGeometry(1, 0.2, 300, 8, 5, 11),
			mesh: '/models/Instructor_Diorama2.gltf',
			ambientOcclusionTextureAndHighlight: '/models/Instructor_AO_mask.png',
			foliageMeshName: 'Instructor_Diorama001',
			rotationDisplacement: 120,
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
				palette: derived(stateStore, ($s) =>
					match($s)
						.returnType<'default' | 'dim' | 'hidden'>()
						.with('case-study-p2', () => 'hidden')
						.with('case-study-a303', () => 'hidden')
						.with('case-studies-anchor-a303', () => 'dim')
						.with('case-studies-anchor-p2', () => 'dim')
						.otherwise(() => 'default')
				)
			}
		}
	];
	const colorPalettes = newColorPalettes();
	const dioramaOwnPolarAngleMultWhenCaseStudyLanding = 0.5;
	const dioramaOwnPolarAngleMultWhenSmall = 0.28;
	const gltfScaleMult = 0.01;

	// Given a state, calculate all values in the 3D scene.
	// Note that I can only use simple numbers as the stores values and not objects otherwise reactivity
	// will be triggered even if the leaves o the object are the same.
	const sceneSettings = {
		camera: {
			pos: {
				y: derived(stateStore, ($s) => {
					if ($s === 'services') {
						return 30;
					} else if ($s === 'case-studies') {
						return 8;
					} else if ($s.includes('anchor')) {
						return 5;
					} else if ($s.startsWith('case-study')) {
						return 1;
					} else if ($s === 'contacts') {
						return 13;
					} else {
						return 0.2;
					}
				}),
				z: derived(stateStore, ($s) => {
					if ($s === 'services') {
						return 0.1;
					} else if ($s === 'case-studies') {
						return 37;
					} else if ($s.includes('anchor')) {
						return 20;
					} else if ($s.startsWith('case-study')) {
						return 8;
					} else if ($s === 'contacts') {
						return 18;
					} else {
						return 9;
					}
				})
			},
			lookAt: {
				y: derived(stateStore, ($s) => ($s === 'home' ? 0.7 : 0))
			}
		},
		railCircumference: {
			center: {
				x: derived(stateStore, ($s) => {
					if ($s.includes('anchor')) {
						return 16;
					} else if ($s.startsWith('case-study')) {
						return 15;
					} else if ($s === 'home') {
						return -3;
					} else {
						return 0;
					}
				}),
				z: derived(stateStore, ($s) => {
					if ($s == 'case-studies') {
						return 13;
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
				if ($s === 'services') {
					return 4.5;
				} else if ($s == 'case-studies') {
					return 8;
				} else if ($s.startsWith('case-st')) {
					return 14;
				} else {
					return 5.5;
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
					.with(
						'case-studies',
						() => (360 / 3) * 1 * dioramaOwnPolarAngleMultWhenCaseStudyLanding - 90
					)
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
				.with('case-studies', () => dioramaOwnPolarAngleMultWhenCaseStudyLanding)
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
			FLAG_useHeaders
				? match($s)
						.with('case-studies', () => [true, false, false])
						.with('services', () => [false, true, false])
						.with('contacts', () => [false, false, true])
						.otherwise(() => [false, false, false])
				: []
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

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const prefersReducedMotion = !mediaQuery || mediaQuery.matches;

		const animations = {
			camera: {
				pos: {
					y: smoothDampAnimation(get(sceneSettings.camera.pos.y), 1.1),
					z: smoothDampAnimation(get(sceneSettings.camera.pos.z), 1.1)
				},
				lookAt: {
					y: smoothDampAnimation(get(sceneSettings.camera.lookAt.y), 1.1)
				}
			},
			railCircumference: {
				center: {
					x: smoothDampAnimation(get(sceneSettings.railCircumference.center.x), 0.9),
					z: smoothDampAnimation(get(sceneSettings.railCircumference.center.z), 0.9)
				},
				radius: smoothDampAnimation(get(sceneSettings.railCircumference.radius), 0.6),
				polarAngleDegAnimatedToClosest: smoothDampAnimation(
					get(sceneSettings.railCircumference.polarAngleDegAnimatedToClosest),
					0.9
				)
			},
			dioramasOwnPolarAngleMult: smoothDampAnimation(
				get(sceneSettings.dioramasOwnPolarAngleMult),
				0.9
			)
		};

		// Update every spring store when its associated raw value changes.
		storeUnsubscribers.push(
			sceneSettings.camera.pos.y.subscribe((v) => (animations.camera.pos.y.target = v))
		);
		storeUnsubscribers.push(
			sceneSettings.camera.pos.z.subscribe((v) => (animations.camera.pos.z.target = v))
		);
		storeUnsubscribers.push(
			sceneSettings.camera.lookAt.y.subscribe((v) => (animations.camera.lookAt.y.target = v))
		);
		storeUnsubscribers.push(
			sceneSettings.railCircumference.center.x.subscribe(
				(v) => (animations.railCircumference.center.x.target = v)
			)
		);
		storeUnsubscribers.push(
			sceneSettings.railCircumference.center.z.subscribe(
				(v) => (animations.railCircumference.center.z.target = v)
			)
		);
		storeUnsubscribers.push(
			sceneSettings.railCircumference.radius.subscribe(
				(v) => (animations.railCircumference.radius.target = v)
			)
		);
		storeUnsubscribers.push(
			sceneSettings.railCircumference.polarAngleDegAnimatedToClosest.subscribe(
				(v) => (animations.railCircumference.polarAngleDegAnimatedToClosest.target = v)
			)
		);
		storeUnsubscribers.push(
			sceneSettings.dioramasOwnPolarAngleMult.subscribe(
				(v) => (animations.dioramasOwnPolarAngleMult.target = v)
			)
		);

		// The values of the animations are not applied by the stores themselves. Instead, this function
		// is called every frame and it manually reads values from the stores.
		const applyAnimationValues = (
			camera: THREE.PerspectiveCamera,
			railCircumference: { center: THREE.Vector3; radius: number }
		) => {
			camera.position.y = animations.camera.pos.y.current;
			camera.position.z = animations.camera.pos.z.current;

			railCircumference.center = new THREE.Vector3(
				animations.railCircumference.center.x.current,
				0,
				animations.railCircumference.center.z.current
			);
			railCircumference.radius = animations.railCircumference.radius.current;
		};

		const scene = new THREE.Scene();
		scene.background = new THREE.Color(backgroundColor);
		const camera = new THREE.PerspectiveCamera(
			30,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasEl });

		// Dioramas are placed in a circumference at equal distances.
		// To create the illusion of them moving around diverse dispositions animate the control points
		// of this circumference, along with the camera.
		const railCircumferencePolarAngleDegPerpetualRotationDelta = prefersReducedMotion
			? 0.0001
			: 0.004;
		const railCircumference = {
			center: new THREE.Vector3(0, 0, 0),
			radius: 4,
			polarAngleDeg: perpetualSmoothDampAngleAnimation(
				match(get(sceneSettings.railCircumference.polarAngleDegAnimatedClockwise))
					.with('KeepRotating', () => ({
						keepRotating: {
							by: railCircumferencePolarAngleDegPerpetualRotationDelta,
							initialValue: 270
						}
					}))
					.with({ At: P.select() }, (to) => ({ fixedTarget: to }))
					.exhaustive(),
				3,
				'clockwise',
				true
			)
		};
		storeUnsubscribers.push(
			sceneSettings.railCircumference.polarAngleDegAnimatedClockwise.subscribe((v) => {
				railCircumference.polarAngleDeg.state = match(v)
					.with('KeepRotating', () => ({
						keepRotatingBy: railCircumferencePolarAngleDegPerpetualRotationDelta
					}))
					.with({ At: P.select() }, (at) => ({ fixedTarget: at }))
					.exhaustive();
			})
		);
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

		const dioramaInstances = dioramasData.map((dioramaData, i, array) => {
			const storeUnsubscribers: Array<Unsubscriber> = [];

			const diormamaMaterial = newDioramaMaterial(dioramaData.ambientOcclusionTextureAndHighlight);
			diormamaMaterial.setBackgroundColor(new THREE.Color(backgroundColor));
			diormamaMaterial.setBaseColor(new THREE.Color('#E1D7D2'));
			const foliageMaterial = newFoliageMaterial();
			foliageMaterial.setBackgroundColor(new THREE.Color(backgroundColor));
			let object3D: undefined | THREE.Object3D = undefined;
			const ownPolarAngleDeg = lerp(0, 360, i / array.length);

			const loader = new GLTFLoader();
			loader.load(dioramaData.mesh, function (gltf) {
				const rootGroup = new THREE.Group();

				const rotDisplGroup = new THREE.Group();
				rotDisplGroup.rotation.y = degToRad(dioramaData.rotationDisplacement ?? 0);
				rootGroup.add(rotDisplGroup);

				const gltfScene = gltf.scene;
				gltfScene.scale.set(gltfScaleMult, gltfScaleMult, gltfScaleMult);
				gltfScene.traverseVisible((child) => {
					if (child instanceof THREE.Mesh) {
						if (child.name === dioramaData.foliageMeshName) {
							child.material = foliageMaterial.material;
						} else {
							child.material = diormamaMaterial.material;
						}

						// Tip: Do not add children to another scene or group in this loop. Doing
						// that affects the `traverseVisible` loop.
					}
				});
				rotDisplGroup.add(gltfScene);

				object3D = rootGroup;
				scene.add(object3D);
			});

			const perpetualRotationDelta = prefersReducedMotion ? 0 : 0.004;
			const rotDegAnimatedClockwiseAnim = perpetualSmoothDampAngleAnimation(
				match(get(dioramaData.sceneSettings.polarAngleDegAnimatedClockwise))
					.with('KeepRotating', () => ({
						keepRotating: {
							by: perpetualRotationDelta,
							initialValue: prefersReducedMotion ? 0 : 320
						}
					}))
					.with({ At: P.select() }, (to) => ({ fixedTarget: to }))
					.exhaustive(),
				1.6,
				'anticlockwise',
				true,
				30
			);
			storeUnsubscribers.push(
				dioramaData.sceneSettings.polarAngleDegAnimatedClockwise.subscribe((v) => {
					rotDegAnimatedClockwiseAnim.state = match(v)
						.with('KeepRotating', () => ({ keepRotatingBy: perpetualRotationDelta }))
						.with({ At: P.select() }, (at) => ({ fixedTarget: at }))
						.exhaustive();
				})
			);

			const animations = {
				radiusDispl: smoothDampAnimation(get(dioramaData.sceneSettings.radiusDispl), 1.1),
				colorPaletteIndex: smoothDampAnimation(
					colorPalettes.nameToIndex(get(dioramaData.sceneSettings.palette)),
					0.3
				)
			};
			storeUnsubscribers.push(
				dioramaData.sceneSettings.radiusDispl.subscribe((v) => (animations.radiusDispl.target = v))
			);
			storeUnsubscribers.push(
				dioramaData.sceneSettings.palette.subscribe(
					(v) => (animations.colorPaletteIndex.target = colorPalettes.nameToIndex(v))
				)
			);

			let elapsedTime = 0;
			const tick = (dt: DOMHighResTimeStamp) => {
				elapsedTime += dt * 0.00007;

				animations.radiusDispl.tick(dt);
				animations.colorPaletteIndex.tick(dt);
				rotDegAnimatedClockwiseAnim.tick(dt);

				const interpolatedColors = colorPalettes.interpolated(
					animations.colorPaletteIndex.current,
					elapsedTime
				);
				diormamaMaterial.setBaseColor(new THREE.Color(interpolatedColors.baseColor));
				diormamaMaterial.setBaseColorShadow(new THREE.Color(interpolatedColors.baseShadowColor));
				diormamaMaterial.setAccentColor1(new THREE.Color(interpolatedColors.accentColor1));
				diormamaMaterial.setAccentColor2(new THREE.Color(interpolatedColors.accentColor2));
				diormamaMaterial.setAccentColor3(new THREE.Color(interpolatedColors.accentColor3));
				diormamaMaterial.setAccentColor4(new THREE.Color(interpolatedColors.accentColor4));
				diormamaMaterial.setHighlightColor(new THREE.Color(interpolatedColors.highlightColor));
				foliageMaterial.setBaseColor(new THREE.Color(interpolatedColors.highlightColor));
			};

			return {
				get object3D() {
					return object3D;
				},
				ownPolarAngleDeg,
				rotDegAnimatedClockwiseAnim: {
					get current() {
						return rotDegAnimatedClockwiseAnim.current;
					}
				},
				get radiusDispl() {
					return animations.radiusDispl.current;
				},
				tick,
				dispose: () => {
					diormamaMaterial.dispose();
					foliageMaterial.dispose();
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
					setOpacity: setMaterialOpacity
				} = newTextMaterial(new THREE.Color(primaryColor));
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
				textMesh.position.x = headerData.position.x + centerOffset * headerData.scale;
				textMesh.position.y = headerData.position.y;
				textMesh.position.z = headerData.position.z;
				textMesh.rotation.x = headerData.rotation.x;
				textMesh.rotation.y = headerData.rotation.y;
				textMesh.rotation.z = headerData.rotation.z;
				scene.add(textMesh);

				const initialVisibility = get(sceneSettings.headerVisibility)[i] ? 1 : 0;
				const visibilityAnimation = smoothDampAnimation(initialVisibility, 0.3);
				storeUnsubscribers.push(
					sceneSettings.headerVisibility.subscribe((v) => {
						visibilityAnimation.target = v[i] ? 1 : 0;
					})
				);
				const tick = (dt: number) => {
					visibilityAnimation.tick(dt);
					setMaterialOpacity(visibilityAnimation.current);
				};

				const instance = {
					dispose: disposeMaterial,
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

			animations.camera.pos.y.tick(dt);
			animations.camera.pos.z.tick(dt);
			animations.camera.lookAt.y.tick(dt);
			animations.railCircumference.center.x.tick(dt);
			animations.railCircumference.center.z.tick(dt);
			animations.railCircumference.radius.tick(dt);
			animations.railCircumference.polarAngleDegAnimatedToClosest.tick(dt);
			animations.dioramasOwnPolarAngleMult.tick(dt);
			railCircumference.polarAngleDeg.tick(dt);

			applyAnimationValues(camera, railCircumference);
			dioramaInstances.forEach(
				({ tick, object3D, ownPolarAngleDeg, rotDegAnimatedClockwiseAnim, radiusDispl }) => {
					tick(dt);

					const pos = positionInCircumference({
						center: railCircumference.center,
						radius: railCircumference.radius + radiusDispl,
						polarAngleDeg:
							railCircumference.polarAngleDeg.current -
							ownPolarAngleDeg * animations.dioramasOwnPolarAngleMult.current +
							animations.railCircumference.polarAngleDegAnimatedToClosest.current
					});
					if (object3D) {
						object3D.position.x = pos.x;
						object3D.position.z = pos.z;
						object3D.rotation.y = toRadians(rotDegAnimatedClockwiseAnim.current);
					}
				}
			);
			headerInstances?.forEach(({ tick }) => tick(dt));
			camera.lookAt(0, animations.camera.lookAt.y.current, 0);

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
