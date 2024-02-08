<div class="container">
	<div class="vertical-margin" />
	<div class="inner">
		<div class="horizontal-margin" />
		<div class="type-container coming-soon">
			<p>Our new website is coming soon.</p>
			<p class="dim">
				Contact us at <a href="mailto:info@mxt.co.uk">info@mxt.co.uk</a>.
			</p>
		</div>
		<div class="horizontal-margin" />
	</div>
	<div class="vertical-margin" />
</div>

<style>
	.container {
		width: 100%;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.vertical-margin {
		flex: 1;
		min-height: 40px;
	}

	.inner {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.horizontal-margin {
		flex: 1;
		min-width: 24px;
	}

	.type-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.coming-soon {
		text-align: center;
		line-height: 1.8;
	}
</style>
