export function lerp(start: number, end: number, alpha: number) {
	return (1 - alpha) * start + alpha * end;
}
