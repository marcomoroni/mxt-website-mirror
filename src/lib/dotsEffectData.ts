import { writable } from "svelte/store";
import * as THREE from 'three';

export const colors = writable({
    base: new THREE.Color('#e4edf7'),
    accent1: new THREE.Color('#ABD3FF'),
    accent2: new THREE.Color('#E691BE'),
    accent3: new THREE.Color('#e4edf7'),
    accent4: new THREE.Color('#e4edf7'),
});