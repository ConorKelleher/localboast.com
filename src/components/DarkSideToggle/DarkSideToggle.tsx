import { Switch, useMantineColorScheme, useMantineTheme, rem } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useEffect } from "react";
import styles from "./styles.module.sass";
import DarkModeAnimation from "./components/DarkModeAnimation";

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
    <div style={{ position: "relative" }}>
      <Switch
        size="lg"
        checked={colorScheme === "dark"}
        onChange={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
        onLabel={moonIcon}
        offLabel={sunIcon}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          margin: "auto",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <DarkModeAnimation />
      </div>
    </div>
  );
};

export default DarkSideToggle;
