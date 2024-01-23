import ErrorPage from "Pages/ErrorPage/ErrorPage";
import HomePage from "Pages/HomePage";
import LivePage from "Pages/LivePage/LivePage";
import EtChatSketch from "Pages/LivePage/Page/LiveUtilsPag/EtChatSketch";
import LivUtilPg from "Pages/LivePage/Page/LiveUtilsPag/LiveUtilsPage";
import TwitchPage from "Pages/LivePage/Page/TwitchPage";
import YouTubePage from "Pages/LivePage/Page/YouTubePage/YouTubePage";
import Root from "Pages/Root";
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
        path: "live/YouTube",
        element: <YouTubePage />,
      },
      {
        path: "live/utils",
        element: <LivUtilPg />,
      },
      {
        path: "live/utils/ktch",
        element: <EtChatSketch />,
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
];
