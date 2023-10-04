<script>
	import SecondaryPageHeader from '$lib/SecondaryPageHeader.svelte';
	import { navBarData } from '$lib/topBarData';

	navBarData.set('contacts');
</script>

<svelte:head>
	<title>Contacts</title>
</svelte:head>

<SecondaryPageHeader title="Contacts" />
