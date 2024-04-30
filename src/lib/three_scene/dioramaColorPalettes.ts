import { accentColor1, accentColor2, accentColor3, backgroundColor } from '$lib/cssValues';

export type PaletteName = 'default' | 'dim' | 'hidden' | 'service-1' | 'service-2' | 'service-3';

export function dioramaColorPalettes() {
	const darkAccentColor1 = '#B0BA5F';
	const darkAccentColor2 = '#D48233';
	const darkAccentColor3 = '#A9D4CD';
	const palettes = new Map([
		[
			'default' as PaletteName,
			{
				baseColor: '#EEE8E4',
				baseShadowColor: 'black',
				accentColor1: 'ColouredNoise',
				accentColor2: 'ColouredNoise',
				accentColor3: 'ColouredNoise',
				accentColor4: '#C0BBB1',
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
				baseColor: darkAccentColor1,
				baseShadowColor: 'black',
				accentColor1: darkAccentColor1,
				accentColor2: darkAccentColor1,
				accentColor3: darkAccentColor1,
				accentColor4: accentColor1,
				highlightColor: darkAccentColor1
			}
		],
		[
			'service-2' as PaletteName,
			{
				baseColor: darkAccentColor2,
				baseShadowColor: 'black',
				accentColor1: darkAccentColor2,
				accentColor2: darkAccentColor2,
				accentColor3: darkAccentColor2,
				accentColor4: accentColor2,
				highlightColor: darkAccentColor2
			}
		],
		[
			'service-3' as PaletteName,
			{
				baseColor: darkAccentColor3,
				baseShadowColor: 'black',
				accentColor1: darkAccentColor3,
				accentColor2: darkAccentColor3,
				accentColor3: darkAccentColor3,
				accentColor4: accentColor3,
				highlightColor: darkAccentColor3
			}
		]
	]);

	return {
		getPalette(name: PaletteName) {
			return palettes.get(name)!;
		}
	};
}
