import { IN_PROGRESS_SECTIONS } from "Pages/InProgressPage/constants";
import usePageTitle from "localboast/hooks/usePageTitle";
import styles from "./styles.module.sass";
import TextSegment from "components/TextSegment";

const APPS_SECTIONS = [...IN_PROGRESS_SECTIONS];

const AppsPageIndex = () => {
  usePageTitle("Apps | LocalBoast");

  return (
    <div className={styles.sections}>
      {APPS_SECTIONS.map((sectionData, index) => (
        <TextSegment key={index} {...sectionData} />
      ))}
    </div>
  );
};

export default AppsPageIndex;
