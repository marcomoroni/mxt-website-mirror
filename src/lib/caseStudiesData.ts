export const caseStudiesData: Array<{
	title: string;
	leadParagraph: string;
	href: string;
	threeState: 'none' | 'case-study-a303' | 'case-study-p2' | 'case-study-p3';
	comingSoon: boolean;
}> = [
	{
		title: 'Visualising the Stonehenge World Heritage site landscape',
		leadParagraph:
			'Harnessing the power of immersive technologies for complex infrastructure projects',
		href: '/case-studies/stonehenge',
		threeState: 'case-study-a303',
		comingSoon: false
	},
	{
		title: 'Insight into Driver Behaviour and Attitudes on SMART Motorways',
		leadParagraph:
			'A mixed-reality simulator study to explore confusion on dynamic hard shoulders motorways',
		href: '/case-studies/p2',
		threeState: 'none',
		comingSoon: false
	},
	{
		title: 'Performance and Decision Making through Simulation',
		leadParagraph: "Driving Simulation for National Highways' Traffic Officers",
		href: '/case-studies/p3',
		threeState: 'case-study-p3',
		comingSoon: false
	}
];
