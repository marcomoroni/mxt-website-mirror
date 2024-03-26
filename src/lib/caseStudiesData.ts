export const caseStudiesData: Array<{
	title: string;
	leadParagraph: string;
	threeState: 'case-studies-anchor-a303' | 'case-studies-anchor-p2' | 'case-studies-anchor-p3';
	href: string;
	comingSoon: boolean;
}> = [
	{
		title: 'Visualising the Stonehenge World Heritage site landscape',
		leadParagraph:
			'Harnessing the power of immersive technologies for complex infrastructure projects',
		threeState: 'case-studies-anchor-a303',
		href: '/case-studies/stonehenge/',
		comingSoon: false
	},
	{
		title: 'Case study 2',
		leadParagraph: 'Lead paragraph...',
		threeState: 'case-studies-anchor-p2',
		href: '/case-studies/p2/',
		comingSoon: true
	},
	{
		title: 'Case study 3',
		leadParagraph:
			'Harnessing the power of immersive technologies for complex infrastructure projects',
		threeState: 'case-studies-anchor-p3',
		href: '/case-studies/p3/',
		comingSoon: true
	}
];
