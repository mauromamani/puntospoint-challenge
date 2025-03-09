import { create } from 'zustand';

export type GraficoFilter =
  | 'PULSO'
  | 'HOY'
  | '7D'
  | 'Este mes'
  | '6M'
  | 'YTD/YTG'
  | '1A'
  | 'MAX'
  | 'Personalizado';

interface ChartStore {
  selectedGraficoFilter: GraficoFilter;
  selectedGraficoSubFilter: string;

  setSelectedGraficoFilter: (filter: GraficoFilter) => void;
  setSelectedGraficoSubFilter: (subFilter: string) => void;
}

export const useFilterStore = create<ChartStore>((set) => ({
  selectedGraficoFilter: 'HOY',
  selectedGraficoSubFilter: 'Todo',

  setSelectedGraficoFilter: (filter) => set({ selectedGraficoFilter: filter }),
  setSelectedGraficoSubFilter: (subFilter) =>
    set({ selectedGraficoSubFilter: subFilter }),
}));
