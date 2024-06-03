import { accentColor1, accentColor2, accentColor3 } from '$lib/cssValues';
import * as d3 from 'd3';

export function siteWideAccentColor(animationDuration: number) {
	// const gradient = d3.interpolateRgbBasisClosed([accentColor1, accentColor2, accentColor3]);
	const gradient = [
		d3.interpolateLab(accentColor1, accentColor2),
		d3.interpolateLab(accentColor2, accentColor3),
		d3.interpolateLab(accentColor3, accentColor1)
	];
	let currentAnimationTime = 0;
	const tick = (dt: DOMHighResTimeStamp) => {
		currentAnimationTime += dt;
		if (currentAnimationTime > animationDuration) {
			currentAnimationTime = 0;
		}
	};
	const current = () => {
		const t = currentAnimationTime / animationDuration;
		const segment = t * gradient.length;
		const segmentIndex = Math.floor(segment);
		const segmentT = segment - segmentIndex;
		return gradient[segmentIndex % gradient.length](segmentT);
	};

	return {
		tick,
		get current() {
			return current();
		}
	};
}
