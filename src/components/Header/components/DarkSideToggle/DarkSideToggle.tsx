import { Switch, useMantineColorScheme, useMantineTheme, rem } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useWipe } from "localboast";

const DarkSideToggle = () => {
  const theme = useMantineTheme();
  const { wipe, positionRef } = useWipe();
  const { colorScheme, setColorScheme } = useMantineColorScheme({ keepTransitions: true });

  const sunIcon = <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.yellow[4]} />;

  const moonIcon = (
    <IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.blue[6]} />
  );

  return (
    <div ref={(ref) => (positionRef.current = ref)}>
      <Switch
        size="lg"
        defaultChecked={colorScheme === "dark"}
        onChange={() => {
          wipe();
          setColorScheme(colorScheme === "light" ? "dark" : "light");
        }}
        onLabel={moonIcon}
        offLabel={sunIcon}
      />
    </div>
  );
};

export default DarkSideToggle;
