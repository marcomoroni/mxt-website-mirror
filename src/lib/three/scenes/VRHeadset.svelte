<script lang="ts">
	import { T, useFrame, useLoader } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { get } from 'svelte/store';
	import { Color, Mesh, MeshBasicMaterial } from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

	const baseColor = new Color('#e5dfdb');
	const accentColor = new Color('white');
	const rotationXAdd = -0.3;
	const rotationXAnimationSpeed = 0.2;
	const rotationXAnimationDisplacement = 0.2;
	const rotationYAdd = Math.PI + -0.4;
	const rotationYAnimationSpeed = 0.14;
	const rotationYAnimationDisplacement = 0.5;
	const rotationZAnimationSpeed = 0.12;
	const rotationZAnimationDisplacement = 0.2;
	const positionXAdd = (canvasWidth: number) => (canvasWidth / 2) * 0.004;
	const positionYAdd = (canvasHeight: number) => (canvasHeight / 2) * 0.002;
	const positionYAnimationSpeed = 0.4;
	const positionYAnimationDisplacement = 0.5;

	interactivity();
	let isHovering = false;

	let hoveringZoomAdd = spring(10);
	$: {
		hoveringZoomAdd.set(isHovering ? 10 : 0);
	}
	let scale = 40;
	$: finalScale = scale + $hoveringZoomAdd;

	let rotationX = 0;
	let rotationY = 0;
	let rotationZ = 0;

	let positionX = 0;
	let positionY = 0;

	const gltf = useLoader(GLTFLoader).load('/models/VR_Headset.gltf');
	gltf.then((gltf_) => {
		const model = gltf_.scene;
		model.traverse((obj) => {
			if (obj instanceof Mesh) {
				const color = obj.material.name == 'Mat_Lenses' ? accentColor : baseColor;

				// Note `toneMapped: false`: this is so the colours match the ones in the HTML.
				obj.material = new MeshBasicMaterial({ color: color, toneMapped: false });
			}
		});
	});

	let totalTimeElapsed = 0;
	useFrame(({ size }, delta) => {
		totalTimeElapsed += delta;

		const canvasWidth = get(size).width;
		const canvasHeight = get(size).height;

		scale = Math.min(canvasWidth, canvasHeight) * 0.08;

		rotationX =
			rotationXAdd +
			Math.sin(totalTimeElapsed * rotationXAnimationSpeed) * rotationXAnimationDisplacement;
		rotationY =
			rotationYAdd +
			Math.sin(totalTimeElapsed * rotationYAnimationSpeed) * rotationYAnimationDisplacement;
		rotationZ =
			Math.sin(totalTimeElapsed * rotationZAnimationSpeed) * rotationZAnimationDisplacement;

		positionX = positionXAdd(canvasWidth);
		positionY =
			positionYAdd(canvasHeight) +
			Math.sin(totalTimeElapsed * positionYAnimationSpeed) * positionYAnimationDisplacement;
	});
</script>

<T.OrthographicCamera
	makeDefault
	zoom={90}
	position={[0, 0, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
/>

{#if $gltf}
	<T
		is={$gltf.scene}
		position.x={positionX}
		position.y={positionY}
		rotation.x={rotationX}
		rotation.y={rotationY}
		rotation.z={rotationZ}
		scale={finalScale}
		on:pointerenter={() => (isHovering = true)}
		on:pointerleave={() => (isHovering = false)}
	/>
{/if}
