import { Filters } from '@/modules/dashboard/components';
import { render } from '@testing-library/react';

describe('Should render the filter component', () => {
  const filterComponent = render(<Filters />);

  it('Filter Component render', () => {
    expect(filterComponent).toBeTruthy();
  });
});
