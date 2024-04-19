// Based on https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Math/Mathf.cs.

import { P, match } from 'ts-pattern';
import * as d3 from 'd3';

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

	// In case deltaTime is 0.
	if (Number.isNaN(currentVelocity)) {
		currentVelocity = 0;
	}

	return { output, currentVelocity };
}

export function smoothDampAngle(
	current: number,
	target: number,
	currentVelocity: number,
	smoothTime: number,
	deltaTime: DOMHighResTimeStamp,
	direction: 'shortest' | 'clockwise' | 'anticlockwise',
	maxSpeed?: undefined | number
) {
	target = current + deltaAngle(current, target, direction);
	return smoothDamp(current, target, currentVelocity, smoothTime, deltaTime, maxSpeed);
}

// Managed state for a smoothdamp animation.
// Call `tick()` at every frame.
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

export function smoothDampAngleAnimation(
	initialValue: number,
	smoothTime: number,
	direction: 'shortest' | 'clockwise' | 'anticlockwise',
	keepInRangeFrom0To360: boolean,
	maxSpeed?: undefined | number
) {
	let current = initialValue;
	let target = initialValue;
	let velocity = 0;
	const tick = (deltaTime: DOMHighResTimeStamp) => {
		const smoothDampResult = smoothDampAngle(
			current,
			target,
			velocity,
			smoothTime,
			deltaTime,
			direction,
			maxSpeed
		);
		velocity = smoothDampResult.currentVelocity;
		current = smoothDampResult.output;
		if (keepInRangeFrom0To360) {
			current = repeat(current, 360);
		}
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

export function perpetualSmoothDampAngleAnimation(
	initialState: { keepRotating: { by: number; initialValue: number } } | { fixedTarget: number },
	smoothTime: number,
	direction: 'clockwise' | 'anticlockwise',
	keepInRangeFrom0To360: boolean,
	maxSpeed?: undefined | number
) {
	const initialValue = match(initialState)
		.with({ keepRotating: { initialValue: P.select() } }, (v) => v)
		.with({ fixedTarget: P.select() }, (v) => v)
		.exhaustive();
	let current = initialValue;
	let target = initialValue;
	let velocity = 0;
	let state = match(initialState)
		.with({ keepRotating: { by: P.select() } }, (by) => ({ keepRotatingBy: by }))
		.with({ fixedTarget: P.select() }, (v) => ({ fixedTarget: v }))
		.exhaustive();
	const tick = (deltaTime: DOMHighResTimeStamp) => {
		match(state).with({ keepRotatingBy: P.select() }, (by) => {
			if (direction === 'anticlockwise') {
				by *= -1;
			}
			target += by * deltaTime;
		});
		const smoothDampResult = smoothDampAngle(
			current,
			target,
			velocity,
			smoothTime,
			deltaTime,
			direction,
			maxSpeed
		);
		velocity = smoothDampResult.currentVelocity;
		current = smoothDampResult.output;
		if (keepInRangeFrom0To360) {
			current = repeat(current, 360);
		}
	};

	return {
		get current() {
			return current;
		},
		set state(value: { keepRotatingBy: number } | { fixedTarget: number }) {
			state = value;
			match(value)
				.with({ keepRotatingBy: P.select() }, () => {
					let approximateProjectedTarget = current + velocity * 0.45;
					target = approximateProjectedTarget;
				})
				.with({ fixedTarget: P.select() }, (t) => {
					target = t;
				});
		},
		tick
	};
}

export function smoothDampColorAnimation(
	initialValue: string,
	smoothTime: number,
	maxSpeed?: undefined | number
) {
	let colorFrom = initialValue;
	let colorTo = initialValue;
	let currentInterpolationValue = 1;
	const targetInterpolationValue = 1;
	let velocity = 0;
	const currentColor = () => d3.interpolateLab(colorFrom, colorTo)(currentInterpolationValue);
	const setTarget = (value: string) => {
		colorFrom = currentColor();
		colorTo = value;
		currentInterpolationValue = 0;
	};
	const tick = (deltaTime: DOMHighResTimeStamp) => {
		const smoothDampResult = smoothDamp(
			currentInterpolationValue,
			targetInterpolationValue,
			velocity,
			smoothTime,
			deltaTime,
			maxSpeed
		);
		velocity = smoothDampResult.currentVelocity;
		currentInterpolationValue = smoothDampResult.output;
	};

	return {
		set target(value: string) {
			setTarget(value);
		},
		get current() {
			return currentColor();
		},
		tick
	};
}

// Calculates the shortest difference between two given angles.
function deltaAngle(
	current: number,
	target: number,
	direction: 'shortest' | 'clockwise' | 'anticlockwise'
) {
	let delta = repeat(target - current, 360);
	if (delta > 180) {
		delta -= 360;
	}

	return match(direction)
		.with('shortest', () => delta)
		.with('clockwise', () => {
			if (delta < 0) {
				return delta + 360;
			} else {
				return delta;
			}
		})
		.with('anticlockwise', () => {
			if (delta > 0) {
				return delta - 360;
			} else {
				return delta;
			}
		})
		.exhaustive();
}

// Loops the value t, so that it is never larger than max and never smaller than 0.
function repeat(t: number, max: number) {
	return clamp(t - Math.floor(t / max) * max, 0, max);
}

// Clamps a value between a minimum float and maximum float value.
function clamp(value: number, min: number, max: number) {
	if (value < min) {
		value = min;
	} else if (value > max) {
		value = max;
	}
	return value;
}
