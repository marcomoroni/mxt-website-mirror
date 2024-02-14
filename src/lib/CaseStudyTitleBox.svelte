<script lang="ts">
	export let title: string;
	export let leadParagraph: string;
</script>

<div class="title-container">
	<div class="size">
		<div class="case-study">Case study</div>
		<div class="divider-1" />
		<h1>{title}</h1>
		<div class="divider-2" />
		<div class="lead-paragraph">
			{leadParagraph}
		</div>
	</div>
</div>

<style>
	.title-container {
		display: flex;
		flex-direction: row;
	}

	.size {
		max-width: 900px;
		flex: 1 1 0px;
	}

	h1 {
		font-size: 34px;
		font-weight: 600;
		line-height: 1.4;
		text-wrap: balance;
	}

	.lead-paragraph {
		font-size: 24px;
		font-weight: 530;
		line-height: 1.4;
		text-wrap: balance;
	}

	.case-study {
		font-weight: 550;
		font-size: 13px;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	.divider-1 {
		height: 34px;
	}

	.divider-2 {
		height: 22px;
	}
</style>
