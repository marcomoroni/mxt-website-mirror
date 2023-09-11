<script>
	import MainPageAsFakeSection from '$lib/MainPageAsFakeSection.svelte';
</script>

<!-- <script lang="ts">
	import MainPageAsFakeSection from '$lib/MainPageAsFakeSection.svelte';
import { currentMainPageSection, urlToSection } from '$lib/currentMainPageSection';
	import { onDestroy, onMount } from 'svelte';

	currentMainPageSection.set('Studio');

	let observer: null | IntersectionObserver = null;

	onMount(() => {
		requestAnimationFrame(() => {
			const section = document.getElementById('section-studio');
			if (section !== null) {
				section.scrollIntoView();
			}

			const navButton = document.getElementById('nav-studio');
			if (navButton !== null) {
				navButton.onclick = () => {
					if (section !== null) {
						section.scrollIntoView();
						currentMainPageSection.set('Studio');
					}
				};
			}

			const sections = document.getElementsByClassName('section');
			observer = new IntersectionObserver(
				() => {
					for (var i = sections.length - 1; i >= 0; i--) {
						const section = sections[i];
						if (section instanceof HTMLElement) {
							console.log([section.dataset.sectionUrl, section.getBoundingClientRect().top]);
							if (section.getBoundingClientRect().top <= 0) {
								// This is the current URL.
								// If it's different from the current URL.
								const url = section.dataset.sectionUrl;
								if (url !== undefined) {
									window.history.pushState('', '', url);

									const sectionName = urlToSection(url);
									if (sectionName !== null) {
										currentMainPageSection.set(sectionName);
									}
								}

								break;
							}
						}
					}
				},
				{
					threshold: [0, 0.001, 1]
				}
			);
			for (var i = 0; i < sections.length; i++) {
				observer.observe(sections[i]);
			}
		});
	});

	onDestroy(() => {
		if (observer !== null) {
			observer.disconnect();
		}
	});
</script> -->

<MainPageAsFakeSection sectionName="Studio" sectionId="section-studio" navButtonId="nav-studio" />
