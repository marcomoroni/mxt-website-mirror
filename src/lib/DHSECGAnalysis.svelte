<script lang="ts">
    import { fade } from 'svelte/transition';
    export let FADE_DURATION;
</script>

<div class="analysis-details" transition:fade={{duration: FADE_DURATION}}>
    <div class="central-diagram">
        <div class="diagram-content">
            <img src="/images/dhs_case_study_hrv_raw_data.png" alt="Heart Rate Raw Data" />
            
            <div class="left-annotation top">
                <p>Heart rate increases incrementally with the difficulty of cognitive tasks while driving, indicating heightened mental workload</p>
            </div>
            <div class="left-annotation bottom">
                <p>Heart rate is collected at 1kHz. In this example, acquired from a single participant, you can observe the detect over a 50-second sample.</p>
            </div>
            
            <div class="right-annotation">
                <p>We are able to reconstruct and detect the ECG complex, from which we can extract heart rate variability measures to assess cognitive load and stress.</p>
            </div>
        </div>
    </div>

    <!-- Results grid -->
    <div class="results-grid">
        <!-- First result -->
        <div class="result-item">
            <div class="result-text">
                <p>The heart rates were higher in the mixed scenario compared to the baseline scenario. This suggests that drivers in the mixed scenario were under mental strain and had to work harder to process what was happening on the road.</p>
            </div>
            <div class="result-image">
                <img src="/images/dhs_case_study_hrv_beats_per_minute.png" alt="Heart Rate Analysis" />
            </div>
        </div>
        
        <!-- Second result -->
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