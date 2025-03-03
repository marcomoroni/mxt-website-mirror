export type SectionData = {
	title: string;
	subtitle: string;
	href: string;
	associatedState: 'service-1' | 'service-2' | 'service-3';
};

export const sectionsData: Array<SectionData> = [
	{
		title: 'Digital Infrastructure',
		subtitle:
			'Simulating the societal, environmental, and economic impact of infrastructure projects with immersive digital twins',
		href: '/services/digital-infrastructure/',
		associatedState: 'service-1' as 'service-1'
	},
	{
		title: 'Driving Simulation',
		subtitle: 'Behavioural science and road safety research',
		href: '/services/driving-simulation/',
		associatedState: 'service-2' as 'service-2'
	},
	{
		title: 'Simulations for Scenario Planning, Learning and Development',
		subtitle: 'Interactive and immersive learning environments',
		href: '/services/interactive-and-immersive-learning-environments/',
		associatedState: 'service-3' as 'service-3'
	}
];

// Note that if the url is '/services' we want it to be considered the first section
// pageRouteId should be provided by Svelte's `$page.route.id`.
export function getCurrentSectionData(
	pageRouteId: string | null
): { data: SectionData; index: number } | undefined {
	let index: number | undefined = undefined;
	if (pageRouteId === '/services/') {
		index = 0;
	} else {
		index = sectionsData.findIndex(({ href }) => href === pageRouteId);
	}

	const sectionData = sectionsData.at(index);
	if (sectionData !== undefined) {
		return { data: sectionData, index };
	} else {
		return undefined;
	}
}
