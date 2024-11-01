<script lang="ts">
	import CaseStudyLanding from '$lib/CaseStudyLanding.svelte';
	import FillAspectRatio from '$lib/FillAspectRatio.svelte';
	import { caseStudiesData } from '$lib/caseStudiesData';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';

	const caseStudyData = caseStudiesData[1];
	// Define callout positions
	const callouts_diagram = [
        {
            start: { x: 19, y: 60 },  // Starting point in diagram
            end: { x: 25, y: 100 },   // Ending point at screenshots
            radius: 15                 // Circle radius
        },
        {
            start: { x: 51.5, y: 70.2 },
            end: { x: 75, y: 100 },
            radius: 15
        }
    ];
</script>

<svelte:head>
	<title>{mxtHeadTitle('Driver Behaviour Study')}</title>
	<meta property="og:title" content="Stonehenge" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://mxt.co.uk/case-studies/dhs/" />
	<meta property="og:image" content="https://mxt.co.uk/images/dhs_case_study_schematics.png" />
</svelte:head>

<CaseStudyLanding
	title={caseStudyData.title}
	leadParagraph={caseStudyData.leadParagraph}
/>

<div class="landing-spacer" />
<!-- Intro -->
<div class="intro-container">
	<div class="intro-text">
        <p>Understanding how drivers interact with and comprehend various road conditions is crucial for enhancing road safety, efficiency, and
        informing policy. In collaboration with WSP, we conducted a study for Highways England to investigate driver responses and cognitive load
        when navigating dynamic hard shoulder (<span class="highlight">DHS</span>) motorways. This initiative responded to the Transport Select Committee's recommendation to
        pause DHS conversions and aimed to identify factors affecting driver comprehension and provide insights for future improvements.</p>
    </div>

	<!-- Left column with diagram and photos -->
    <div class="diagram-section">
        <div class="m6-diagram">
            <img src="/images/dhs_case_study_m6_diagram.png" alt="M6 motorway diagram" />
			<svg class="callout-lines" width="100%" height="calc(100% + 1rem)">
				{#each callouts_diagram as callout}
				<!-- Line -->
				<line 
					x1="{callout.start.x}%"
					y1="{callout.start.y}%"
					x2="{callout.end.x}%"
					y2="{callout.end.y}%"
					stroke="black" 
					stroke-width="2"
				/>
				<!-- Circle -->
				<circle 
					cx="{callout.start.x}%"
					cy="{callout.start.y}%"
					r={callout.radius}
					fill="none"
					stroke="black"
					stroke-width="2"
				/>
			{/each}
        </svg>
        </div>
        <div class="m6-screenshot-photos">
            <img src="/images/dhs_case_study_closed_signage.png" alt="DHS Smart Motorway closed signage" />
            <img src="/images/dhs_case_study_open_signage.png" alt="DHS Smart Motorway open signage" />
        </div>
    </div>
	<!-- Right column with paragraphs -->
    <div class="content-text">
        <p>The simulation was based on an existing section of the M6 motorway between junctions 4 and 8, configured into a loop. It features overhead gantries, advanced motorway indicator signals with supporting variable message signs, speed cameras and emergency areas.</p>

        <p>Participants, representing a diverse cross-section of the driving population in terms of age and experience (n = 39), were exposed to three scenarios in a within-subject design:</p>

        <ol>
            <li><span class="closed">Closed</span> - hard shoulder closed to traffic</li>
            <li><span class="open">Open</span> - hard shoulder open to traffic</li>
            <li><span class="mixed">Mixed</span> - dynamic use of the hard shoulder, varying between open and closed along the same motorway</li>
        </ol>

        <p>A <span class="baseline">baseline measure</span> was acquired in standard dual three-lane motorway.</p>

        <p>The traffic in the simulation scenarios was designed to reflect free-flow conditions, determined by algorithms to ensure realistic vehicle movement and flow.</p>

        <p>Hypothesis were that DHS scenario would present drivers with higher cognitive load or stress levels compared to the closed and open scenarios, due to the dynamic and variable nature of the hard shoulder's use along the same motorway.</p>
    </div>

</div>

<div class="section-spacer" />


<style>
	.landing-spacer {
		height: 110px;
	}
	.section-spacer {
		height: 100px;
	}
	.intro-container {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: min-content 1fr;
        gap: var(--case-study-margin);
        margin-left: var(--case-study-margin);
        margin-right: var(--case-study-margin);
    }
	.intro-text {
        grid-column: 1 / -1;
        grid-row: 1;
        margin-bottom: 2rem;
    }    
	.diagram-section {
        grid-column: 1 / 8;
        grid-row: 2;
    }
	.m6-diagram {
        position: relative;
        width: 100%;
        margin-bottom: 1rem;
    }
	.m6-diagram img {
        width: 100%;
        height: auto;
        border: 1px solid #eee;
    }
	.m6-screenshot-photos {
        display: flex;
        gap: var(--case-study-margin);
		position: relative;
        z-index: 1;		
    }
    .m6-screenshot-photos img {
        width: 50%;
        height: auto;
    }
	.content-text {
        grid-column: 8 / -1;
        grid-row: 2;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
		display: flex;
        justify-content: center;  
        align-self: center;
        height: fit-content;  
    }
	.callout-lines {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none; /* Ensures the SVG doesn't interfere with interactions */
        z-index: 1; /* Places lines above the diagram but below the screenshots */
    }
	.highlight { color: #f66b84; }
	.closed { color: var(--color-accent-1); }     /* #4ca7ce blue */
    .open { color: var(--color-accent-3); }       /* #fcc221 yellow */
    .mixed { color: var(--color-accent-2); }      /* #f66b84 pink */
    .baseline { color: var(--color-accent-4); }
	
	ol {
        list-style: none;
        counter-reset: item;
        padding-left: 0;
        margin: 0;
    }

    ol li {
        counter-increment: item;
        margin: 0.5rem 0;
        display: flex;
        gap: 0.5rem;
    }

	ol li::before {
        content: counter(item) ".";
        font-weight: bold;
        color: var(--color-primary);
        min-width: 1.5rem;
    }

</style>

