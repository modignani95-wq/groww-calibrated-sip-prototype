// Cohort Benchmarks & Investor Insight Data
export const cohortsData = {
  short: {
    id: 'short',
    title: 'Emergency Fund',
    subtitle: '1 – 2 Years',
    shortName: 'Emergency Fund',
    yearsLabel: '1–2 Yrs',
    horizonMonths: 18,
    investorsCount: '18,400',
    cagrRate: 14.2,
    cagrDisplay: '14.2%',
    defaultSip: 3000,
    icon: '🛡️',
    color: '#5367FF',
    ragCopy: '<span class="font-bold text-[#008765]">18,400 Groww investors</span> with an Emergency Fund goal achieved a <span class="font-bold text-[#008765]">14.2% rolling CAGR</span> by staying invested through market corrections.',
    dipProof: {
      dipStat: 'Month 6 Dip: -4.2%',
      maturityStat: 'Month 18: +14.2% CAGR',
      dipRatio: 30,
      recoveryRatio: 70,
      survivalNote: '98.1% of short-term goals remained positive with liquid buffer.'
    }
  },
  mid: {
    id: 'mid',
    title: 'Travel & Lifestyle',
    subtitle: '2 – 5 Years',
    shortName: 'Travel & Lifestyle',
    yearsLabel: '2–5 Yrs',
    horizonMonths: 36,
    investorsCount: '42,000',
    cagrRate: 24.6,
    cagrDisplay: '24.6%',
    defaultSip: 4000,
    icon: '✈️',
    color: '#00D09C',
    recommended: true,
    ragCopy: '<span class="font-bold text-[#008765]">42,000 Groww investors</span> with a 3-Year goal achieved a <span class="font-bold text-[#008765]">24.6% 3Y rolling CAGR</span> by staying consistent—even through 12-month market dips.',
    dipProof: {
      dipStat: 'Month 10–12 Dip: -8.4%',
      maturityStat: 'Month 36: +24.6% CAGR',
      dipRatio: 35,
      recoveryRatio: 65,
      survivalNote: '94.2% of investors who did not panic-cancel during the 12-month dip exited with strong gains.'
    }
  },
  long: {
    id: 'long',
    title: 'Wealth & Home',
    subtitle: '5+ Years',
    shortName: 'Wealth & Home',
    yearsLabel: '5+ Yrs',
    horizonMonths: 84,
    investorsCount: '96,000',
    cagrRate: 28.1,
    cagrDisplay: '28.1%',
    defaultSip: 6000,
    icon: '🏡',
    color: '#A855F7',
    ragCopy: '<span class="font-bold text-[#008765]">96,000 Groww investors</span> with a long-term wealth goal achieved a <span class="font-bold text-[#008765]">28.1% rolling CAGR</span> across 7 years by staying invested through market cycles.',
    dipProof: {
      dipStat: 'Weathered 3 dips (-12% avg)',
      maturityStat: '7Y CAGR: +28.1%',
      dipRatio: 25,
      recoveryRatio: 75,
      survivalNote: 'Zero Groww investors who stayed invested >5 years experienced negative returns.'
    }
  }
};
