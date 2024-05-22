<script lang="ts">
	import CaseStudyTitleBox from './CaseStudyTitleBox.svelte';

	export let title: string;
	export let leadParagraph: string;
</script>

<div class="landing">
	<div class="div-margin-top" />
	<div class="case-study-title-box-container">
		<CaseStudyTitleBox {title} {leadParagraph} />
	</div>
	<div class="div-margin-bottom" />
</div>

<style>
	.landing {
		min-height: 100dvh;
		width: 100%;
		display: flex;
		flex-direction: column;
		filter: var(--strong-drop-shadow);
	}

	.div-margin-top {
		min-height: calc(var(--nav-bar-height) + 40px);
		flex: 1 1 0px;
	}

	.div-margin-bottom {
		height: 40px;
	}

	.case-study-title-box-container {
		margin-left: 40px;
		margin-right: 40px;
	}
</style>
