import fs from 'fs';
import fm from 'front-matter';

export function load() {
	const caseStudiesFolder = 'src/content/case-studies';
	return {
		caseStudies: fs
			.readdirSync(caseStudiesFolder)
			.filter((fileName) => fileName.endsWith('.md'))
			.map((fileName) => fileName.replace('.md', ''))
			.map((slug) => {
				const fileContent = fm<{
					title: string;
					leadParagraph: string;
					threeState: 'none' | 'case-study-a303' | 'case-study-p2' | 'case-study-p3';
					comingSoon: boolean;
					sort: number;
					linkPreviewImage?: string;
				}>(fs.readFileSync(`${caseStudiesFolder}/${slug}.md`, 'utf-8'));
				return {
					slug,
					...fileContent.attributes
				};
			})
			.toSorted((a, b) => a.sort - b.sort)
	};
}
