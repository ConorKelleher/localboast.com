import { Switch, useMantineColorScheme, useMantineTheme, rem, useComputedColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { DEFAULT_COLOR_SCHEME } from "constants/preferences";
import useWipe from "localboast/hooks/useWipe";
import { LB_COLORS } from "theme";

const DarkSideToggle = () => {
  const theme = useMantineTheme();
  const { wipe, positionRef } = useWipe();
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
  const computedColorScheme = useComputedColorScheme(DEFAULT_COLOR_SCHEME, { getInitialValueInEffect: true });

  const sunIcon = <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.yellow[4]} />;

  const moonIcon = <IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={LB_COLORS.dark} />;

  return (
    <div ref={(ref) => (positionRef.current = ref)}>
      <Switch
        size="lg"
        defaultChecked={computedColorScheme === "dark"}
        onChange={(e) => {
          const { checked } = e.currentTarget;
          // setTimeout(() => {
          wipe();
          setTimeout(() => {
            setColorScheme(checked ? "dark" : "light");
          }, 100);
          // }, 0);
        }}
        onLabel={moonIcon}
        offLabel={sunIcon}
      />
    </div>
  );
};

export default DarkSideToggle;
