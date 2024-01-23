import { Group, useMantineColorScheme } from "@mantine/core";
import LogoSVG from "/src/assets/logo_color.svg?react";
import styles from "./styles.module.sass";
import { cx } from "localboast";
// import { useEffect } from "react";

// const useFollowou = () => {
//   useEffect(() => {
//   document.addEventListener("mousemove", (e) => {
//     const po  })
// }, []);
// };

const HomeIcon = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Group wrap="nowrap" className={styles.logoContainer}>
      <LogoSVG className={cx(styles.logoKey, { [styles.logoKeyDark]: colorScheme === "dark" })} />
    </Group>
  );
};

export default HomeIcon;
