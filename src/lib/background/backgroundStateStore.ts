import { writable } from 'svelte/store';

export const servicesPageIntersectingSection = writable<
	undefined | 'services1' | 'services2' | 'services3'
>(undefined);
