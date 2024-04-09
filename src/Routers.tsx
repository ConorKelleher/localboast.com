import AppsPage from "Pages/AppsPage";
import AppsPageIndex from "Pages/AppsPage/AppsPageIndex";
import ErrorPage, { ErrorPageContent } from "Pages/ErrorPage";
import ExternalLink from "Pages/ExternalLink";
import { ExternalLinkMappings } from "Pages/ExternalLink/constants";
import HomePage from "Pages/HomePage";
import InProgressPage from "Pages/InProgressPage";
import LivePage from "Pages/LivePage";
import TwitchPage from "Pages/LivePage/Pages/TwitchPage";
import YouTubePage from "Pages/LivePage/Pages/YouTubePage";
import Root from "Pages/Root";
import StorybookPage from "Pages/StorybookPage";
import TwitchAuthPage from "Pages/TwitchAuthPage";
import Paths from "Paths";
import { ALL_APPS } from "components/Apps";
import { ReactNode } from "react";

type Route = {
  path: string;
  element: ReactNode;
  errorElement?: ReactNode;
  children?: Route[];
};
const wrapRoutesInErrors = (routes: Route[]): Route[] =>
  routes.map(
    (route) =>
      ({
        ...route,
        children: route.children ? wrapRoutesInErrors(route.children) : route.children,
      } as Route)
  );

export const RootRouter = wrapRoutesInErrors([
  {
    path: Paths.Root,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: Paths.HomePage,
        element: <HomePage />,
      },
      {
        path: Paths.StorybookPage,
        element: <StorybookPage />,
        children: [
          {
            path: "*",
            element: <StorybookPage />,
          },
        ],
      },
      {
        path: Paths.LivePage,
        element: <LivePage />,
      },
      {
        path: Paths.InProgressPage,
        element: <InProgressPage />,
      },
      {
        path: Paths.YouTubePage,
        element: <YouTubePage />,
      },
      {
        path: Paths.TwitchPage,
        element: <TwitchPage />,
      },
      {
        path: Paths.AppsPage,
        element: <AppsPage />,
        children: [
          {
            path: "",
            element: <AppsPageIndex />,
          },
          ...ALL_APPS.map((app) => ({
            path: app.path,
            element: <app.Component />,
          })),
        ],
      },
    ],
  },
  ...Object.keys(ExternalLinkMappings).map((externalLinkPath) => ({
    path: externalLinkPath,
    element: <ExternalLink />,
  })),
  ...ALL_APPS.map((app) => ({
    path: app.path,
    element: <app.Component />,
  })),
  {
    path: Paths.TwitchAuthPage,
    element: <TwitchAuthPage />,
  },
]);
