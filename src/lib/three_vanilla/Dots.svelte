<script lang="ts">
	// Based on https://github.com/mrdoob/three.js/blob/master/examples/webgl_points_waves.html

	import { createEventDispatcher } from 'svelte';
	import * as THREE from 'three';
	import { noise3D } from './shader_utils/noise-3d';
	import { spring } from 'svelte/motion';
	import { map } from './shader_utils/map';
	import { quarticInOut } from './shader_utils/quartic-in-out';
	import { get, writable, type Writable } from 'svelte/store';
	import { colors } from '$lib/dotsEffectData';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
	import { lerp } from '$lib/utils/lerp';
	import { match, P } from 'ts-pattern';

	const gltfScaleMult = 1000;

	const dispatch = createEventDispatcher();

	export let dotsActive: Writable<boolean>;
	export let accentColorsActive: Writable<boolean>;
	export let fitModel: Writable<'No' | { modelUrl: string }>;

	const animRadius = spring(0, { stiffness: 0.0021, damping: 0.75 });
	const animVisibility = spring($dotsActive ? 1 : 0, { stiffness: 0.02 });
	$: {
		animVisibility.set($dotsActive ? 1 : 0);
	}

	const animAccentColours = spring($accentColorsActive ? 1 : 0, { stiffness: 0.02 });
	$: {
		animAccentColours.set($accentColorsActive ? 1 : 0);
	}

	let modelIsLoaded = writable(false);
	const animFitModelDots = spring($fitModel !== 'No' && $modelIsLoaded ? 1 : 0, {
		stiffness: 0.01,
		precision: 0.0001
	});
	const animFitModelCamera = spring($fitModel !== 'No' && $modelIsLoaded ? 1 : 0, {
		stiffness: 0.002
	});
	$: {
		animFitModelDots.set($fitModel !== 'No' && $modelIsLoaded ? 1 : 0);
		animFitModelCamera.set($fitModel !== 'No' && $modelIsLoaded ? 1 : 0);
	}

	const vertexShader = `
uniform float time;
uniform float animRadius;
uniform float animVisibility;
uniform float animFitModel;
attribute vec2 dotIndex;
attribute float distanceFromCenter;
attribute vec3 modelPosition;
out float vAnim;
out vec2 vDotIndex;

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
const float scaleNoiseMult = 20.0;

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
	scale = scale * animVisibility;

	scale = mix(scale, scaleWhenFitModel, animFitModel);

	gl_PointSize = scale;

	gl_Position = projectionMatrix * mvPosition;

	vAnim = rippleAnim1;
	vDotIndex = dotIndex;
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
		const SEPARATION = 50,
			AMOUNTX = 200,
			AMOUNTY = 200;

		const container = el;

		// `new Date().getTime()` is too large to use in shader, so use time since start.
		const startTime = new Date().getTime();
		const timeStartRandAdd = Math.random() * 100000;
		let timeSinceStart = 0;

		const calculateCameraPosition = (animFitModelCamera: number) => {
			return {
				pos: new THREE.Vector3(0, 1100 * animFitModelCamera, lerp(1500, 2700, animFitModelCamera)),
				lookAt: new THREE.Vector3(0, lerp(0, -200, animFitModelCamera), 0)
			};
		};

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			1,
			10000
		);
		const camPos = calculateCameraPosition(get(animFitModelCamera));
		camera.position.set(camPos.pos.x, camPos.pos.y, camPos.pos.z);
		camera.lookAt(camPos.lookAt);

		const scene = new THREE.Scene();

		const unsubscribeAnimFitModelCamera = animFitModelCamera.subscribe((value) => {
			const camPos = calculateCameraPosition(value);
			camera.position.set(camPos.pos.x, camPos.pos.y, camPos.pos.z);
			camera.lookAt(camPos.lookAt);
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
				animRadius: { value: animRadius },
				animVisibility: { value: animVisibility },
				animFitModel: { value: get(animFitModelDots) },
				animAccentColors: { value: get(animAccentColours) },
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

		const unsubscribeAnimRadius = animRadius.subscribe(
			(value) => (particles.material.uniforms.animRadius.value = value)
		);
		const unsubscribeAnimVisibility = animVisibility.subscribe(
			(value) => (particles.material.uniforms.animVisibility.value = value)
		);
		const unsubscribeColors = colors.subscribe((value) => {
			particles.material.uniforms.baseColor.value = value.base;
			particles.material.uniforms.accentColor1.value = value.accent1;
			particles.material.uniforms.accentColor2.value = value.accent2;
			// particles.material.uniforms.accentColor3.value = value.accent3;
			// particles.material.uniforms.accentColor4.value = value.accent4;
		});
		const unsubscribeAnimAccentColors = animAccentColours.subscribe((value) => {
			particles.material.uniforms.animAccentColors.value = value;
		});

		const loader = new GLTFLoader();
		const unsubscribeLoadModel = fitModel.subscribe((value) => {
			modelIsLoaded.set(false);

			match(value).with({ modelUrl: P.select() }, (modelUrl) => {
				loader.load(modelUrl, function (gltf) {
					gltf.scene.scale.set(gltfScaleMult, gltfScaleMult, gltfScaleMult);
					// scene.add(gltf.scene);

					for (const child of gltf.scene.children) {
						child.traverseVisible((child) => {
							if (child instanceof THREE.Mesh) {
								const vertices = child.geometry.attributes.position.array;

								const modelPositions = particles.geometry.attributes.modelPosition.array;
								let i = 0;
								for (let ix = 0; ix < AMOUNTX; ix++) {
									for (let iy = 0; iy < AMOUNTY; iy++) {
										if (i < vertices.length) {
											modelPositions[i] = vertices[i] * gltfScaleMult;
											modelPositions[i + 1] = vertices[i + 1] * gltfScaleMult;
											modelPositions[i + 2] = vertices[i + 2] * gltfScaleMult;
										}

										i += 3;
									}
								}
								particles.geometry.attributes.modelPosition.needsUpdate = true;
							}
						});
					}

					modelIsLoaded.set(true);
				});
			});
		});

		const unsubscribeFitModel = animFitModelDots.subscribe((value) => {
			particles.material.uniforms.animFitModel.value = value;
		});

		dispatch('modelLoaded');

		setTimeout(() => {
			animRadius.set(maxDistanceFromCenter);
		}, 500);

		return {
			destroy() {
				unsubscribeAnimFitModelCamera();
				unsubscribeAnimRadius();
				unsubscribeAnimVisibility();
				unsubscribeColors();
				unsubscribeAnimAccentColors();
				unsubscribeFitModel();
				unsubscribeLoadModel();
				geometry.dispose();
				material.dispose();
				renderer.dispose();
				window.removeEventListener('resize', onWindowResize);
			}
		};
	}
</script>

<div use:initScene />
