import { Group, useComputedColorScheme } from "@mantine/core";
import DarkSideToggle from "./components/DarkSideToggle";
import HomeIcon from "./components/HomeIcon";
import useSize from "localboast/hooks/useSize";
import Haptic from "localboast/components/Haptic";
import useUpdatingRef from "localboast/hooks/useUpdatingRef";
import cx from "localboast/utils/cx";
import { useEffect } from "react";
import * as LINKS from "constants/lbLinks";
import GithubLogoSVG from "assets/github_logo.svg?react";
import { IconApps, IconHammer, IconHeartHandshake, IconVideo, IconVocabulary } from "@tabler/icons-react";
import getCopy from "constants/localisation";

import styles from "./styles.module.sass";
import Paths from "Paths";
import HeaderNavItem from "./components/HeaderNavItem/HeaderNavItem";

interface HeaderProps {
  scrollTop: number;
}

const SCROLL_FADE_RATE = 0.4;
const SCROLL_MIN_OPACITY = 0.3;

const Header = (props: HeaderProps) => {
  const { size, setRef } = useSize();
  const colorScheme = useComputedColorScheme();

  // Need to know header height so body can adjust to fit it
  useEffect(() => {
    if (size?.height) {
      document.documentElement.style.setProperty("--header-height", `${size.height}px`);
    }
  }, [size?.height]);

  const updateHeaderColorRef = useUpdatingRef(() => {
    let alpha = 1;

    const headerHeight = size?.height;
    const offset = props.scrollTop;

    if (!(headerHeight && offset)) {
      alpha = 1;
    } else {
      alpha = Math.max(SCROLL_MIN_OPACITY, (headerHeight - offset * SCROLL_FADE_RATE) / headerHeight);
    }

    document.documentElement.style.setProperty("--header-opacity", `${alpha * 100}%`);
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
      ref={(ref) => {
        ref && setRef(ref);
      }}
      className={cx(styles.header, styles[`header_${colorScheme}`])}
    >
      <Group wrap="nowrap">
        <HomeIcon />
        <Haptic focusScaleMultiplier={0.7} events={{ focus: true }}>
          <DarkSideToggle />
        </Haptic>
      </Group>
      <Group gap={20}>
        <HeaderNavItem
          icon={IconHeartHandshake}
          to={LINKS.TIP_DEFAULT}
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
        <HeaderNavItem icon={IconApps} to={Paths.AppsPage} title={getCopy("seeApps")} />
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
          ]}
        />
      </Group>
    </Group>
  );
};

export default Header;
