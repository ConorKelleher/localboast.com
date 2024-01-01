import { Group } from "@mantine/core";
import LogoSVG from "/src/assets/logo_color.svg?react";
// import LogoSVGText from "/src/assets/logo_color_wide.svg?react";
import styles from "./styles.module.sass";
import { cx } from "localboast";

const HomeIcon = () => {
  return (
    <Group wrap="nowrap" className={styles.logoContainer}>
      <LogoSVG className={cx(styles.logoKey)} />
      {/* <LogoSVGText className={cx(styles.logoWide, styles.logoKey)} /> */}
    </Group>
  );
};

export default HomeIcon;
