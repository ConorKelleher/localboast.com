import TextSegment from "components/TextSegment";
import usePageTitle from "localboast/hooks/usePageTitle";

import EtChatSketchCover from "../../assets/screenshots/EtchABoast.png";
import PlaybackCover from "../../assets/screenshots/Playback.gif";
import styles from "./styles.module.sass";
import { TextSegmentProps } from "components/TextSegment/constants";
import { ComponentTheme } from "theme";
import Paths from "Paths";

const SECTIONS: TextSegmentProps[] = [
  {
    title: "Et-Chat-Sketch",
    body: "Proof of concept for my useTwitchChat hook. Playing on the visual of an Etcha-Sketch, having a canvas that viewers can draw a line on by interacting with chat.",
    imgSrc: EtChatSketchCover,
    theme: ComponentTheme.secondary,
    link: `/${Paths.AppsPage}/${Paths.EtChatSketch}`,
  },
  {
    title: "Playback",
    body: "In-progress app to allow paged playback of changes to a code editor. Useful for demos and recordings - has changeable background colour to allow for easy chroma-keying (greenscreen).",
    imgSrc: PlaybackCover,
    theme: ComponentTheme.primary,
    link: `/${Paths.AppsPage}/${Paths.Playback}`,
  },
];

const InProgressPage = () => {
  usePageTitle("Work in Progress | LocalBoast");
  return (
    <div className={styles.sections}>
      {SECTIONS.map((sectionData, index) => (
        <TextSegment key={index} {...sectionData} />
      ))}
    </div>
  );
};

export default InProgressPage;
