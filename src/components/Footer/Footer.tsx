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
  useMantineColorScheme,
} from "@mantine/core";
import PatreonLogo from "/src/assets/patreon_logo.svg?react";
import TwitchLogo from "/src/assets/twitch_logo.svg?react";
import KoFiLogo from "/src/assets/ko-fi_logo.svg?react";
import styles from "./styles.module.sass";
import React, { MutableRefObject, forwardRef, useMemo, useRef } from "react";
import * as LINKS from "constants/lbLinks";
import getCopy from "constants/localisation";
import { LB_COLORS } from "theme";
import { IconArrowUp } from "@tabler/icons-react";
import useDelayedValue from "localboast/hooks/useDelayedValue";
import AnimatedText from "localboast/components/AnimatedText";

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

const FOOTER_SCROLL_PADDING = 10;

const Footer = forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
  const { scrollTop, scrollTo, scrollBy, viewportRef } = props;
  const footerRef = useRef<HTMLDivElement | null>(null);
  const { colorScheme } = useMantineColorScheme();
  const iconColor = colorScheme === "dark" ? LB_COLORS.darkFooterIcons : LB_COLORS.lightFooterIcons;
  const backgroundColor =
    colorScheme === "dark" ? lighten(LB_COLORS.dark, 0.1) : lighten(LB_COLORS.boastfulYellow, 0.2);
  const footerTopPixels = useMemo(() => {
    let topPixels = 0;
    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      topPixels = rect.top;
    }
    return topPixels;
  }, [scrollTop]); // eslint-disable-line react-hooks/exhaustive-deps
  const visibleFooterPixels = useMemo(() => {
    let visiblePixels = 0;
    if (footerTopPixels) {
      visiblePixels = window.innerHeight - footerTopPixels;
    }
    return visiblePixels;
  }, [footerTopPixels]);
  const atBottomOfContent = visibleFooterPixels + FOOTER_SCROLL_PADDING > 0;
  const [delayedAtBottomOfContent] = useDelayedValue(atBottomOfContent, { delay: 100 });
  const footerVisible = visibleFooterPixels > 0;
  const [delayedFooterVisible] = useDelayedValue(footerVisible, { delay: 100 });
  return (
    <div ref={footerRef}>
      <Transition transition="slide-up" mounted={delayedAtBottomOfContent}>
        {(transitionStyles) => (
          <Box
            id="page-footer"
            className={styles.footer}
            ref={ref}
            style={{ backgroundColor, display: atBottomOfContent ? undefined : "none", ...transitionStyles }}
          >
            <Stack>
              <Text size="md" fw="700">
                Contact
              </Text>
              <FooterAnchor href={LINKS.MAILTO}>{getCopy("email")}</FooterAnchor>
              <FooterAnchor href={LINKS.DISCORD}>{getCopy("discord")}</FooterAnchor>
            </Stack>
            <Stack>
              <Text size="md" fw="700">
                {getCopy("tsAndCs")}
              </Text>
              <FooterAnchor>To-Do</FooterAnchor>
              <FooterAnchor>I swear</FooterAnchor>
              <FooterAnchor>Don't @ me</FooterAnchor>
            </Stack>
            <Stack>
              <Text size="md" fw="700">
                Other Resources
              </Text>
              <FooterAnchor href={LINKS.LIB_REPO}>{getCopy("githubLib")}</FooterAnchor>
              <FooterAnchor href={LINKS.SITE_REPO}>{getCopy("githubSite")}</FooterAnchor>
              <FooterAnchor href={LINKS.YOUTUBE}>{getCopy("youtube")}</FooterAnchor>
              <FooterAnchor href={LINKS.TWITCH}>{getCopy("twitch")}</FooterAnchor>
            </Stack>
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
          </Box>
        )}
      </Transition>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={atBottomOfContent}>
          {(transitionStyles) => (
            <Button
              leftSection={
                <IconArrowUp
                  style={{
                    width: rem(16),
                    height: rem(16),
                    transition: "transform 0.2s ease",
                    // transitionDelay: "0.5s",
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
