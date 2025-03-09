import { create } from 'zustand';

interface SidebarStore {
  selectedTypeChart: 'Grafico' | 'Pulso';
  setSelectedTypeChart: (chart: 'Grafico' | 'Pulso') => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  selectedTypeChart: 'Grafico',
  setSelectedTypeChart: (chart) => set({ selectedTypeChart: chart }),
}));
