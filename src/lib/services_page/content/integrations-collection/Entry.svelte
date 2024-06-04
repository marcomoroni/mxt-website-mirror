<script lang="ts">
	export let img: string;
	export let alt: string;
</script>

<li class="entry">
	<img src={img} {alt} />
</li>

<style>
	.entry {
		align-self: center;
		flex-basis: 0;
		flex-grow: 1;
		aspect-ratio: 4 / 3;
		padding: 10px;
		background-color: white;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
