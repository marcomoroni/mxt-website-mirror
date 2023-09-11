<script lang="ts">
	// Add this component to every route that uses the main page.

	import { afterNavigate } from '$app/navigation';
	import {
		currentMainPageSection,
		urlToSection,
		type CurrentMainPageSection
	} from '$lib/currentMainPageSection';
	import { onDestroy } from 'svelte';
	import { previousPathname } from './previousPathname';

	export let sectionName: CurrentMainPageSection;
	export let sectionId: string;
	export let navButtonId: string;

	const getPageTitle = (sn: CurrentMainPageSection): string => {
		switch (sn) {
			case 'Home':
				return 'MXT';
			case 'Works':
				return 'Works';
			case 'Studio':
				return 'Studio';
			case 'Contacts':
				return 'Contacts';
		}
	};

	$currentMainPageSection = sectionName;

	$: pageTitle = getPageTitle($currentMainPageSection);

	let observer: null | IntersectionObserver = null;

	afterNavigate(() => {
		requestAnimationFrame(() => {
			let navigatingFromAMainPageSection = false;
			if ($previousPathname !== null) {
				navigatingFromAMainPageSection = ['/', '/works', '/studio', '/contacts'].includes(
					$previousPathname
				);
			}
			const shouldScrollToTopOfSection = navigatingFromAMainPageSection;

			const section = document.getElementById(sectionId);

			if (shouldScrollToTopOfSection && section !== null) {
				section.scrollIntoView();
			}

			const navButton = document.getElementById(navButtonId);
			if (navButton !== null) {
				navButton.onclick = () => {
					if (section !== null) {
						section.scrollIntoView();
					}
				};
			}

			// Note that the sections are ordered.
			const sections = document.getElementsByClassName('section');
			observer = new IntersectionObserver(
				() => {
					// Starting from the bottom section.
					for (var i = sections.length - 1; i >= 0; i--) {
						const section = sections[i];
						if (section instanceof HTMLElement) {
							const isTheCurrentSection = section.getBoundingClientRect().top <= 0;
							if (isTheCurrentSection) {
								const url = section.dataset.sectionUrl;
								if (url !== undefined) {
									// `history.state` is used to not mess up SvelteKit's navigation.
									window.history.replaceState(history.state, '', url);

									const sectionName = urlToSection(url);
									if (sectionName !== null) {
										$currentMainPageSection = sectionName;
									}
								}

								break;
							}
						}
					}
				},
				{
					// Note the 0.001: This is used to make another check when the section above is barely visible,
					// or else the check for finding the current section will not be triggered
					// when scrolling up.
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
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>
