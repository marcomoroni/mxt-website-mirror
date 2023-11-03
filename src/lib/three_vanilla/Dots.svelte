<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import * as THREE from 'three';
	import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';

	const dispatch = createEventDispatcher();

	const vertexShader = `
attribute float scale;
varying vec3 vColor;

void main() {

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

	// gl_PointSize = scale * ( 300.0 / - mvPosition.z );
	gl_PointSize = scale;

	gl_Position = projectionMatrix * mvPosition;

	vColor = color;
}
	`;

	const fragmentShader = `
// uniform vec3 color;
varying vec3 vColor;
	
void main() {
	
	if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
	
	gl_FragColor = vec4( vColor.rgb, 1.0 );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}
`;

	function initScene(el: HTMLElement) {
		const SEPARATION = 140,
			AMOUNTX = 30,
			AMOUNTY = 30;

		const container = el;

		// let count = 0;
		const noise = new ImprovedNoise();

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

		const restPositions = new Float32Array(numParticles * 3);
		const positions = new Float32Array(numParticles * 3);
		const scales = new Float32Array(numParticles);
		const colors = new Float32Array(numParticles * 3);

		let i = 0,
			j = 0;

		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				restPositions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
				restPositions[i + 1] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // y
				restPositions[i + 2] = 0; // z

				positions[i] = restPositions[i];
				positions[i + 1] = restPositions[i + 1];
				positions[i + 2] = restPositions[i + 2];

				scales[j] = 1;

				colors[i] = baseColor.r;
				colors[i + 1] = baseColor.g;
				colors[i + 2] = baseColor.b;

				i += 3;
				j++;
			}
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		const material = new THREE.ShaderMaterial({
			// uniforms: {
			// 	color: { value: new THREE.Color('red') }
			// },
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

			const positions = particles.geometry.attributes.position.array;
			const scales = particles.geometry.attributes.scale.array;
			const colors = particles.geometry.attributes.color.array;

			let i = 0,
				j = 0;

			const now = new Date().getTime();

			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					const scaleNoise = noise.noise(ix * 0.07, iy * 0.07, now * 0.0003);
					const posXNoise = noise.noise(ix * 0.1 + 3, iy * 0.1 - 6, now * 0.00006);
					const posYNoise = noise.noise(ix * 0.1 + 80, iy * 0.1 - 30, now * 0.00006);
					const accentColorNoise = noise.noise(ix * 0.8 + 30, iy * 0.8 + 230, now * 0.0002);

					// positions[i + 2] = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
					positions[i] = restPositions[i] + posXNoise * 700; // x
					positions[i + 1] = restPositions[i + 1] + posYNoise * 700; // y

					// scales[j] =
					// 	(Math.sin((ix + count) * 0.3) + 1) * 20 + (Math.sin((iy + count) * 0.5) + 1) * 20;
					scales[j] = scaleNoise * 50;

					const color = new THREE.Color().lerpColors(
						baseColor,
						accentColors[0],
						clamp(mapRange(mapRange(accentColorNoise, -1, 1, 0, 1), 0.8, 0.82, 0, 1), 0, 1)
					);
					colors[i] = color.r;
					colors[i + 1] = color.g;
					colors[i + 2] = color.b;

					i += 3;
					j++;
				}
			}

			particles.geometry.attributes.position.needsUpdate = true;
			particles.geometry.attributes.scale.needsUpdate = true;
			particles.geometry.attributes.color.needsUpdate = true;

			renderer.render(scene, camera);

			// count += 0.1;
		}

		dispatch('modelLoaded');
	}

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
