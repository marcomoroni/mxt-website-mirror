import { writable, type Writable } from "svelte/store";

export const previousPathname: Writable<null | string> = writable(null)