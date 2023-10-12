<script lang="ts">
	import { T, useFrame, useLoader } from '@threlte/core';
	import { interactivity } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { Color, Mesh, MeshBasicMaterial } from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

	const restScale = 30;
	const baseColor = new Color('#e5dfdb');
	const accentColor = new Color('white');

	interactivity();
	const scale = spring(restScale);

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

	let rotation = 0;
	useFrame((state, delta) => {
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
		scale={$scale}
		on:pointerenter={() => scale.set(40)}
		on:pointerleave={() => scale.set(restScale)}
	/>
{/if}
