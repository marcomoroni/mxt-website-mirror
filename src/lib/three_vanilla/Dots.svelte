<script lang="ts">
	// Based on https://github.com/mrdoob/three.js/blob/master/examples/webgl_points_waves.html

	import { createEventDispatcher } from 'svelte';
	import * as THREE from 'three';
	import { noise3D } from './shader_utils/noise-3d';
	import { map } from './shader_utils/map';
	import { quarticInOut } from './shader_utils/quartic-in-out';
	import { get } from 'svelte/store';
	import { colors } from '$lib/dotsEffectData';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
	import { lerp } from '$lib/utils/lerp';
	import { dotsAnimationController, type Scenario } from '$lib/dotsAnimController';
	import type { Unsubscriber } from 'svelte/motion';

	const gltfScaleMult = 1000;

	const AMOUNTX = 200,
		AMOUNTY = 200;

	const dispatch = createEventDispatcher();

	const modelVertices: Map<string, { vertices: () => Float32Array }> = new Map([
		['stonehenge', { vertices: () => new Float32Array() }]
	]);

	const mountedAnimationControllerHandle = Symbol();
	const dotsReadyAnimationControllerHandle = Symbol();
	const stonehengeDotVerticesHandle = Symbol();
	const stonehengeShadedModelHandle = Symbol();
	const animationController = dotsAnimationController(
		[
			dotsReadyAnimationControllerHandle,
			mountedAnimationControllerHandle,
			stonehengeDotVerticesHandle,
			stonehengeShadedModelHandle
		],
		{ x: AMOUNTX, y: AMOUNTY },
		modelVertices
	);

	export let scenario: undefined | Scenario;
	$: {
		if (scenario) {
			animationController.update(scenario);
		}
	}

	const vertexShader = `
uniform float time;
uniform float animRadius;
uniform float animVisibility;
uniform float animFitModel;
uniform float animFixedScale;
uniform float animVisibilityWhenFitModel;
attribute vec2 dotIndex;
attribute float distanceFromCenter;
attribute vec3 modelPosition;
out float vAnim;
out vec2 vDotIndex;
out float vScale;

const float rippleAnim1Fade = 2800.0;
const float rippleAnim2DistFromAnim1 = 600.0;
const float rippleAnim2Fade = 4700.0;

const vec2 posXNoiseStartPos = vec2(3.0, -6.0);
const vec2 posYNoiseStartPos = vec2(80.0, -30.0);
const float posNoiseScale = 0.03;
const float posNoiseTimeMult = 0.00006;
const float posNoiseMult = 900.0;

const vec2 scaleNoiseStartPos = vec2(0.0, 0.0);
const float scaleNoiseScale = 0.03;
const float scaleNoiseTimeMult = 0.0003;
const float scaleNoiseMult = 18.0;

const float scaleWhenFitModel = 8.0;

${noise3D}

${map}

${quarticInOut}

void main() {

	float rippleAnim1 = clamp(map( distanceFromCenter - animRadius, 0.0, -rippleAnim1Fade, 0.0, 1.0), 0.0, 1.0); // 0 to 1
	rippleAnim1 = quarticInOut(rippleAnim1);
	float rippleAnim2 = clamp(map( (distanceFromCenter - animRadius) + rippleAnim2DistFromAnim1 , 0.0, -rippleAnim2Fade, 0.0, 1.0), 0.0, 1.0); // 0 to 1
	rippleAnim2 = quarticInOut(rippleAnim2);

	float posXNoise = cnoise(vec3(dotIndex.r * posNoiseScale + posXNoiseStartPos.r, dotIndex.g * posNoiseScale + posXNoiseStartPos.g, time * posNoiseTimeMult));
	float posYNoise = cnoise(vec3(dotIndex.r * posNoiseScale + posYNoiseStartPos.r, dotIndex.g * posNoiseScale + posYNoiseStartPos.g, time * posNoiseTimeMult));
	float posX = position.r + mix(0.0, posXNoise * posNoiseMult, rippleAnim2);
	float posY = position.g + mix(0.0, posYNoise * posNoiseMult, rippleAnim2);
	float posZ = position.b;
	vec3 pos = vec3( posX, posY, posZ );

	pos = mix(pos, modelPosition, animFitModel);

	vec4 mvPosition = modelViewMatrix * vec4( pos.r, pos.g, pos.b, 1.0 );

	float scaleNoise = cnoise(vec3(dotIndex.r * scaleNoiseScale + scaleNoiseStartPos.r, dotIndex.g * scaleNoiseScale + scaleNoiseStartPos.g, time * scaleNoiseTimeMult));
	scaleNoise = map(scaleNoise, -1.0, 1.0, -0.4, 1.0);
	float scale = mix(150.0, scaleNoise * scaleNoiseMult, rippleAnim1);
	scale = mix(scale, scaleWhenFitModel, animFixedScale);
	scale = scale * animVisibility * animVisibilityWhenFitModel;
	// scale = scale * animVisibility; // --- temp

	gl_PointSize = scale;

	gl_Position = projectionMatrix * mvPosition;

	vAnim = rippleAnim1;
	vDotIndex = dotIndex;
	vScale = scale;
}
	`;

	const fragmentShader = `
uniform float time;
uniform float animRadius;
uniform float animAccentColors;
uniform vec3 baseColor;
uniform vec3 accentColor1;
uniform vec3 accentColor2;
uniform vec3 accentColor3;
uniform vec3 accentColor4;
in vec2 vDotIndex;
in float vAnim;
in float vScale;

const float colorNoiseScale = 0.04;
// Before .r use the first colour, between .r and .g fade, and after .g use second colour.
const vec2 colorGradientRange = vec2(0.4, 0.6);

${noise3D}

${map}

vec3 addColor(vec3 initialColor, vec3 otherColor, vec2 noiseStartPos, float noiseScale, float noiseTimeMult, vec2 dotIndex, vec2 colorGradientRange, float apply) {
	float noise = cnoise(vec3(dotIndex.r * noiseScale + noiseStartPos.r, dotIndex.g * noiseScale + noiseStartPos.g, time * noiseTimeMult));
	noise = map(noise, -1.0, 1.0, 0.0, 1.0);
	noise = map(noise, colorGradientRange.r, colorGradientRange.g, 0.0, 1.0);
	noise = clamp(noise, 0.0, 1.0);
	vec3 color = mix( initialColor.rgb, otherColor.rgb, noise * apply );
	return color;
}
	
void main() {

	if ( vScale <= 0.01 ) discard;
	
	if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

	vec3 color = addColor( baseColor, accentColor1, vec2(10.0, 60.0), colorNoiseScale, 0.00003, vDotIndex, colorGradientRange, vAnim );
	color = addColor( color, accentColor2, vec2(8.0, 30.0), colorNoiseScale, 0.000035, vDotIndex, colorGradientRange, vAnim );
	// color = addColor( color, accentColor3, vec2(14.0, 2.0), colorNoiseScale, 0.00004, vDotIndex, colorGradientRange, vAnim );
	// color = addColor( color, accentColor4, vec2(-5.0, -10.0), colorNoiseScale, 0.000045, vDotIndex, colorGradientRange, vAnim );

	color = mix( baseColor, color, animAccentColors );
	
	gl_FragColor = vec4( color.rgb, 1.0 );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}
`;

	function initScene(el: HTMLElement) {
		const SEPARATION = 50;

		const container = el;

		// `new Date().getTime()` is too large to use in shader, so use time since start.
		const startTime = new Date().getTime();
		const timeStartRandAdd = Math.random() * 100000;
		let timeSinceStart = 0;

		const calculateCameraPosition = (animFitModelCamera: number) => {
			return {
				pos: new THREE.Vector3(0, 2100 * animFitModelCamera, lerp(3700, 4900, animFitModelCamera)),
				lookAt: new THREE.Vector3(0, lerp(0, -100, animFitModelCamera), 0)
			};
		};

		const camera = new THREE.PerspectiveCamera(
			40,
			window.innerWidth / window.innerHeight,
			1,
			10000
		);
		const camPos = calculateCameraPosition(animationController.values.cameraGridToModel.get());
		camera.position.set(camPos.pos.x, camPos.pos.y, camPos.pos.z);
		camera.lookAt(camPos.lookAt);

		const scene = new THREE.Scene();

		const unsubscribeAnimFitModelCamera = animationController.values.cameraGridToModel.subscribe(
			(value) => {
				const camPos = calculateCameraPosition(value);
				camera.position.set(camPos.pos.x, camPos.pos.y, camPos.pos.z);
				camera.lookAt(camPos.lookAt);
			}
		);

		const shadedModels: Map<string, THREE.MeshBasicMaterial> = new Map();

		// Load all models.
		[
			{
				dotsWrapModel: '/models/StonehengePoints.gltf',
				shadedModel: '/models/StonehengePoints.gltf',
				name: 'stonehenge'
			}
		].forEach(({ dotsWrapModel, shadedModel, name }) => {
			getModelVertices(dotsWrapModel, gltfScaleMult).then((value) => {
				modelVertices.get(name)!.vertices = () => value;
				animationController.resolveInitialHandle(stonehengeDotVerticesHandle);
			});

			loadModel(shadedModel, gltfScaleMult).then((value) => {
				scene.add(value);

				animationController.resolveInitialHandle(stonehengeShadedModelHandle);

				value.traverse((obj) => {
					if (obj instanceof THREE.Mesh) {
						const color = new THREE.Color('red');

						// Note `toneMapped: false`: this is so the colours match the ones in the HTML.
						obj.material = new THREE.MeshBasicMaterial({
							color: color,
							fog: false,
							transparent: true,
							toneMapped: false
						});

						obj.material.opacity = animationController.values.modelOpacities.get(name)!.get();

						shadedModels.set(name, obj.material);
					}
				});
			});
		});

		const numParticles = AMOUNTX * AMOUNTY;

		const dotIndex = new Float32Array(numParticles * 2);
		const positions = new Float32Array(numParticles * 3);
		const distancesFromCenter = new Float32Array(numParticles);
		const modelPositions = new Float32Array(numParticles * 3);

		let maxDistanceFromCenter = 0;

		let i = 0,
			j = 0,
			p = 0;

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				dotIndex[p] = ix;
				dotIndex[p + 1] = iy;

				positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
				positions[i + 1] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // y
				positions[i + 2] = 0; // z

				const distanceFromCenter = Math.hypot(positions[i], positions[i + 1]);
				distancesFromCenter[j] = distanceFromCenter;
				if (distanceFromCenter > maxDistanceFromCenter) maxDistanceFromCenter = distanceFromCenter;

				modelPositions[i] = 0;
				modelPositions[i + 1] = 0;
				modelPositions[i + 2] = 0;

				i += 3;
				p += 2;
				j++;
			}
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('dotIndex', new THREE.BufferAttribute(dotIndex, 2));
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('distanceFromCenter', new THREE.BufferAttribute(distancesFromCenter, 1));
		geometry.setAttribute('modelPosition', new THREE.BufferAttribute(modelPositions, 3));

		const material = new THREE.ShaderMaterial({
			uniforms: {
				time: { value: timeSinceStart + timeStartRandAdd },
				animRadius: { value: animationController.values.homePageRipple.get() },
				animVisibility: { value: animationController.values.dotsVisibility.get() },
				animFitModel: { value: animationController.values.dotsGridToModel.get() },
				animAccentColors: { value: animationController.values.dotsAccentColours.get() },
				animFixedScale: { value: animationController.values.dotFixedScale.get() },
				animVisibilityWhenFitModel: {
					value: animationController.values.dotsVisibilityWhenInModel.get()
				},
				baseColor: { value: get(colors).base },
				accentColor1: { value: get(colors).accent1 },
				accentColor2: { value: get(colors).accent2 }
				// accentColor3: { value: get(colors).accent3 },
				// accentColor4: { value: get(colors).accent4 }
			},
			vertexShader,
			fragmentShader,
			toneMapped: false
		});

		const particles = new THREE.Points(geometry, material);
		scene.add(particles);

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		container.style.touchAction = 'none';

		window.addEventListener('resize', onWindowResize);

		animate();

		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		function animate() {
			requestAnimationFrame(animate);

			render();
		}

		function render() {
			timeSinceStart = new Date().getTime() - startTime;
			particles.material.uniforms.time.value = timeSinceStart + timeStartRandAdd;

			renderer.render(scene, camera);
		}

		const unsubscribeAnimRadius = animationController.values.homePageRipple.subscribe(
			(value) => (particles.material.uniforms.animRadius.value = value * maxDistanceFromCenter)
		);
		const unsubscribeAnimVisibility = animationController.values.dotsVisibility.subscribe(
			(value) => {
				particles.material.uniforms.animVisibility.value = value;
			}
		);
		const unsubscribeColors = colors.subscribe((value) => {
			particles.material.uniforms.baseColor.value = value.base;
			particles.material.uniforms.accentColor1.value = value.accent1;
			particles.material.uniforms.accentColor2.value = value.accent2;
			// particles.material.uniforms.accentColor3.value = value.accent3;
			// particles.material.uniforms.accentColor4.value = value.accent4;
		});
		const unsubscribeAnimAccentColors = animationController.values.dotsAccentColours.subscribe(
			(value) => {
				particles.material.uniforms.animAccentColors.value = value;
			}
		);
		const unsubscribeFitModel = animationController.values.dotsGridToModel.subscribe((value) => {
			console.log(value);
			particles.material.uniforms.animFitModel.value = value;
		});
		const unsubscribeFixedScale = animationController.values.dotFixedScale.subscribe((value) => {
			particles.material.uniforms.animFixedScale.value = value;
		});
		const unsubscribeAnimVisibilityWhenFitModel =
			animationController.values.dotsVisibilityWhenInModel.subscribe((value) => {
				particles.material.uniforms.animVisibilityWhenFitModel.value = value;
			});
		const unsubscribeModelDotVertices = animationController.values.dotsModelPositions.subscribe(
			(value) => {
				const modelPositions = particles.geometry.attributes.modelPosition.array;
				let i = 0;
				for (let ix = 0; ix < AMOUNTX; ix++) {
					for (let iy = 0; iy < AMOUNTY; iy++) {
						if (i < value.length) {
							modelPositions[i] = value[i] * gltfScaleMult;
							modelPositions[i + 1] = value[i + 1] * gltfScaleMult;
							modelPositions[i + 2] = value[i + 2] * gltfScaleMult;
						}

						i += 3;
					}
				}
				particles.geometry.attributes.modelPosition.needsUpdate = true;
			}
		);
		const unusbscribersShadedModlesOpacities = [
			...animationController.values.modelOpacities.entries()
		].reduce((unsubscribers, [name, store]) => {
			const unsubscriber = store.subscribe((value) => {
				const mat = shadedModels.get(name);
				if (mat) {
					mat.opacity = value;
				}
			});
			return [unsubscriber, ...unsubscribers];
		}, [] as Array<Unsubscriber>);

		animationController.resolveInitialHandle(dotsReadyAnimationControllerHandle);

		dispatch('modelLoaded');

		animationController.resolveInitialHandle(mountedAnimationControllerHandle);

		return {
			destroy() {
				animationController.dispose();
				unsubscribeAnimFitModelCamera();
				unsubscribeAnimRadius();
				unsubscribeAnimVisibility();
				unsubscribeColors();
				unsubscribeAnimAccentColors();
				unsubscribeFitModel();
				unsubscribeModelDotVertices();
				unsubscribeFixedScale();
				unsubscribeAnimVisibilityWhenFitModel();
				unusbscribersShadedModlesOpacities.forEach((unsubscribe) => {
					unsubscribe();
				});
				geometry.dispose();
				material.dispose();
				renderer.dispose();
				for (const [, material] of shadedModels) {
					material.dispose();
				}
				window.removeEventListener('resize', onWindowResize);
			}
		};
	}

	async function getModelVertices(modelUrl: string, scaleMult: number): Promise<Float32Array> {
		return new Promise((resolve) => {
			const loader = new GLTFLoader();

			loader.load(modelUrl, function (gltf) {
				gltf.scene.scale.set(scaleMult, scaleMult, scaleMult);

				for (const child of gltf.scene.children) {
					child.traverseVisible((child) => {
						if (child instanceof THREE.Mesh) {
							const vertices = child.geometry.attributes.position.array;
							resolve(vertices);
							return; // ?
						}
					});
				}
			});
		});
	}

	async function loadModel(
		modelUrl: string,
		scaleMult: number
	): Promise<THREE.Group<THREE.Object3DEventMap>> {
		return new Promise((resolve) => {
			const loader = new GLTFLoader();

			loader.load(modelUrl, function (gltf) {
				gltf.scene.scale.set(scaleMult, scaleMult, scaleMult);
				resolve(gltf.scene);
			});
		});
	}
</script>

<div use:initScene />
