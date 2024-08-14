import Paths from "Paths";
import EtChatSketch from "./EtChatSketch";
import Playback from "./Playback";
import TwitchPoll from "./TwitchPoll";

export const ALL_APPS = [
  {
    path: Paths.EtChatSketch,
    Component: EtChatSketch,
  },
  {
    path: Paths.Playback,
    Component: Playback,
  },
  {
    path: Paths.TwitchPoll,
    Component: TwitchPoll,
  },
];
