// Screen 5: Mandate Registered Celebration Controller
import { store } from '../../services/state-manager.js';
import { audio } from '../../services/audio-service.js';
import { calculator } from '../../services/calculator.js';

export class Screen5SuccessController {
  constructor() {
    this.screenElement = document.getElementById('screen-5');
    this.btnDone = document.getElementById('btn-done-success');
    this.milestoneText = document.getElementById('success-milestone-text');
    this.corpusText = document.getElementById('success-corpus-text');
    this.investorsNote = document.getElementById('success-investors-note');

    this.init();
  }

  init() {
    if (this.btnDone) {
      this.btnDone.addEventListener('click', () => {
        audio.playTap();
        // Reset back to Fund View
        store.setState({
          currentStep: 1,
          isBottomSheetOpen: false,
          isNPCIModalOpen: false,
          monthlyAmount: 4000,
          selectedHorizon: 'mid',
          crisisBufferEnabled: true
        });
        const container = document.getElementById('phone-scroll-surface');
        if (container) container.scrollTop = 0;
      });
    }

    store.subscribe((state) => {
      const isActive = state.currentStep === 5;
      if (this.screenElement) {
        this.screenElement.classList.toggle('active', isActive);
      }
      if (isActive) {
        this.renderSuccess(state);
      }
    });
  }

  renderSuccess(state) {
    const cohort = store.getCurrentCohort();
    const fv = calculator.calculateSipFutureValue(state.monthlyAmount, cohort.cagrRate, cohort.horizonMonths);

    if (this.milestoneText) {
      this.milestoneText.textContent = `${cohort.icon} ${cohort.shortName}`;
    }
    if (this.corpusText) {
      this.corpusText.textContent = `${calculator.formatRupees(fv)} (${cohort.yearsLabel})`;
    }
    if (this.investorsNote) {
      this.investorsNote.textContent = `🎉 You've officially joined Cohort #EP-014. 94.2% of investors who tag a goal survive the 12-month dip cycle.`;
    }
  }
}

