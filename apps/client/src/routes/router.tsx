import OnBoarding from '@pages/onBoarding/OnBoarding';
import { createBrowserRouter } from 'react-router-dom';
import { Dashboard, NotFound } from '@pages';
import { ErrorBoundary } from '@shared';
import { ROUTES_CONFIG } from '@routes/routesConfig';

export const router = createBrowserRouter([
  {
    path: ROUTES_CONFIG.dashboard.path,
    element: <Dashboard />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: ROUTES_CONFIG.onBoarding.path,
    element: <OnBoarding />,
  },
]);
