<script lang="ts">
	export let text: string;
</script>

<div class="section-header">
	<div class="title">{text}</div>
</div>

<style>
	.section-header {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 270px;
		font-weight: 600;
		color: transparent;
		--stripe-size: 3px;
		--other-stripe-color: #a19d9a;
		background: repeating-linear-gradient(
			80deg,
			var(--color-background),
			var(--color-background) var(--stripe-size),
			var(--other-stripe-color) calc(var(--stripe-size) + 1px),
			var(--other-stripe-color) calc(var(--stripe-size) * 2),
			var(--color-background) calc((var(--stripe-size) * 2) + 1px)
		);
		background-clip: text;
		-webkit-background-clip: text;
	}
</style>
