import { HeaderChart } from '@/modules/dashboard/components/charts/header-chart';
import { render } from '@testing-library/react';

describe('Should render the header chart component', () => {
  const headerChartComponent = render(<HeaderChart />);

  it('Header chart Component render', () => {
    expect(headerChartComponent).toBeTruthy();
  });
});
