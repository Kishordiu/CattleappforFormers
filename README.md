<div align="center">
  <img src="./assets/hero.png" alt="Cattle Care for Farmers — agritech management artwork" width="100%" />
</div>

<p align="center">
  <a href="https://diufoundry.online"><img alt="DIU Foundry" src="https://img.shields.io/badge/DIU_FOUNDRY-AGRITECH_LAB-0D2E1B?style=for-the-badge&logoColor=86EFAC&labelColor=050A07" /></a>
  <img alt="Product area" src="https://img.shields.io/badge/PRODUCT-LIVESTOCK_MANAGEMENT-10B981?style=for-the-badge&labelColor=050A07" />
  <img alt="Data mode" src="https://img.shields.io/badge/DATA-LOCAL_DEMO_RECORDS-F59E0B?style=for-the-badge&labelColor=050A07" />
</p>

# Cattle Care for Farmers

**An agritech interface prototype for animal records, sample productivity trends, and scenario-based planning.**

Cattle Care for Farmers explores how everyday farm workflows might come together in one multilingual workspace: animal profiles, productivity records, health-related notes, economics views, breeding timelines, and decision-support screens.

The current repository is a **front-end prototype**. The service in `src/services/api.ts` seeds example cattle and productivity records in browser `localStorage`; it is not connected to live ear-tag sensors, a veterinary information system, or a production database.

## What you can explore

- **Animal profiles:** Review and add cattle records within the browser-local demo data model.
- **Productivity views:** Explore example milk-yield trends generated for the prototype.
- **Scenario planning:** Adjust assumptions and inspect illustrative management scenarios.
- **Multilingual UI:** Switch between supported interface languages through the i18n layer.
- **Decision-support screens:** View a sample recommendation trace and the factors the UI presents.

## How the prototype is wired

```text
Farmer forms / seeded examples
             │
             ▼
src/services/api.ts
(localStorage persistence)
             │
     ┌───────┼─────────┐
     ▼       ▼         ▼
Animal UI  Productivity  Scenario UI
     │       │         │
     └───────┴─────────┘
         Decision views
```

## Stack

React · TypeScript · Vite · React Router · i18next · Recharts · Framer Motion

## Run locally

**Requirements:** Node.js and npm.

```bash
git clone https://github.com/Kishordiu/CattleappforFormers.git
cd CattleappforFormers
npm install
npm run dev
```

Optional checks:

```bash
npm run lint
npm run build
```

## Data and safety boundary

**Demonstration use only.** Seed cattle values and generated productivity history are example content, not verified facts about real animals. The current client-side seed login is not production-grade authentication. No live biometric telemetry is being ingested by the documented data path, and generated recommendations are not veterinary advice or validated farm-economics forecasts. Do not enter sensitive real-world farm records into an unreviewed deployment.

---

<p align="center"><sub>DIU FOUNDRY · AGRITECH / PRODUCT / SYSTEMS</sub></p>
