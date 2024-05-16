import { accentColor1, accentColor2, accentColor3, accentColor5 } from '$lib/cssValues';
import { map } from '$lib/map';
import { perlin1d } from '$lib/perlin';
import * as d3 from 'd3';

const noise = perlin1d();
const accentColorFromNoise = (noiseValue: number, displacement: number) => {
	let noiseResult = noise.getValue(noiseValue + displacement);
	noiseResult = map(noiseResult, -1, 1, 0, 1);
	return d3.piecewise(d3.interpolateRgb.gamma(2.2), [
		accentColor2,
		accentColor1,
		accentColor3,
		accentColor5
	])(noiseResult);
};

export const accentColorsFromNoise = {
	accentColor1: (noiseValue: number) => accentColorFromNoise(noiseValue, 0),
	accentColor2: (noiseValue: number) => accentColorFromNoise(noiseValue, 20000),
	accentColor3: (noiseValue: number) => accentColorFromNoise(noiseValue, 40000),
	accentColor4: (noiseValue: number) => accentColorFromNoise(noiseValue, 60000)
};
