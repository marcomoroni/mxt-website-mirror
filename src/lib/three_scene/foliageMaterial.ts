import * as THREE from 'three';

export function newFoliageMaterial() {
	const material = new THREE.ShaderMaterial({
		vertexShader: `
        void main() {
            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition;
        }
        `,
		fragmentShader: `
        uniform vec3 backgroundColor;
        uniform float blendWithBackground;
        uniform vec3 baseColor;

        void main() {
            // Pretend to hide it by setting it to the same colour of the background.
            vec3 finalColor = mix(baseColor, backgroundColor, blendWithBackground);

            gl_FragColor = vec4( finalColor, 0.8 );

            #include <tonemapping_fragment>
            #include <colorspace_fragment>
        }
        `,
		uniforms: {
			backgroundColor: { value: new THREE.Color('cyan') },
			blendWithBackground: { value: 0 },
			baseColor: { value: new THREE.Color(0xffffff) }
		},
		toneMapped: false, // Makes the colours match the ones in the HTML.
		transparent: true
	});

	return {
		material,
		setBlendWithBackground: (value: number) => {
			material.uniforms.blendWithBackground.value = value;
		},
		setBackgroundColor: (value: THREE.Color) => {
			material.uniforms.backgroundColor.value = value;
		},
		dispose: () => {
			material.dispose();
		}
	};
}
