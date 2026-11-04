# Groww Growth Product Requirement Document (PRD)
**Feature Code:** #EP-014  
**Feature Name:** Calibrated SIP Onboarding: Zero-Typing Goal Triage & RAG Historical Cohort Proof  
**Author:** Growth Product Manager, Mutual Funds & Wealth Retention, Groww  
**Status:** Ready for Rapid Prototyping & Antigravity Validation  
**Target Funnel:** Mutual Funds → Fund Overview → SIP Initiation → e-NACH Mandate Registration  

---

## 1. Executive Summary & Core Growth Thesis

### The Behavioral Problem
Groww processes millions of monthly SIP registrations. However, post-onboarding cohort telemetry reveals a critical retention leak:
- **38% of new SIP investors cancel or pause their mandates between Month 10 and Month 14.**
- **Root Cause (Optimism Bias vs. Paper Drawdown Panic):** Users onboard during bull runs anchoring on 1Y/3Y annualized historical returns (+24% to +32%). When the inevitable mid-cycle market correction (-8% to -15%) hits at the 1-year mark, users lack an anchored milestone horizon. They mistake normal equity cyclicality for permanent capital loss and liquidate or pause their SIPs, permanently breaking the power of compounding.
- **Why Traditional Goal Setup Failed:** Legacy goal-setting forms demand manual typing (Goal Name, Target Amount, Target Date, Risk Tolerance). This introduces severe friction—causing **42% funnel abandonment** at the mandate gate.

### The Solution (#EP-014)
We intercept the standard SIP setup **right after fund selection and immediately prior to e-NACH mandate registration** with:
1. **Zero-Typing 1-Tap Triage Bottom Sheet:** 3 pre-calibrated milestone horizons (Emergency 1-2Y, Mid-Term 2-5Y, Long-Term 5-12Y).
2. **RAG Historical Cohort Proof Engine (#EP-014):** Real-time retrieval of anonymized Groww historical investor cohorts demonstrating that investors who persevered through the 12-month dip achieved a 24.6% 3Y rolling CAGR.
3. **The 20% Instant Liquid Buffer Toggle:** Auto-diverts 20% into Groww Instant Liquid Fund to eliminate emergency distress selling of equity units.

> **Design Focus:** *"By placing the zero-typing goal selection chips directly before mandate registration and coupling them with instant historical cohort proof, we eliminate both the optimism bias at setup and the panic drop-offs at the 12-month mark."*

---

## 2. Step-by-Step User Flow Specification

```
[Screen 1: Fund Details Page]
          │
          ▼  Taps [Start SIP]
[Screen 2: Zero-Typing Goal Triage Bottom Sheet] (NET-NEW)
          │
          ▼  Taps [Mid-Term Goal: Bike / Travel (2-5 Yrs)]
[Screen 3: RAG Historical Cohort Proof & Reality Check Card] (NET-NEW)
          │  - AI Cohort Social Proof (42,000 investors, 24.6% 3Y CAGR)
          │  - Interactive Slider (₹1k - ₹20k)
          │  - 20% Liquid Buffer Toggle (₹800/mo)
          │
          ▼  Taps [Accept & Continue]
[Screen 4: Calibrated SIP Confirmation & e-NACH Mandate]
          │
          ▼  Taps [Confirm & Register e-NACH]
[NPCI e-Mandate Authentication Simulator]
          │
          ▼  Instant Bank Verification
[Success Screen: Goal Linked Successfully!]
```

---

## 3. UI/UX Elements by Screen

### Screen 1: Fund Details & "Start SIP" Tap
- **Fund Header:** Fund logo, CRISIL 5-star rating, Direct Growth tag, NAV (₹84.62), 1D performance (+1.41%).
- **Interactive Returns Chart:** 1Y, 3Y, 5Y, and All-Time return curves with Groww Emerald (#00D09C) fill.
- **Fund Metrics:** Min SIP (₹1,000), AUM (₹68,450 Cr), Expense Ratio (0.62%).
- **Primary CTA:** Sticky bottom button `[Start SIP]` in Groww Emerald.

### Screen 2 (NET-NEW): The Goal & Horizon Triage Bottom Sheet
- **UI:** Frictionless modal sheet sliding up with backdrop blur. Zero keyboard input required.
- **Header:** *"What milestone are you investing for?"*
- **Triage Chips (1-Tap Selection):**
  1. `[🛡️ Emergency Buffer / Short-Term Goal (1–2 Yrs)]`
  2. `[🏡 Mid-Term Goal: Bike / Travel / Wedding (2–5 Yrs)]` *(Default / Recommended)*
  3. `[🚀 Long-Term Wealth: House / Retirement (5–12+ Yrs)]`

### Screen 3 (NET-NEW): RAG Historical Cohort Proof & Reality Check Card
- **Engine Badge:** `⚡ Powered by Groww RAG Engine #EP-014`
- **Dynamic AI Cohort Proof:**
  > *"Great! 42,000 Groww investors with a 3-Year Travel/Milestone goal achieved a 24.6% 3Y rolling CAGR by staying consistent—even through 12-month market dips."*
- **Dip Survival Visualizer:** Visual comparison of Month 10-12 dip (-8.4%) vs Month 36 compounding (+24.6%), proving that 94.2% of consistent investors ended with significant net profits.
- **Safe Monthly Commitment Slider:** Interactive slider calibrated between ₹1,000 and ₹20,000 (default: ₹4,000/mo). Real-time corpus computation.
- **Crisis Buffer Secondary Toggle:**
  - `[☑️ Auto-allocate 20% (₹800/mo) into Groww Instant Liquid Fund for safety]`
  - Split visualization: Equity ₹3,200 (80%) + Liquid Fund ₹800 (20%).
- **CTA:** `[Accept & Continue]`

### Screen 4: Calibrated SIP Confirmation & e-NACH Mandate
- **Summary Cards:**
  - Milestone Anchor: "🏡 Mid-Term Goal: Bike / Travel (3 Years)"
  - Monthly Allocation Breakdown: Equity + Liquid Cushion
  - Auto-debit date: 5th of every month
  - Bank Details: HDFC Bank Pre-verified e-NACH mandate
  - Behavioral Armor Guarantee: Groww intervention alerts before market panic pauses.
- **Primary CTA:** `[Confirm & Register e-NACH]`
- **Authentication & Success:** Interactive NPCI bank simulator, celebratory confetti, and milestone linking confirmation.

---

## 4. Growth Metrics & Experimentation Framework

| Metric Category | Metric | Baseline (Control) | Target (Variant B: EP-014) | Impact |
| :--- | :--- | :--- | :--- | :--- |
| **North Star** | **18-Month SIP Retention Rate** | 56.4% | **70.6% (+14.2% lift)** | Massive LTV & AUM expansion |
| **Primary** | **12-Month Dip Panic Pauses** | 29.2% | **11.0% (-62.1% reduction)** | Shields investors from selling at lows |
| **Funnel Conversion** | **e-NACH Mandate Completion** | 78.5% | **82.3% (+3.8% lift)** | Zero-typing eliminates drop-off |
| **Monetization / AUM** | **Average Monthly Ticket Size** | ₹3,100 | **₹4,000 (+29.0%)** | Slider anchor nudges higher safe commitment |
| **Cross-sell Adoption** | **Liquid Crisis Buffer Opt-In** | 0% (N/A) | **68.0%** | Secondary asset class activation |

