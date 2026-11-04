// Screen 2: Goal Bottom Sheet Controller
import { store } from '../../services/state-manager.js';
import { audio } from '../../services/audio-service.js';

export class Screen2SheetController {
  constructor() {
    this.sheet = document.getElementById('goal-bottom-sheet');
    this.backdrop = document.getElementById('sheet-backdrop');
    this.btnClose = document.getElementById('btn-close-sheet');
    this.goalCards = document.querySelectorAll('.goal-card, .triage-chip');

    this.init();
  }

  init() {
    // Close Sheet via 'X' or backdrop
    if (this.btnClose) {
      this.btnClose.addEventListener('click', () => this.close());
    }
    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    // Goal Cards 1-Tap Click
    this.goalCards.forEach(card => {
      card.addEventListener('click', () => {
        audio.playTap();
        const horizonKey = card.getAttribute('data-horizon');
        store.setState({
          selectedHorizon: horizonKey,
          currentStep: 3
        });
      });
    });

    // Subscribe to State
    store.subscribe((state) => {
      this.syncSheetVisibility(state.isBottomSheetOpen);
      this.syncActiveCard(state.selectedHorizon);
    });
  }

  close() {
    audio.playTap();
    store.setState({
      isBottomSheetOpen: false,
      currentStep: 1
    });
  }

  syncSheetVisibility(isOpen) {
    if (!this.sheet || !this.backdrop) return;
    if (isOpen) {
      this.backdrop.classList.add('open');
      this.sheet.classList.add('open');
    } else {
      this.sheet.classList.remove('open');
      this.backdrop.classList.remove('open');
    }
  }

  syncActiveCard(activeHorizonKey) {
    this.goalCards.forEach(card => {
      const isMatch = card.getAttribute('data-horizon') === activeHorizonKey;
      card.classList.toggle('active', isMatch);
    });
  }
}
