<script lang="ts">
	export let title: string;
	export let href: string;
	export let leadingParagraph: string;
	export let imageUrl: string;
</script>

<li>
	<a class="link" {href}>
		<div class="image" style="background-image: url('{imageUrl}')" />
		<h2 class="title style-like-a-inner">{title}</h2>
		<p class="leading-paragraph">{leadingParagraph}</p>
	</a>
</li>

<style>
	.link {
		display: block;
		text-decoration: none;
	}

	.image {
		width: 100%;
		aspect-ratio: 6 / 4;
		background-size: cover;
		background-position: center center;
	}

	.title {
		font-size: 23px;
		font-weight: 600;
		margin-top: 20px;
		margin-bottom: 13px;
		line-height: 1.46;
		text-wrap: balance;
	}

	.leading-paragraph {
		color: #a49f9b;
		text-wrap: balance;
	}

	@media (max-width: 660px) {
		.title {
			font-size: 20px;
			margin-top: 18px;
			margin-bottom: 12px;
		}
	}
</style>
