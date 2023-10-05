<script lang="ts">
	import WidthContainer from './WidthContainer.svelte';

	export let title: string;
	export let leadingParagraphs: Array<string> = [];
</script>

<div class="title-bg">
	<WidthContainer>
		<h1 class="title">{title}</h1>
		{#each leadingParagraphs as leadingParagraph}
			<p class="leading-paragraph">
				{leadingParagraph}
			</p>
		{/each}
	</WidthContainer>
</div>

<style>
	.title-bg {
		/* background-color: cyan; */
		padding-bottom: 70px;
	}

	.title {
		padding-top: 120px;
		font-weight: 500;
		font-size: 70px;
		padding-bottom: 30px;
	}

	.leading-paragraph {
		font-size: 22px;
		max-width: 80%;
		line-height: 1.5;
	}

	.leading-paragraph + .leading-paragraph {
		margin-top: 10px;
	}

	@media (max-width: 660px) {
		.title-bg {
			/* background-color: cyan; */
			padding-bottom: 50px;
		}

		.title {
			padding-top: 80px;
			font-size: 60px;
			padding-bottom: 20px;
		}

		.leading-paragraph {
			max-width: unset;
			font-size: 20px;
		}

		.leading-paragraph + .leading-paragraph {
			margin-top: 8px;
		}
	}
</style>
