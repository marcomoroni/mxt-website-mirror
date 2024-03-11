<script lang="ts">
	import { smoothDampAnimation } from '$lib/smoothDamp';
	import { newTextMaterial } from '$lib/three_scene/textMaterial';
	import * as THREE from 'three';

	let scrollY: number;

	function createObject() {
		const geometry = new THREE.TorusKnotGeometry(1, 0.1, 300, 8, 5, 11);
		const material = newTextMaterial(new THREE.Color('red'));
		const mesh = new THREE.Mesh(geometry, material.material);
		const targetRotation = () => scrollY * 0.003;
		const rotationAnimation = smoothDampAnimation(targetRotation(), 0.08);

		return {
			mesh,
			tick(deltaTime: DOMHighResTimeStamp) {
				rotationAnimation.target = targetRotation();
				rotationAnimation.tick(deltaTime);
				mesh.rotation.y = rotationAnimation.current;
			},
			dispose() {
				material.dispose();
			}
		};
	}

	// ---- rotatin relative to scroll position??
	function initThreeScene(canvasEl: HTMLCanvasElement) {
		const parentEl = canvasEl.parentElement!;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			30,
			parentEl.clientWidth / parentEl.clientHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasEl, alpha: true });

		camera.position.z = 10;
		camera.position.y = 2;

		const object = createObject();
		scene.add(object.mesh);

		const resize = () => {
			renderer.setSize(parentEl.clientWidth, parentEl.clientHeight);
			camera.aspect = parentEl.clientWidth / parentEl.clientHeight;
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

			object.tick(dt);

			camera.lookAt(0, 0, 0);

			renderer.render(scene, camera);
		};

		resize();
		animate(previousTimeStamp);

		window.addEventListener('resize', resize);

		return {
			destroy() {
				shouldRequestNewAnimationFrame = false;
				object.dispose();
				renderer.dispose();
				renderer.forceContextLoss();
			}
		};
	}
</script>

<svelte:window bind:scrollY />

<canvas use:initThreeScene />

<style>
	canvas {
		width: 100%;
		height: 100%;
		position: absolute;
	}
</style>
