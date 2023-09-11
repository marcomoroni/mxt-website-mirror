<script lang="ts">
	import { base } from '$app/paths';
	import SectionHeader from '$lib/SectionHeader.svelte';
	import { currentWorkVisible, type CurrentWorkVisible } from '$lib/currentWorkVisible';
	import { onDestroy, onMount } from 'svelte';

	let subsectionsObserver: null | IntersectionObserver = null;

	const idToWorkName = (id: string): null | CurrentWorkVisible => {
		switch (id) {
			case 'w-stonehenge':
				return 'Stonehenge';
			case 'w-driving-sim':
				return 'DrivingSimulation';
			case 'w-hello':
				return 'Hello';
			default:
				return null;
		}
	};

	onMount(() => {
		requestAnimationFrame(() => {
			const worksSections = document.getElementsByClassName('work-preview');

			subsectionsObserver = new IntersectionObserver(
				() => {
					let visibleWorkName: null | CurrentWorkVisible = null;
					for (var i = 0; i < worksSections.length; i++) {
						const worksSection = worksSections[i];
						const boundingRect = worksSection.getBoundingClientRect();
						const isCurrent = boundingRect.top <= 0 && boundingRect.bottom > 0;
						const workName = idToWorkName(worksSection.id);
						if (isCurrent && workName !== null) {
							visibleWorkName = workName;
						}
					}
					$currentWorkVisible = visibleWorkName;
				},
				{
					threshold: [0, 0.001, 1]
				}
			);
			for (var i = 0; i < worksSections.length; i++) {
				subsectionsObserver.observe(worksSections[i]);
			}
		});
	});

	onDestroy(() => {
		if (subsectionsObserver !== null) {
			subsectionsObserver.disconnect();
		}
	});
</script>

<SectionHeader text="Works" />
<ul class="works-list">
	<li id="w-stonehenge" class="work-preview">
		<a href="{base}/works/stonehenge" class="work-button">Stonehenge</a>
	</li>
	<li id="w-driving-sim" class="work-preview">
		<a href="{base}/works/driving-simulator" class="work-button">Driving Simulator</a>
	</li>
	<li id="w-hello" class="work-preview">
		<a href="{base}/works/hello" class="work-button">Something else</a>
	</li>
</ul>

<style>
	.works-list {
		display: flex;
		flex-direction: column;
		gap: -20px;
	}

	.work-preview {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
	}

	.work-button {
		width: 800px;
		max-height: 80vh;
		aspect-ratio: 6 / 4;
		background-color: white;
		transition: transform 0.7s var(--curve);
	}

	.work-button:focus,
	.work-button:hover {
		transform: scale(1.02);
	}

	.work-preview {
		/* Hack: `.scrollIntoView()` does not reliably scroll to the exact
           element position. Add a bit of displacement, which makes our
           logic to detect which section is currently visible work. */
		scroll-margin-top: -2px;
	}
</style>
