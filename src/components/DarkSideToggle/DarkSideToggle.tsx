import { Switch, useMantineColorScheme, useMantineTheme, rem } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useWipe, UseWipeShape } from "localboast";
import { useEffect, useRef } from "react";
// import BlackLogoSVG from "/src/assets/logo_black.svg";

const DarkSideToggle = () => {
  const theme = useMantineTheme();
  const { wipe, positionRef } = useWipe({
    // shape: "https://upload.wikimedia.org/wikipedia/commons/7/78/BlackStar.PNG",
    // shape: BlackLogoSVG,
    shape: UseWipeShape.Circle,
    // shape: Shape.Square,
    ms: 2000,
  });
  const toggleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { colorScheme, setColorScheme } = useMantineColorScheme({ keepTransitions: true });

  const sunIcon = <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.yellow[4]} />;

  const moonIcon = (
    <IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.blue[6]} />
  );

  useEffect(() => {
    return () => {
      if (toggleTimeoutRef.current) {
        clearTimeout(toggleTimeoutRef.current);
        toggleTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={(ref) => (positionRef.current = ref)}>
      <Switch
        size="lg"
        defaultChecked={colorScheme === "dark"}
        onChange={() => {
          // optional timeout if browser hanging becomes an issue
          // toggleTimeoutRef.current = setTimeout(() => {
          toggleTimeoutRef.current = null;
          wipe();
          setColorScheme(colorScheme === "light" ? "dark" : "light");
          // }, 150);
        }}
        onLabel={moonIcon}
        offLabel={sunIcon}
      />
    </div>
  );
};

export default DarkSideToggle;
