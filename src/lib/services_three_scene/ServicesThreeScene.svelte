<script lang="ts">
	import { prefersReducedMotion } from '$lib/prefersReducedMotion';
	import { smoothDampAnimation } from '$lib/smoothDamp';
	import { newTextMaterial } from '$lib/three_scene/textMaterial';
	import { derived, writable, type Unsubscriber, get } from 'svelte/store';
	import * as THREE from 'three';

	export let moveAwayFromCamera: boolean;
	const moveAwayFromCameraStore = writable(moveAwayFromCamera);
	$: {
		moveAwayFromCameraStore.set(moveAwayFromCamera);
	}

	let scrollY: number;

	function createObject() {
		const storeUnsubscribers: Array<Unsubscriber> = [];

		const geometry = new THREE.TorusKnotGeometry(2.1, 0.2, 300, 8, 5, 11);
		const material = newTextMaterial(new THREE.Color('tomato'));
		const mesh = new THREE.Mesh(geometry, material.material);

		let targetRotationDisplacement = 0;
		const targetRotation = () =>
			prefersReducedMotion() ? 0 : scrollY * 0.0015 + targetRotationDisplacement;
		const rotationAnimation = smoothDampAnimation(targetRotation(), 0.13);

		const targetPosX = derived(moveAwayFromCameraStore, ($v) => ($v ? -5 : -2));
		const posXAnimation = smoothDampAnimation(get(targetPosX), 1.8);
		storeUnsubscribers.push(targetPosX.subscribe((v) => (posXAnimation.target = v)));
		mesh.position.x = posXAnimation.current;
		mesh.position.y = -3;

		return {
			mesh,
			tick(deltaTime: DOMHighResTimeStamp) {
				const prevPosX = posXAnimation.current;

				posXAnimation.tick(deltaTime);
				mesh.position.x = posXAnimation.current;

				// When moving the position, also rotate.
				const posXDelta = posXAnimation.current - prevPosX;
				targetRotationDisplacement += posXDelta * -0.9;

				rotationAnimation.target = targetRotation();
				rotationAnimation.tick(deltaTime);
				mesh.rotation.y = rotationAnimation.current;
			},
			dispose() {
				storeUnsubscribers.forEach((unsubscribe) => unsubscribe());
				material.dispose();
			}
		};
	}

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

<canvas use:initThreeScene aria-hidden="true" />

<style>
	canvas {
		width: 100%;
		height: 100%;
		position: absolute;
	}
</style>
