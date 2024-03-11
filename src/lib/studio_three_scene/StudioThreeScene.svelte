<script lang="ts">
	import { newTextMaterial } from '$lib/three_scene/textMaterial';
	import * as THREE from 'three';

	function createObject() {
		const geometry = new THREE.TorusKnotGeometry(1, 0.1, 300, 8, 5, 11);
		const material = newTextMaterial(new THREE.Color('red'));
		const mesh = new THREE.Mesh(geometry, material.material);

		return {
			mesh,
			tick(deltaTime: DOMHighResTimeStamp) {
				mesh.rotation.y += 0.0004 * deltaTime;
			},
			dispose() {
				material.dispose();
			}
		};
	}

	function initThreeScene(canvasEl: HTMLCanvasElement) {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			30,
			canvasEl.clientWidth / canvasEl.clientHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasEl, alpha: true });

		camera.position.z = 10;
		camera.position.y = 2;

		const object = createObject();
		scene.add(object.mesh);

		const resize = () => {
			renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight);
			camera.aspect = canvasEl.clientWidth / canvasEl.clientHeight;
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

<canvas use:initThreeScene />

<style>
	canvas {
		width: 100%;
		height: 100%;
		position: absolute;
	}
</style>
