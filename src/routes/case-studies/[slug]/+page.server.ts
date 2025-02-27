import fs from 'fs';
import fm from 'front-matter';

export function load({ params }) {
	const caseStudiesFolder = 'src/content/case-studies';
	const fileContent = fm<{
		title: string;
		leadParagraph: string;
		threeState: 'none' | 'case-study-a303' | 'case-study-p2' | 'case-study-p3';
		comingSoon: boolean;
		sort: number;
		linkPreviewImage?: string;
		body: Array<
			| string
			| { gallery: { caption?: string | undefined; images: Array<{ src: string; alt: string }> } }
			| {
					insight: {
						collapsable: boolean;
						sections: Array<{ title: string; expanded?: boolean; body: string }>;
					};
			  }
		>;
	}>(fs.readFileSync(`${caseStudiesFolder}/${params.slug}.md`, 'utf-8'));
	return {
		caseStudy: {
			slug: params.slug,
			...fileContent.attributes
		}
	};
}
