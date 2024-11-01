export const caseStudiesData: Array<{
	title: string;
	leadParagraph: string;
	threeState: 'case-studies-anchor-a303' | 'case-studies-anchor-dhs' | 'case-studies-anchor-p3';
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
		title: 'Insight into Driver Behaviour and Cognitive State on SMART Motorways',
		leadParagraph:
			'Leveraging mixed reality simulation with integrated behavioural and psychophysiological measures to detect subtle cognitive state changes and enhance understanding of driver’s behaviour.',
		threeState: 'case-studies-anchor-dhs',
		href: '/case-studies/dhs/',
		comingSoon: false
	},
	{
		title: 'Performance and Decision Making through Simulation',
		leadParagraph: "Driving Simulation for National Highways' Traffic Officers",
		threeState: 'case-studies-anchor-p3',
		href: '/case-studies/p3/',
		comingSoon: true
	}
];
