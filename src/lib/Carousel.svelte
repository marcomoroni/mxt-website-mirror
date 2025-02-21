<script lang="ts">
	export let entries: Array<{ src: string; alt: string; caption?: undefined | string }>;

	let snappedEntryIndex = 0;
	function observeSnappedEntry(el: HTMLElement) {
		function handleScroll() {
			const children = Array.from(el.children) as HTMLElement[];
			const scrollLeft = el.scrollLeft;
			// console.log(scrollLeft);
			const paddingLeft = parseInt(getComputedStyle(el).paddingLeft, 10);
			const closestIndex = children.reduce((closestIndex, child, index) => {
				const distance = Math.abs(child.offsetLeft - paddingLeft - scrollLeft);
				const closestDistance = Math.abs(
					children[closestIndex].offsetLeft - paddingLeft - scrollLeft
				);
				return distance < closestDistance ? index : closestIndex;
			}, 0);
			// console.log(closestIndex);
			snappedEntryIndex = closestIndex;
		}

		el.addEventListener('scroll', handleScroll);

		return {
			destroy() {
				el.removeEventListener('scroll', handleScroll);
			}
		};
	}

	// ... wrap the entries in buttons. use the to scroll to the entry. those are active only if they are
	//     ... make those buttons fill the left (or right) gap between entries, so there's more clickable room
	// ... probably turn flex into grid. With subgrid inside entries so captions are aligned
</script>

<div class="carousel" use:observeSnappedEntry>
	{#each entries as { src, alt }, i}
		{@const relativePosition =
			i === snappedEntryIndex ? 'current' : i < snappedEntryIndex ? 'left' : 'right'}
		<img class="entry" {src} {alt} class:snapped={relativePosition === 'current'} />
	{/each}
</div>

<style>
	.carousel {
		display: flex;
		overflow: overlay;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		--padding: calc(max(50% - (var(--body-width) / 2), var(--body-margin)));
		padding-inline: var(--padding);
		scroll-padding-left: var(--padding);
		gap: 12px;

		align-items: center;
	}

	.carousel::-webkit-scrollbar {
		display: none;
	}

	.entry {
		flex-shrink: 0;
		scroll-snap-align: start;
		max-width: min(var(--body-width), calc(100%));
		max-height: 600px;
	}

	.snapped {
		opacity: 0.5;
	}
</style>
