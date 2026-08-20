# Career Atlas

A cinematic, responsive career-exploration experience for post-12th decision making. It combines an immersive 3D career cosmos with practical profiles, placement audits, personalised matching, cost planning, and student/practitioner perspectives.

## Current implementation

- 15,000+ searchable careers and specialization pathways: the 10,000 source occupations in `src/data/careerRegistry.js` are preserved; 5,000 mapped pathway variants are generated only when the catalogue is requested.
- Route-level code splitting plus on-demand registry loading. The landing page and curated career profiles do not request the large career-data chunk.
- Career pathways, practitioner stories, community student perspectives, a Sports & Performance node, AI-resilience analysis, and an education-loan calculator.
- Global-study planner with city-level tuition/living estimates, one-time costs, total cost of study, and illustrative scholarship scenarios.
- 60-question Career DNA assessment, comparison tooling, placement reports, salary combinations, and conversational Copilot.
- Responsive desktop/tablet/mobile layouts, persistent language preference selection, and an earth-toned cinematic palette.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run lint
```

## Data integrity note

Cost, scholarship, placement, and community-perspective content is intended for planning and discovery. Validate it with institutions, scholarship providers, and practitioners before any application or financial decision. The repository currently contains eight deeply audited placement reports; reaching a trustworthy 5,000+ named institution directory requires an approved/licensed institution data source and a refresh/provenance pipeline rather than generated records.
