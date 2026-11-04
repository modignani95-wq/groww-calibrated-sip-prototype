// High-DPI Interactive Returns Chart Canvas Engine
import { fundData } from '../../data/fund-data.js';
import { store } from '../../services/state-manager.js';
import { audio } from '../../services/audio-service.js';

export class ChartEngine {
  constructor(canvasId, tooltipId) {
    this.canvas = document.getElementById(canvasId);
    this.tooltip = document.getElementById(tooltipId);
    this.tabButtons = document.querySelectorAll('.chart-tab-btn');
    this.returnBadge = document.getElementById('chart-return-badge');

    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      this.init();
    }
  }

  init() {
    this.bindTabs();
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    store.subscribe((state) => {
      this.draw(state.chartPeriod);
    });
  }

  bindTabs() {
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        audio.playTap();
        const period = btn.getAttribute('data-period');
        this.tabButtons.forEach(b => b.classList.remove('active-tab'));
        btn.classList.add('active-tab');

        const retObj = fundData.returns[period];
        if (this.returnBadge && retObj) {
          this.returnBadge.textContent = retObj.value;
        }

        store.setState({ chartPeriod: period });
      });
    });
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.draw(store.getState().chartPeriod);
  }

  draw(periodKey) {
    if (!this.canvas || !this.ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const retObj = fundData.returns[periodKey] || fundData.returns['3Y'];
    const points = retObj.points;

    this.ctx.clearRect(0, 0, w, h);

    const min = Math.min(...points) * 0.96;
    const max = Math.max(...points) * 1.04;
    const stepX = w / (points.length - 1);

    const coords = points.map((val, idx) => ({
      x: idx * stepX,
      y: h - ((val - min) / (max - min)) * (h - 24) - 12
    }));

    // 1. Draw Gradient Area Fill Under Curve (Real Groww Light Mode)
    const gradient = this.ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, 'rgba(0, 208, 156, 0.22)');
    gradient.addColorStop(0.75, 'rgba(0, 208, 156, 0.04)');
    gradient.addColorStop(1, 'rgba(0, 208, 156, 0.0)');

    this.ctx.beginPath();
    this.ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 0; i < coords.length - 1; i++) {
      const xc = (coords[i].x + coords[i + 1].x) / 2;
      const yc = (coords[i].y + coords[i + 1].y) / 2;
      this.ctx.quadraticCurveTo(coords[i].x, coords[i].y, xc, yc);
    }
    this.ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y);
    this.ctx.lineTo(w, h);
    this.ctx.lineTo(0, h);
    this.ctx.closePath();
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    // 2. Stroke Main Line
    this.ctx.beginPath();
    this.ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 0; i < coords.length - 1; i++) {
      const xc = (coords[i].x + coords[i + 1].x) / 2;
      const yc = (coords[i].y + coords[i + 1].y) / 2;
      this.ctx.quadraticCurveTo(coords[i].x, coords[i].y, xc, yc);
    }
    this.ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y);
    this.ctx.strokeStyle = '#00D09C';
    this.ctx.lineWidth = 2.4;
    this.ctx.stroke();

    // 3. Highlight End Dot
    const last = coords[coords.length - 1];
    this.ctx.beginPath();
    this.ctx.arc(last.x - 2, last.y, 4, 0, Math.PI * 2);
    this.ctx.fillStyle = '#00D09C';
    this.ctx.fill();
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineWidth = 1.8;
    this.ctx.stroke();
  }
}

