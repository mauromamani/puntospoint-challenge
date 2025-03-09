import { create } from 'zustand';

export type BarChart = 'Clientes' | 'Transacciones';
export type LineChart = 'Dinero' | 'Cashback' | '';
export type AllFilter = BarChart | LineChart;

interface ChartStore {
  selectedAllFilter: AllFilter;
  selectedBarChart: BarChart;
  selectedLineChart: LineChart;

  setSelectedAllFilter: (filter: AllFilter) => void;
  setSelectedBarChart: (chart: BarChart) => void;
  setSelectedLineChart: (chart: LineChart) => void;
  resetChartSelections: () => void;
}

export const useChartStore = create<ChartStore>((set) => ({
  selectedAllFilter: 'Clientes',
  selectedBarChart: 'Clientes',
  selectedLineChart: '',

  setSelectedAllFilter: (filter) => set({ selectedAllFilter: filter }),
  setSelectedBarChart: (chart) => set({ selectedBarChart: chart }),
  setSelectedLineChart: (chart) => set({ selectedLineChart: chart }),

  resetChartSelections: () =>
    set({
      selectedBarChart: 'Clientes',
      selectedLineChart: '',
    }),
}));
