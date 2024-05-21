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
	import {
		perpetualSmoothDampAngleAnimation,
		smoothDampAnimation,
		smoothDampColorAnimation
	} from '$lib/smoothDamp';
	import { newDioramaMaterial } from './dioramaMaterial';
	import { newFoliageMaterial } from './foliageMaterial';
	import { degToRad } from 'three/src/math/MathUtils.js';
	import {
		dioramaColorPalettes as newDioramaColorPalettes,
		type PaletteName
	} from './dioramaColorPalettes';
	import { prefersReducedMotion } from '$lib/prefersReducedMotion';
	import { servicesPropsVisibilityAnimation } from './servicesPropsVisibilityAnimation';
	import { newServicesPropMaterial } from './servicesPropMaterial';
	import { accentColorsFromNoise } from './accentColorFromNoise';
	import * as d3 from 'd3';
	import { accentColourInServicesProps as accentColourInServicesPropsStore } from './threeStateStores';

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
		| 'service-1'
		| 'service-2'
		| 'service-3'
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
		| 'service-1'
		| 'service-2'
		| 'service-3'
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
						.returnType<PaletteName>()
						.with('case-study-p2', () => 'hidden')
						.with('case-study-p3', () => 'hidden')
						.with('case-studies-anchor-p3', () => 'dim')
						.with('case-studies-anchor-p2', () => 'dim')
						.with('service-1', () => 'service-1')
						.with('service-2', () => 'service-2')
						.with('service-3', () => 'service-3')
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
						.returnType<PaletteName>()
						.with('case-study-p3', () => 'hidden')
						.with('case-study-a303', () => 'hidden')
						.with('case-studies-anchor-a303', () => 'dim')
						.with('case-studies-anchor-p3', () => 'dim')
						.with('service-1', () => 'service-1')
						.with('service-2', () => 'service-2')
						.with('service-3', () => 'service-3')
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
						.returnType<PaletteName>()
						.with('case-study-p2', () => 'hidden')
						.with('case-study-a303', () => 'hidden')
						.with('case-studies-anchor-a303', () => 'dim')
						.with('case-studies-anchor-p2', () => 'dim')
						.with('service-1', () => 'service-1')
						.with('service-2', () => 'service-2')
						.with('service-3', () => 'service-3')
						.otherwise(() => 'default')
				)
			}
		}
	];
	const digitalInfrastructurePosY = 10;
	const servicesPropsData = [
		{
			baseColor: (accentColor: string) => accentColor,
			highlightColor: 'white',
			aoColor: 'black',
			backgroundColor: (accentColor: string) => accentColor,
			meshes: [
				{
					mesh: '/models/DigitalInfrastructure.gltf',
					ambientOcclusionTextureAndHighlight: '/models/DigitalInfrastructure_CADTexture.png',
					rotationDisplacement: () => new THREE.Vector3(0, 0, 0),
					positionDisplacement: () => new THREE.Vector3(0, digitalInfrastructurePosY, 0)
				},
				...[0, 1, 2].map((i) => ({
					mesh: '/models/CAD_Lines.gltf',
					ambientOcclusionTextureAndHighlight: '/models/DigitalInfrastructure_CADTexture.png',
					rotationDisplacement: () => new THREE.Vector3(0, 0, 0),
					positionDisplacement: (dioramaPositions: Array<{ x: number; z: number }>) =>
						new THREE.Vector3(
							dioramaPositions[i].x,
							digitalInfrastructurePosY - 0.2,
							dioramaPositions[i].z
						)
				}))
			]
		},
		{
			baseColor: (accentColor: string) => accentColor,
			highlightColor: 'white',
			aoColor: '#8B5725',
			backgroundColor: undefined,
			meshes: [
				{
					mesh: '/models/Research.gltf',
					ambientOcclusionTextureAndHighlight: '/models/Research_AO.png',
					rotationDisplacement: () => new THREE.Vector3(0, 280, 0),
					positionDisplacement: () => new THREE.Vector3(-2, 20, 1.5)
				}
			]
		},
		{
			baseColor: (accentColor: string) => accentColor,
			highlightColor: 'white',
			aoColor: '#4E7B74',
			backgroundColor: (_accentColor: string) => 'white',
			meshes: [
				{
					mesh: '/models/LearnAndDev.gltf',
					ambientOcclusionTextureAndHighlight: '/models/LearnAndDev_AO.png',
					rotationDisplacement: () => new THREE.Vector3(0, 270, 90),
					positionDisplacement: () => new THREE.Vector3(0, 8, 9)
				}
			]
		}
	];
	const colorPalettes = newDioramaColorPalettes();
	const colorAnimationSmoothTime = 0.9;
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
					} else if ($s === 'service-1') {
						return 45;
					} else if ($s === 'service-2') {
						return 51;
					} else if ($s === 'service-3') {
						return 58;
					} else if ($s === 'case-studies') {
						return 7;
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
					} else if ($s === 'service-1') {
						return 0.1;
					} else if ($s === 'service-2') {
						return 5;
					} else if ($s === 'service-3') {
						return 2;
					} else if ($s === 'case-studies') {
						return 32;
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
						return 10;
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
				if ($s.startsWith('service')) {
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
		servicesProps: derived(stateStore, ($s) =>
			match($s)
				.returnType<number | undefined>()
				.with('service-1', () => 0)
				.with('service-2', () => 1)
				.with('service-3', () => 2)
				.otherwise(() => undefined)
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
			),
			servicesProps: servicesPropsVisibilityAnimation(
				get(sceneSettings.servicesProps),
				servicesPropsData.length
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
		storeUnsubscribers.push(
			sceneSettings.servicesProps.subscribe((v) => animations.servicesProps.setVisibleItem(v))
		);

		const accentColourForServicesProps = (() => {
			let elapsedTime = 0;
			let currentAccentColor = 'magenta';
			const tick = (dt: DOMHighResTimeStamp) => {
				elapsedTime += dt * 0.00002;
				currentAccentColor = accentColorsFromNoise.accentColorForServicesProps(elapsedTime);
			};
			return {
				tick,
				get current() {
					return currentAccentColor;
				}
			};
		})();

		const animatedBackgroundColor = (
			defaultBackgroundColor: string,
			accentColor: string,
			getServicesPropsVisibility: (itemIndex: number) => {
				backgroundVisibility: number;
			}
		) => {
			return servicesPropsData.reduce(
				(highest, current, i) => {
					const backgroundVisibility = getServicesPropsVisibility(i).backgroundVisibility;
					if (backgroundVisibility > highest.visibility) {
						const modifiedBackgroundColor = current.backgroundColor
							? d3.interpolateLab(
									backgroundColor,
									current.backgroundColor(accentColor)
							  )(backgroundVisibility)
							: defaultBackgroundColor;
						return {
							backgroundColor: modifiedBackgroundColor,
							visibility: backgroundVisibility
						};
					} else {
						return highest;
					}
				},
				{
					backgroundColor: defaultBackgroundColor,
					visibility: 0
				}
			).backgroundColor;
		};

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
		const railCircumferencePolarAngleDegPerpetualRotationDelta = prefersReducedMotion()
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

			const perpetualRotationDelta = prefersReducedMotion() ? 0 : 0.004;
			const rotDegAnimatedClockwiseAnim = perpetualSmoothDampAngleAnimation(
				match(get(dioramaData.sceneSettings.polarAngleDegAnimatedClockwise))
					.with('KeepRotating', () => ({
						keepRotating: {
							by: perpetualRotationDelta,
							initialValue: prefersReducedMotion() ? 0 : 320
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

			let elapsedTime = 0;

			const accentColorColouredNoiseInterpSmoothTime = 0.8;
			const initialPalette = colorPalettes.getPalette(get(dioramaData.sceneSettings.palette));
			const animations = {
				radiusDispl: smoothDampAnimation(get(dioramaData.sceneSettings.radiusDispl), 1.1),
				baseColor: smoothDampColorAnimation(initialPalette.baseColor, colorAnimationSmoothTime),
				baseColorShadow: smoothDampColorAnimation(
					initialPalette.baseShadowColor,
					colorAnimationSmoothTime
				),
				accentColor1: smoothDampColorAnimation(
					initialPalette.accentColor1,
					colorAnimationSmoothTime
				),
				accentColor2: smoothDampColorAnimation(
					initialPalette.accentColor2,
					colorAnimationSmoothTime
				),
				accentColor3: smoothDampColorAnimation(
					initialPalette.accentColor3,
					colorAnimationSmoothTime
				),
				accentColor4: smoothDampColorAnimation(
					initialPalette.accentColor4,
					colorAnimationSmoothTime
				),
				accentColor1ColouredNoiseInterp: smoothDampAnimation(
					initialPalette.accentColor1 === 'ColouredNoise' ? 1 : 0,
					accentColorColouredNoiseInterpSmoothTime
				),
				accentColor2ColouredNoiseInterp: smoothDampAnimation(
					initialPalette.accentColor2 === 'ColouredNoise' ? 1 : 0,
					accentColorColouredNoiseInterpSmoothTime
				),
				accentColor3ColouredNoiseInterp: smoothDampAnimation(
					initialPalette.accentColor3 === 'ColouredNoise' ? 1 : 0,
					accentColorColouredNoiseInterpSmoothTime
				),
				accentColor4ColouredNoiseInterp: smoothDampAnimation(
					initialPalette.accentColor4 === 'ColouredNoise' ? 1 : 0,
					accentColorColouredNoiseInterpSmoothTime
				),
				highlightColor: smoothDampColorAnimation(
					initialPalette.highlightColor,
					colorAnimationSmoothTime
				)
			};
			storeUnsubscribers.push(
				dioramaData.sceneSettings.radiusDispl.subscribe((v) => (animations.radiusDispl.target = v))
			);
			storeUnsubscribers.push(
				dioramaData.sceneSettings.palette.subscribe((v) => {
					const palette = colorPalettes.getPalette(v);
					animations.baseColor.target = palette.baseColor;
					animations.baseColorShadow.target = palette.baseShadowColor;
					animations.accentColor1.target =
						palette.accentColor1 === 'ColouredNoise'
							? palette.baseShadowColor
							: palette.accentColor1;
					animations.accentColor2.target =
						palette.accentColor2 === 'ColouredNoise'
							? palette.baseShadowColor
							: palette.accentColor2;
					animations.accentColor3.target =
						palette.accentColor3 === 'ColouredNoise'
							? palette.baseShadowColor
							: palette.accentColor3;
					animations.accentColor4.target =
						palette.accentColor4 === 'ColouredNoise'
							? palette.baseShadowColor
							: palette.accentColor4;
					animations.accentColor1ColouredNoiseInterp.target =
						palette.accentColor1 === 'ColouredNoise' ? 1 : 0;
					animations.accentColor2ColouredNoiseInterp.target =
						palette.accentColor2 === 'ColouredNoise' ? 1 : 0;
					animations.accentColor3ColouredNoiseInterp.target =
						palette.accentColor3 === 'ColouredNoise' ? 1 : 0;
					animations.accentColor4ColouredNoiseInterp.target =
						palette.accentColor4 === 'ColouredNoise' ? 1 : 0;
					animations.highlightColor.target = palette.highlightColor;
				})
			);

			const tick = (dt: DOMHighResTimeStamp, backgroundColor: string) => {
				elapsedTime += dt * 0.00007;

				animations.radiusDispl.tick(dt);
				animations.baseColor.tick(dt);
				animations.baseColorShadow.tick(dt);
				animations.accentColor1.tick(dt);
				animations.accentColor2.tick(dt);
				animations.accentColor3.tick(dt);
				animations.accentColor4.tick(dt);
				animations.accentColor1ColouredNoiseInterp.tick(dt);
				animations.accentColor2ColouredNoiseInterp.tick(dt);
				animations.accentColor3ColouredNoiseInterp.tick(dt);
				animations.accentColor4ColouredNoiseInterp.tick(dt);
				animations.highlightColor.tick(dt);
				rotDegAnimatedClockwiseAnim.tick(dt);

				const accentColor1 = d3.interpolateLab(
					animations.accentColor1.current,
					accentColorsFromNoise.accentColor1(elapsedTime)
				)(animations.accentColor1ColouredNoiseInterp.current);
				const accentColor2 = d3.interpolateLab(
					animations.accentColor2.current,
					accentColorsFromNoise.accentColor2(elapsedTime)
				)(animations.accentColor2ColouredNoiseInterp.current);
				const accentColor3 = d3.interpolateLab(
					animations.accentColor3.current,
					accentColorsFromNoise.accentColor3(elapsedTime)
				)(animations.accentColor3ColouredNoiseInterp.current);
				const accentColor4 = d3.interpolateLab(
					animations.accentColor4.current,
					accentColorsFromNoise.accentColor4(elapsedTime)
				)(animations.accentColor4ColouredNoiseInterp.current);

				diormamaMaterial.setBackgroundColor(new THREE.Color(backgroundColor));
				diormamaMaterial.setBaseColor(new THREE.Color(animations.baseColor.current)); // wrong: should use background colour, in an additional layer
				diormamaMaterial.setBaseColorShadow(new THREE.Color(animations.baseColorShadow.current));
				diormamaMaterial.setAccentColor1(new THREE.Color(accentColor1));
				diormamaMaterial.setAccentColor2(new THREE.Color(accentColor2));
				diormamaMaterial.setAccentColor3(new THREE.Color(accentColor3));
				diormamaMaterial.setAccentColor4(new THREE.Color(accentColor4));
				diormamaMaterial.setHighlightColor(new THREE.Color(animations.highlightColor.current));
				foliageMaterial.setBaseColor(new THREE.Color(animations.highlightColor.current));
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

		const servicesPropInstances = servicesPropsData.map((data, i) => {
			const meshInstances = data.meshes.reduce(
				(
					acc,
					{ mesh, ambientOcclusionTextureAndHighlight, positionDisplacement, rotationDisplacement }
				) => {
					const baseMaterial = newServicesPropMaterial(ambientOcclusionTextureAndHighlight);
					baseMaterial.setMockBackgroundColor(new THREE.Color(backgroundColor));
					baseMaterial.setHighlightColor(new THREE.Color(data.highlightColor));
					baseMaterial.setBaseColorShadow(new THREE.Color(data.aoColor));
					let displamentPivot: undefined | THREE.Object3D = undefined;
					const loader = new GLTFLoader();
					loader.load(mesh, function (gltf) {
						const rootGroup = new THREE.Group();

						const transformDisplGroup = new THREE.Group();
						rootGroup.add(transformDisplGroup);

						const gltfScene = gltf.scene;
						gltfScene.scale.set(gltfScaleMult, gltfScaleMult, gltfScaleMult);
						gltfScene.traverseVisible((child) => {
							if (child instanceof THREE.Mesh) {
								child.material = baseMaterial.material;
							}
						});
						transformDisplGroup.add(gltfScene);

						scene.add(rootGroup);

						displamentPivot = transformDisplGroup;
					});

					const tick = (
						meshVisibility: number,
						backgroundVisibility: number,
						accentColor: string,
						dioramaPositions: Array<{ x: number; z: number }>
					) => {
						const modifiedBaseColor = d3.interpolateLab(
							backgroundColor,
							data.baseColor(accentColor)
						)(backgroundVisibility);

						// Hack: there's some z sorting issues which make some transpasparent objects clip others even
						// when they are not visible. To solve this I'm focing the object to not be visible if the opacity
						// is almost 0.
						baseMaterial.setVisibility(meshVisibility >= 0.001);

						baseMaterial.setOpacity(meshVisibility);
						// baseMaterial.setBaseColor(new THREE.Color(data.baseColor(accentColor)));
						baseMaterial.setBaseColor(new THREE.Color(modifiedBaseColor));

						if (displamentPivot) {
							const posDispl = positionDisplacement
								? positionDisplacement(dioramaPositions)
								: new THREE.Vector3(0, 0, 0);
							displamentPivot.position.x = posDispl.x;
							displamentPivot.position.y = posDispl.y;
							displamentPivot.position.z = posDispl.z;
							const rotDispl = rotationDisplacement
								? rotationDisplacement()
								: new THREE.Vector3(0, 0, 0);
							displamentPivot.rotation.x = degToRad(rotDispl.x);
							displamentPivot.rotation.y = degToRad(rotDispl.y);
							displamentPivot.rotation.z = degToRad(rotDispl.z);
						}
					};

					const dispose = () => {
						baseMaterial.dispose();
					};

					return {
						tickAccumulator: [...acc.tickAccumulator, tick],
						disposeAccumulator: [...acc.disposeAccumulator, dispose]
					};
				},
				{
					tickAccumulator: [] as Array<
						(
							meshVisibility: number,
							backgroundVisibility: number,
							accentColor: string,
							dioramaPositions: Array<{ x: number; z: number }>
						) => void
					>,
					disposeAccumulator: [] as Array<() => void>
				}
			);

			const tick = (accentColor: string, dioramaPositions: Array<{ x: number; z: number }>) => {
				const { meshVisibility, backgroundVisibility } = animations.servicesProps.getVisibility(i);
				meshInstances.tickAccumulator.forEach((tick) =>
					tick(meshVisibility, backgroundVisibility, accentColor, dioramaPositions)
				);
			};

			const dispose = () => {
				meshInstances.disposeAccumulator.forEach((dispose) => dispose());
			};

			return {
				tick,
				dispose
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
		let animationFrameRequest: undefined | number = undefined;
		const animate = (timeStamp: DOMHighResTimeStamp) => {
			const dt = timeStamp - previousTimeStamp;
			previousTimeStamp = timeStamp;
			animationFrameRequest = requestAnimationFrame(animate);

			animations.camera.pos.y.tick(dt);
			animations.camera.pos.z.tick(dt);
			animations.camera.lookAt.y.tick(dt);
			animations.railCircumference.center.x.tick(dt);
			animations.railCircumference.center.z.tick(dt);
			animations.railCircumference.radius.tick(dt);
			animations.railCircumference.polarAngleDegAnimatedToClosest.tick(dt);
			animations.dioramasOwnPolarAngleMult.tick(dt);
			animations.servicesProps.tick(dt);
			railCircumference.polarAngleDeg.tick(dt);
			accentColourForServicesProps.tick(dt);

			const backgroundColor_ = animatedBackgroundColor(
				backgroundColor,
				accentColourForServicesProps.current,
				animations.servicesProps.getVisibility
			);

			applyAnimationValues(camera, railCircumference);
			const dioramaPositions: Array<{ x: number; z: number }> = [];
			dioramaInstances.forEach(
				({ tick, object3D, ownPolarAngleDeg, rotDegAnimatedClockwiseAnim, radiusDispl }) => {
					tick(dt, backgroundColor_);

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
					dioramaPositions.push(pos);
				}
			);
			servicesPropInstances.forEach(({ tick }) =>
				tick(accentColourForServicesProps.current, dioramaPositions)
			);
			headerInstances?.forEach(({ tick }) => tick(dt));
			camera.lookAt(0, animations.camera.lookAt.y.current, 0);
			scene.background = new THREE.Color(backgroundColor_);

			accentColourInServicesPropsStore.set(accentColourForServicesProps.current);

			renderer.render(scene, camera);
		};

		resize();
		animate(previousTimeStamp);

		window.addEventListener('resize', resize);

		return {
			destroy() {
				if (animationFrameRequest !== undefined) {
					cancelAnimationFrame(animationFrameRequest);
				}
				storeUnsubscribers.forEach((unsubscribe) => unsubscribe());
				dioramaInstances.forEach(({ dispose }) => dispose());
				servicesPropInstances.forEach(({ dispose }) => dispose());
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
