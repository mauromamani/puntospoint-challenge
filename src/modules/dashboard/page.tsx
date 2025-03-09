import { DesktopNavbar } from '@/shared/components/navbar';
import { Charts, Filters, Sidebar, Tables } from './components';
import { Stack } from '@mui/material';

export const DashboardPage = () => {
  return (
    <>
      <DesktopNavbar />

      <Stack
        sx={{
          padding: {
            xs: '20px 30px',
            xl: '35px 0px',
          },
          flexDirection: {
            md: 'column',
            xl: 'row',
          },
        }}
        style={{
          maxWidth: '1390px',
          margin: '0 auto',
          gap: '30px',
        }}
      >
        <section style={{ flex: 1 }}>
          <Filters />

          <Charts />

          <Tables />
        </section>

        <Sidebar />
      </Stack>
    </>
  );
};
