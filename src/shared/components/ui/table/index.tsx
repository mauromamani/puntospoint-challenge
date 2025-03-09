import { Paper } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  gridClasses,
} from '@mui/x-data-grid';

const CustomToolbar = ({ title }: { title: string }) => {
  return (
    <GridToolbarContainer>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          fontWeight: 500,
          fontSize: '14px',
          color: '#48454E',
          padding: '12px 0',
        }}
      >
        {title}
      </div>
    </GridToolbarContainer>
  );
};

interface DataGridTableProps {
  title: string;
  columns: GridColDef[];
  rows: any[];
  getRowId?: (row: any) => string | number;
}

export const DataGridTable: React.FC<DataGridTableProps> = ({
  title,
  columns,
  rows,
  getRowId,
}) => {
  return (
    <Paper
      sx={{
        borderRadius: '10px',
        backgroundColor: '#e6e1e6',
        boxShadow: 'none',
        width: 'fit-content',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        disableVirtualization
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSorting
        disableColumnResize
        hideFooter
        density='standard'
        slots={{
          toolbar: () => <CustomToolbar title={title} />,
        }}
        sx={{
          border: 'none',
          backgroundColor: '#e6e1e6',
          width: columns.length * 120,
          [`& .${gridClasses.columnHeader}`]: {
            backgroundColor: '#e6e1e6',
            color: '#48454E',
            fontSize: '16px',
            fontWeight: 400,
            cursor: 'default',
          },
          [`& .${gridClasses.cell}`]: {
            fontSize: '16px',
            fontWeight: 400,
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            padding: '5px 2px',
            borderBottom: 'none',
            whiteSpace: 'nowrap',
            height: '48px !important',
          },
          [`& .${gridClasses.cell}:hover`]: {
            backgroundColor: '#d6d1d7 !important',
          },
          [`& .${gridClasses.row}`]: {
            minHeight: '48px !important',
            maxHeight: '48px !important',
          },
          [`& .${gridClasses.row}:hover`]: {
            backgroundColor: 'transparent !important',
          },
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />
    </Paper>
  );
};
