// Growth PM Teardown & Behavioral Economics Drawer Controller
import { store } from '../../services/state-manager.js';
import { audio } from '../../services/audio-service.js';

export class PmDrawerController {
  constructor() {
    this.drawer = document.getElementById('pm-drawer');
    this.backdrop = document.getElementById('pm-backdrop');
    this.btnToggle = document.getElementById('btn-toggle-pm-specs');
    this.btnClose = document.getElementById('btn-close-pm-drawer');
    this.pmTabs = document.querySelectorAll('.pm-tab-btn');
    this.pmContents = document.querySelectorAll('.pm-tab-pane');

    this.init();
  }

  init() {
    if (this.btnToggle) {
      this.btnToggle.addEventListener('click', () => this.toggle());
    }
    if (this.btnClose) {
      this.btnClose.addEventListener('click', () => this.close());
    }
    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    // Tab Switcher inside PM drawer
    this.pmTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        audio.playTap();
        const sectionId = tab.getAttribute('data-section');
        this.pmTabs.forEach(t => t.classList.remove('active-pm-tab'));
        tab.classList.add('active-pm-tab');

        this.pmContents.forEach(pane => pane.classList.add('hidden'));
        const activePane = document.getElementById(`pm-pane-${sectionId}`);
        if (activePane) activePane.classList.remove('hidden');
      });
    });

    store.subscribe((state) => {
      if (this.drawer && this.backdrop) {
        if (state.isPMDrawerOpen) {
          this.drawer.classList.add('open');
          this.backdrop.classList.add('open');
        } else {
          this.drawer.classList.remove('open');
          this.backdrop.classList.remove('open');
        }
      }
    });
  }

  toggle() {
    audio.playTap();
    const current = store.getState().isPMDrawerOpen;
    store.setState({ isPMDrawerOpen: !current });
  }

  close() {
    audio.playTap();
    store.setState({ isPMDrawerOpen: false });
  }
}

