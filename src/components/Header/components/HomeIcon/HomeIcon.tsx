import { Group, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import LogoSVG from "/src/assets/logo_color.svg?react";
import LogoWideSVG from "/src/assets/logo_color_wide.svg?react";
import styles from "./styles.module.sass";
import cx from "localboast/utils/cx";
import { useNavigate } from "react-router-dom";
import Paths from "Paths";
import useHaptic from "temp/useHaptic";

const HomeIcon = () => {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();

  const [{ onClick: hapticOnClick }, { returning, clicked }] = useHaptic({
    clickMs: 100,
    returnMs: 100,
    onClick: () => {
      navigate(Paths.HomePage);
    },
  });

  return (
    <UnstyledButton onClick={hapticOnClick} className={styles.logoButton}>
      <Group wrap="nowrap" className={styles.logoContainer}>
        <LogoSVG
          className={cx(styles.logoKey, {
            [styles.logoKeyDark]: colorScheme === "dark",
            [styles.logoKeyPressed]: clicked,
            [styles.logoKeyReturning]: returning,
          })}
        />
        <div className={styles.logoWideWrapper}>
          <LogoWideSVG className={styles.logoWide} />
        </div>
      </Group>
    </UnstyledButton>
  );
};

export default HomeIcon;
