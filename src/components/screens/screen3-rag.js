// Screen 3: RAG Historical Cohort Proof & Reality Check Controller (#EP-014)
import { store } from '../../services/state-manager.js';
import { audio } from '../../services/audio-service.js';
import { calculator } from '../../services/calculator.js';

export class Screen3RagController {
  constructor() {
    this.ragCard = document.getElementById('rag-cohort-card');
    this.ragCopy = document.getElementById('rag-cohort-copy');
    this.dipStat = document.getElementById('rag-dip-stat');
    this.maturityStat = document.getElementById('rag-maturity-stat');
    this.dipBar = document.getElementById('rag-dip-bar');
    this.recoveryBar = document.getElementById('rag-recovery-bar');
    this.survivalNote = document.getElementById('rag-survival-note');

    // Safe Monthly Commitment Slider & Displays
    this.slider = document.getElementById('commitment-slider');
    this.sipDisplay = document.getElementById('slider-sip-display');
    this.projectedCorpusBadge = document.getElementById('projected-corpus-badge');

    // Crisis Buffer Toggle
    this.toggleBuffer = document.getElementById('toggle-crisis-buffer');
    this.bufferAmountText = document.getElementById('buffer-amount-text');
    this.splitPreview = document.getElementById('split-pill-preview');
    this.equitySplitVal = document.getElementById('equity-split-val');
    this.liquidSplitVal = document.getElementById('liquid-split-val');

    // CTA
    this.btnAcceptContinue = document.getElementById('btn-accept-rag-continue');

    this.init();
  }

  init() {
    // Slider Drag Listener
    if (this.slider) {
      this.slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        store.setState({ monthlyAmount: val, currentStep: 3 });
      });
    }

    // Crisis Buffer Checkbox Toggle
    if (this.toggleBuffer) {
      this.toggleBuffer.addEventListener('change', (e) => {
        audio.playTap();
        store.setState({ crisisBufferEnabled: e.target.checked });
      });
    }

    // Accept & Continue CTA -> Closes sheet and routes to Screen 4 (SIP Confirmation)
    if (this.btnAcceptContinue) {
      this.btnAcceptContinue.addEventListener('click', () => {
        audio.playTap();
        store.setState({
          isBottomSheetOpen: false,
          currentStep: 4 // Routes to Screen 4 (SIP Confirmation)
        });
        const surface = document.getElementById('phone-scroll-surface');
        if (surface) surface.scrollTop = 0;
      });
    }

    // Subscribe to state updates
    store.subscribe((state) => {
      this.renderCohortProof(state);
      this.renderCalculations(state);
    });
  }

  renderCohortProof(state) {
    const cohort = store.getCurrentCohort();
    if (!cohort) return;

    if (this.ragCopy) {
      this.ragCopy.innerHTML = cohort.ragCopy;
    }
    if (this.dipStat && cohort.dipProof) {
      this.dipStat.textContent = cohort.dipProof.dipStat;
    }
    if (this.maturityStat && cohort.dipProof) {
      this.maturityStat.textContent = cohort.dipProof.maturityStat;
    }
    if (this.survivalNote && cohort.dipProof) {
      this.survivalNote.textContent = cohort.dipProof.survivalNote;
    }
  }

  renderCalculations(state) {
    const cohort = store.getCurrentCohort();
    const amount = state.monthlyAmount;
    const isBufferOn = state.crisisBufferEnabled;

    if (this.slider && parseInt(this.slider.value, 10) !== amount) {
      this.slider.value = amount;
    }

    if (this.sipDisplay) {
      this.sipDisplay.textContent = calculator.formatRupees(amount);
    }

    // Split arithmetic
    const split = calculator.calculateSplit(amount, isBufferOn);
    if (this.bufferAmountText) {
      this.bufferAmountText.textContent = `${calculator.formatRupees(split.bufferAmount)}/mo`;
    }
    if (this.equitySplitVal) {
      this.equitySplitVal.textContent = calculator.formatRupees(split.equityAmount);
    }
    if (this.liquidSplitVal) {
      this.liquidSplitVal.textContent = calculator.formatRupees(split.bufferAmount);
    }
    if (this.splitPreview) {
      this.splitPreview.style.opacity = isBufferOn ? '1' : '0.45';
    }

    // Compound Corpus calculation
    const fv = calculator.calculateSipFutureValue(amount, cohort.cagrRate, cohort.horizonMonths);
    if (this.projectedCorpusBadge) {
      this.projectedCorpusBadge.textContent = `Est. Corpus: ${calculator.formatCorpusLakhs(fv)} in ${cohort.yearsLabel}`;
    }
  }
}

