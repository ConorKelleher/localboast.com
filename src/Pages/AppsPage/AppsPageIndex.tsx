import { APP_SECTIONS_FOR_DISPLAY } from "Pages/InProgressPage/constants";
import usePageTitle from "localboast/hooks/usePageTitle";
import styles from "./styles.module.sass";
import TextSegment from "components/TextSegment";

const AppsPageIndex = () => {
  usePageTitle("Apps | LocalBoast");

  return (
    <div className={styles.sections}>
      {APP_SECTIONS_FOR_DISPLAY.map((sectionData, index) => (
        <TextSegment key={index} {...sectionData} />
      ))}
    </div>
  );
};

export default AppsPageIndex;
