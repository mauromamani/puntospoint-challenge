import { Box } from '@mui/material';
import { useFilterStore } from '../../store/filter.store';
import { useGetPulsoTableData } from '../../services/queries';
import { DataGridTable } from '@/shared/components/ui';
import { pulsoColumns, renderFilterColumns } from './columns';
import { renderHeaderTable } from '../../utils/table-filters';

export const PulsoTables = () => {
  const { selectedGraficoFilter } = useFilterStore();

  const getTableData = useGetPulsoTableData(selectedGraficoFilter);
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

      <DataGridTable
        title='Cashback'
        columns={pulsoColumns}
        rows={tableData?.values!}
      />
    </Box>
  );
};
