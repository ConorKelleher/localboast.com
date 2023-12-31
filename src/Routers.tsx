import HomePage from "Pages/HomePage";
import StorybookPage from "Pages/StorybookPage";
import TwitchAuthPage from "Pages/TwitchAuthPage";
import TwitchPage from "Pages/TwitchPage";

export const RootRouter = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/docs",
    element: <StorybookPage />,
  },
  {
    path: "/twitch",
    element: <TwitchPage />,
  },
  {
    path: "/twitch_auth",
    element: <TwitchAuthPage />,
  },
];
