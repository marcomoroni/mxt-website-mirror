// Based on https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Math/Mathf.cs.

import { clamp } from '$lib/clamp';

// Gradually changes a value towards a desired goal over time.
export function smoothDamp(
	current: number,
	target: number,
	currentVelocity: number,
	smoothTime: number,
	deltaTime: DOMHighResTimeStamp,
	maxSpeed?: undefined | number
) {
	deltaTime *= 0.001;

	// Based on Game Programming Gems 4 Chapter 1.10
	smoothTime = Math.max(0.0001, smoothTime);
	const omega = 2.0 / smoothTime;

	const x = omega * deltaTime;
	const exp = 1.0 / (1.0 + x + 0.48 * x * x + 0.235 * x * x * x);
	let change = current - target;
	const originalTo = target;

	// Clamp maximum speed
	maxSpeed = maxSpeed ?? Number.MAX_VALUE;
	const maxChange = maxSpeed * smoothTime;
	change = clamp(change, -maxChange, maxChange);
	target = current - change;

	const temp = (currentVelocity + omega * change) * deltaTime;
	currentVelocity = (currentVelocity - omega * temp) * exp;
	let output = target + (change + temp) * exp;

	// Prevent overshooting
	if (originalTo - current > 0.0 == output > originalTo) {
		output = originalTo;
		currentVelocity = (output - originalTo) / deltaTime;
	}

	return { output, currentVelocity };
}

export function smoothDampAnimation(
	initialValue: number,
	smoothTime: number,
	maxSpeed?: undefined | number
) {
	let current = initialValue;
	let target = initialValue;
	let velocity = 0;
	const tick = (deltaTime: DOMHighResTimeStamp) => {
		const smoothDampResult = smoothDamp(current, target, velocity, smoothTime, deltaTime, maxSpeed);
		velocity = smoothDampResult.currentVelocity;
		current = smoothDampResult.output;
	};

	return {
		set target(value: number) {
			target = value;
		},
		get current() {
			return current;
		},
		tick
	};
}
