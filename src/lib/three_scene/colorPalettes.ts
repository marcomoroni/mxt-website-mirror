import { accentColor1, accentColor2, accentColor3, backgroundColor } from '$lib/cssValues';
import { match } from 'ts-pattern';
import * as d3 from 'd3';

export function colorPalettes() {
	const list = [
		{
			name: 'default',
			baseColor: '#EEE8E4',
			baseShadowColor: 'black',
			accentColor1: accentColor2,
			accentColor2: accentColor3,
			accentColor3: accentColor1,
			accentColor4: '#C0BBB1',
			highlightColor: 'white'
		},
		{
			name: 'dimmed',
			baseColor: '#F2ECEA',
			baseShadowColor: '#AAAAAA',
			accentColor1: '#E9E2DE',
			accentColor2: '#E9E2DE',
			accentColor3: '#E9E2DE',
			accentColor4: '#C0BBB1',
			highlightColor: '#F9F7F6'
		},
		{
			name: 'hidden',
			baseColor: backgroundColor,
			baseShadowColor: backgroundColor,
			accentColor1: backgroundColor,
			accentColor2: backgroundColor,
			accentColor3: backgroundColor,
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
	const interpolateFunction = (colorList: Array<string>, normalizedI: number) =>
		d3.piecewise(d3.interpolateRgb.gamma(2.2), colorList)(normalizedI);
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
		accentColor1: (normalizedI: number) =>
			interpolateFunction(
				list.map((p) => p.accentColor1),
				normalizedI
			),
		accentColor2: (normalizedI: number) =>
			interpolateFunction(
				list.map((p) => p.accentColor2),
				normalizedI
			),
		accentColor3: (normalizedI: number) =>
			interpolateFunction(
				list.map((p) => p.accentColor3),
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
		interpolated(index: number) {
			const normalizedI = index / (list.length - 1);
			return {
				baseColor: interpolateFunctions.baseColor(normalizedI),
				baseShadowColor: interpolateFunctions.baseShadowColor(normalizedI),
				accentColor1: interpolateFunctions.accentColor1(normalizedI),
				accentColor2: interpolateFunctions.accentColor2(normalizedI),
				accentColor3: interpolateFunctions.accentColor3(normalizedI),
				accentColor4: interpolateFunctions.accentColor4(normalizedI),
				highlightColor: interpolateFunctions.highlightColor(normalizedI)
			};
		}
	};
}
