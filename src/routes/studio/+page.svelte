<script>
	import SecondaryPageHeader from '$lib/SecondaryPageHeader.svelte';
	import { navBarData } from '$lib/topBarData';

	navBarData.set('studio');
</script>

<svelte:head>
	<title>Studio</title>
</svelte:head>

<SecondaryPageHeader title="Studio" />
