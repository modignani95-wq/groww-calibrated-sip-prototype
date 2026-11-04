// Screen 1: Fund Details & "Start SIP" Controller
import { store } from '../../services/state-manager.js';
import { audio } from '../../services/audio-service.js';

export class Screen1FundController {
  constructor() {
    this.btnStartSip = document.getElementById('btn-start-sip');
    this.screenElement = document.getElementById('screen-1');
    this.footerElement = document.getElementById('screen-1-footer');

    this.init();
  }

  init() {
    if (this.btnStartSip) {
      this.btnStartSip.addEventListener('click', () => {
        audio.playTap();
        // Intercept right after fund selection before mandate
        store.setState({
          currentStep: 2,
          isBottomSheetOpen: true
        });
      });
    }

    store.subscribe((state) => {
      const isActive = state.currentStep === 1;
      if (this.screenElement) {
        this.screenElement.classList.toggle('active', isActive);
      }
      if (this.footerElement) {
        this.footerElement.classList.toggle('hidden', !isActive);
      }
    });
  }
}

