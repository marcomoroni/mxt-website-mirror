import { readCaseStudies } from '$lib/content_reading';

export function load() {
	return {
		caseStudies: readCaseStudies()
	};
}
