import { Group, darken, rgba, useMantineColorScheme } from "@mantine/core";
import DarkSideToggle from "./components/DarkSideToggle";
import HomeIcon from "./components/HomeIcon";
import { useSize, useUpdatingRef } from "localboast";
import { useEffect } from "react";
import { LB_COLORS } from "theme";
import * as LINKS from "constants/lbLinks";
import GithubLogoSVG from "assets/github_logo.svg?react";
import { IconHammer, IconHeartHandshake, IconVideo, IconVocabulary } from "@tabler/icons-react";
import getCopy from "constants/localisation";

import styles from "./styles.module.sass";
import Paths from "Paths";
import Haptic from "temp/Haptic";
import HeaderNavItem from "./components/HeaderNavItem/HeaderNavItem";

interface HeaderProps {
  scrollTop: number;
}

const SCROLL_FADE_RATE = 0.4;
const SCROLL_MIN_OPACITY = 0.3;

const Header = (props: HeaderProps) => {
  const { size, setRef } = useSize();
  const { colorScheme } = useMantineColorScheme();

  // Need to know header height so body can adjust to fit it
  useEffect(() => {
    if (size?.height) {
      document.documentElement.style.setProperty("--header-height", `${size.height}px`);
    }
  }, [size?.height]);

  const updateHeaderColorRef = useUpdatingRef(() => {
    const baseColor = colorScheme === "dark" ? darken(LB_COLORS.boastfulPurple, 0.3) : LB_COLORS.boastfulYellow;
    let alpha = 1;

    const headerHeight = size?.height;
    const offset = props.scrollTop;

    if (!(headerHeight && offset)) {
      alpha = 1;
    } else {
      alpha = Math.max(SCROLL_MIN_OPACITY, (headerHeight - offset * SCROLL_FADE_RATE) / headerHeight);
    }

    document.documentElement.style.setProperty("--header-bg-color", rgba(baseColor, alpha));
    document.documentElement.style.setProperty("--header-shadow-opacity", alpha.toString());
  });

  // Update header color on colorScheme or scrollTop change
  useEffect(() => {
    updateHeaderColorRef.current();
  }, [props.scrollTop, colorScheme, updateHeaderColorRef]);

  return (
    <Group
      justify="space-between"
      wrap="nowrap"
      id="page-header"
      ref={(ref) => ref && setRef(ref)}
      className={styles.header}
    >
      <Group wrap="nowrap">
        <HomeIcon />
        <Haptic focusScale={1.05} events={{ focus: true }}>
          <DarkSideToggle />
        </Haptic>
      </Group>
      <Group gap={20}>
        <HeaderNavItem
          icon={IconHeartHandshake}
          href={LINKS.SE_TIP}
          title={getCopy("seeGive")}
          childLinks={[
            {
              external: true,
              to: LINKS.KO_FI,
              label: getCopy("buyKoFi"),
            },
            {
              external: true,
              to: LINKS.PATREON,
              label: getCopy("becomeAPatron"),
            },
            {
              external: true,
              to: LINKS.SE_TIP,
              label: getCopy("tipOnSE"),
            },
          ]}
        />
        <HeaderNavItem icon={IconVocabulary} to={Paths.StorybookPage} title={getCopy("seeDocs")} />
        <HeaderNavItem icon={IconHammer} to={Paths.InProgressPage} title={getCopy("seeWip")} />
        <HeaderNavItem
          icon={GithubLogoSVG}
          iconColorAttribute="fill"
          href={LINKS.LIB_REPO}
          title={getCopy("seeGithub")}
          childLinks={[
            {
              external: true,
              to: LINKS.LIB_REPO,
              label: getCopy("seeLibCode"),
            },
            {
              external: true,
              to: LINKS.SITE_REPO,
              label: getCopy("seeSiteCode"),
            },
          ]}
        />
        <HeaderNavItem
          icon={IconVideo}
          to={Paths.LivePage}
          title={getCopy("seeLive")}
          childLinks={[
            {
              to: Paths.TwitchPage,
              label: getCopy("twitch"),
            },
            {
              to: Paths.YouTubePage,
              label: getCopy("youtube"),
            },
            {
              to: Paths.LiveUtilsPage,
              label: getCopy("liveUtils"),
            },
          ]}
        />
      </Group>
    </Group>
  );
};

export default Header;
