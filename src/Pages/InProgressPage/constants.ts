import EtChatSketchCover from "../../assets/screenshots/EtchABoast.png";
import PlaybackCover from "../../assets/screenshots/Playback.gif";
import { TextSegmentProps } from "components/TextSegment/constants";
import { ComponentTheme } from "theme";
import Paths from "Paths";

interface AppsSection extends TextSegmentProps {
  inProgress: boolean;
  showOnAppsPage: boolean;
}

export const APPS_SECTIONS: AppsSection[] = [
  {
    title: "Et-Chat-Sketch",
    body: "Proof of concept for my useTwitchChat hook. Playing on the visual of an Etcha-Sketch, having a canvas that viewers can draw a line on by interacting with chat.",
    imgSrc: EtChatSketchCover,
    theme: ComponentTheme.secondary,
    link: `/${Paths.AppsPage}/${Paths.EtChatSketch}`,
    showOnAppsPage: true,
    inProgress: true,
  },
  {
    title: "Playback",
    body: "In-progress app to allow paged playback of changes to a code editor. Useful for demos and recordings - has changeable background colour to allow for easy chroma-keying (greenscreen).",
    imgSrc: PlaybackCover,
    theme: ComponentTheme.primary,
    link: `/${Paths.AppsPage}/${Paths.Playback}`,
    showOnAppsPage: true,
    inProgress: false,
  },
  {
    title: "TwitchPoll",
    body: "Giving a basic twitch-chat polling system, regardless of whether or not twitch want me as an affiliate. Available for anyone to use on their channel.",
    theme: ComponentTheme.tertiary,
    link: `/${Paths.AppsPage}/${Paths.TwitchPoll}`,
    showOnAppsPage: false,
    inProgress: true,
  },
];

export const IN_PROGRESS_SECTIONS = APPS_SECTIONS.filter(({ inProgress }) => inProgress).map(
  ({ inProgress: _inProgress, showOnAppsPage: _showOnAppsPage, ...sectionProps }) => sectionProps
);
export const APP_SECTIONS_FOR_DISPLAY = APPS_SECTIONS.filter(({ showOnAppsPage }) => showOnAppsPage).map(
  ({ inProgress: _inProgress, showOnAppsPage: _showOnAppsPage, ...sectionProps }) => sectionProps
);
