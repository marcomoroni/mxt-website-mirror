<script lang="ts">
	import CaseStudyLanding from '$lib/CaseStudyLanding.svelte';
	import { caseStudiesData } from '$lib/caseStudiesData';
	import { mxtHeadTitle } from '$lib/mxtHeadTitle';
    import DHSIntroSection from '$lib/DHSIntroSection.svelte';
	import DHSBehaviourAnalysis from '$lib/DHSBehaviourAnalysis.svelte';
	import DHSECGAnalysis from '$lib/DHSECGAnalysis.svelte';
	import DHSEyeAnalysis from '$lib/DHSEyeAnalysis.svelte';
	import DHSIcons from '$lib/DHSIcons.svelte';

	const caseStudyData = caseStudiesData[1];
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
        [sections.EYE]: 'Eye Tracking'
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
<DHSIntroSection />
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
                    <DHSECGAnalysis {FADE_DURATION} />
                {/if}
                {#if activeSection === sections.BEHAVIOUR}
                    <DHSBehaviourAnalysis {FADE_DURATION} />
                {/if}
                {#if activeSection === sections.EYE}
                    <DHSEyeAnalysis {FADE_DURATION} />
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
        width: 100%;
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
</style>

