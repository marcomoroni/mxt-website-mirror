<script lang="ts">
	import { T, useFrame, useLoader } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { get } from 'svelte/store';
	import { Color, Mesh, MeshBasicMaterial } from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

	const baseColor = new Color('#e5dfdb');
	const accentColor = new Color('white');

	interactivity();
	let isHovering = false;

	let hoveringZoomAdd = spring(10);
	$: {
		hoveringZoomAdd.set(isHovering ? 10 : 0);
	}
	let scale = 40;
	$: finalScale = scale + $hoveringZoomAdd;

	let rotation = 0;

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

	useFrame(({ size, renderer }, delta) => {
		const canvasWidth = get(size).width;
		const canvasHeight = get(size).height;
		scale = Math.min(canvasWidth, canvasHeight) * 0.08;

		renderer.getSize;
		rotation += delta * 0.2;
	});
</script>

<T.OrthographicCamera
	makeDefault
	zoom={90}
	position={[10, 10, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
/>

{#if $gltf}
	<T
		is={$gltf.scene}
		rotation.y={rotation}
		position.y={1}
		scale={finalScale}
		on:pointerenter={() => (isHovering = true)}
		on:pointerleave={() => (isHovering = false)}
	/>
{/if}
