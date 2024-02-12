import { writable } from 'svelte/store';

export const caseStudiesPageIntersectingCard = writable<
	undefined | 'case-studies-anchor-a303' | 'case-studies-anchor-p2' | 'case-studies-anchor-p3'
>(undefined);
