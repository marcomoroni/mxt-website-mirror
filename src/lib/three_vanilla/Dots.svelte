<script lang="ts">
	// Based on https://github.com/mrdoob/three.js/blob/master/examples/webgl_points_waves.html

	import { createEventDispatcher, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
	import { noise3D } from './shader_utils/noise-3d';
	import { spring, type Unsubscriber } from 'svelte/motion';
	import { map } from './shader_utils/map';

	const dispatch = createEventDispatcher();

	const vertexShader = `
uniform float time;
uniform float animRadius;
attribute vec2 dotIndex;
attribute float distanceFromCenter;
out float vAnim;

${noise3D}

${map}

void main() {

	float anim0to1 = clamp( animRadius / distanceFromCenter, 0.0, 1.0 );

	float posXNoise = cnoise(vec3(dotIndex.r * 0.1 + 3.0, dotIndex.g * 0.1 - 6.0, time * 0.00006));
	float posYNoise = cnoise(vec3(dotIndex.r * 0.1 + 80.0, dotIndex.g * 0.1 - 30.0, time * 0.00006));
	float posX = position.r + mix(0.0, posXNoise * 900.0, anim0to1);
	float posY = position.g + mix(0.0, posYNoise * 900.0, anim0to1);
	vec4 mvPosition = modelViewMatrix * vec4( posX, posY, 0.0, 1.0 );

	float scaleNoise = cnoise(vec3(dotIndex.r * 0.07, dotIndex.g * 0.07, time * 0.0003));
	scaleNoise = map(scaleNoise, -1.0, 1.0, -0.4, 1.0);

	gl_PointSize = mix(200.0, scaleNoise * 60.0, anim0to1);

	gl_Position = projectionMatrix * mvPosition;

	vAnim = anim0to1;
}
	`;

	const fragmentShader = `
uniform float time;
uniform float animRadius;
uniform vec3 baseColor;
in float vAnim;

${noise3D}
	
void main() {
	
	if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
	
	gl_FragColor = vec4( baseColor.rgb, 1.0 );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}
`;

	let unsubscribe: Unsubscriber | undefined = undefined;

	function initScene(el: HTMLElement) {
		// Values for animations.
		const animRadius = spring(0, { stiffness: 0.002 });

		const SEPARATION = 140,
			AMOUNTX = 30,
			AMOUNTY = 30;

		const container = el;

		const noise = new ImprovedNoise();

		// `new Date().getTime()` is too large to use in shader, so use time since start.
		let startTime = new Date().getTime();
		let timeSinceStart = 0;

		const baseColor = new THREE.Color('#E5DEDA');
		// const baseColor = new THREE.Color('white');
		const accentColors = [
			new THREE.Color('#dfa638'),
			new THREE.Color('#CFCCB1'),
			new THREE.Color('#E7D852')
		];

		let mouseX = 0,
			mouseY = 0;

		let windowHalfX = window.innerWidth / 2;
		let windowHalfY = window.innerHeight / 2;

		// Init

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			1,
			10000
		);
		camera.position.z = 1500;

		const scene = new THREE.Scene();

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
				time: { value: timeSinceStart },
				animRadius: { value: animRadius },
				baseColor: { value: baseColor }
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
		container.addEventListener('pointermove', onPointerMove);

		//

		window.addEventListener('resize', onWindowResize);

		animate();

		function onWindowResize() {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);
		}

		//

		function onPointerMove(event: any) {
			if (event.isPrimary === false) return;

			mouseX = event.clientX - windowHalfX;
			mouseY = event.clientY - windowHalfY;
		}

		//

		function animate() {
			requestAnimationFrame(animate);

			render();
		}

		function render() {
			camera.position.x += (mouseX - camera.position.x) * 0.05;
			camera.position.y += (-mouseY - camera.position.y) * 0.05;
			camera.lookAt(scene.position);

			timeSinceStart = new Date().getTime() - startTime;
			particles.material.uniforms.time.value = timeSinceStart;

			renderer.render(scene, camera);
		}

		unsubscribe = animRadius.subscribe(
			(value) => (particles.material.uniforms.animRadius.value = value)
		);

		dispatch('modelLoaded');

		animRadius.set(maxDistanceFromCenter);
	}

	onDestroy(() => {
		unsubscribe?.();
	});

	function mapRange(
		value: number,
		low1: number,
		high1: number,
		low2: number,
		high2: number
	): number {
		return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
	}

	function clamp(value: number, low: number, high: number): number {
		return value < low ? low : value > high ? high : value;
	}
</script>

<div use:initScene />
