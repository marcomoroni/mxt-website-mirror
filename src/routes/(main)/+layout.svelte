<script>
	// The routes of this layout should all point to a same page, except the user land on
	// different scroll positions. To achieve this, have the content of the page as a
	// layout. Then, in each page add the necessary logic to control the scroll position.

	import MainPage from '$lib/MainPage.svelte';
</script>

<slot />

<MainPage />
