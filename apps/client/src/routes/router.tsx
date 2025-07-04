import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import { ROUTES_CONFIG } from "./routesConfig";

export const router = createBrowserRouter([
  {
    path: ROUTES_CONFIG.home.path,
    element: <Home />,
  },
]);
