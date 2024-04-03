import {
	accentColor1,
	accentColor2,
	accentColor3,
	accentColor5,
	backgroundColor
} from '$lib/cssValues';
import { match } from 'ts-pattern';
import * as d3 from 'd3';

function map(value: number, min1: number, max1: number, min2: number, max2: number) {
	return min2 + ((value - min1) * (max2 - min2)) / (max1 - min1);
}

export function backgroundColorPalettes() {
	const interpolateFunction = (colorList: Array<string>, normalizedI: number) =>
		d3.piecewise(d3.interpolateRgb.gamma(2.2), colorList)(normalizedI);

	const list = [
		{
			name: 'default',
			baseColor: backgroundColor
		},
		{
			name: 'service-1',
			baseColor: accentColor1
		},
		{
			name: 'service-2',
			baseColor: accentColor2
		},
		{
			name: 'service-3',
			baseColor: accentColor3
		}
	];
	const nameToIndex = (name: 'default' | 'service-1' | 'service-2' | 'service-3') =>
		match(name)
			.with('default', () => 0)
			.with('service-1', () => 1)
			.with('service-2', () => 2)
			.with('service-3', () => 3)
			.exhaustive();
	const indexToName = (index: number) =>
		match(index)
			.returnType<'default' | 'service-1' | 'service-2' | 'service-3'>()
			.with(0, () => 'default')
			.with(1, () => 'service-1')
			.with(2, () => 'service-2')
			.with(3, () => 'service-3')
			.otherwise(() => {
				throw new Error('?');
			});
	const interpolateFunctions = {
		baseColor: (normalizedI: number) =>
			interpolateFunction(
				list.map((p) => p.baseColor),
				normalizedI
			)
	};

	return {
		nameToIndex,
		indexToName,
		interpolated(index: number) {
			const normalizedI = index / (list.length - 1);
			return {
				baseColor: interpolateFunctions.baseColor(normalizedI)
			};
		}
	};
}
