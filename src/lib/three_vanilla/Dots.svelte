<script lang="ts">
	// Based on https://github.com/mrdoob/three.js/blob/master/examples/webgl_points_waves.html

	import { createEventDispatcher, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { noise3D } from './shader_utils/noise-3d';
	import { spring, type Unsubscriber } from 'svelte/motion';
	import { map } from './shader_utils/map';
	import { quarticInOut } from './shader_utils/quartic-in-out';
	import type { Writable } from 'svelte/store';

	const dispatch = createEventDispatcher();

	export let dotsActive: Writable<boolean>;

	const animRadius = spring(0, { stiffness: 0.0021, damping: 0.75 });
	const animVisibility = spring($dotsActive ? 1 : 0, { stiffness: 0.02 });
	$: {
		// if ($dotsActive) {
		// 	animRadius.set(0, { hard: true });
		// }
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
out float vAccentColor1Noise;
out float vAccentColor2Noise;

${noise3D}

${map}

${quarticInOut}

void main() {

	float anim0to1 = clamp(map( distanceFromCenter - animRadius, 0.0, -2800.0, 0.0, 1.0), 0.0, 1.0);
	anim0to1 = quarticInOut(anim0to1);
	float anim0to1_2 = clamp(map( (distanceFromCenter - animRadius) + 600.0 , 0.0, -4700.0, 0.0, 1.0), 0.0, 1.0);
	anim0to1_2 = quarticInOut(anim0to1_2);

	float posXNoise = cnoise(vec3(dotIndex.r * 0.03 + 3.0, dotIndex.g * 0.03 - 6.0, time * 0.00006));
	float posYNoise = cnoise(vec3(dotIndex.r * 0.03 + 80.0, dotIndex.g * 0.03 - 30.0, time * 0.00006));
	float posX = position.r + mix(0.0, posXNoise * 900.0, anim0to1_2);
	float posY = position.g + mix(0.0, posYNoise * 900.0, anim0to1_2);
	vec4 mvPosition = modelViewMatrix * vec4( posX, posY, 0.0, 1.0 );

	float scaleNoise = cnoise(vec3(dotIndex.r * 0.03, dotIndex.g * 0.03, time * 0.0003));
	scaleNoise = map(scaleNoise, -1.0, 1.0, -0.4, 1.0);
	float scale = mix(200.0, scaleNoise * 20.0, anim0to1);
	scale = scale * animVisibility;
	gl_PointSize = scale;

	gl_Position = projectionMatrix * mvPosition;

	vAnim = anim0to1;
	vDotIndex = dotIndex;
	vAccentColor1Noise = posXNoise;
	vAccentColor2Noise = posYNoise;
}
	`;

	const fragmentShader = `
uniform float time;
uniform float animRadius;
uniform vec3 baseColor;
uniform vec3 accentColor1;
uniform vec3 accentColor2;
in vec2 vDotIndex;
in float vAnim;
in float vAccentColor1Noise;
in float vAccentColor2Noise;

${noise3D}

${map}
	
void main() {
	
	if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

	float color1Noise = map(vAccentColor1Noise, -1.0, 1.0, 0.0, 1.0);
	float color2Noise = map(vAccentColor2Noise, -1.0, 1.0, 0.0, 1.0);
	// Accent colour only on heigher values.
	color1Noise = map(color1Noise, 0.6, 0.7, 0.0, 1.0);
	color2Noise = map(color2Noise, 0.6, 0.7, 0.0, 1.0);
	color1Noise = clamp(color1Noise, 0.0, 1.0);
	color2Noise = clamp(color2Noise, 0.0, 1.0);
	vec3 color = mix( baseColor.rgb, accentColor1.rgb, color1Noise * vAnim );
	color = mix( color.rgb, accentColor2.rgb, color2Noise * vAnim );
	
	gl_FragColor = vec4( color.rgb, 1.0 );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}
`;

	let unsubscribe1: Unsubscriber | undefined = undefined;
	let unsubscribe2: Unsubscriber | undefined = undefined;

	function initScene(el: HTMLElement) {
		const SEPARATION = 50,
			AMOUNTX = 200,
			AMOUNTY = 200;

		const container = el;

		// `new Date().getTime()` is too large to use in shader, so use time since start.
		const startTime = new Date().getTime();
		const timeStartRandAdd = Math.random() * 100000;
		let timeSinceStart = 0;

		const baseColor = new THREE.Color('#E5DEDA');
		const accentColor1 = new THREE.Color('#DEBA76');
		const accentColor2 = new THREE.Color('#ECE293');

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
				baseColor: { value: baseColor },
				accentColor1: { value: accentColor1 },
				accentColor2: { value: accentColor2 }
			},
			vertexShader,
			fragmentShader,
			vertexColors: true,
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

		unsubscribe1 = animRadius.subscribe(
			(value) => (particles.material.uniforms.animRadius.value = value)
		);
		unsubscribe2 = animVisibility.subscribe(
			(value) => (particles.material.uniforms.animVisibility.value = value)
		);

		dispatch('modelLoaded');

		setTimeout(() => {
			animRadius.set(maxDistanceFromCenter);
		}, 500);
	}

	onDestroy(() => {
		unsubscribe1?.();
		unsubscribe2?.();
	});
</script>

<div use:initScene />
