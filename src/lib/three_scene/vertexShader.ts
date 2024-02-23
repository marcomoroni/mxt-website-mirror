export const vertexShader = `
    // out vec3 vNormal;
    out vec3 vNormalWorld;
    varying vec2 vUv;

    void main() {
        // vNormal = normal;
        vNormalWorld = normalize(normalMatrix * normal);
        vUv = uv;

        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition; 
    }
`;
