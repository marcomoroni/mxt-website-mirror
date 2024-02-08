<div class="full-page-container">
	<div class="vertical-margin" />
	<div class="inner">
		<div class="horizontal-margin" />
		<address class="type-container">
			<div>
				<a href="mailto:info@mxt.co.uk">info@mxt.co.uk</a>
			</div>
			<div>
				<a href="tel:+44 0203 633 5450">0203 633 5450</a>
			</div>
			<div>The Courtyard<br />4 Evelyn Road<br />London<br />W4 5JL</div>
		</address>
		<div class="horizontal-margin" />
	</div>
	<div class="vertical-margin" />
</div>

<style>
	.full-page-container {
		width: 100%;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.vertical-margin {
		flex: 1;
		min-height: calc(var(--nav-bar-height) + 40px);
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
		text-align: center;
		font-weight: 600;
		font-size: 19px;
		gap: 30px;
	}

	.type-container a {
		text-decoration: none;
	}
</style>
