<script lang="ts">
	import {
		backgroundColor,
		servicesPageIntersectingSection
	} from '$lib/three_scene/threeStateStores';
	import { match } from 'ts-pattern';
	import { backgroundColor as backgroundColorStore } from '$lib/three_scene/threeStateStores';

	export let scrollObserveAction: (el: HTMLElement) => void;
	export let associatedState: 'service-1' | 'service-2' | 'service-3';
	export let title: string;
	export let subtitle: string;
	export let isLast: boolean;
	export let isFirst: boolean;
	export let scrollToId: string;

	$: currentState = match($servicesPageIntersectingSection)
		.with(undefined, () => 'none')
		.with(associatedState, () => 'current')
		.otherwise(() => 'another');
</script>

<div use:scrollObserveAction class="container">
	<div class="small-screen-header">
		<div class="header-solid-background" style:background-color={$backgroundColorStore}>
			<div class="header-content-center">
				<div class="header-content">
					<h2 class="title" class:fade={currentState !== 'current'}>{title}</h2>
					<p class="subtitle" class:fade={currentState !== 'current'}>{subtitle}</p>
				</div>
			</div>
		</div>
		<div
			class="header-fade-background"
			style:background={`linear-gradient(in oklab, ${$backgroundColorStore}, color-mix(in oklab, ${$backgroundColorStore}, transparent 100%))`}
		/>
	</div>
	<div id={scrollToId} class="scroll-anchor" class:displace-above={!isFirst} />
	<div class="show-behind top" class:full-height={isFirst} />
	<div class="type" class:fade={currentState !== 'current'} class:small-padding-bottom={isLast}>
		<div
			class="solid-background-fade top"
			style:background={`linear-gradient(transparent, ${$backgroundColor})`}
		/>
		<div
			class="solid-background-fade bottom"
			style:background={`linear-gradient(${$backgroundColor}, transparent)`}
		/>
		<div class="solid-background" style:background-color={$backgroundColor} />
		<slot name="type" />
	</div>
	{#if !isLast}
		<div class="show-behind bottom" />
	{/if}
</div>

<style>
	.container {
		position: relative;
		--peek-type: 100px;
	}

	.scroll-anchor {
		position: absolute;
		top: 0;
		left: 0;
	}

	.scroll-anchor.displace-above {
		top: calc(-50dvh + 1px);
	}

	.small-screen-header {
		position: sticky;
		top: 0;
		margin-bottom: 40px;

		display: none;
	}

	.header-content {
		border-top: 4px solid var(--color-primary);
	}

	.header-solid-background {
		padding-bottom: 30px;
	}

	.header-fade-background {
		height: 30px;
	}

	.title {
		font-size: 36px;
		text-wrap: balance;
		margin-top: 26px;
		margin-bottom: 16px;
		font-weight: 750;
		line-height: 1.3;
	}

	.subtitle {
		font-size: 20px;
		text-wrap: balance;
		opacity: 0.8;
		font-weight: 600;
	}

	.type {
		padding-bottom: 30px;
		padding-top: 30px;
		transition: 0.5s ease-in-out;
		position: relative;
		z-index: -1;
	}

	.show-behind {
		height: max(200px, calc(50dvh - var(--peek-type)));
	}

	.show-behind.full-height {
		height: max(200px, calc(100dvh - var(--peek-type)));
	}

	.show-behind.bottom {
		height: 30dvh;
	}

	.solid-background,
	.solid-background-fade {
		--extend: 10000px;
		position: absolute;
		left: calc(var(--extend) * -1);
		width: calc(100% + (var(--extend) * 2));
		z-index: -2;
	}

	.solid-background {
		top: 0;
		height: 100%;
	}

	.solid-background-fade.top,
	.solid-background-fade.bottom {
		--fade-height: 60px;
		height: var(--fade-height);
	}

	.solid-background-fade.top {
		top: calc(var(--fade-height) * -1);
	}

	.solid-background-fade.bottom {
		bottom: calc(var(--fade-height) * -1);
	}

	.small-padding-bottom {
		padding-bottom: 100px;
	}

	.type,
	.header-content-center {
		padding-left: 70px;
		padding-right: 70px;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
	}

	@media (max-width: 1000px) {
		.small-screen-header {
			display: block;
		}

		.show-behind {
			height: 90dvh;
		}

		.show-behind.bottom {
			display: none;
		}

		.type {
			padding-bottom: 170px;
		}

		.small-padding-bottom {
			padding-bottom: 70px;
		}

		.type,
		.header-content-center {
			padding-left: var(--horizontal-margin);
			padding-right: var(--horizontal-margin);
		}
	}

	@media (min-width: 1000px) {
		.type.fade {
			opacity: 0;
		}
	}
</style>
