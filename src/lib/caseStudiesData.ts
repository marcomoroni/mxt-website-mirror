export const caseStudiesData: Array<{
	title: string;
	leadParagraph: string;
	threeState:
		| 'case-studies-anchor-a303'
		| 'case-studies-anchor-vehicle-simulator'
		| 'case-studies-anchor-p3';
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
		title: 'Vehicle Simulator',
		leadParagraph: 'Behavioural science and road safety research',
		threeState: 'case-studies-anchor-vehicle-simulator',
		href: '/case-studies/vehicle-simulator/',
		comingSoon: false
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
