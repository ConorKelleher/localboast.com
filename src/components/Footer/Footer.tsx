import React, { MutableRefObject, forwardRef } from "react";
import {
  Affix,
  Anchor,
  Box,
  Button,
  Stack,
  Text,
  Transition,
  lighten,
  rem,
  useComputedColorScheme,
} from "@mantine/core";
import AnimatedText from "localboast/components/AnimatedText";
import useShowHideFooter from "localboast/hooks/useShowHideFooter";

import PatreonLogo from "/src/assets/patreon_logo.svg?react";
import TwitchLogo from "/src/assets/twitch_logo.svg?react";
import KoFiLogo from "/src/assets/ko-fi_logo.svg?react";
import styles from "./styles.module.sass";
import * as LINKS from "constants/lbLinks";
import getCopy from "constants/localisation";
import { LB_COLORS } from "theme";
import { IconArrowUp } from "@tabler/icons-react";

interface FooterAnchorProps extends React.PropsWithChildren {
  href?: string;
  target?: string;
  rel?: string;
}

const FooterAnchor = (props: FooterAnchorProps) => {
  return <Anchor className={styles.footer_anchor} target="_blank" rel="noopener noreferrer" {...props} />;
};

interface FooterProps {
  scrollTop: number;
  scrollTo: (options: ScrollToOptions) => void;
  scrollBy: (options: ScrollToOptions) => void;
  viewportRef: MutableRefObject<HTMLDivElement | null>;
}

const Footer = forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
  const { scrollTop, scrollTo, scrollBy, viewportRef } = props;
  const colorScheme = useComputedColorScheme();
  const iconColor = colorScheme === "dark" ? LB_COLORS.darkFooterIcons : LB_COLORS.lightFooterIcons;
  const backgroundColor =
    colorScheme === "dark" ? lighten(LB_COLORS.dark, 0.1) : lighten(LB_COLORS.boastfulYellow, 0.2);

  const { delayedFooterWithinRange, footerVisible, delayedFooterVisible, setFooterEl, visibleFooterPixels } =
    useShowHideFooter(scrollTop);

  return (
    <div
      tabIndex={0}
      ref={(ref) => {
        if (ref) {
          setFooterEl(ref);
        }
      }}
      className={styles.footer_wrapper}
    >
      <Box
        id="page-footer"
        className={styles.footer}
        ref={ref}
        style={{
          backgroundColor,
          display: delayedFooterWithinRange ? undefined : "none",
        }}
      >
        <div>
          <Stack>
            <Text size="md" fw="700">
              Contact
            </Text>
            <FooterAnchor href={LINKS.MAILTO}>{getCopy("email")}</FooterAnchor>
            <FooterAnchor href={LINKS.DISCORD}>{getCopy("discord")}</FooterAnchor>
          </Stack>
        </div>
        <div>
          <Stack>
            <Text size="md" fw="700">
              {getCopy("policies")}
            </Text>
            <FooterAnchor href={LINKS.COOKIE_POLICY}>{getCopy("cookiePolicy")}</FooterAnchor>
            <FooterAnchor href={LINKS.PRIVACY_POLICY}>{getCopy("privacyPolicy")}</FooterAnchor>
          </Stack>
        </div>
        <div>
          <Stack>
            <Text size="md" fw="700">
              Other Resources
            </Text>
            <FooterAnchor href={LINKS.LIB_REPO}>{getCopy("githubLib")}</FooterAnchor>
            <FooterAnchor href={LINKS.SITE_REPO}>{getCopy("githubSite")}</FooterAnchor>
            <FooterAnchor href={LINKS.YOUTUBE}>{getCopy("youtube")}</FooterAnchor>
            <FooterAnchor href={LINKS.TWITCH}>{getCopy("twitch")}</FooterAnchor>
          </Stack>
        </div>
        <div>
          <Stack>
            <Text size="md" fw="700">
              {getCopy("support")}
            </Text>
            <FooterAnchor href={LINKS.PATREON}>
              <PatreonLogo fill={iconColor} />
              {getCopy("becomeAPatron")}
            </FooterAnchor>
            <FooterAnchor href={LINKS.SE_TIP}>
              <TwitchLogo fill={iconColor} />
              {getCopy("tipOnSE")}
            </FooterAnchor>
            <FooterAnchor href={LINKS.KO_FI}>
              <KoFiLogo fill={iconColor} />
              {getCopy("buyKoFi")}
            </FooterAnchor>
          </Stack>
        </div>
      </Box>
      <Affix position={{ bottom: 20, right: 20 }} className={styles.affix}>
        <Transition transition="slide-up" mounted={delayedFooterWithinRange}>
          {(transitionStyles) => (
            <Button
              variant="light"
              leftSection={
                <IconArrowUp
                  style={{
                    width: rem(16),
                    height: rem(16),
                    transition: "transform 0.2s ease",
                    transform: `rotate(${footerVisible ? 0 : 180}deg)`,
                  }}
                />
              }
              style={transitionStyles}
              onClick={() =>
                footerVisible
                  ? scrollBy({ top: -visibleFooterPixels, behavior: "smooth" })
                  : scrollTo({
                      top: viewportRef.current?.scrollHeight,
                      behavior: "smooth",
                    })
              }
            >
              <AnimatedText msPerChar={80}>{delayedFooterVisible ? "Hide" : "Show"}</AnimatedText> Footer
            </Button>
          )}
        </Transition>
      </Affix>
    </div>
  );
});

export default Footer;
