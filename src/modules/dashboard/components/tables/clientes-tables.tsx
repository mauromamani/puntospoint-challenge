import { Box } from '@mui/material';
import { useFilterStore } from '../../store/filter.store';
import { useGetClientesTableData } from '../../services/queries';
import { useChartStore } from '../../store/chart.store';
import { DataGridTable } from '@/shared/components/ui';
import {
  cashbackColumns,
  clientesColumns,
  dineroColumns,
  renderFilterColumns,
} from './columns';
import { renderHeaderTable } from '../../utils/table-filters';

export const ClientesTables = () => {
  const { selectedGraficoFilter } = useFilterStore();
  const { selectedLineChart } = useChartStore();

  const getTableData = useGetClientesTableData(selectedGraficoFilter);
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

      {/* Tabla de clientes */}
      <DataGridTable
        title='Clientes'
        columns={clientesColumns}
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
