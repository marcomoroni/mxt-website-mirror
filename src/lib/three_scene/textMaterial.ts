import * as THREE from 'three';

export function newTextMaterial() {
	const material = new THREE.ShaderMaterial({
		vertexShader: `
        void main() {
            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition; 
        }
        `,
		fragmentShader: `
        uniform vec3 baseColor;

        void main() {
            gl_FragColor = vec4(baseColor, 1.0);

            #include <tonemapping_fragment>
            #include <colorspace_fragment>
        }
        `,
		uniforms: {
			baseColor: { value: new THREE.Color('cyan') }
		},
		toneMapped: false
	});

	return {
		material,
		setColor: (color: string) => {
			material.uniforms.baseColor.value = new THREE.Color(color);
		},
		dispose: () => {
			material.dispose();
		}
	};
}
