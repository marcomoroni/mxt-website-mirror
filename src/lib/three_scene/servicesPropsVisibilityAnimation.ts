import { map } from '$lib/map';
import { smoothDampAnimation, type SmoothDampAnimation } from '$lib/smoothDamp';

const smoothTime = 0.2;
const visibilityWhenVisible = 1;
const visibilityWhenInvisible = 0;

// An animation controller that manages the visibility of different elements by providing
// a fading value for each of them. Only one of such elements can be visibile at one time.
// Identify the different elements by their index.
export function servicesPropsVisibilityAnimation(
	initialVisibleItemIndex: undefined | number,
	itemsCount: number,
	fadeInMinCameraDistance: number
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

	const tick = (dt: DOMHighResTimeStamp, cameraDistance: number) => {
		const anotherNonTargetIsStillVisible = itemsVisibility.some(
			({ current }, i) => i !== targetVisibleItemIndex && current > 0.001
		);
		if (
			!anotherNonTargetIsStillVisible &&
			targetVisibleItemIndex != undefined &&
			cameraDistance > fadeInMinCameraDistance
		) {
			itemsVisibility[targetVisibleItemIndex].target = visibilityWhenVisible;
		}
		itemsVisibility.forEach(({ tick }) => tick(dt));
	};

	// The visibility value, which is from 0 to 1, is then split in two (see `splitVisibility`). Because
	// opacity is on a fragment shader, faces behind other transparent faces are visibile. This is particularly bad when
	// a semitransparent coloured part of the mesh is partially visibile when this animation occurs.
	// As a solution, animate the parts, which coulours would collide, sequentially.
	const splitVisibility = (visibility: number) => {
		return {
			meshVisibility: Math.min(1, Math.max(0, map(visibility, 0, 0.5, 0, 1))),
			backgroundVisibility: Math.min(1, Math.max(0, map(visibility, 0.5, 1, 0, 1)))
		};
	};

	return {
		setVisibleItem,
		tick,
		getVisibility: (itemIndex: number) => splitVisibility(itemsVisibility[itemIndex].current)
	};
}
