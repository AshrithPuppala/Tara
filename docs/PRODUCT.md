# Product definition

**TARA is a therapist workspace that turns a completed Kathputra-Tact therapy session into understandable performance analysis, AI-assisted observations, therapist notes, and long-term progress.**

```
Toy -> Data -> Analysis -> Insight -> Therapist -> Notes / Action -> Progress
```

## Users

Primary user: **the therapist**. Not parents, researchers, or admins (later).

## Scope of the MVP

In: dashboard, children, sessions, session analysis, insights, progress, therapist notes, device status, settings.
Out (for now): live session monitoring, real-time graphs and alerts, BLE in the browser, parent accounts, multi-user permissions, notifications, full medical records, 3D visualisation.

The post-session experience is the product. Every feature should strengthen the loop above, or be questioned.

## Reconciling two design briefs

The team has two documents: the original product brief (TARA, session-analysis-first) and a visual brief (Kathputra-Tact dashboard: teal, blue charts, 7-item sidebar). Decisions:

- **Visual language**: follow the visual brief (see DESIGN_SYSTEM.md).
- **Scope**: follow the product brief. The child-facing story interface and live telemetry panel from the visual brief are future work, not MVP.
- **Progress** is the dashboard ("Child Progress"), so there is no separate Progress route.

## AI principles

AI supports the therapist's judgment. It never diagnoses or claims clinical certainty.

Use: "Movement became less smooth during the final 4 minutes." "A similar pattern was seen in 3 earlier sessions." "This may indicate increasing fatigue." "Consider observing whether shorter activity blocks change this."
Avoid: "The child has neurological fatigue." "This proves..." Any diagnosis.

Pipeline (never send raw sensor data straight to an LLM):

```
raw sensor data -> metrics -> pattern detector -> LLM phrasing -> validated structured insight -> UI
```

Every insight has: category, observation, supporting evidence, confidence, optional consideration, link to supporting sessions.

## Hero screen

**Session Analysis**: what happened, what we noticed, the supporting data, and something the therapist may consider. Not "14 graphs".
