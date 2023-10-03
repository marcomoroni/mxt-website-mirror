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
		font-size: 25px;
		font-weight: 500;
		margin-top: 20px;
		margin-bottom: 13px;
	}

	.leading-paragraph {
		color: #a49f9b;
	}

	@media (max-width: 660px) {
		.title {
			font-size: 23px;
			margin-top: 17px;
			margin-bottom: 10px;
		}
	}
</style>
