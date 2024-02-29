<script lang="ts">
	// https://stackoverflow.com/questions/26032089/in-html-how-can-i-have-text-that-is-only-accessible-for-screen-readers-i-e-fo

	export let text: string;
</script>

<h1 class="accessible-header" aria-label={text}><span aria-hidden="true">{text}</span></h1>

<style>
	.accessible-header {
		position: absolute !important;
		height: 1px;
		width: 1px; /* Nearly collapsed */
		top: -1px;
		left: -1px;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
	}
</style>
