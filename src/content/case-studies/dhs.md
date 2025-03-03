---
title: Insight into Driver Behaviour and Cognitive State on SMART Motorways
leadParagraph: Leveraging mixed reality simulation with integrated behavioural and psychophysiological measures to detect subtle cognitive state changes and enhance understanding of driver’s behaviour.
threeState: case-study-dhs
comingSoon: false
sort: 1
body:
  - |
    Understanding how drivers interact with and comprehend various road conditions is crucial for enhancing road safety, efficiency, and informing policy. In collaboration with WSP, we conducted a study for Highways England to investigate driver responses and cognitive load when navigating dynamic hard shoulder motorways. This initiative responded to the Transport Select Committee's recommendation to pause DHS conversions and aimed to identify factors affecting driver comprehension and provide insights for future improvements.

    ## Scenarios

    The simulation was based on an existing section of the M6 motorway between junctions 4 and 8, configured into a loop. It features overhead gantries, advanced motorway indicator signals with supporting variable message signs, speed cameras and emergency areas.
  - gallery:
      caption: |
        In the M6 motorway, dynamic signs are configured differently depending on the scenario.
      images:
        - src: /images/dhs_case_study_m6_diagram.png
          alt: M6 motorway diagram
        - src: /images/dhs_case_study_closed_signage.png
          alt: DHS Smart Motorway closed signage
        - src: /images/dhs_case_study_open_signage.png
          alt: DHS Smart Motorway open signage
  - |
    Participants, representing a diverse cross-section of the driving population in terms of age and experience (n = 39), were exposed to three scenarios in a within-subject design:

    * Scenario "Closed": hard shoulder closed to traffic
    * Scenario "Open": hard shoulder open to traffic
    * Scenario "Mixed": dynamic use of the hard shoulder, varying between open and closed along the same motorway

    A baseline measure was acquired in standard dual three-lane motorway.

    The traffic in the simulation scenarios was designed to reflect free-flow conditions, determined by algorithms to ensure realistic vehicle movement and flow.

    The hypothesis was that the mixed DHS scenario would induce higher cognitive load and stress levels in drivers compared to the closed and open scenarios, due to the dynamic and variable use of the hard shoulder.

    ## MXT Analytics Package

    To fully leverage our mixed reality simulator, we integrated both behavioral and psychophysiological measures. While behavioral metrics provide direct insights into driving performance, psychophysiological measures like electrocardiogram and eye tracking detect subtle changes in cognitive state—such as stress and cognitive load—that behavior alone can't reveal. This comprehensive approach offers a deeper understanding of driver reactions under different scenarios.

    ## Results
  - insight:
      collapsable: true
      sections:
        - title: Driving Behaviour
          body: |
            Average speed, speed variability, and rate of lane changes, can gauge comfort levels, consistency, and cautiousness. These metrics can identify areas where drivers may experience difficulty or uncertainty under different scenarios.

            #### Collected data

            We analyze vehicle speed to gather insights into driver comfort. Frequent speed fluctuations can indicate uncertainty or discomfort in the driving environment.

            Frequent lane changes can signal driver aggression or overconfidence depending on the driving environment.

            Time spent over the speed limit can indicate how well drivers adhere to road regulations. Among drivers with similar levels of experience, spending more time speeding may suggest greater driver confidence.

            #### Results

            In all scenarios — whether the hard shoulder was open, closed, or dynamically mixed — drivers maintained average speeds well below the speed limit, indicating that participants generally adhered to safe driving practices.

            ![Speed analysis](/images/dhs_case_study_behaviour_speed.png)

            However, in the scenario involving active hard shoulders (open and mixed) participants spent overall more time over the speed limit compared to the closed and baseline scenarios. This indicates that the availability of the hard shoulder encourages drivers to increase their speed, leading to more speed limit violations, particularly in free-flow traffic conditions.

            ![Speed violations analysis](/images/dhs_case_study_behaviour_violations.png)

            Drivers changed lanes most frequently in the basic scenario. This behaviour indicates that in a familiar three-lane environment drivers felt more comfortable making frequent lane changes, likely because the traffic flow felt more predictable, or they were in general more comfortable.

            ![Lane change analysis](/images/dhs_case_study_behaviour_lane_change_count.png)

            #### Conclusion

            In our study, drivers showed a clear tendency to adapt their behavior based on the roadway environment: they drove cautiously in dynamic hard shoulder scenarios, but the availability of an open hard shoulder encouraged more speed limit violations. Frequent lane changes in familiar three-lane settings reflected greater driver confidence and ease, highlighting how familiarity and clarity in road design directly influence driver comfort and adherence to regulations.
        - title: Heart Rate and Heart Rate Variability
          body: |
            Heart rate variability (HRV) is sensitive to shifts in cognitive workload, allowing it to detect physiological responses to both heightened states, such as stress, and lower arousal states, like relaxation. This makes HRV an effective measure for assessing mental effort and stress levels.

            #### Collected data

            Heart rate increases incrementally with the difficulty of cognitive tasks while driving, indicating heightened mental workload.

            ![](/images/dhs_case_study_hrv_raw_data_signal_only.png)

            Heart rate is collected at 1kHz. In this example, acquired from a single participant, you can observe the detect over a 50-second sample.

            ![](/images/dhs_case_study_hrv_raw_data_heart_rate.png)

            We are able to reconstruct and detect the QRS complex (the distinct pattern of electrical activity representing key features of each heartbeat), from which we can extract heart rate variability measures to assess cognitive load and stress.

            ![](/images/dhs_case_study_hrv_raw_data_heartbeats.png)

            #### Results

            The heart rates were higher in the mixed scenario compared to the baseline scenario. This suggests that drivers in the mixed scenario were under mental strain and had to work harder to process what was happening on the road.

            ![](/images/dhs_case_study_hrv_beats_per_minute.png)

            When looking at heart rate variability (HRV), we measured how much time passed between heartbeats. A lower HRV, especially the percentage of successive heartbeats that differed by more than 20 milliseconds (pNN20), is often linked to higher stress and mental effort. In the mixed scenario, participants showed significantly lower HRV compared to the other conditions, suggesting they were under more cognitive load and stress in this scenario.

            ![](/images/dhs_case_study_hrv_rr20.png)

            #### Conclusion

            The results show a clear pattern: in the mixed scenario, participants had not only higher heart rates but also lower heart rate variability. Together, these measures suggest that drivers faced higher cognitive demand and stress in the mixed condition when compared to the baseline.
        - title: Eye Tracking
          body: |
            Eye tracking insights into cognitive load include longer fixations and frequent saccades, indicating higher cognitive effort and active scanning due to the need for acquiring more decisional information. Larger pupil sizes reveal increased mental effort and stress.

            #### Collected data

            Eye tracking is collected at 1kHz. Oculometrics, such as larger pupil size can suggest increased mental effort, while shorter fixation times might indicate quicker processing of complex information. A higher blink rate may signal stress, and a more focused gaze might reflect greater cognitive demand.

            In terms of gaze, we extracted fixations on key areas of interest such as the overhead gantries, advanced motorway indicator, variable message signs. Longer fixations may suggest difficulties in processing information, while shorter duration could indicate quick understanding — or missed details.

            ![](/images/dhs_case_study_eye_heightmap.png)

            We focused our analysis on drivers when they were approaching key areas of interest, extracting oculometrics (pupil diameter and blinking) and fixation data for each condition only within these areas.

            #### Results

            We did not find differences in pupillometry, suggesting that participants were not subjected to increased mental effort in the scenarios with variable hard shoulders.

            ![](/images/dhs_case_study_eye_pupil_diameter.png)

            Interestingly, blink rates when approaching areas of interest were higher in the open and mixed scenarios compared to the baseline. This could indicate that, while overall mental effort remained stable, the dynamic elements of the hard shoulder might have introduced moments of increased cognitive demand or uncertainty, reflected in the higher blink rates.

            ![](/images/dhs_case_study_eye_blink_rate.png)

            Participants spent more time looking at the variable message signs and motorway indicators in the closed, open, and mixed scenarios, with the longest gaze duration in the mixed scenario (though not statistically different from the open). This suggests that drivers may have needed more time to process the dynamic information, especially in the mixed condition. Note that the baseline scenario had none of these elements.

            ![](/images/dhs_case_study_eye_gaze_duration.png)

            #### Conclusion

            In conclusion, drivers' eye-tracking data revealed how visual engagement shifted based on scenario complexity: participants spent the most time focusing on signs and indicators in dynamic hard shoulder settings, especially in mixed scenarios, indicating greater processing demands. Higher blink rates in these scenarios suggested moments of increased cognitive load or uncertainty, although overall mental effort remained consistent across conditions.
---

Hello
