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
		title: 'Insight into Driver Behaviour and Attitudes on SMART Motorways',
		leadParagraph:
			'A mixed-reality simulator study to explore confusion on dynamic hard shoulders motorways',
		threeState: 'case-studies-anchor-p2',
		href: '/case-studies/p2/',
		comingSoon: true
	},
	{
		title: 'Performance and Decision Making through Simulation',
		leadParagraph: "Driving Simulation for National Highways' Traffic Officers",
		threeState: 'case-studies-anchor-p3',
		href: '/case-studies/p3/',
		comingSoon: true
	}
];
