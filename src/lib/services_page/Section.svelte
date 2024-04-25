<script lang="ts">
	import { servicesPageIntersectingSection } from '$lib/three_scene/threeStateStores';
	import { match } from 'ts-pattern';
	import { backgroundColor as backgroundColorStore } from '$lib/three_scene/threeStateStores';

	export let scrollObserveAction: (el: HTMLElement) => void;
	export let associatedState: 'service-1' | 'service-2' | 'service-3';
	export let title: string;
	export let subtitle: string;

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
	<div class="type" class:fade={currentState !== 'current'}>
		<slot name="type" />
	</div>
</div>

<style>
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
		font-size: 30px;
		text-wrap: balance;
		margin-top: 26px;
		margin-bottom: 16px;
		font-weight: 700;
	}

	.subtitle {
		font-size: 20px;
		text-wrap: balance;
		opacity: 0.8;
		font-weight: 550;
	}

	.type {
		padding-bottom: 180px;
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

		.type,
		.header-content-center {
			padding-left: var(--horizontal-margin);
			padding-right: var(--horizontal-margin);
		}
	}

	@media (min-width: 1000px) {
		.title.fade {
			opacity: 0.5;
		}

		.subtitle.fade {
			opacity: 0.3;
		}

		.type.fade {
			opacity: 0.5;
		}
	}
</style>
