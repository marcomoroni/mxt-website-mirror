export function prefersReducedMotion() {
	const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	const prefersReducedMotion = !mediaQuery || mediaQuery.matches;
	return prefersReducedMotion;
}
