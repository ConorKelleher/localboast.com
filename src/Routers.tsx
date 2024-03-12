import AppsPage from "Pages/AppsPage";
import ErrorPage from "Pages/ErrorPage";
import ExternalLink from "Pages/ExternalLink";
import { ExternalLinkMappings } from "Pages/ExternalLink/constants";
import HomePage from "Pages/HomePage";
import InProgressPage from "Pages/InProgressPage";
import LivePage from "Pages/LivePage";
import TwitchPage from "Pages/LivePage/Pages/TwitchPage";
import YouTubePage from "Pages/LivePage/Pages/YouTubePage";
import Root from "Pages/Root";
import { UnwrappedRoot } from "Pages/Root";
import StorybookPage from "Pages/StorybookPage";
import TwitchAuthPage from "Pages/TwitchAuthPage";
import Paths from "Paths";
import EtChatSketch from "components/Apps/EtChatSketch";
import Replay from "components/Apps/Replay";
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
        errorElement: <ErrorPage />,
        children: route.children ? wrapRoutesInErrors(route.children) : route.children,
      } as Route)
  );

export const RootRouter = wrapRoutesInErrors([
  ...Object.keys(ExternalLinkMappings).map((externalLinkPath) => ({
    path: externalLinkPath,
    element: <ExternalLink />,
  })),
  {
    path: Paths.Root,
    element: <Root />,
    children: [
      {
        path: Paths.HomePage,
        element: <HomePage />,
      },
      {
        path: Paths.StorybookPage,
        element: <StorybookPage />,
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
        path: Paths.TwitchAuthPage,
        element: <TwitchAuthPage />,
      },
      {
        path: Paths.AppsPage,
        element: <AppsPage />,
      },
    ],
  },
  {
    path: Paths.UnwrappedRoot,
    element: <UnwrappedRoot />,
    children: [
      {
        path: Paths.EtChatSketch,
        element: <EtChatSketch />,
      },
      {
        path: Paths.Replay,
        element: <Replay />,
      },
    ],
  },
]);
