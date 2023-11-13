import { writable } from "svelte/store";
import * as THREE from 'three';

export const colors = writable({
    base: new THREE.Color('#E5DEDA'),
    accent1: new THREE.Color('#DEBA76'),
    accent2: new THREE.Color('#ECE293'),
    accent3: new THREE.Color('#e6d5ba'),
    accent4: new THREE.Color('#d7c9be'),
});