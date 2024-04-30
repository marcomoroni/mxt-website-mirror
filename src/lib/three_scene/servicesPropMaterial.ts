import * as THREE from 'three';

// The `ambientOcclusionTextureAndHighlight` texture should have
//  - in the red channel the ambient occlusion
//  - in the green channel the highlight color
//  - in the blue channel the parts which colour should match the background
export function newServicesPropMaterial(ambientOcclusionTextureAndHighlight: string) {
	const material = new THREE.ShaderMaterial({
		vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;

            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition; 
        }
        `,
		fragmentShader: `
        uniform float opacity;
        uniform vec3 backgroundColor;
        uniform vec3 baseColor;
		uniform vec3 baseColorShadow;
        uniform vec3 highlightColor;
        uniform sampler2D tAmbientOcclusionAndHighlight;
        varying vec2 vUv;

        void main() {
            // Not sure why but the y needs to be inverted.
            vec2 uv = vec2(vUv.r, 1.0 - vUv.g);

            vec4 uvTex = texture2D(tAmbientOcclusionAndHighlight, uv);

            vec3 finalColor = baseColor;

            // Use the red channel to match the ambient occlusion.
            finalColor = mix(finalColor, baseColorShadow, 1.0 - uvTex.r);

            // Use the green channel to match the highlight color.
            finalColor = mix(finalColor, highlightColor, uvTex.g);

            // Use the blue channel to match the background.
            finalColor = mix(finalColor, backgroundColor, uvTex.b);

            gl_FragColor = vec4(finalColor, opacity);

            #include <tonemapping_fragment>
            #include <colorspace_fragment>
        }
        `,
		uniforms: {
			opacity: { value: 1.0 },
			backgroundColor: { value: new THREE.Color('cyan') },
			baseColor: { value: new THREE.Color('red') },
			baseColorShadow: { value: new THREE.Color('black') },
			highlightColor: { value: new THREE.Color('cyan') },
			tAmbientOcclusionAndHighlight: {
				value: new THREE.TextureLoader().load(ambientOcclusionTextureAndHighlight)
			}
		},
		transparent: true,
		toneMapped: false // Makes the colours match the ones in the HTML.
	});

	return {
		material,
		setVisibility: (visible: boolean) => {
			material.visible = visible;
		},
		setOpacity: (opacity: number) => {
			material.uniforms.opacity.value = opacity;
		},
		setBackgroundColor: (value: THREE.Color) => {
			material.uniforms.backgroundColor.value = value;
		},
		setBaseColor: (value: THREE.Color) => {
			material.uniforms.baseColor.value = value;
		},
		setBaseColorShadow: (value: THREE.Color) => {
			material.uniforms.baseColorShadow.value = value;
		},
		setHighlightColor: (value: THREE.Color) => {
			material.uniforms.highlightColor.value = value;
		},
		dispose: () => {
			material.dispose();
		}
	};
}
