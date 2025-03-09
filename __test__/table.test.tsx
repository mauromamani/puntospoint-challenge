import { Tables } from '@/modules/dashboard/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

describe('Should render the Tables component', () => {
  const queryClient = new QueryClient();
  const tablesComponent = render(
    <QueryClientProvider client={queryClient}>
      <Tables />
    </QueryClientProvider>
  );

  it('Tables Component render', () => {
    expect(tablesComponent).toBeTruthy();
  });
});
