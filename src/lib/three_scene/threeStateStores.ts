import { backgroundColor as backgroundColor_ } from '$lib/cssValues';
import { writable } from 'svelte/store';

// --- perhaps better use getContext/setContext where you pass to the child a function to set this state
export const caseStudiesPageIntersectingCard = writable<
	undefined | 'case-studies-anchor-a303' | 'case-studies-anchor-p2' | 'case-studies-anchor-p3'
>(undefined);

export const servicesPageIntersectingSection = writable<
	undefined | 'service-1' | 'service-2' | 'service-3'
>(undefined);

export const accentColourInServicesProps = writable<string>('magenta');
