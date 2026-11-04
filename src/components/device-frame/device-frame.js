// Device Frame Manager - Controls Device Mockup, Scaling & System Controls
import { store } from '../../services/state-manager.js';
import { audio } from '../../services/audio-service.js';

export class DeviceFrameManager {
  constructor() {
    this.deviceChassis = document.getElementById('device-chassis');
    this.deviceStage = document.getElementById('device-stage');
    this.phoneScreen = document.getElementById('phone-screen');
    this.liveClock = document.getElementById('live-clock');
    this.dynamicIsland = document.getElementById('dynamic-island');

    // Controls
    this.deviceSelectButtons = document.querySelectorAll('[data-device-type]');
    this.zoomSelectButtons = document.querySelectorAll('[data-zoom-scale]');
    this.themeToggleBtn = document.getElementById('btn-toggle-theme');
    this.soundToggleBtn = document.getElementById('btn-toggle-sound');

    this.init();
  }

  init() {
    this.startClock();
    this.bindControls();
    this.bindDynamicIsland();
    
    // Subscribe to state changes
    store.subscribe((state) => {
      this.updateChassisClass(state.deviceFrame);
      this.updateThemeClass(state.theme);
      this.updateZoom(state.zoomScale);
    });
  }

  startClock() {
    const update = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      if (this.liveClock) {
        this.liveClock.textContent = `${hours}:${mins}`;
      }
    };
    update();
    setInterval(update, 20000);
  }

  bindControls() {
    // Device Selector buttons (iPhone 16 Pro / Pixel 9 / Frameless)
    this.deviceSelectButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        audio.playTap();
        const deviceType = btn.getAttribute('data-device-type');
        this.deviceSelectButtons.forEach(b => b.classList.remove('active-device-btn'));
        btn.classList.add('active-device-btn');
        store.setState({ deviceFrame: deviceType });
      });
    });

    // Zoom Buttons
    this.zoomSelectButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        audio.playTap();
        const scaleVal = parseFloat(btn.getAttribute('data-zoom-scale'));
        this.zoomSelectButtons.forEach(b => b.classList.remove('active-zoom-btn'));
        btn.classList.add('active-zoom-btn');
        store.setState({ zoomScale: scaleVal });
      });
    });

    // Theme Toggle (Dark / Light)
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => {
        audio.playTap();
        const currentTheme = store.getState().theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        store.setState({ theme: newTheme });
      });
    }

    // Sound Toggle
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => {
        const isMuted = !audio.enabled;
        audio.enabled = isMuted;
        this.soundToggleBtn.setAttribute('title', isMuted ? 'Sound Enabled' : 'Sound Muted');
        const icon = this.soundToggleBtn.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', isMuted ? 'volume-2' : 'volume-x');
          if (window.lucide) window.lucide.createIcons();
        }
        if (isMuted) audio.playTap();
      });
    }
  }

  bindDynamicIsland() {
    if (!this.dynamicIsland) return;
    this.dynamicIsland.addEventListener('click', () => {
      audio.playTap();
      // Interactive expand micro-animation
      this.dynamicIsland.classList.toggle('expanded');
    });
  }

  updateChassisClass(deviceType) {
    if (!this.deviceChassis) return;
    this.deviceChassis.classList.remove('iphone', 'pixel', 'frameless');
    this.deviceChassis.classList.add(deviceType);
  }

  updateThemeClass(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('theme-dark', isDark);
    if (this.phoneScreen) {
      this.phoneScreen.classList.toggle('theme-dark', isDark);
    }
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
      if (window.lucide) window.lucide.createIcons();
    }
  }

  updateZoom(scale) {
    if (!this.deviceStage) return;
    this.deviceStage.style.transform = `scale(${scale})`;
  }
}

