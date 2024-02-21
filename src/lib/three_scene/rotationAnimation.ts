// `maxRotationDelta`: maximum rotation change per second.
export function rotationAnimation(
	initialRotationDeg: number,
	clockwise: boolean,
	maxRotationDelta: number
) {
	let currentRotation = initialRotationDeg;
	let targetRotation = initialRotationDeg;

	const tick = (dt: number) => {
		let shortestAngle = (targetRotation - currentRotation + 360) % 360;
		if (shortestAngle > 360 / 2) {
			shortestAngle -= 360;
		}
		const direction = clockwise ? 1 : -1;
		const rotationDelta =
			Math.min(maxRotationDelta * dt * 0.01, Math.abs(shortestAngle)) * direction;
		const dampFactor = 0.1;
		const dampedRotationDelta = rotationDelta * (1 - Math.exp(-dampFactor * dt * 0.01));
		const newRotation = (currentRotation + dampedRotationDelta + 360) % 360;
		currentRotation = newRotation;
	};

	return {
		get rotation() {
			return currentRotation;
		},
		setTargetRotation: (newTargetRotation: number) => {
			targetRotation = newTargetRotation;
		},
		tick
	};
}
