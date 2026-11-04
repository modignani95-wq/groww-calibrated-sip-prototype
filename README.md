# 🚀 Groww Goal-Calibrated SIP Prototype

[![Groww Design Language](https://img.shields.io/badge/Design_Language-Groww_Emerald_%2300D09C-00D09C?style=for-the-badge)](https://groww.in)
[![Device Mockup](https://img.shields.io/badge/Device_Mockup-iPhone_16_Pro_%7C_Pixel_9-blue?style=for-the-badge)](http://localhost:3000)
[![Fintech Product Design](https://img.shields.io/badge/Role-Growth_PM_%7C_Product_Designer-purple?style=for-the-badge)](https://github.com/modignani95-wq)

A high-fidelity mobile prototype that intercepts the standard mutual fund SIP setup right after fund selection and before e-NACH mandate registration. Built specifically for **Groww** with an authentic light mode design language, realistic mobile device frames, and behavioral economics anchors.

---

## 🎯 The Growth Thesis & Problem Statement

### The Problem: The Month-12 Churn Cliff
- **38% of new SIP investors cancel or pause their mandates between Month 10 and Month 14.**
- **Root Cause (Optimism Bias vs. Paper Drawdown Panic):** Investors extrapolate recent returns. When normal cyclical mid-term drawdowns (-8% to -15%) occur at the 1-year mark, users mistake normal volatility for capital destruction and cancel their SIPs.
- **Why Traditional Goal Forms Fail:** Asking users to type goal names, dates, and amounts causes **42% form abandonment**.

### The Solution: Zero-Typing Milestone Triage & Historical Social Proof
1. **1-Tap Horizontal Milestone Cards:** Users anchor their investment to a life dream (Emergency Fund, Travel & Lifestyle, Wealth & Home) without keyboard typing.
2. **Groww Investor Insight Proof:** Real-time cohort evidence showing that 42,000 Groww investors achieved a 24.6% 3Y rolling CAGR by holding through market dips.
3. **20% Instant Liquid Buffer:** Auto-allocates 20% into Groww Instant Liquid Fund for emergency cash access without breaking compounding equity units.

---

## 📱 User Flow

```
[Screen 1: Fund Details Page]
          │
          ▼  Taps [Start SIP]
[Screen 2: Horizontal Milestone Bottom Sheet]
          │  - 🛡️ Emergency Fund (1–2 Yrs)
          │  - ✈️ Travel & Lifestyle (2–5 Yrs) [Top Pick]
          │  - 🏡 Wealth & Home (5+ Yrs)
          │  - Groww Investor Insight (42,000 investors · 24.6% CAGR)
          │  - Monthly Amount Slider (₹4,000/mo)
          │
          ▼  Taps [Continue]
[Screen 3: Confirm SIP Order & Allocation]
          │  - Milestone Anchor & Est. Corpus
          │  - Calibrated Split: Flexi Cap (₹3,200) + Liquid Buffer (₹800)
          │  - Safety Buffer Toggle
          │  - Pre-verified HDFC Bank Mandate
          │
          ▼  Taps [Confirm & Start SIP]
[NPCI e-Mandate Authentication Simulator]
          │
          ▼  Bank Instant Approval
[Screen 4: SIP Linked to Goal Celebration 🎉]
```

---

## 🛠️ Architecture & Scalable Directory Structure

```
├── index.html                   # Mobile Mockup Studio Entrypoint
├── package.json                 # Project configuration
├── docs/
│   ├── PRD.md                   # Full Growth Product Requirement Document
│   └── ARCHITECTURE.md          # Architecture & component guidelines
└── src/
    ├── main.js                  # Application orchestrator
    ├── data/
    │   ├── fund-data.js         # Parag Parikh Flexi Cap fund stats & NAV
    │   └── cohorts-data.js      # Investor cohort benchmarks & insight copy
    ├── services/
    │   ├── state-manager.js     # Reactive Pub/Sub state store
    │   ├── calculator.js        # Compound SIP future value & 80/20 split math
    │   └── audio-service.js     # Web Audio API native haptic sound synthesizer
    ├── components/
    │   ├── device-frame/        # iPhone 16 Pro, Pixel 9 & Frameless switcher
    │   ├── screens/             # Step screen controllers (Screen 1–5)
    │   ├── ui/                  # Canvas returns chart & NPCI simulator
    │   └── pm-drawer/           # Design & PM specifications drawer
    └── styles/
        ├── main.css             # Base layout & typography
        ├── groww-theme.css      # Groww light & dark design tokens
        ├── device-frame.css     # Hyper-realistic iPhone chassis & hardware styling
        └── components.css       # Bottom sheet physics, slider & horizontal cards
```

---

## ⚡ How to Run Locally

Clone and launch with any local web server:

```bash
# Clone the repository
git clone https://github.com/modignani95-wq/groww-calibrated-sip-prototype.git
cd groww-calibrated-sip-prototype

# Launch local preview
python -m http.server 3000
# or
npx serve .
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🎨 Design System Specifications
- **Brand Color:** Groww Emerald (`#00D09C` / `#00B386`)
- **Background:** Crisp White (`#FFFFFF`) with generous whitespace
- **Typography:** Inter & JetBrains Mono with deep charcoal (`#1E222B`)
- **Chassis:** Hyper-realistic iPhone 16 Pro with Dynamic Island, physical side buttons, and iOS home indicator.
