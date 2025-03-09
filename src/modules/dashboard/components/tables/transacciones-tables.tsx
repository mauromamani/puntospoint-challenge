import { Box } from '@mui/material';
import { useFilterStore } from '../../store/filter.store';
import { useChartStore } from '../../store/chart.store';
import { DataGridTable } from '@/shared/components/ui';
import {
  cashbackColumns,
  dineroColumns,
  renderFilterColumns,
  transaccionesColumns,
} from './columns';
import { useGetTransaccionesTableData } from '../../services/queries';
import { renderHeaderTable } from '../../utils/table-filters';

export const TransaccionesTables = () => {
  const { selectedGraficoFilter } = useFilterStore();
  const { selectedLineChart } = useChartStore();

  const getTableData = useGetTransaccionesTableData(selectedGraficoFilter);
  const { title, subTitle } = renderHeaderTable(selectedGraficoFilter);

  if (getTableData.isLoading) {
    return <div>Loading...</div>;
  }

  if (getTableData.isError) {
    return <div>Error...</div>;
  }

  const { tableFilter, tableData } = getTableData.data!;

  const filterColumns = renderFilterColumns(subTitle);

  return (
    <Box justifyContent='center' display='flex' gap={3}>
      {/* Tabla de filtros */}
      <DataGridTable title={title} columns={filterColumns} rows={tableFilter} />

      {/* Transacciones */}
      <DataGridTable
        title='Transacciones'
        columns={transaccionesColumns}
        rows={tableData?.values!}
      />

      {/* Tabla de dinero */}
      {selectedLineChart === 'Dinero' && (
        <DataGridTable
          title='Dinero'
          columns={dineroColumns}
          rows={tableData?.values!}
        />
      )}

      {/* Tabla de cashback */}
      {selectedLineChart === 'Cashback' && (
        <DataGridTable
          title='Cashback'
          columns={cashbackColumns}
          rows={tableData?.values!}
        />
      )}
    </Box>
  );
};
