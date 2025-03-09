import { Sidebar } from '@/modules/dashboard/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

describe('Should render the Sidebar component', () => {
  const queryClient = new QueryClient();
  const sidebarComponent = render(
    <QueryClientProvider client={queryClient}>
      <Sidebar />
    </QueryClientProvider>
  );

  it('Sidebar Component render', () => {
    expect(sidebarComponent).toBeTruthy();
  });
});
