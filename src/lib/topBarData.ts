import { writable, type Writable } from "svelte/store";

export type PageId = 'home' | { caseStudies: 'root' | 'stonehenge' } | 'studio' | 'contacts';

export const navBarData: Writable<PageId> = writable('home');