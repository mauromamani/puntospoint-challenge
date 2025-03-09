import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export const GA4 = () => {
  useEffect(() => {
    ReactGA.initialize('G-2V68XED1DW');
    ReactGA.send({ hitType: 'pageview', page: '/', title: 'DASHBOARD' });
  }, []);

  return <></>;
};
