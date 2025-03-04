import { accentColor1 } from '$lib/cssValues';
import { writable } from 'svelte/store';

export const servicesPageIntersectingSection = writable<
	undefined | 'service-1' | 'service-2' | 'service-3'
>(undefined);

export const accentColourInServicesProps = writable<string>(accentColor1);
