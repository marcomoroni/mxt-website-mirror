import { linear } from 'svelte/easing';
import { spring, tweened, type Unsubscriber } from 'svelte/motion';
import { get, writable } from 'svelte/store';
import { P, match } from 'ts-pattern';

/**
 * Each web page should have a scenario, which represents how the dots and other
 * elements that animate along with dots should be.
 */
export type Scenario = {
	accentColorsActive: boolean;
	fitModel:
		| 'No'
		| {
				Yes: {
					name: string;
				};
		  };
};

export function dotsAnimationController(
	// Load everything so there's no async!
	initialHandles: Array<Symbol>,
	particlesCount: { x: number; y: number },
	// These are getters because they may be available later. The `initialHandles` will make sure that
	// I they are ready when I request them.
	models: Map<string, { vertices: () => Float32Array }>
) {
	const particlesCountTot = particlesCount.x * particlesCount.y;

	let unresolvedInitialHandles = [...initialHandles];

	let currentScenario: 'None' | { Scenario: Scenario } = 'None';
	let nextScenario: 'None' | { Scenario: Scenario } = 'None';

	// These are the values that are exposed to the outside.
	const animationValuesStores = {
		dotsVisibility: writable(0),
		dotsAccentColours: writable(0),
		dotGridToModelPos: writable(0),
		dotsModelPositions: writable(new Float32Array(particlesCountTot * 3)),
		modelsOpacity: new Map([...models.keys()].map((key) => [key, writable(0)])),
		cameraGridToModel: writable(0),
		homePageRipple: writable(0)
	};

	// Animations.
	const dotsVisibilityAnim = spring(get(animationValuesStores.dotsVisibility), {
		stiffness: 0.02
	});
	const dotsAccentColoursAnim = spring(get(animationValuesStores.dotsAccentColours), {
		stiffness: 0.02
	});
	// const dotsGridToModelAnimAnim = spring(get(animationValuesStores.dotGridToModelPos), {
	// 	stiffness: 0.01,
	// 	precision: 0.0001
	// });
	const dotsGridToModelAnimAnim = tweened(get(animationValuesStores.dotGridToModelPos), {
		duration: 6000,
		easing: linear
	});
	// ---- this should be passed through a curve, so it stays at 0 for longer
	const modelOpacityAnims = new Map(
		[...animationValuesStores.modelsOpacity.entries()].map(([name_, store]) => [
			name_,
			tweened(get(store), { duration: 3000, easing: linear })
			// spring(get(store), {
			// 	stiffness: 0.005
			// })
		])
	);
	const cameraGridToModelAnim = spring(get(animationValuesStores.cameraGridToModel), {
		stiffness: 0.002
	});
	const homePageRippleAnim = spring(get(animationValuesStores.homePageRipple), {
		stiffness: 0.0021,
		damping: 0.75
	});

	// Bind animations to the values that are exposed to the user.
	const dotsVisibilityAnimUnsubscriber = dotsVisibilityAnim.subscribe((value) =>
		animationValuesStores.dotsVisibility.set(value)
	);
	const dotsAccentColoursAnimUnsibscriber = dotsAccentColoursAnim.subscribe((value) =>
		animationValuesStores.dotsAccentColours.set(value)
	);
	const dotsGridToModelAnimAnimUnsubscriber = dotsGridToModelAnimAnim.subscribe((value) => {
		// Map to a curve that make the 1 last longer.
		value = quarticInOut(value);
		value = map(value, 0, 1, 0, 2.1);
		value = saturate(value);
		// --- you'll also likely to make the animation a liear tween
		// ...

		animationValuesStores.dotGridToModelPos.set(value);
	});
	const modelOpacityAnimsUnsubscribers = [...modelOpacityAnims.entries()].reduce(
		(unsubscribers, [name, anim]) => {
			const unsubscriber = anim.subscribe((value) => {
				// Map to a curve that make the 0 last longer.
				value = quarticInOut(value);
				value = map(value, 0, 1, -1.1, 1);
				value = saturate(value);

				animationValuesStores.modelsOpacity.get(name)?.set(value);
			});
			return [unsubscriber, ...unsubscribers];
		},
		[] as Array<Unsubscriber>
	);
	const cameraGridToModelAnimUnsubscriber = cameraGridToModelAnim.subscribe((value) => {
		animationValuesStores.cameraGridToModel.set(value);
	});
	const homePageRippleAnimUnsubscriber = homePageRippleAnim.subscribe((value) => {
		animationValuesStores.homePageRipple.set(value);
	});

	const tryTransitionToNextScenario = () => {
		// If can start transition to next scenario.
		if (nextScenario !== 'None' && unresolvedInitialHandles.length === 0) {
			const scenarioTransitioningFrom = currentScenario;
			const scenarioTransitioningTo: Scenario = nextScenario.Scenario;

			// Start transition to next scenario.
			match(scenarioTransitioningFrom)
				.with('None', () => {
					dotsAccentColoursAnim.set(scenarioTransitioningTo.accentColorsActive ? 1 : 0, {
						hard: true
					});
					match(scenarioTransitioningTo.fitModel)
						.with({ Yes: { name: P.select() } }, (modelName) => {
							dotsGridToModelAnimAnim.set(1, { hard: 1 });
							animationValuesStores.dotsModelPositions.set(models.get(modelName)!.vertices());
							modelOpacityAnims.get(modelName)!.set(1);
							cameraGridToModelAnim.set(1, { hard: true });
							homePageRippleAnim.set(1, { hard: true });
							// ...
						})
						.with('No', () => {
							dotsVisibilityAnim.set(1);
							cameraGridToModelAnim.set(0, { hard: true });
							setTimeout(() => {
								homePageRippleAnim.set(1);
							}, 500);
						});
				})
				.with({ Scenario: P.select() }, (from) => {
					dotsAccentColoursAnim.set(scenarioTransitioningTo.accentColorsActive ? 1 : 0);

					match(from.fitModel).with({ Yes: { name: P.select() } }, (modelName) => {
						modelOpacityAnims.get(modelName)!.set(0);
					});

					// If from model to no model.
					match({ from: from.fitModel, to: scenarioTransitioningTo.fitModel })
						.with({ from: { Yes: { name: P.select() } }, to: 'No' }, (modelName) => {
							animationValuesStores.dotsModelPositions.set(models.get(modelName)!.vertices());
						})
						.with({ from: 'No', to: { Yes: { name: P.select() } } }, (modelName) => {
							animationValuesStores.dotsModelPositions.set(models.get(modelName)!.vertices());
						});

					match(scenarioTransitioningTo.fitModel)
						.with({ Yes: { name: P.select() } }, (modelName) => {
							dotsVisibilityAnim.set(0);
							dotsGridToModelAnimAnim.set(1);
							modelOpacityAnims.get(modelName)!.set(1);
							cameraGridToModelAnim.set(1);
						})
						.with('No', () => {
							dotsVisibilityAnim.set(1);
							dotsGridToModelAnimAnim.set(0);
							cameraGridToModelAnim.set(0);
						});
				})
				.exhaustive();

			currentScenario = { Scenario: scenarioTransitioningTo };
			nextScenario = 'None';
		}
	};

	return {
		values: {
			dotsVisibility: {
				subscribe: animationValuesStores.dotsVisibility.subscribe,
				get: () => get(animationValuesStores.dotsVisibility)
			},
			dotsAccentColours: {
				subscribe: animationValuesStores.dotsAccentColours.subscribe,
				get: () => get(animationValuesStores.dotsAccentColours)
			},
			dotsGridToModel: {
				subscribe: animationValuesStores.dotGridToModelPos.subscribe,
				get: () => get(animationValuesStores.dotGridToModelPos)
			},
			dotsModelPositions: {
				subscribe: animationValuesStores.dotsModelPositions.subscribe,
				get: () => get(animationValuesStores.dotsModelPositions)
			},
			modelOpacities: new Map(
				[...animationValuesStores.modelsOpacity.entries()].map(([name, store]) => [
					name,
					{
						subscribe: store.subscribe,
						get: () => get(store)
					}
				])
			),
			cameraGridToModel: {
				subscribe: animationValuesStores.cameraGridToModel.subscribe,
				get: () => get(animationValuesStores.cameraGridToModel)
			},
			homePageRipple: {
				subscribe: animationValuesStores.homePageRipple.subscribe,
				get: () => get(animationValuesStores.homePageRipple)
			}
		},
		update: (scenario: Scenario) => {
			nextScenario = { Scenario: scenario };
			tryTransitionToNextScenario();
		},
		resolveInitialHandle: (handle: Symbol) => {
			unresolvedInitialHandles = unresolvedInitialHandles.filter((h) => h !== handle);
			tryTransitionToNextScenario();
		},
		dispose: () => {
			dotsVisibilityAnimUnsubscriber();
			dotsAccentColoursAnimUnsibscriber();
			dotsGridToModelAnimAnimUnsubscriber();
			modelOpacityAnimsUnsubscribers.forEach((unsubscriber) => {
				unsubscriber();
			});
			cameraGridToModelAnimUnsubscriber();
			homePageRippleAnimUnsubscriber();
		}
	};
}

function quarticInOut(t: number): number {
	return t < 0.5 ? +8.0 * Math.pow(t, 4.0) : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
}

function map(value: number, min1: number, max1: number, min2: number, max2: number): number {
	return min2 + ((value - min1) * (max2 - min2)) / (max1 - min1);
}

function saturate(value: number): number {
	return Math.min(1, Math.max(0, value));
}
