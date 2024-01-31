import { Group, UnstyledButton, useMantineColorScheme } from "@mantine/core";
import LogoSVG from "/src/assets/logo_color.svg?react";
import LogoWideSVG from "/src/assets/logo_color_wide.svg?react";
import styles from "./styles.module.sass";
import { cx } from "localboast";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeIcon = () => {
  const { colorScheme } = useMantineColorScheme();
  const [clicked, setClicked] = useState(false);
  const [returning, setReturning] = useState(false);
  const unclickTimeoutRef = useRef<NodeJS.Timeout>();
  const navigate = useNavigate();

  const onClick = () => {
    setClicked(true);
    setReturning(false);
    if (unclickTimeoutRef.current) {
      clearTimeout(unclickTimeoutRef.current);
    }
    navigate("/");

    unclickTimeoutRef.current = setTimeout(() => {
      setClicked(false);
      setReturning(true);
      unclickTimeoutRef.current = setTimeout(() => {
        setReturning(false);
        unclickTimeoutRef.current = undefined;
      }, 100);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (unclickTimeoutRef.current) {
        clearTimeout(unclickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <UnstyledButton onClick={onClick} className={styles.logoButton}>
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
