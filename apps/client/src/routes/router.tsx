import OnBoarding from '@pages/onBoarding/OnBoarding';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home';
import { ROUTES_CONFIG } from './routesConfig';

export const router = createBrowserRouter([
  {
    path: ROUTES_CONFIG.home.path,
    element: <Home />,
  },
  {
    path: ROUTES_CONFIG.onBoarding.path,
    element: <OnBoarding />,
  },
]);
