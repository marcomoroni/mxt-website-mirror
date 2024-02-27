<script lang="ts">
	// https://stackoverflow.com/questions/50281998/div-that-fits-into-parent-and-maintains-an-aspect-ratio

	// Make sure the child slot has 100% width and height.

	export let aspectRatio: { x: number; y: number };

	// CSS needs to be added this way because we need to add props to `@container`.
	$: style = `
        <style>
            .fill-aspect-ratio-container {
                container-type: size;
                container-name: resize-box;
                display: grid;
                height: 100%;
                width: 100%;
            }

            .fill-aspect-ratio-child {
                width: 100%;
                aspect-ratio: ${aspectRatio.x} / ${aspectRatio.y};
                object-fit: contain;
                overflow: hidden;
                display: flex;
                margin: auto;
            }
    
            @container resize-box (aspect-ratio > ${aspectRatio.x} / ${aspectRatio.y}) {
                .fill-aspect-ratio-child {
                    width: auto;
                    height: 100%;
                }
            }
        </style>
    `;
</script>

{@html style}

<div class="fill-aspect-ratio-container">
	<div class="fill-aspect-ratio-child">
		<slot />
	</div>
</div>
