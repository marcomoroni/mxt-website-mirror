<script lang="ts">
	import CaseStudyLanding from '$lib/CaseStudyLanding.svelte';
	import { caseStudiesData } from '$lib/caseStudiesData';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';
	import DHSIcons from '$lib/DHSIcons.svelte';

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
	    // Enum for active section
		const sections = {
        BEHAVIOUR: 'behaviour',
        HEART: 'heart',
        EYE: 'eye'
    };

    // Track active section
    let activeSection = sections.BEHAVIOUR;

    // Function to change active section
    const setActiveSection = (section: typeof sections[keyof typeof sections]) => {
        activeSection = section;
    };

    $: sectionTitle = {
        [sections.BEHAVIOUR]: 'Driving Behaviour',
        [sections.HEART]: 'Heart Rate and Heart Rate Variability',
        [sections.EYE]: 'Oculometrics and Gaze'
    }[activeSection];

    // For some customization of the analytics section
    import { fade } from 'svelte/transition';
    const FADE_DURATION = 1500; // milliseconds

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
        <p>The simulation was based on an existing section of the M6 motorway between junctions 4 and 8, configured into a loop. 
			It features overhead gantries, advanced motorway indicator signals with supporting variable message signs, speed cameras and emergency areas.</p>

        <p>Participants, representing a diverse cross-section of the driving population in terms of age and experience (n = 39), were exposed to three scenarios in a within-subject design:</p>

        <ol>
            <li><span class="closed">Closed</span> - hard shoulder closed to traffic</li>
            <li><span class="open">Open</span> - hard shoulder open to traffic</li>
            <li><span class="mixed">Mixed</span> - dynamic use of the hard shoulder, varying between open and closed along the same motorway</li>
        </ol>

        <p>A <span class="baseline">baseline measure</span> was acquired in standard dual three-lane motorway.</p>

        <p>The traffic in the simulation scenarios was designed to reflect free-flow conditions, determined by algorithms to ensure realistic vehicle movement and flow.</p>

        <p>Hypothesis were that DHS scenario would present drivers with higher cognitive load or stress levels compared to the closed and open scenarios, 
			due to the dynamic and variable nature of the hard shoulder's use along the same motorway.</p>
    </div>

