import { Navigate } from "react-router-dom";
import PublicApp from "./PublicApp";
import CompanyList from "../components/CompanyList";
import LandingPage from "../components/LandingPage";
import Dashboard from "../features/dashboard/Dashboard";

export const publicRoutes = [
  {
    path: "/",
    element: (
      <Navigate
        to={
          window.baseUrl +
          "app/clist" +
          "?func=ll&objId=" +
          window.currentWebreportId +
          "&objAction=RunReport"
        }
      />
    ),
  },
  {
    path: window.baseUrl,
    element: (
      <Navigate
        to={
          window.baseUrl +
          "app/clist" +
          "?func=ll&objId=" +
          window.currentWebreportId +
          "&objAction=RunReport"
        }
      />
    ),
  },
  {
    path: window.baseUrl + "app",
    element: <PublicApp />,
    children: [
      {
        children: [
          {
            path: "clist",
            element: <CompanyList />,
          },
          {
            path: "landing",
            element: <LandingPage />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
];
