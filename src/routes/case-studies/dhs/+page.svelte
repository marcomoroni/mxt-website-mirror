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
            start: { x: 38.6, y: 37 },
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
    const FADE_DURATION = 200; // milliseconds

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

        <p>The hypothesis was that the mixed DHS scenario would induce higher cognitive load and stress levels in drivers compared to the closed and open scenarios, due to the dynamic and variable use of the hard shoulder.</p>
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
            <p>To fully leverage our mixed reality simulator, we integrated both behavioral and psychophysiological measures. While behavioral metrics provide direct insights into driving performance, psychophysiological measures like electrocardiogram and eye tracking detect subtle changes in cognitive state—such as stress and cognitive load—that behavior alone can't reveal. This comprehensive approach offers a deeper understanding of driver reactions under different scenarios.</p>
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
                                class="base-schematic"
                                src="/images/dhs_case_study_analytics_schematics.png"
                                alt="MXT Analytics Schematics Base"
                            />
                            
                            {#if activeSection === sections.BEHAVIOUR}
                                <img 
                                    class="overlay-schematic behaviour"
                                    src="/images/dhs_case_study_analytics_schematics_behaviour.png"
                                    alt="Behaviour Analytics Overlay"
                                    transition:fade={{duration: FADE_DURATION}}
                                />
                            {/if}
                            
                            {#if activeSection === sections.HEART}
                                <img 
                                    class="overlay-schematic heart"
                                    src="/images/dhs_case_study_analytics_schematics_hearth.png"
                                    alt="ECG Analytics Overlay"
                                    transition:fade={{duration: FADE_DURATION}}
                                />
                            {/if}
                            
                            {#if activeSection === sections.EYE}
                                <img 
                                    class="overlay-schematic eye"
                                    src="/images/dhs_case_study_analytics_schematics_eye.png"
                                    alt="Eye Tracking Analytics Overlay"
                                    transition:fade={{duration: FADE_DURATION}}
                                />
                            {/if}
                        </div>
                    </div>
                    
                    <div class="section-description">
                        {#each [activeSection] as current (current)}
                            <div class="description-wrapper" transition:fade={{duration: FADE_DURATION}}>
                                <p>
                                    {#if current === sections.HEART}
                                        Heart rate variability (HRV) is sensitive to shifts in cognitive workload, allowing it to detect physiological responses to both heightened states, such as stress, and lower arousal states, like relaxation. This makes HRV an effective measure for assessing mental effort and stress levels.
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
                <!-- Add analysis section -->
                {#if activeSection === sections.HEART}
                    <div class="analysis-details" data-section="heart" transition:fade={{duration: FADE_DURATION}}>
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
                            <!-- First result - Image on right -->
                            <div class="result-item">
                                <div class="result-text">
                                    <p>The heart rates were higher in the mixed scenario compared to the baseline scenario. This suggests that drivers in the mixed scenario were under mental strain and had to work harder to process what was happening on the road.</p>
                                </div>
                                <div class="result-image">
                                    <img src="/images/dhs_case_study_hrv_beats_per_minute.png" alt="Heart Rate Analysis" />
                                </div>
                            </div>
                            
                            <!-- Second result - Image on left -->
                            <div class="result-item">
                                <div class="result-image">
                                    <img src="/images/dhs_case_study_hrv_rr20.png" alt="Heart Rate Variability Analysis" />
                                </div>
                                <div class="result-text">
                                    <p>When looking at heart rate variability (HRV), we measured how much time passed between heartbeats. A lower HRV, especially the percentage of successive heartbeats that differed by more than 20 milliseconds (pNN20), is often linked to higher stress and mental effort. In the mixed scenario, participants showed significantly lower HRV compared to the other conditions, suggesting they were under more cognitive load and stress in this scenario.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Conclusion -->
                        <div class="conclusion">
                            <p>The results show a clear pattern: in the mixed scenario, participants had not only higher heart rates but also lower heart rate variability. Together, these measures suggest that drivers faced higher cognitive demand and stress in the mixed condition when compared to the baseline.</p>
                        </div>
                    </div>
                {/if}
                {#if activeSection === sections.BEHAVIOUR}
                    <div class="analysis-details" data-section="behaviour" transition:fade={{duration: FADE_DURATION}}>
                        <div class="central-diagram">
                            <div class="diagram-content">
                                <img src="/images/dhs_case_study_behaviour_central_diagram.png" alt="Driving Behaviour Metrics" />
                                
                                <!-- Left annotation -->
                                <div class="left-annotation">
                                    <p>We analyze vehicle speed to gather insights into driver comfort. Frequent speed fluctuations can indicate uncertainty or discomfort in the driving environment.</p>
                                </div>
                                
                                <!-- Right annotations -->
                                <div class="right-annotation top">
                                    <p>Frequent lane changes can signal driver aggression or overconfidence depending on the driving environment.</p>
                                </div>
                                <div class="right-annotation bottom">
                                    <p>Time spent over the speed limit can indicate how well drivers adhere to road regulations. Among drivers with similar levels of experience, spending more time speeding may suggest greater driver confidence.</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Results grid -->
                        <div class="results-grid">
                            <!-- First result - Text left, Image right -->
                            <div class="result-item">
                                <div class="result-text">
                                    <p>In all scenarios — whether the hard shoulder was open, closed, or dynamically mixed — drivers maintained average speeds well below the speed limit, indicating that participants generally adhered to safe driving practices.</p>
                                </div>
                                <div class="result-image">
                                    <img src="/images/dhs_case_study_behaviour_speed.png" alt="Speed Analysis" />
                                </div>
                            </div>
                            
                            <!-- Second result - Image left, Text right -->
                            <div class="result-item">
                                <div class="result-image">
                                    <img src="/images/dhs_case_study_behaviour_violations.png" alt="Speed Violations Analysis" />
                                </div>
                                <div class="result-text">
                                    <p>However, in the scenario involving active hard shoulders (open and mixed) participants spent overall more time over the speed limit compared to the closed and baseline scenarios. This indicates that the availability of the hard shoulder encourages drivers to increase their speed, leading to more speed limit violations, particularly in free-flow traffic conditions.</p>
                                </div>
                            </div>
                        
                            <!-- Third result - Text left, Image right -->
                            <div class="result-item">
                                <div class="result-text">
                                    <p>Drivers changed lanes most frequently in the basic scenario. This behaviour indicates that in a familiar three-lane environment drivers felt more comfortable making frequent lane changes, likely because the traffic flow felt more predictable, or they were in general more comfortable.</p>
                                </div>
                                <div class="result-image">
                                    <img src="/images/dhs_case_study_behaviour_lane_change_count.png" alt="Lane Change Analysis" />
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
                {#if activeSection === sections.EYE}
                    <div class="analysis-details" data-section="eye" transition:fade={{duration: FADE_DURATION}}>
                        <!-- Central diagrams -->
                        <div class="central-diagram">
                            <div class="diagram-content">
                                <div class="dual-images">
                                    <img src="/images/dhs_case_study_eye_tracking.png" alt="Eye Tracking Analysis" />
                                    <img src="/images/dhs_case_study_eye_tracking_heightmap.png" alt="Eye Tracking Heatmap" />
                                </div>
                                
                                <!-- Left annotation -->
                                <div class="left-annotation top">
                                    <p>Eye tracking is collected at 1kHz. Oculometrics, such as larger pupil size can suggest increased mental effort, while shorter fixation times might indicate quicker processing of complex information. A higher blink rate may signal stress, and a more focused gaze might reflect greater cognitive demand.</p>
                                </div>
                                
                                <!-- Right annotation -->
                                <div class="right-annotation top">
                                    <p>In terms of gaze, we extracted fixations on key areas of interest such as the overhead gantries, advanced motorway indicator, variable message signs. Longer fixations may suggest difficulties in processing information, while shorter duration could indicate quick understanding — or missed details.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Analysis intro text -->
                        <div class="analysis-intro">
                            <p>We focused our analysis on drivers when they were approaching key areas of interest, extracting oculometrics (pupil diameter and blinking) and fixation data for each condition only within these areas.</p>
                        </div>

                        <!-- Results grid -->
                        <div class="results-grid">
                            <!-- First result - Text left, Image right -->
                            <div class="result-item">
                                <div class="result-text">
                                    <p>We did not find differences in pupillometry, suggesting that participants were not subjected to increased mental effort in the scenarios with variable hard shoulders.</p>
                                </div>
                                <div class="result-image">
                                    <img src="/images/dhs_case_study_eye_pupil_diameter.png" alt="Pupil Diameter Analysis" />
                                </div>
                            </div>
                            
                            <!-- Second result - Image left, Text right -->
                            <div class="result-item">
                                <div class="result-image">
                                    <img src="/images/dhs_case_study_eye_blink_rate.png" alt="Blink Rate Analysis" />
                                </div>
                                <div class="result-text">
                                    <p>Interestingly, blink rates when approaching areas of interest were higher in the open and mixed scenarios compared to the baseline. This could indicate that, while overall mental effort remained stable, the dynamic elements of the hard shoulder might have introduced moments of increased cognitive demand or uncertainty, reflected in the higher blink rates.</p>
                                </div>
                            </div>

                            <!-- Third result - Text left, Image right -->
                            <div class="result-item">
                                <div class="result-text">
                                    <p>Participants spent more time looking at the variable message signs and motorway indicators in the closed, open, and mixed scenarios, with the longest gaze duration in the mixed scenario (though not statistically different from the open). This suggests that drivers may have needed more time to process the dynamic information, especially in the mixed condition.
                                        Note that the baseline scenario had none of these elements.</p>
                                </div>
                                <div class="result-image">
                                    <img src="/images/dhs_case_study_eye_gaze_duration.png" alt="Gaze Duration Analysis" />
                                </div>
                            </div>
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
        /* border: 1px solid #eee; */
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

    .base-schematic {
        width: 100%;
        height: auto;
        filter: invert(34%) sepia(2%) saturate(100%) hue-rotate(356deg) brightness(90%) contrast(83%);
    }

    .overlay-schematic {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .overlay-schematic.behaviour {
        filter: brightness(0) saturate(100%) invert(78%) sepia(61%) saturate(847%) hue-rotate(340deg) brightness(103%) contrast(98%);
    }

    .overlay-schematic.heart {
        filter: brightness(0) saturate(100%) invert(59%) sepia(14%) saturate(4580%) hue-rotate(312deg) brightness(99%) contrast(94%);
    }

    .overlay-schematic.eye {
        filter: brightness(0) saturate(100%) invert(57%) sepia(78%) saturate(312%) hue-rotate(152deg) brightness(90%) contrast(94%);
    }

    .image-container {
        flex: 1;
        min-width: 0;
        display: flex;
        justify-content: center;
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

    .sidebar-icon {
        fill: var(--color-background);
        transition: fill 0.2s ease;
    }

    .sidebar-icon.active {
        fill: #f66b84;
    }

    .sidebar-icon[data-section="behaviour"].active {
        fill: var(--color-accent-3);
    }

    .sidebar-icon[data-section="heart"].active  {
        fill: var(--color-accent-2);
    }

    .sidebar-icon[data-section="eye"].active  {
        fill: var(--color-accent-1);
    }

    /* Only apply hover when not active */
    .sidebar-icon:not(.active):hover {
        fill: #f66b84;
        opacity: 0.3;
    }

    .sidebar-icon[data-section="behaviour"]:not(.active):hover {
        fill: var(--color-accent-3);
        opacity: 0.3;
    }

    .sidebar-icon[data-section="heart"]:not(.active):hover  {
        fill: var(--color-accent-2);
        opacity: 0.3;
    }   

    .sidebar-icon[data-section="eye"]:not(.active):hover {
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

    .right-annotation.top {
        top: 25%;
    }

    .right-annotation.bottom {
        bottom: 25%;
    }

    .results-grid {
        display: flex;
        flex-direction: column;
        gap: 16px; /* Small gap between results */
    }

    .result-item {
        display: flex;
        align-items: center;
        gap: 24px; /* Gap between text and image */
        max-width: 800px;
        margin: 0 auto;
    }

    .result-text {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
        color: var(--color-primary);
    }

    .result-image {
        flex: 1;
    }

    .result-image img {
        width: 100%;
        height: auto;
        display: block;
    }

    .conclusion {
        font-size: 16px;
        line-height: 1.6;
        color: var(--color-primary);
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
    }

    /* Common base styles */
    .central-diagram {
        background-color: var(--color-background-alt);
        padding: 24px;
        border-radius: 8px;
    }

    /* Heart section specific styles */
    [data-section="heart"] .diagram-content {
        position: relative;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }

    [data-section="heart"] .left-annotation {
        position: absolute;
        left: -200px;
        width: 180px;
    }

    [data-section="heart"] .left-annotation.top {
        top: 50px;
    }

    [data-section="heart"] .left-annotation.bottom {
        bottom: 50px;
    }

    [data-section="heart"] .right-annotation {
        position: absolute;
        right: -200px;
        width: 180px;
        top: 50%;
        transform: translateY(-50%);
    }

    /* Behaviour section specific styles */
    [data-section="behaviour"] .diagram-content {
        position: relative;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }

    [data-section="behaviour"] .left-annotation {
        position: absolute;
        left: -200px;
        width: 180px;
        top: 50%;
        transform: translateY(-50%);
    }

    [data-section="behaviour"] .right-annotation {
        position: absolute;
        right: -200px;
        width: 180px;
    }

    [data-section="behaviour"] .right-annotation.top {
        top: 25%;
    }

    [data-section="behaviour"] .right-annotation.bottom {
        bottom: 60%;
    }

    /* Common image styles */
    .diagram-content img {
        width: 100%;
        height: auto;
        display: block;
    }

    /* Common annotation text styles */
    .left-annotation p, .right-annotation p {
        margin: 0;
        font-size: 14px;
        line-height: 1.4;
        color: var(--color-primary);
        background-color: var(--color-background);
        padding: 12px;
        border-radius: 4px;
    }

    /* Results grid styles remain the same */
    .results-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 24px;
    }

    .result-item {
        display: flex;
        align-items: center;
        gap: 24px;
        max-width: 800px;
        margin: 0 auto;
    }

    .result-text {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
        color: var(--color-primary);
    }

    .result-image {
        flex: 1;
    }

    .result-image img {
        width: 100%;
        height: auto;
        display: block;
    }

    /* Eye section specific styles */
    [data-section="eye"] .diagram-content {
        position: relative;
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
    }

    [data-section="eye"] .dual-images {
        display: flex;
        gap: 24px;
        justify-content: center;
        align-items: center;
    }

    [data-section="eye"] .dual-images img:first-child {
        width: 30%;
        height: auto;
        display: block;
        object-fit: contain;
    }

    [data-section="eye"] .dual-images img:last-child {
        width: 70%;
        height: auto;
        display: block;
        object-fit: contain;
        aspect-ratio: 16/9;
    }

    [data-section="eye"] .left-annotation {
        position: absolute;
        left: -200px;
        width: 180px;
        top: 50%;
        transform: translateY(-50%);
    }

    [data-section="eye"] .right-annotation {
        position: absolute;
        right: -200px;
        width: 180px;
        top: 50%;
        transform: translateY(-50%);
    }

    /* Analysis intro specific to eye section */
    [data-section="eye"] .analysis-intro {
        text-align: center;
        max-width: 600px;
        margin: 24px auto;
        font-size: 14px;
        line-height: 1.4;
        color: var(--color-primary);
    }

</style>

