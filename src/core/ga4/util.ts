import ReactGa from 'react-ga4';

interface AnalyticsEvent {
  action: string;
  description: string;
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const pushEventAnalytics = (event: AnalyticsEvent) => {
  ReactGa.event({
    category: 'Analytics',
    action: event.action,
    label: event.description,
  });
};
