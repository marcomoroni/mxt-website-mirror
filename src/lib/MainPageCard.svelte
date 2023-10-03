<script lang="ts">
	export let title: string;
	export let desription: string;
	export let href: string;
</script>

<li class="card">
	<a class="link" {href}>
		<h2 class="title style-like-a-inner">{title}</h2>
		<p class="description">{desription}</p>
	</a>
</li>

<style>
	.card {
		background-color: #fdfbfa;
	}

	.link {
		display: block;
		padding-left: 23px;
		padding-right: 23px;
		padding-top: 18px;
		padding-bottom: 20px;
		text-decoration: none;
	}

	.title {
		font-size: 23px;
		font-weight: 500;
		margin-bottom: 14px;
	}
</style>
