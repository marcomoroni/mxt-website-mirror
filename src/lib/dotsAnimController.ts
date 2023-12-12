import { linear, quartInOut } from 'svelte/easing';
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

	const dotsGridToModelAnimAnimDuration = 4000;
	const dotFixedScaleAnimDuration = 4000;
	const dotsVisibilityWhenInModelAnimDuration = 2000;

	// These are the values that are exposed to the outside.
	const animationValuesStores = {
		dotsVisibility: writable(0),
		dotsAccentColours: writable(0),
		dotGridToModelPos: writable(0),
		dotsModelPositions: writable(new Float32Array(particlesCountTot * 3)),
		modelsOpacity: new Map([...models.keys()].map((key) => [key, writable(0)])),
		cameraGridToModel: writable(0),
		homePageRipple: writable(0),
		// When morphin into a model, the size of the dots becomes the same across all the dots.
		dotFixedScale: writable(0),
		dotsVisibilityWhenInModel: writable(0)
	};

	// Animations.
	const dotsVisibilityAnim = spring(get(animationValuesStores.dotsVisibility), {
		stiffness: 0.02
	});
	const dotsAccentColoursAnim = spring(get(animationValuesStores.dotsAccentColours), {
		stiffness: 0.02
	});
	const dotsGridToModelAnimAnim = tweened(get(animationValuesStores.dotGridToModelPos), {
		duration: dotsGridToModelAnimAnimDuration,
		easing: quartInOut
	});
	const modelOpacityAnims = new Map(
		[...animationValuesStores.modelsOpacity.entries()].map(([name_, store]) => [
			name_,
			tweened(get(store), { duration: 4000, easing: linear })
		])
	);
	const cameraGridToModelAnim = spring(get(animationValuesStores.cameraGridToModel), {
		stiffness: 0.002
	});
	const homePageRippleAnim = spring(get(animationValuesStores.homePageRipple), {
		stiffness: 0.0021,
		damping: 0.75
	});
	const dotFixedScaleAnim = tweened(get(animationValuesStores.dotFixedScale), {
		duration: dotFixedScaleAnimDuration,
		easing: quartInOut
	});
	const dotsVisibilityWhenInModelAnim = tweened(
		get(animationValuesStores.dotsVisibilityWhenInModel),
		{
			duration: dotsVisibilityWhenInModelAnimDuration,
			easing: quartInOut
		}
	);

	// Bind animations to the values that are exposed to the user.
	const dotsVisibilityAnimUnsubscriber = dotsVisibilityAnim.subscribe((value) =>
		animationValuesStores.dotsVisibility.set(value)
	);
	const dotsAccentColoursAnimUnsibscriber = dotsAccentColoursAnim.subscribe((value) =>
		animationValuesStores.dotsAccentColours.set(value)
	);
	const dotsGridToModelAnimAnimUnsubscriber = dotsGridToModelAnimAnim.subscribe((value) => {
		animationValuesStores.dotGridToModelPos.set(value);
	});
	const modelOpacityAnimsUnsubscribers = [...modelOpacityAnims.entries()].reduce(
		(unsubscribers, [name, anim]) => {
			const unsubscriber = anim.subscribe((value) => {
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
	const dotFixedScaleAnimUnsibscriber = dotFixedScaleAnim.subscribe((value) => {
		animationValuesStores.dotFixedScale.set(value);
	});
	const dotsVisibilityWhenInModelAnimUnsibscriber = dotsVisibilityWhenInModelAnim.subscribe(
		(value) => {
			animationValuesStores.dotsVisibilityWhenInModel.set(value);
		}
	);

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
					dotsVisibilityAnim.set(1);
					match(scenarioTransitioningTo.fitModel)
						.with({ Yes: { name: P.select() } }, (modelName) => {
							dotsGridToModelAnimAnim.set(1, { duration: 0 }); // this does not override it?
							animationValuesStores.dotsModelPositions.set(models.get(modelName)!.vertices());
							modelOpacityAnims.get(modelName)!.set(1);
							cameraGridToModelAnim.set(1, { hard: true });
							homePageRippleAnim.set(1, { hard: true });
							dotFixedScaleAnim.set(1, { duration: 0 });
							dotsVisibilityWhenInModelAnim.set(0, { duration: 0 });
						})
						.with('No', () => {
							cameraGridToModelAnim.set(0, { hard: true });
							dotsVisibilityWhenInModelAnim.update(() => 1);
							setTimeout(() => {
								homePageRippleAnim.set(1);
							}, 500);
						});
				})
				.with({ Scenario: P.select() }, (from) => {
					dotsAccentColoursAnim.set(scenarioTransitioningTo.accentColorsActive ? 1 : 0);

					match(from.fitModel).with({ Yes: { name: P.select() } }, (modelName) => {
						modelOpacityAnims.get(modelName)!.set(0, { delay: 0 });
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
							dotsGridToModelAnimAnim.set(1, {
								duration: dotsGridToModelAnimAnimDuration,
								delay: 0
							});
							modelOpacityAnims.get(modelName)!.set(1, { delay: 3000 });
							cameraGridToModelAnim.set(1);
							dotFixedScaleAnim.set(1, { duration: dotFixedScaleAnimDuration, delay: 0 });
							dotsVisibilityWhenInModelAnim.set(0, {
								duration: dotsVisibilityWhenInModelAnimDuration,
								delay: 4000
							});
						})
						.with('No', () => {
							dotsGridToModelAnimAnim.set(0, {
								duration: dotsGridToModelAnimAnimDuration,
								delay: 2000
							});
							cameraGridToModelAnim.set(0);
							dotFixedScaleAnim.set(0, { duration: dotFixedScaleAnimDuration, delay: 2000 });
							dotsVisibilityWhenInModelAnim.set(1, {
								duration: dotsVisibilityWhenInModelAnimDuration,
								delay: 1000
							});
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
			},
			dotFixedScale: {
				subscribe: animationValuesStores.dotFixedScale.subscribe,
				get: () => get(animationValuesStores.dotFixedScale)
			},
			dotsVisibilityWhenInModel: {
				subscribe: animationValuesStores.dotsVisibilityWhenInModel.subscribe,
				get: () => get(animationValuesStores.dotsVisibilityWhenInModel)
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
			dotFixedScaleAnimUnsibscriber();
			dotsVisibilityWhenInModelAnimUnsibscriber();
		}
	};
}
