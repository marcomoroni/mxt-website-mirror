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
		margin-bottom: 50px;
		padding-bottom: 70px;
	}

	.title {
		padding-top: 120px;
		font-weight: 600;
		font-size: 52px;
		padding-bottom: 30px;
	}

	.leading-paragraph {
		font-size: 21px;
		max-width: 80%;
		line-height: 1.5;
	}

	.leading-paragraph + .leading-paragraph {
		margin-top: 10px;
	}

	@media (max-width: 660px) {
		.title-bg {
			padding-bottom: 50px;
		}

		.title {
			padding-top: 80px;
			font-size: 40px;
			padding-bottom: 20px;
		}

		.leading-paragraph {
			max-width: unset;
			font-size: 17.5px;
		}

		.leading-paragraph + .leading-paragraph {
			margin-top: 8px;
		}
	}
</style>
