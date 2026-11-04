// Centralized Reactive State Store
import { cohortsData } from '../data/cohorts-data.js';

class StateStore {
  constructor() {
    this.state = {
      // Funnel Navigation
      currentStep: 1, // 1: Fund, 2: Triage Sheet, 3: RAG Proof, 4: Mandate Confirmation, 5: Success
      isBottomSheetOpen: false,
      isNPCIModalOpen: false,
      isPMDrawerOpen: false,
      
      // Goal & Commitment Data
      selectedHorizon: 'mid', // 'short', 'mid', 'long'
      monthlyAmount: 4000,
      crisisBufferEnabled: true,
      chartPeriod: '3Y',

      // Device Mockup Controls
      deviceFrame: 'iphone', // 'iphone', 'pixel', 'frameless'
      theme: 'light', // Default to Groww iconic clean light mode
      zoomScale: 1.0,
      soundEnabled: true,

      // User & Mandate Profile
      userName: 'Aakash Sharma',
      bankName: 'HDFC Bank Ltd',
      accountNumber: '•••• •••• 4892',
      mandateMaxLimit: 25000,
      sipDay: 5
    };

    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Helper getters
  getCurrentCohort() {
    return cohortsData[this.state.selectedHorizon] || cohortsData.mid;
  }
}

export const store = new StateStore();

