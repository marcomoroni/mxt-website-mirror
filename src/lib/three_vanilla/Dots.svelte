<script lang="ts">
	// Based on https://github.com/mrdoob/three.js/blob/master/examples/webgl_points_waves.html

	import { createEventDispatcher, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { noise3D } from './shader_utils/noise-3d';
	import { spring, type Unsubscriber } from 'svelte/motion';
	import { map } from './shader_utils/map';
	import { quarticInOut } from './shader_utils/quartic-in-out';
	import type { Writable } from 'svelte/store';
	import { colors } from '$lib/dotsEffectData';

	const dispatch = createEventDispatcher();

	export let dotsActive: Writable<boolean>;

	const animRadius = spring(0, { stiffness: 0.0021, damping: 0.75 });
	const animVisibility = spring($dotsActive ? 1 : 0, { stiffness: 0.02 });
	$: {
		animVisibility.set($dotsActive ? 1 : 0);
	}

	const vertexShader = `
uniform float time;
uniform float animRadius;
uniform float animVisibility;
attribute vec2 dotIndex;
attribute float distanceFromCenter;
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
	vec4 mvPosition = modelViewMatrix * vec4( posX, posY, 0.0, 1.0 );

	float scaleNoise = cnoise(vec3(dotIndex.r * scaleNoiseScale + scaleNoiseStartPos.r, dotIndex.g * scaleNoiseScale + scaleNoiseStartPos.g, time * scaleNoiseTimeMult));
	scaleNoise = map(scaleNoise, -1.0, 1.0, -0.4, 1.0);
	float scale = mix(150.0, scaleNoise * scaleNoiseMult, rippleAnim1);
	scale = scale * animVisibility;
	gl_PointSize = scale;

	gl_Position = projectionMatrix * mvPosition;

	vAnim = rippleAnim1;
	vDotIndex = dotIndex;
}
	`;

	const fragmentShader = `
uniform float time;
uniform float animRadius;
uniform vec3 baseColor;
uniform vec3 accentColor1;
uniform vec3 accentColor2;
uniform vec3 accentColor3;
uniform vec3 accentColor4;
in vec2 vDotIndex;
in float vAnim;

const float colorNoiseScale = 0.03;
// Before .r use the first colour, between .r and .g fade, and after .g use second colour.
const vec2 colorGradientRange = vec2(0.65, 0.75);

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
	color = addColor( color, accentColor3, vec2(14.0, 2.0), colorNoiseScale, 0.00004, vDotIndex, colorGradientRange, vAnim );
	color = addColor( color, accentColor4, vec2(-5.0, -10.0), colorNoiseScale, 0.000045, vDotIndex, colorGradientRange, vAnim );
	
	gl_FragColor = vec4( color.rgb, 1.0 );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}
`;

	let unsubscribe: Array<Unsubscriber> = [];

	function initScene(el: HTMLElement) {
		const SEPARATION = 50,
			AMOUNTX = 200,
			AMOUNTY = 200;

		const container = el;

		// `new Date().getTime()` is too large to use in shader, so use time since start.
		const startTime = new Date().getTime();
		const timeStartRandAdd = Math.random() * 100000;
		let timeSinceStart = 0;

		// Init

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			1,
			10000
		);
		camera.position.z = 1500;

		const scene = new THREE.Scene();
		camera.lookAt(scene.position);

		//

		const numParticles = AMOUNTX * AMOUNTY;

		const dotIndex = new Float32Array(numParticles * 2);
		const positions = new Float32Array(numParticles * 3);
		const distancesFromCenter = new Float32Array(numParticles);

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

				i += 3;
				p += 2;
				j++;
			}
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('dotIndex', new THREE.BufferAttribute(dotIndex, 2));
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('distanceFromCenter', new THREE.BufferAttribute(distancesFromCenter, 1));

		const material = new THREE.ShaderMaterial({
			uniforms: {
				time: { value: timeSinceStart + timeStartRandAdd },
				animRadius: { value: animRadius },
				animVisibility: { value: animVisibility },
				baseColor: { value: $colors.base },
				accentColor1: { value: $colors.accent1 },
				accentColor2: { value: $colors.accent2 },
				accentColor3: { value: $colors.accent3 },
				accentColor4: { value: $colors.accent4 }
			},
			vertexShader,
			fragmentShader,
			toneMapped: false
		});

		//

		const particles = new THREE.Points(geometry, material);
		scene.add(particles);

		//

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		container.style.touchAction = 'none';

		//

		window.addEventListener('resize', onWindowResize);

		animate();

		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		//

		function animate() {
			requestAnimationFrame(animate);

			render();
		}

		function render() {
			timeSinceStart = new Date().getTime() - startTime;
			particles.material.uniforms.time.value = timeSinceStart + timeStartRandAdd;

			renderer.render(scene, camera);
		}

		unsubscribe.push(
			animRadius.subscribe((value) => (particles.material.uniforms.animRadius.value = value))
		);
		unsubscribe.push(
			animVisibility.subscribe(
				(value) => (particles.material.uniforms.animVisibility.value = value)
			)
		);
		unsubscribe.push(
			colors.subscribe((value) => {
				particles.material.uniforms.baseColor.value = value.base;
				particles.material.uniforms.accentColor1.value = value.accent1;
				particles.material.uniforms.accentColor2.value = value.accent2;
				particles.material.uniforms.accentColor3.value = value.accent3;
				particles.material.uniforms.accentColor4.value = value.accent4;
			})
		);

		dispatch('modelLoaded');

		setTimeout(() => {
			animRadius.set(maxDistanceFromCenter);
		}, 500);
	}

	onDestroy(() => {
		unsubscribe.forEach((u) => u());
	});
</script>

<div use:initScene />
