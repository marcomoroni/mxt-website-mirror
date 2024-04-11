import {
	accentColor1,
	accentColor2,
	accentColor3,
	accentColor5,
	backgroundColor
} from '$lib/cssValues';
import { match } from 'ts-pattern';
import * as d3 from 'd3';
import { perlin1d } from '$lib/perlin';

function map(value: number, min1: number, max1: number, min2: number, max2: number) {
	return min2 + ((value - min1) * (max2 - min2)) / (max1 - min1);
}

// --- really need to use css for interpolation now that colours jump around

export function dioramaColorPalettes() {
	const noise = perlin1d();
	const interpolateFunction = (colorList: Array<string>, normalizedI: number) =>
		d3.piecewise(d3.interpolateRgb.gamma(2.2), colorList)(normalizedI);
	const accentColorFromNoise = (noiseValue: number, displacement: number) => {
		let noiseResult = noise.getValue(noiseValue + displacement);
		noiseResult = map(noiseResult, -1, 1, 0, 1);
		return interpolateFunction(
			[accentColor2, accentColor1, accentColor3, accentColor5],
			noiseResult
		);
	};
	const darkAccentColor1 = '#85824D';
	const darkAccentColor2 = '#996334';
	const darkAccentColor3 = '#868F87';
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
			accentColor1: (_noiseValue: number) => '#E9E2DE',
			accentColor2: (_noiseValue: number) => '#E9E2DE',
			accentColor3: (_noiseValue: number) => '#E9E2DE',
			accentColor4: '#C0BBB1',
			highlightColor: '#F9F7F6'
		},
		{
			name: 'hidden',
			baseColor: backgroundColor,
			baseShadowColor: backgroundColor,
			accentColor1: (_noiseValue: number) => backgroundColor,
			accentColor2: (_noiseValue: number) => backgroundColor,
			accentColor3: (_noiseValue: number) => backgroundColor,
			accentColor4: backgroundColor,
			highlightColor: backgroundColor
		},
		{
			name: 'services1',
			baseColor: accentColor1,
			baseShadowColor: 'black',
			accentColor1: (_noiseValue: number) => darkAccentColor1,
			accentColor2: (_noiseValue: number) => darkAccentColor1,
			accentColor3: (_noiseValue: number) => darkAccentColor1,
			accentColor4: accentColor1,
			highlightColor: 'white'
		},
		{
			name: 'services2',
			baseColor: accentColor2,
			baseShadowColor: 'black',
			accentColor1: (_noiseValue: number) => darkAccentColor2,
			accentColor2: (_noiseValue: number) => darkAccentColor2,
			accentColor3: (_noiseValue: number) => darkAccentColor2,
			accentColor4: accentColor2,
			highlightColor: 'white'
		},
		{
			name: 'services3',
			baseColor: accentColor3,
			baseShadowColor: 'black',
			accentColor1: (_noiseValue: number) => darkAccentColor3,
			accentColor2: (_noiseValue: number) => darkAccentColor3,
			accentColor3: (_noiseValue: number) => darkAccentColor3,
			accentColor4: accentColor3,
			highlightColor: 'white'
		}
	];
	const nameToIndex = (
		name: 'default' | 'dim' | 'hidden' | 'service-1' | 'service-2' | 'service-3'
	) =>
		match(name)
			.with('default', () => 0)
			.with('dim', () => 1)
			.with('hidden', () => 2)
			.with('service-1', () => 3)
			.with('service-2', () => 4)
			.with('service-3', () => 5)
			.exhaustive();
	const indexToName = (index: number) =>
		match(index)
			.returnType<'default' | 'dim' | 'hidden' | 'service-1' | 'service-2' | 'service-3'>()
			.with(0, () => 'default')
			.with(1, () => 'dim')
			.with(2, () => 'hidden')
			.with(3, () => 'service-1')
			.with(4, () => 'service-2')
			.with(5, () => 'service-3')
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
