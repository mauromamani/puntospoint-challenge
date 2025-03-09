import { Charts } from '@/modules/dashboard/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

describe('Should render the Chart component', () => {
  const queryClient = new QueryClient();
  const chartsComponent = render(
    <QueryClientProvider client={queryClient}>
      <Charts />
    </QueryClientProvider>
  );

  it('Chart Component render', () => {
    expect(chartsComponent).toBeTruthy();
  });
});
