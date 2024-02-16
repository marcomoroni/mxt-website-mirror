export const vertexShader = `
    // out vec3 vNormal;
    out vec3 vNormalWorld;

    void main() {
        // vNormal = normal;
        vNormalWorld = normalize(normalMatrix * normal);

        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition; 
    }
`;
