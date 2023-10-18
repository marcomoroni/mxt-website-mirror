<figure class="item">
	<div class="figure-container">
		<slot name="figure" />
	</div>
	{#if $$slots.caption}
		<figcaption><slot name="caption" /></figcaption>
	{/if}
</figure>
