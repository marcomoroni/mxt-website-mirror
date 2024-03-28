<script lang="ts">
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';
</script>

<svelte:head>
	<title>{mxtHeadTitle('P2')}</title>
</svelte:head>

P2
<div class="content" />

<style>
	.content {
		height: 200dvh;
	}
</style>
