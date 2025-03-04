<script lang="ts">
	export let entries: Array<{ src: string; alt: string }>;
	export let caption: undefined | string = undefined;

	let snappedEntryIndex = 0;
	function observeSnappedEntry(el: HTMLElement) {
		function handleScroll() {
			const children = Array.from(el.children) as HTMLElement[];
			const scrollLeft = el.scrollLeft;
			const paddingLeft = parseInt(getComputedStyle(el).paddingLeft, 10);
			const closestIndex = children.reduce((closestIndex, child, index) => {
				const distance = Math.abs(child.offsetLeft - paddingLeft - scrollLeft);
				const distanceOfClosest = Math.abs(
					children[closestIndex].offsetLeft - paddingLeft - scrollLeft
				);
				return distance < distanceOfClosest ? index : closestIndex;
			}, 0);
			snappedEntryIndex = closestIndex;
		}

		el.addEventListener('scroll', handleScroll);

		return {
			destroy() {
				el.removeEventListener('scroll', handleScroll);
			}
		};
	}

	let carouselEl: HTMLElement;
	function scrollToEntry(index: number) {
		const children = Array.from(carouselEl.children) as HTMLElement[];
		const paddingLeft = parseInt(getComputedStyle(carouselEl).paddingLeft, 10);
		const scrollLeftTarget = children[index].offsetLeft - paddingLeft;
		carouselEl.scrollTo({ left: scrollLeftTarget, behavior: 'smooth' });
	}
</script>

<figure class="container">
	<div class="carousel" bind:this={carouselEl} use:observeSnappedEntry>
		{#each entries as { src, alt }, i}
			{@const relativePosition =
				i === snappedEntryIndex ? 'current' : i < snappedEntryIndex ? 'left' : 'right'}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<img
				class="image"
				{src}
				{alt}
				class:left={relativePosition === 'left'}
				class:right={relativePosition === 'right'}
				on:click={relativePosition === 'current' ? undefined : () => scrollToEntry(i)}
			/>
		{/each}
	</div>
	{#if caption}
		<figcaption class="caption">{caption}</figcaption>
	{/if}
</figure>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
		--max-image-width: calc(var(--body-width) + 160px);
		margin-block: 50px;
	}

	.carousel {
		align-self: stretch;
		display: flex;
		flex-direction: row;
		overflow: overlay;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		--padding-inline: calc(max(50% - (var(--max-image-width) / 2), var(--body-margin)));
		padding-inline: var(--padding-inline);
		gap: 14px;
		align-items: flex-end;
	}

	.carousel::-webkit-scrollbar {
		display: none;
	}

	.image {
		flex-shrink: 0;
		scroll-snap-align: center;
		max-width: min(var(--max-image-width), 100%);
		max-height: 600px;
	}

	.caption {
		align-self: center;
		text-align: center;
		max-width: 500px;
		margin-inline: var(--body-margin);
		font-size: 14px;
		color: #99958f;
	}

	.left {
		cursor: w-resize;
	}

	.right {
		cursor: e-resize;
	}
</style>
