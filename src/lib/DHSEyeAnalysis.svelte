<script lang="ts">
    import { fade } from 'svelte/transition';
    export let FADE_DURATION;
</script>

<div class="analysis-details" transition:fade={{duration: FADE_DURATION}}>
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
        <!-- First result -->
        <div class="result-item">
            <div class="result-text">
                <p>We did not find differences in pupillometry, suggesting that participants were not subjected to increased mental effort in the scenarios with variable hard shoulders.</p>
            </div>
            <div class="result-image">
                <img src="/images/dhs_case_study_eye_pupil_diameter.png" alt="Pupil Diameter Analysis" />
            </div>
        </div>
        
        <!-- Second result -->
        <div class="result-item">
            <div class="result-image">
                <img src="/images/dhs_case_study_eye_blink_rate.png" alt="Blink Rate Analysis" />
            </div>
            <div class="result-text">
                <p>Interestingly, blink rates when approaching areas of interest were higher in the open and mixed scenarios compared to the baseline. This could indicate that, while overall mental effort remained stable, the dynamic elements of the hard shoulder might have introduced moments of increased cognitive demand or uncertainty, reflected in the higher blink rates.</p>
            </div>
        </div>

        <!-- Third result -->
        <div class="result-item">
            <div class="result-text">
                <p>Participants spent more time looking at the variable message signs and motorway indicators in the closed, open, and mixed scenarios, with the longest gaze duration in the mixed scenario (though not statistically different from the open). This suggests that drivers may have needed more time to process the dynamic information, especially in the mixed condition. Note that the baseline scenario had none of these elements.</p>
            </div>
            <div class="result-image">
                <img src="/images/dhs_case_study_eye_gaze_duration.png" alt="Gaze Duration Analysis" />
            </div>
        </div>
    </div>

    <!-- Conclusion -->
    <div class="conclusion">
        <p>In conclusion, drivers' eye-tracking data revealed how visual engagement shifted based on scenario complexity: participants spent the most time focusing on signs and indicators in dynamic hard shoulder settings, especially in mixed scenarios, indicating greater processing demands. Higher blink rates in these scenarios suggested moments of increased cognitive load or uncertainty, although overall mental effort remained consistent across conditions.</p>
    </div>
</div>

<style>
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
        max-width: 700px;
        margin: 0 auto;
    }

    .dual-images {
        display: flex;
        gap: 24px;
        justify-content: center;
        align-items: center;
    }

    .dual-images img:first-child {
        width: 30%;
        height: auto;
        display: block;
        object-fit: contain;
    }

    .dual-images img:last-child {
        width: 70%;
        height: auto;
        display: block;
        object-fit: contain;
        aspect-ratio: 16/9;
    }

    .left-annotation {
        position: absolute;
        left: -200px;
        width: 180px;
        top: 50%;
        transform: translateY(-50%);
    }

    .right-annotation {
        position: absolute;
        right: -200px;
        width: 180px;
        top: 50%;
        transform: translateY(-50%);
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

    .analysis-intro {
        text-align: center;
        max-width: 600px;
        margin: 24px auto;
        font-size: 14px;
        line-height: 1.4;
        color: var(--color-primary);
    }

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

    .conclusion {
        font-size: 16px;
        line-height: 1.6;
        color: var(--color-primary);
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
    }
</style>