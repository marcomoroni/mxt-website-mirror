export function lerp(start: number, end: number, a: number) {
	return (1 - a) * start + a * end;
}
