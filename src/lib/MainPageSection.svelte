<script lang="ts">
	export let id: string;
	export let associatedUrl: string;
</script>

<div {id} class="section" data-section-url={associatedUrl}><slot /></div>

<style>
	.section {
		/* Hack: `.scrollIntoView()` does not reliably scroll to the exact
           element position. Add a bit of displacement, which makes our
           logic to detect which section is currently visible work. */
		scroll-margin-top: -2px;

		/* I really don't know why but this is needed to make the IntersectionObserver
		   work (???) */
		border: 1px dashed transparent;
	}
</style>
