import { writable, type Writable } from "svelte/store";

export const currentWorkVisible: Writable<null | CurrentWorkVisible> = writable(null)

export type CurrentWorkVisible =  "Stonehenge" | "DrivingSimulation" | "Hello";