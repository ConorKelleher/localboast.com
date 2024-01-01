import { Switch, useMantineColorScheme, useMantineTheme, rem } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useEffect } from "react";
import styles from "./styles.module.sass";

const useColorSchemeTransition = () => {
  useEffect(() => {
    const newClass = styles.transitionTheme;
    setTimeout(() => {
      document.body.classList.add(newClass);
    });
    return () => {
      document.body.classList.remove(newClass);
    };
  }, []);
};

const DarkSideToggle = () => {
  const theme = useMantineTheme();
  useColorSchemeTransition();
  const { colorScheme, setColorScheme } = useMantineColorScheme({ keepTransitions: true });

  const sunIcon = <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.yellow[4]} />;

  const moonIcon = (
    <IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.blue[6]} />
  );

  return (
    <Switch
      size="lg"
      checked={colorScheme === "dark"}
      onChange={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
      onLabel={moonIcon}
      offLabel={sunIcon}
    />
  );
};

export default DarkSideToggle;
