import TextSegment from "components/TextSegment";
import usePageTitle from "localboast/hooks/usePageTitle";

import EtChatSketchCover from "../../assets/wip/EtchABoast.png";
import styles from "./styles.module.sass";
import { TextSegmentLayout } from "components/TextSegment/constants";
import { ComponentTheme } from "theme";
import Paths from "Paths";

type SectionData = {
  title: string;
  body: string;
  imgSrc: string;
  layout: TextSegmentLayout;
  theme?: ComponentTheme;
  link?: string;
};
const SECTIONS: SectionData[] = [
  {
    title: "Et-Chat-Sketch",
    body: "Proof of concept for my useTwitchChat hook. Playing on the visual of an Etcha-Sketch, having a canvas that viewers can draw a line on by interacting with chat.",
    imgSrc: EtChatSketchCover,
    layout: TextSegmentLayout.hybrid,
    theme: ComponentTheme.secondary,
    link: `/${Paths.AppsPage}/${Paths.EtChatSketch}`,
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
