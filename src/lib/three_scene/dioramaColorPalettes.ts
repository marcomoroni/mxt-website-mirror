import { accentColor1, accentColor2, accentColor3, backgroundColor } from '$lib/cssValues';

export type PaletteName = 'default' | 'dim' | 'hidden' | 'service-1' | 'service-2' | 'service-3';

export function dioramaColorPalettes() {
	const palettes = new Map([
		[
			'default' as PaletteName,
			{
				baseColor: '#EEE8E4',
				baseShadowColor: 'black',
				accentColor1: 'ColouredNoise',
				accentColor2: 'ColouredNoise',
				accentColor3: 'ColouredNoise',
				accentColor4: 'ColouredNoise',
				highlightColor: 'white'
			}
		],
		[
			'dim' as PaletteName,
			{
				baseColor: '#F2ECEA',
				baseShadowColor: '#AAAAAA',
				accentColor1: '#E9E2DE',
				accentColor2: '#E9E2DE',
				accentColor3: '#E9E2DE',
				accentColor4: '#C0BBB1',
				highlightColor: '#F9F7F6'
			}
		],
		[
			'hidden' as PaletteName,
			{
				baseColor: backgroundColor,
				baseShadowColor: backgroundColor,
				accentColor1: backgroundColor,
				accentColor2: backgroundColor,
				accentColor3: backgroundColor,
				accentColor4: backgroundColor,
				highlightColor: backgroundColor
			}
		],
		[
			'service-1' as PaletteName,
			{
				baseColor: 'white',
				baseShadowColor: 'white',
				accentColor1: 'white',
				accentColor2: 'white',
				accentColor3: 'white',
				accentColor4: 'white',
				highlightColor: 'white'
			}
		],
		[
			'service-2' as PaletteName,
			{
				baseColor: '#E8DFDA',
				baseShadowColor: '#E8DFDA',
				accentColor1: '#E8DFDA',
				accentColor2: '#E8DFDA',
				accentColor3: '#E8DFDA',
				accentColor4: '#E8DFDA',
				highlightColor: '#EFE6E2'
			}
		],
		[
			'service-3' as PaletteName,
			{
				baseColor: '#908C86',
				baseShadowColor: '#908C86',
				accentColor1: '#908C86',
				accentColor2: '#908C86',
				accentColor3: '#908C86',
				accentColor4: '#908C86',
				highlightColor: '#908C86'
			}
		]
	]);

	return {
		getPalette(name: PaletteName) {
			return palettes.get(name)!;
		}
	};
}
