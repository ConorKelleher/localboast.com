import StorybookBuild from "StorybookBuild";
import styles from "./styles.module.sass";

const StorybookPage = () => {
  return (
    <div className={styles.storybookPage}>
      <StorybookBuild />
    </div>
  );
};

export default StorybookPage;
