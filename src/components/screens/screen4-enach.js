// Screen 4: Calibrated SIP Details & e-NACH Mandate Controller
import { store } from '../../services/state-manager.js';
import { audio } from '../../services/audio-service.js';
import { calculator } from '../../services/calculator.js';

export class Screen4EnachController {
  constructor() {
    this.screenElement = document.getElementById('screen-4');
    this.footerElement = document.getElementById('screen-4-footer');
    this.btnBackToSheet = document.getElementById('btn-back-to-sheet');
    this.btnConfirmEnach = document.getElementById('btn-confirm-enach');

    // Dynamic Display Elements
    this.milestoneBadge = document.getElementById('enach-milestone-title');
    this.milestoneSubtitle = document.getElementById('enach-milestone-subtitle');
    this.milestoneIcon = document.getElementById('enach-milestone-icon');
    this.targetCorpusVal = document.getElementById('enach-target-corpus-val');

    this.sipAmountDisplay = document.getElementById('enach-sip-amount');
    this.equityPartDisplay = document.getElementById('enach-equity-part');
    this.bufferPartDisplay = document.getElementById('enach-buffer-part');
    this.bufferRow = document.getElementById('enach-buffer-row');

    // Details Buffer Toggle
    this.detailsBufferToggle = document.getElementById('details-buffer-toggle');
    this.detailsBufferText = document.getElementById('details-buffer-amount-text');

    this.init();
  }

  init() {
    if (this.btnBackToSheet) {
      this.btnBackToSheet.addEventListener('click', () => {
        audio.playTap();
        store.setState({
          currentStep: 3,
          isBottomSheetOpen: true
        });
      });
    }

    if (this.btnConfirmEnach) {
      this.btnConfirmEnach.addEventListener('click', () => {
        audio.playTap();
        store.setState({ isNPCIModalOpen: true });
      });
    }

    if (this.detailsBufferToggle) {
      this.detailsBufferToggle.addEventListener('change', (e) => {
        audio.playTap();
        store.setState({ crisisBufferEnabled: e.target.checked });
      });
    }

    store.subscribe((state) => {
      const isActive = state.currentStep === 4;
      if (this.screenElement) {
        this.screenElement.classList.toggle('active', isActive);
      }
      if (this.footerElement) {
        this.footerElement.classList.toggle('hidden', !isActive);
      }

      if (isActive) {
        this.renderConfirmation(state);
      }
    });
  }

  renderConfirmation(state) {
    const cohort = store.getCurrentCohort();
    const amount = state.monthlyAmount;
    const isBufferOn = state.crisisBufferEnabled;
    const split = calculator.calculateSplit(amount, isBufferOn);
    const fv = calculator.calculateSipFutureValue(amount, cohort.cagrRate, cohort.horizonMonths);

    if (this.milestoneBadge) this.milestoneBadge.textContent = cohort.title;
    if (this.milestoneSubtitle) this.milestoneSubtitle.textContent = `${cohort.shortName} · ${cohort.yearsLabel} Horizon`;
    if (this.milestoneIcon) this.milestoneIcon.textContent = cohort.icon;
    if (this.targetCorpusVal) this.targetCorpusVal.textContent = calculator.formatCorpusLakhs(fv);

    if (this.sipAmountDisplay) this.sipAmountDisplay.textContent = calculator.formatRupees(amount);
    if (this.equityPartDisplay) {
      this.equityPartDisplay.textContent = `${calculator.formatRupees(split.equityAmount)} (${split.equityPercent}%)`;
    }

    if (this.detailsBufferToggle) {
      this.detailsBufferToggle.checked = isBufferOn;
    }
    if (this.detailsBufferText) {
      this.detailsBufferText.textContent = `${calculator.formatRupees(split.bufferAmount)}/mo`;
    }

    if (this.bufferRow && this.bufferPartDisplay) {
      if (isBufferOn) {
        this.bufferRow.style.display = 'flex';
        this.bufferPartDisplay.textContent = `${calculator.formatRupees(split.bufferAmount)} (20%)`;
      } else {
        this.bufferRow.style.display = 'none';
      }
    }
  }
}
