<script lang="ts">
	import { beforeNavigate, onNavigate } from '$app/navigation';
	import { previousPathname } from '$lib/previousPathname';

	// Add support for view transitions.
	onNavigate((navigation) => {
		// @ts-ignore
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	beforeNavigate((navigation) => {
		const from = navigation.from;
		if (from !== null) {
			previousPathname.set(from.url.pathname);
		}
	});
</script>

<slot />