</div>
<div class="section-spacer" />
<div class="analytics-section">
	 <!-- Fixed title and paragraph -->
	 <div class="analytics-header">
        <div class="analytics-title">
            <h1>MXT Analytics Package</h1>
        </div>
        <div class="analytics-intro">
            <p>To fully leverage our mixed reality simulator, we integrated behavioral and psychophysiological measures. While behavioral metrics provide direct insights into driving performance, they only partially depict the driver's cognitive state.</p>
            
            <p>Psychophysiological measures, such as electrocardiogram, eye tracking and oculometrics, detect subtle changes in cognitive state that behavior alone can't reveal, like stress or changes in cognitive load. These measures offer a more comprehensive understanding of driver reactions under different scenarios, leading to better-informed insights into driver's behaviour.</p>
        </div>
    </div>

	<div class="analytics-container">
		<div class="analytics-content">
			<!-- Sidebar -->
            <div class="sidebar">
                <button 
                    class="sidebar-icon"
                    class:active={activeSection === sections.BEHAVIOUR}
                    data-section="behaviour"
                    on:click={() => setActiveSection(sections.BEHAVIOUR)}
                >
                    <DHSIcons width="48" height="48">
                        <div slot="behaviour"></div>
                    </DHSIcons>
                </button>
                <button 
                    class="sidebar-icon"
                    class:active={activeSection === sections.HEART}
                    data-section="heart"
                    on:click={() => setActiveSection(sections.HEART)}
                >
                    <DHSIcons width="48" height="48">
                        <div slot="heart"></div>
                    </DHSIcons>
                </button>
                <button 
                    class="sidebar-icon"
                    class:active={activeSection === sections.EYE}
                    data-section="eye"
                    on:click={() => setActiveSection(sections.EYE)}
                >
                    <DHSIcons width="48" height="48">
                        <div slot="eye"></div>
                    </DHSIcons>
                </button>
            </div>
            <div class="content-area">
                <div class="title-container">
                    {#key sectionTitle}
                        <h2 class="section-title" transition:fade={{duration: FADE_DURATION}}>
                            {sectionTitle}
                        </h2>
                    {/key}
                </div>
                <div class="content-layout">
                    <div class="image-container">
                        <div class="image-wrapper">
                            <img 
                                src="/images/dhs_case_study_analytics_schematics.png"
                                alt="MXT Analytics Schematics"
                            />
                            <!-- Overlay icons -->
                            {#if activeSection === sections.BEHAVIOUR}
                                <div class="overlay-icon behaviour-position" transition:fade={{duration: FADE_DURATION}}>
                                    <DHSIcons width="48" height="48">
                                        <div slot="behaviour"></div>
                                    </DHSIcons>
                                </div>
                            {/if}
                            
                            {#if activeSection === sections.HEART}
                                <div class="overlay-icon heart-position" transition:fade={{duration: FADE_DURATION}}>
                                    <DHSIcons width="48" height="48">
                                        <div slot="heart"></div>
                                    </DHSIcons>
                                </div>
                            {/if}
                            
                            {#if activeSection === sections.EYE}
                                <div class="overlay-icon eye-position" transition:fade={{duration: FADE_DURATION}}>
                                    <DHSIcons width="48" height="48">
                                        <div slot="eye"></div>
                                    </DHSIcons>
                                </div>
                            {/if}
                        </div>
                    </div>
                    
                    <div class="section-description">
                        {#each [activeSection] as current (current)}
                            <div class="description-wrapper" transition:fade={{duration: FADE_DURATION}}>
                                <p>
                                    {#if current === sections.HEART}
                                        Heart rate variability detects variations during high-demand tasks. It is sensitive to both over-arousal and under-arousal states, such as stress and vigilance, making it an effective measure for assessing cognitive workload and physiological responses to stress.
                                    {:else if current === sections.BEHAVIOUR}
                                        Average speed, speed variability, and rate of lane changes, can gauge comfort levels, consistency, and cautiousness. These metrics can identify areas where drivers may experience difficulty or uncertainty under different scenarios.
                                    {:else if current === sections.EYE}
                                        Eye tracking insights into cognitive load include longer fixations and frequent saccades, indicating higher cognitive effort and active scanning due to the need for acquiring more decisional information. Larger pupil sizes reveal increased mental effort and stress.
                                    {/if}
                                </p>
                            </div>
                        {/each}
                    </div>                    
                </div>
                <!-- Add new analysis section -->
                {#if activeSection === sections.HEART}
                    <div class="analysis-details" transition:fade={{duration: FADE_DURATION}}>
                        <!-- Central diagram with annotations -->
                        <div class="central-diagram">
                            <div class="diagram-content">
                                <img src="/images/dhs_case_study_hrv_raw_data.png" alt="Heart Rate Raw Data" />
                                
                                <!-- Left annotations with absolute positioning -->
                                <div class="left-annotation top">
                                    <p>Heart rate increases incrementally with the difficulty of cognitive tasks while driving, indicating heightened mental workload</p>
                                </div>
                                <div class="left-annotation bottom">
                                    <p>Heart rate is collected at 1kHz. In this example, acquired from a single participant, you can observe the detect over a 50-second sample.</p>
                                </div>
                                
                                <!-- Right annotation with absolute positioning -->
                                <div class="right-annotation">
                                    <p>We are able to reconstruct and detect the ECG complex, from which we can extract heart rate variability measures to assess cognitive load and stress.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Results grid -->
                        <div class="results-grid">
                            <div class="result-item">
                                <div class="result-text">
                                    <p>The heart rates were higher in the mixed scenario compared to the baseline scenario. This suggests that drivers in the mixed scenario were under mental strain and had to work harder to process what was happening on the road.</p>
                                </div>
                                <img class="result-image" src="/images/dhs_case_study_hrv_beats_per_minute.png" alt="Heart Rate Analysis" />
                            </div>
                            <div class="result-item">
                                <div class="result-text">
                                    <p>When looking at heart rate variability (HRV), we measured how much time passed between heartbeats. A lower HRV, especially the percentage of successive heartbeats that differed by more than 20 milliseconds (pNN20), is often linked to higher stress and mental effort. In the mixed scenario, participants showed significantly lower HRV compared to the other conditions, suggesting they were under more cognitive load and stress in this scenario.</p>
                                </div>
                                <img class="result-image" src="/images/dhs_case_study_hrv_rr20.png" alt="Heart Rate Variability Analysis" />
                            </div>
                        </div>

                        <!-- Conclusion -->
                        <div class="conclusion">
                            <p>The results show a clear pattern: in the mixed scenario, participants had not only higher heart rates but also lower heart rate variability. Together, these measures suggest that drivers faced higher cognitive demand and stress in this condition compared to the others.</p>
                        </div>
                    </div>
                {/if}
            </div>
		</div>
	</div>

</div>

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
    .analytics-section {
        margin: var(--case-study-margin);
    }

    .analytics-header {
        margin-bottom: 4rem;
    }

    .analytics-title {
        margin-bottom: 2rem;
    }

    .analytics-title h1 {
        font-size: 34px;
		font-weight: 500;
		line-height: 1.4;
        color: var(--color-primary);
    }
    .analytics-intro {
        font-size: 20px;
		font-weight: 400;
		line-height: 1.4;
    }
    .analytics-intro p {
        margin-bottom: 1.5rem;
    }
    .analytics-intro p:last-child {
        margin-bottom: 0;
    }
    .analytics-container {
        position: relative;
        min-height: 400px;
    }
    .analytics-content {
        display: flex;
        width: 100%;
    }
    .content-area {
        flex: 1;
        margin-left: 72px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 24px;
    }

    .title-container {
        height: 40px;
        position: relative;
        margin-bottom: 2rem;
        width: 100%;
    }

    .section-title {
        position: absolute;
        width: 100%;
        text-align: center;
        margin: 0;
        color: var(--color-primary);
        font-size: 30px;
        font-weight: 500;
        white-space: nowrap;
        left: 50%;
        transform: translateX(-50%);
    }

    .image-wrapper {
        position: relative;
        width: fit-content; /* Contains to image size */
        display: inline-block;
    }

    .image-container {
        flex: 1;
        min-width: 0;
        display: flex;
        justify-content: center;
    }

    .overlay-icon {
        position: absolute;
        width: 48px;
        height: 48px;
        
    }

    /* Position classes using percentages */
    .behaviour-position {
        bottom: 23%;
        left: 37%;
        color: var(--color-accent-3);
    }

    .heart-position {
        top: 60%;
        left: 16%;
        color: var(--color-accent-2);
    }

    .eye-position {
        top: 22%;
        right: 16%;
        color: var(--color-accent-1);
    }

    .overlay-icon :global(svg) {
        fill: currentColor;
    }

    .sidebar {
        background-color: var(--color-primary);
        width: 72px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
    }

    .sidebar-icon {
        width: 72px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        margin: 0;
        border: none;
        background: transparent;
        cursor: pointer;
    }

    .sidebar-icon :global(svg) {
        fill: var(--color-background);
        transition: fill 0.2s ease;
    }

    .sidebar-icon.active :global(svg) {
        fill: #f66b84;
    }

    .sidebar-icon[data-section="behaviour"].active :global(svg) {
        fill: var(--color-accent-3);
    }

    .sidebar-icon[data-section="heart"].active :global(svg) {
        fill: var(--color-accent-2);
    }

    .sidebar-icon[data-section="eye"].active :global(svg) {
        fill: var(--color-accent-1);
    }

    /* Only apply hover when not active */
    .sidebar-icon:not(.active):hover :global(svg) {
        fill: #f66b84;
        opacity: 0.3;
    }

    .sidebar-icon[data-section="behaviour"]:not(.active):hover :global(svg) {
        fill: var(--color-accent-3);
        opacity: 0.3;
    }

    .sidebar-icon[data-section="heart"]:not(.active):hover :global(svg) {
        fill: var(--color-accent-2);
        opacity: 0.3;
    }   

    .sidebar-icon[data-section="eye"]:not(.active):hover :global(svg) {
        fill: var(--color-accent-1);
        opacity: 0.3;
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

    .content-layout {
        display: flex;
        gap: 48px;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 12px;
    }

    .section-description {
        flex: 1;
        max-width: 400px;
        font-size: 16px;
        line-height: 1.6;
        color: var(--color-primary);
        display: grid;
    }

    .description-wrapper {
        grid-row: 1;
        grid-column: 1;
    }

    .description-wrapper p {
        margin: 0;
    }

    .analysis-details {
        width: 100%;
        margin-top: 48px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .central-diagram {
        background-color: var(--color-background-alt);
        padding: 24px;
        border-radius: 8px;
    }

    .diagram-content {
        position: relative;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }

    .diagram-content img {
        width: 100%;
        height: auto;
        display: block;
    }

    .left-annotation {
        position: absolute;
        left: -200px;
        width: 180px;
    }

    .left-annotation.top {
        top: 50px;
    }

    .left-annotation.bottom {
        bottom: 50px;
    }

    .right-annotation {
        position: absolute;
        right: -200px;
        top: 50%;
        transform: translateY(-50%);
        width: 180px;
    }

    .left-annotation p, .right-annotation p {
        margin: 0;
        font-size: 14px;
        line-height: 1.4;
        color: var(--color-primary);
        background-color: var(--color-background);
        padding: 12px;
        border-radius: 4px;
    }

    .results-grid {
        position: relative;
        width: 100%;
        margin: 24px 0;
    }

    .result-item {
        position: relative;
        max-width: 500px; /* Reduced image container width */
        margin: 0 auto;
    }

    .result-image {
        width: 100%;
        height: auto;
        display: block;
    }

    .result-text {
        position: absolute;
        width: 300px; /* Increased text width */
        left: -320px; /* Position text to the left of image */
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        line-height: 1.4;
        color: var(--color-primary);
    }

    .conclusion {
        font-size: 16px;
        line-height: 1.6;
        color: var(--color-primary);
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
    }

</style>

