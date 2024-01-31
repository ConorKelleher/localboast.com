import ErrorPage from "Pages/ErrorPage/ErrorPage";
import HomePage from "Pages/HomePage";
import InProgressPage from "Pages/InProgressPage";
import LivePage from "Pages/LivePage/LivePage";
import EtChatSketch from "Pages/LivePage/Page/LiveUtilsPage/EtChatSketch";
import LiveUtilsPage from "Pages/LivePage/Page/LiveUtilsPage/LiveUtilsPage";
import TwitchPage from "Pages/LivePage/Page/TwitchPage";
import YouTubePage from "Pages/LivePage/Page/YouTubePage/YouTubePage";
import Root from "Pages/Root";
import { UnwrappedRoot } from "Pages/Root/Root";
import StorybookPage from "Pages/StorybookPage";
import TwitchAuthPage from "Pages/TwitchAuthPage";

export const RootRouter = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "docs",
        element: <StorybookPage />,
      },
      {
        path: "live",
        element: <LivePage />,
      },
      {
        path: "wip",
        element: <InProgressPage />,
      },
      {
        path: "live/YouTube",
        element: <YouTubePage />,
      },
      {
        path: "live/utils",
        element: <LiveUtilsPage />,
      },
      {
        path: "live/twitch",
        element: <TwitchPage />,
      },
      {
        path: "twitch_auth",
        element: <TwitchAuthPage />,
      },
    ],
  },
  {
    path: "apps",
    element: <UnwrappedRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "sketch",
        element: <EtChatSketch />,
      },
    ],
  },
];
