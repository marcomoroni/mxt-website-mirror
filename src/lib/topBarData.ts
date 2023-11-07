import { writable, type Writable } from "svelte/store";

export type PageId = undefined | 'home' | { caseStudies: 'root' | 'stonehenge' } | 'studio' | 'contacts';

export const navBarData: Writable<PageId> = writable(undefined);