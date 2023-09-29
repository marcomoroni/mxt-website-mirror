import { writable, type Writable } from "svelte/store";

export const navBarData: Writable<'home' | 'innerPage'> = writable('home');