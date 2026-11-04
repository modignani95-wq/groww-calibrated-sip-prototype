# Scalable Architecture Specification
**Project:** Groww Calibrated SIP Prototype (Growth PM Edition #EP-014)

---

## Directory Organization & Responsibilities

```
final project/
├── index.html                   # HTML5 Entrypoint with Mobile Mockup Studio
├── package.json                 # Project descriptor & scripts
│
├── docs/                        # Product & Architecture Documentation
│   ├── PRD.md                   # Full Growth Product Requirements Document
│   └── ARCHITECTURE.md          # Architecture & component structure
│
├── src/
│   ├── main.js                  # App orchestrator & module loader
│   │
│   ├── data/                    # Static & Cohort Datasets
│   │   ├── fund-data.js         # Parag Parikh Flexi Cap historical stats & returns
│   │   └── cohorts-data.js      # RAG historical cohorts (#EP-014) & horizon benchmarks
│   │
│   ├── services/                # Business Logic & Core Utilities
│   │   ├── state-manager.js     # Pub/Sub reactive state container
│   │   ├── calculator.js        # CAGR, future corpus, SIP compound & buffer arithmetic
│   │   └── audio-service.js     # Web Audio API haptic sound synthesizer
│   │
│   ├── components/              # Modular UI Components
│   │   ├── device-frame/
│   │   │   └── device-frame.js  # Device frame manager (iPhone 16 Pro / Pixel / Frameless)
│   │   ├── screens/             # Funnel Screen Controllers
│   │   │   ├── screen1-fund.js  # Fund Overview & "Start SIP" CTA
│   │   │   ├── screen2-sheet.js # Zero-Typing Goal Triage Bottom Sheet
│   │   │   ├── screen3-rag.js   # RAG Proof Card, Slider & Buffer Toggle
│   │   │   ├── screen4-enach.js # Mandate Confirmation & Bank Details
│   │   │   └── screen5-success.js # e-Mandate Success Screen & Confetti
│   │   ├── ui/                  # Reusable UI Primitives
│   │   │   ├── chart-canvas.js  # Responsive high-DPI HTML5 chart engine
│   │   │   └── npci-modal.js    # NPCI e-Mandate bank authentication simulator
│   │   └── pm-drawer/
│   │       └── pm-drawer.js     # Growth PM Teardown & Metrics overlay drawer
│   │
│   └── styles/                  # Clean Modular CSS
│       ├── main.css             # Base styles, animations & typography
│       ├── device-frame.css     # Hyper-realistic iPhone 16 Pro & Pixel chassis styling
│       ├── groww-theme.css      # Groww Dark & Light design tokens
│       └── components.css       # Bottom sheet physics, slider, badges & chips
```

---

## State Management Flow
State is decoupled through `src/services/state-manager.js` using a clean Pub/Sub pattern:
1. Components subscribe to state changes (`state.subscribe(listener)`).
2. Actions emit state updates (`state.setState({ ... })`).
3. Calculations are isolated in `src/services/calculator.js`.
4. RAG cohort insights are retrieved in `src/data/cohorts-data.js`.
5. Device framing and canvas rendering auto-adjust based on screen size, zoom level, and selected device frame.

