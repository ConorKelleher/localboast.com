import ErrorPage from "Pages/ErrorPage/ErrorPage";
import GivePage from "Pages/GivePage";
import HomePage from "Pages/HomePage";
import InProgressPage from "Pages/InProgressPage";
import LivePage from "Pages/LivePage/LivePage";
import EtChatSketch from "Pages/LivePage/Pages/LiveUtilsPage/EtChatSketch";
import LiveUtilsPage from "Pages/LivePage/Pages/LiveUtilsPage/LiveUtilsPage";
import TwitchPage from "Pages/LivePage/Pages/TwitchPage";
import YouTubePage from "Pages/LivePage/Pages/YouTubePage/YouTubePage";
import Root from "Pages/Root";
import { UnwrappedRoot } from "Pages/Root/Root";
import StorybookPage from "Pages/StorybookPage";
import TwitchAuthPage from "Pages/TwitchAuthPage";
import Paths from "Paths";

export const RootRouter = [
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
        path: Paths.LiveUtilsPage,
        element: <LiveUtilsPage />,
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
        path: Paths.GivePage,
        element: <GivePage />,
      },
    ],
  },
  {
    path: Paths.UnwrappedRoot,
    element: <UnwrappedRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: Paths.EtChatSketch,
        element: <EtChatSketch />,
      },
    ],
  },
];
