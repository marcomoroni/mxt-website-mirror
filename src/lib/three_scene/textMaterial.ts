import * as THREE from 'three';

export function newTextMaterial(color: THREE.Color) {
	const material = new THREE.ShaderMaterial({
		vertexShader: `
        void main() {
            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition; 
        }
        `,
		fragmentShader: `
        uniform vec3 baseColor;
		uniform float opacity;

        void main() {
            gl_FragColor = vec4(baseColor, opacity);

            #include <tonemapping_fragment>
            #include <colorspace_fragment>
        }
        `,
		uniforms: {
			baseColor: { value: color },
			opacity: { value: 1 }
		},
		toneMapped: false,
		transparent: true
	});

	return {
		material,
		setOpacity: (opacity: number) => {
			material.uniforms.opacity.value = opacity;
		},
		dispose: () => {
			material.dispose();
		}
	};
}
