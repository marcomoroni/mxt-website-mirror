import { smoothDampAnimation, type SmoothDampAnimation } from '$lib/smoothDamp';

const smoothTime = 0.4;
const visibilityWhenVisible = 1;
const visibilityWhenInvisible = 0;

// An animation controller that manages the visibility of different elements by providing
// a fading value for each of them. Only one of such elements can be visibile at one time.
// Identify the different elements by their index.
export function servicesPropsVisibilityAnimation(
	initialVisibleItemIndex: undefined | number,
	itemsCount: number
) {
	const itemsVisibility: Array<SmoothDampAnimation> = [];
	for (let i = 0; i < itemsCount; i++) {
		itemsVisibility[i] = smoothDampAnimation(
			initialVisibleItemIndex === i ? visibilityWhenVisible : visibilityWhenInvisible,
			smoothTime
		);
	}
	let targetVisibleItemIndex: undefined | number = initialVisibleItemIndex;

	const setVisibleItem = (itemIndex: undefined | number) => {
		targetVisibleItemIndex = itemIndex;
		itemsVisibility.forEach((visibility, i) => {
			const shouldBeInvisible = i !== itemIndex;
			if (shouldBeInvisible) {
				visibility.target = visibilityWhenInvisible;
			}
		});
	};

	const tick = (dt: DOMHighResTimeStamp) => {
		const anotherNonTargetIsStillVisible = itemsVisibility.some(
			({ current }, i) => i !== targetVisibleItemIndex && current > 0.001
		);
		if (!anotherNonTargetIsStillVisible && targetVisibleItemIndex != undefined) {
			itemsVisibility[targetVisibleItemIndex].target = visibilityWhenVisible;
		}
		itemsVisibility.forEach(({ tick }) => tick(dt));
	};

	return {
		setVisibleItem,
		tick,
		getVisibility: (itemIndex: number) => itemsVisibility[itemIndex].current
	};
}
