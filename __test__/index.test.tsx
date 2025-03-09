import { render, screen } from '@testing-library/react';
import { DashboardPage } from '../src/modules/dashboard/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('DashboardPage', () => {
  it('should render the DashboardPage', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <DashboardPage />
      </QueryClientProvider>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should not render the DashboardPage if queryClient doesnt exist', () => {
    expect(() => {
      render(<DashboardPage />);
    }).toThrow('No QueryClient set, use QueryClientProvider to set one');
  });
});
