// Main Application Entrypoint & Orchestrator
import { store } from './services/state-manager.js';
import { DeviceFrameManager } from './components/device-frame/device-frame.js';
import { ChartEngine } from './components/ui/chart-canvas.js';
import { NpciModalSimulator } from './components/ui/npci-modal.js';
import { Screen1FundController } from './components/screens/screen1-fund.js';
import { Screen2SheetController } from './components/screens/screen2-sheet.js';
import { Screen3RagController } from './components/screens/screen3-rag.js';
import { Screen4EnachController } from './components/screens/screen4-enach.js';
import { Screen5SuccessController } from './components/screens/screen5-success.js';
import { PmDrawerController } from './components/pm-drawer/pm-drawer.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Initialize Device Frame & Theme Controls
  const deviceManager = new DeviceFrameManager();

  // 3. Initialize Interactive Canvas Chart Engine
  const chartEngine = new ChartEngine('returns-chart', 'chart-tooltip');

  // 4. Initialize NPCI Bank Simulator
  const npciSimulator = new NpciModalSimulator();

  // 5. Initialize Step Screen Controllers
  const screen1 = new Screen1FundController();
  const screen2 = new Screen2SheetController();
  const screen3 = new Screen3RagController();
  const screen4 = new Screen4EnachController();
  const screen5 = new Screen5SuccessController();

  // 6. Initialize PM Drawer Controller
  const pmDrawer = new PmDrawerController();

  // 7. Step Progress Pills in Top Studio Bar
  const stepPills = document.querySelectorAll('.step-flow-pill');
  store.subscribe((state) => {
    stepPills.forEach(pill => {
      const step = parseInt(pill.getAttribute('data-step'), 10);
      if (step === state.currentStep) {
        pill.className = 'step-flow-pill px-3 py-1 rounded-full text-xs font-semibold bg-[#00D09C]/15 text-[#00D09C] border border-[#00D09C]/30 transition-all';
      } else if (step < state.currentStep) {
        pill.className = 'step-flow-pill px-3 py-1 rounded-full text-xs font-medium text-emerald-400 hover:text-white transition-all cursor-pointer';
      } else {
        pill.className = 'step-flow-pill px-3 py-1 rounded-full text-xs font-medium text-slate-500 hover:text-slate-400 transition-all';
      }
    });

    // Refresh icons if needed
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // Step Pills Click-to-jump (for testing)
  stepPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const step = parseInt(pill.getAttribute('data-step'), 10);
      if (step === 1) {
        store.setState({ currentStep: 1, isBottomSheetOpen: false, isNPCIModalOpen: false });
      } else if (step === 2) {
        store.setState({ currentStep: 2, isBottomSheetOpen: true, isNPCIModalOpen: false });
      } else if (step === 3) {
        store.setState({ currentStep: 3, isBottomSheetOpen: true, isNPCIModalOpen: false });
      } else if (step === 4) {
        store.setState({ currentStep: 4, isBottomSheetOpen: false, isNPCIModalOpen: false });
      }
    });
  });

  // Restart Button
  const btnRestart = document.getElementById('btn-restart-app');
  if (btnRestart) {
    btnRestart.addEventListener('click', () => {
      store.setState({
        currentStep: 1,
        isBottomSheetOpen: false,
        isNPCIModalOpen: false,
        monthlyAmount: 4000,
        selectedHorizon: 'mid',
        crisisBufferEnabled: true
      });
      const surface = document.getElementById('phone-scroll-surface');
      if (surface) surface.scrollTop = 0;
    });
  }

  console.log('Groww Prototype Initialized (#EP-014)');
});

