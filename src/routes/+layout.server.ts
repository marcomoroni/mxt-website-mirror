import { readCaseStudies } from '$lib/content_reading';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	return { caseStudies: readCaseStudies() };
};
