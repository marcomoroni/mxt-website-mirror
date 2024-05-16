import { accentColor1, accentColor2, accentColor3 } from '$lib/cssValues';
import { map } from '$lib/map';
import { perlin1d } from '$lib/perlin';
import * as d3 from 'd3';

// Use palettes with colours ordered differently because, since the interpolation value will likely
// be closer to the middle of the gradient, you'll have more diverse colours across the accents.
const palette1 = [accentColor2, accentColor1, accentColor3];
const palette2 = [accentColor1, accentColor2, accentColor3];
const palette3 = [accentColor3, accentColor1, accentColor2];
const palette4 = [accentColor3, accentColor2, accentColor1];

const noise = perlin1d();
const accentColorFromNoise = (palette: Array<string>, noiseValue: number, displacement: number) => {
	let noiseResult = noise.getValue(noiseValue + displacement);
	noiseResult = map(noiseResult, -1, 1, 0, 1);
	return d3.piecewise(d3.interpolateRgb.gamma(2.2), palette)(noiseResult);
};

export const accentColorsFromNoise = {
	accentColor1: (noiseValue: number) => accentColorFromNoise(palette1, noiseValue, 0),
	accentColor2: (noiseValue: number) => accentColorFromNoise(palette2, noiseValue, 20000),
	accentColor3: (noiseValue: number) => accentColorFromNoise(palette3, noiseValue, 40000),
	accentColor4: (noiseValue: number) => accentColorFromNoise(palette4, noiseValue, 60000)
};
