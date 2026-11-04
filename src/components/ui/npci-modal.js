// NPCI e-Mandate Authentication Simulator
import { store } from '../../services/state-manager.js';
import { audio } from '../../services/audio-service.js';
import { calculator } from '../../services/calculator.js';

export class NpciModalSimulator {
  constructor() {
    this.modal = document.getElementById('npci-modal');
    this.debitDisplay = document.getElementById('npci-modal-debit-val');
    this.authSteps = document.getElementById('npci-auth-steps');
    this.spinner = document.getElementById('npci-spinner');
    this.btnSimulateAuth = document.getElementById('btn-simulate-auth');
    this.btnCloseNpci = document.getElementById('btn-close-npci');

    this.init();
  }

  init() {
    if (this.btnSimulateAuth) {
      this.btnSimulateAuth.addEventListener('click', () => this.handleSimulateApproval());
    }
    if (this.btnCloseNpci) {
      this.btnCloseNpci.addEventListener('click', () => this.close());
    }

    store.subscribe((state) => {
      if (this.debitDisplay) {
        this.debitDisplay.textContent = `${calculator.formatRupees(state.monthlyAmount)} / month`;
      }
      if (state.isNPCIModalOpen) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  open() {
    if (!this.modal) return;
    this.modal.classList.remove('hidden');
    if (this.authSteps) this.authSteps.classList.remove('hidden');
    if (this.spinner) this.spinner.classList.add('hidden');
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
  }

  handleSimulateApproval() {
    audio.playTap();
    if (this.authSteps) this.authSteps.classList.add('hidden');
    if (this.spinner) this.spinner.classList.remove('hidden');

    // Simulate 1.6s NPCI UMRN generation
    setTimeout(() => {
      this.close();
      store.setState({
        isNPCIModalOpen: false,
        currentStep: 5 // Success Screen
      });
      const surface = document.getElementById('phone-scroll-surface');
      if (surface) surface.scrollTop = 0;
      audio.playSuccess();

      // Trigger Confetti Celebration
      if (window.confetti) {
        window.confetti({
          particleCount: 90,
          spread: 65,
          origin: { y: 0.62 },
          colors: ['#00D09C', '#5367FF', '#FFB800', '#FFFFFF']
        });
      }
    }, 1600);
  }
}

