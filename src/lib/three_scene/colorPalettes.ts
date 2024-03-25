import { accentColor1, accentColor2, accentColor3, backgroundColor } from '$lib/cssValues';
import { match } from 'ts-pattern';
import * as d3 from 'd3';
import { perlin1d } from '$lib/perlin';

function map(value: number, min1: number, max1: number, min2: number, max2: number) {
	return min2 + ((value - min1) * (max2 - min2)) / (max1 - min1);
}

export function colorPalettes() {
	const noise = perlin1d();
	const interpolateFunction = (colorList: Array<string>, normalizedI: number) =>
		d3.piecewise(d3.interpolateRgb.gamma(2.2), colorList)(normalizedI);
	const accentColorFromNoise = (noiseValue: number, displacement: number) => {
		let noiseResult = noise.getValue(noiseValue + displacement);
		noiseResult = map(noiseResult, -1, 1, 0, 1);
		return interpolateFunction([accentColor2, accentColor1, accentColor3], noiseResult);
	};
	const list = [
		{
			name: 'default',
			baseColor: '#EEE8E4',
			baseShadowColor: 'black',
			accentColor1: (noiseValue: number) => accentColorFromNoise(noiseValue, 0),
			accentColor2: (noiseValue: number) => accentColorFromNoise(noiseValue, 20000),
			accentColor3: (noiseValue: number) => accentColorFromNoise(noiseValue, 40000),
			accentColor4: '#C0BBB1',
			highlightColor: 'white'
		},
		{
			name: 'dimmed',
			baseColor: '#F2ECEA',
			baseShadowColor: '#AAAAAA',
			accentColor1: (noiseValue: number) => '#E9E2DE',
			accentColor2: (noiseValue: number) => '#E9E2DE',
			accentColor3: (noiseValue: number) => '#E9E2DE',
			accentColor4: '#C0BBB1',
			highlightColor: '#F9F7F6'
		},
		{
			name: 'hidden',
			baseColor: backgroundColor,
			baseShadowColor: backgroundColor,
			accentColor1: (noiseValue: number) => backgroundColor,
			accentColor2: (noiseValue: number) => backgroundColor,
			accentColor3: (noiseValue: number) => backgroundColor,
			accentColor4: backgroundColor,
			highlightColor: backgroundColor
		}
	];
	const nameToIndex = (name: 'default' | 'dim' | 'hidden') =>
		match(name)
			.with('default', () => 0)
			.with('dim', () => 1)
			.with('hidden', () => 2)
			.exhaustive();
	const indexToName = (index: number) =>
		match(index)
			.returnType<'default' | 'dimmed' | 'hidden'>()
			.with(0, () => 'default')
			.with(1, () => 'dimmed')
			.with(2, () => 'hidden')
			.otherwise(() => {
				throw new Error('?');
			});
	const interpolateFunctions = {
		baseColor: (normalizedI: number) =>
			interpolateFunction(
				list.map((p) => p.baseColor),
				normalizedI
			),
		baseShadowColor: (normalizedI: number) =>
			interpolateFunction(
				list.map((p) => p.baseShadowColor),
				normalizedI
			),
		accentColor1: (normalizedI: number, noiseValue: number) =>
			interpolateFunction(
				list.map((p) => p.accentColor1(noiseValue)),
				normalizedI
			),
		accentColor2: (normalizedI: number, noiseValue: number) =>
			interpolateFunction(
				list.map((p) => p.accentColor2(noiseValue)),
				normalizedI
			),
		accentColor3: (normalizedI: number, noiseValue: number) =>
			interpolateFunction(
				list.map((p) => p.accentColor3(noiseValue)),
				normalizedI
			),
		accentColor4: (normalizedI: number) =>
			interpolateFunction(
				list.map((p) => p.accentColor4),
				normalizedI
			),
		highlightColor: (normalizedI: number) =>
			interpolateFunction(
				list.map((p) => p.highlightColor),
				normalizedI
			)
	};

	return {
		nameToIndex,
		indexToName,
		interpolated(index: number, noiseValue: number) {
			const normalizedI = index / (list.length - 1);
			return {
				baseColor: interpolateFunctions.baseColor(normalizedI),
				baseShadowColor: interpolateFunctions.baseShadowColor(normalizedI),
				accentColor1: interpolateFunctions.accentColor1(normalizedI, noiseValue),
				accentColor2: interpolateFunctions.accentColor2(normalizedI, noiseValue),
				accentColor3: interpolateFunctions.accentColor3(normalizedI, noiseValue),
				accentColor4: interpolateFunctions.accentColor4(normalizedI),
				highlightColor: interpolateFunctions.highlightColor(normalizedI)
			};
		}
	};
}
