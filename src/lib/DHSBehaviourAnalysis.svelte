<script lang="ts">
    import { fade } from 'svelte/transition';
    export let FADE_DURATION;
</script>

<div class="analysis-details" transition:fade={{duration: FADE_DURATION}}>
    <div class="central-diagram">
        <div class="diagram-content">
            <div class="image-wrapper">
                <img 
                    class="central-diagram-image"
                    src="/images/dhs_case_study_behaviour_central_diagram.png" 
                    alt="Driving Behaviour Metrics" 
                />
                <img 
                    class="overlay-diagram-image"
                    src="/images/dhs_case_study_behaviour_central_diagram_overlay.png" 
                    alt="Driving Behaviour Metrics Overlay"
                />
            </div>
            
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
        <!-- First result -->
        <div class="result-item">
            <div class="result-text">
                <p>In all scenarios — whether the hard shoulder was open, closed, or dynamically mixed — drivers maintained average speeds well below the speed limit, indicating that participants generally adhered to safe driving practices.</p>
            </div>
            <div class="result-image">
                <img src="/images/dhs_case_study_behaviour_speed.png" alt="Speed Analysis" />
            </div>
        </div>
        
        <!-- Second result -->
        <div class="result-item">
            <div class="result-image">
                <img src="/images/dhs_case_study_behaviour_violations.png" alt="Speed Violations Analysis" />
            </div>
            <div class="result-text">
                <p>However, in the scenario involving active hard shoulders (open and mixed) participants spent overall more time over the speed limit compared to the closed and baseline scenarios. This indicates that the availability of the hard shoulder encourages drivers to increase their speed, leading to more speed limit violations, particularly in free-flow traffic conditions.</p>
            </div>
        </div>
    
        <!-- Third result -->
        <div class="result-item">
            <div class="result-text">
                <p>Drivers changed lanes most frequently in the basic scenario. This behaviour indicates that in a familiar three-lane environment drivers felt more comfortable making frequent lane changes, likely because the traffic flow felt more predictable, or they were in general more comfortable.</p>
            </div>
            <div class="result-image">
                <img src="/images/dhs_case_study_behaviour_lane_change_count.png" alt="Lane Change Analysis" />
            </div>
        </div>
    </div>

    <!-- Conclusion -->
    <div class="conclusion">
        <p>In our study, drivers showed a clear tendency to adapt their behavior based on the roadway environment: they drove cautiously in dynamic hard shoulder scenarios, but the availability of an open hard shoulder encouraged more speed limit violations. Frequent lane changes in familiar three-lane settings reflected greater driver confidence and ease, highlighting how familiarity and clarity in road design directly influence driver comfort and adherence to regulations.</p>
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

    .image-wrapper {
        position: relative;
        width: 100%;
    }

    .central-diagram-image {
        width: 100%;
        height: auto;
        filter: brightness(0) saturate(100%) invert(34%) sepia(2%) saturate(2626%) hue-rotate(356deg) brightness(90%) contrast(83%);
    }

    .overlay-diagram-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
    }

    .left-annotation {
        position: absolute;
        left: -200px;
        width: 180px;
        top: 50%;        
    }

    .right-annotation {
        position: absolute;
        right: -200px;
        width: 180px;
    }

    .right-annotation.top {
        top: 10%;
    }

    .right-annotation.bottom {
        bottom: 15%;
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