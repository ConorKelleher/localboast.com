import TextSegment from "components/TextSegment";
import usePageTitle from "localboast/hooks/usePageTitle";

import styles from "./styles.module.sass";
import { IN_PROGRESS_SECTIONS } from "./constants";

const InProgressPage = () => {
  usePageTitle("Work in Progress | LocalBoast");
  return (
    <div className={styles.sections}>
      {IN_PROGRESS_SECTIONS.map((sectionData, index) => (
        <TextSegment key={index} {...sectionData} />
      ))}
    </div>
  );
};

export default InProgressPage;
