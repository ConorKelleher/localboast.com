import { Anchor, Box, Stack, Text } from "@mantine/core";
import PatreonLogo from "/src/assets/patreon_logo.svg?react";
import TwitchLogo from "/src/assets/twitch_logo.svg?react";
import KoFiLogo from "/src/assets/ko-fi_logo.svg?react";
import styles from "./styles.module.sass";
import React, { forwardRef } from "react";
import * as LINKS from "constants/lbLinks";
import getCopy from "constants/localisation";

interface FooterAnchorProps extends React.PropsWithChildren {
  href?: string;
  target?: string;
  rel?: string;
}

const FooterAnchor = (props: FooterAnchorProps) => {
  return <Anchor className={styles.footer_anchor} target="_blank" rel="noopener noreferrer" {...props} />;
};

const Footer = forwardRef<HTMLDivElement | null>((_props, ref) => {
  return (
    <Box id="page-footer" className={styles.footer} ref={ref}>
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
          <PatreonLogo />
          {getCopy("becomeAPatron")}
        </FooterAnchor>
        <FooterAnchor href={LINKS.SE_TIP}>
          <TwitchLogo />
          {getCopy("tipOnSE")}
        </FooterAnchor>
        <FooterAnchor href={LINKS.KO_FI}>
          <KoFiLogo />
          {getCopy("buyKoFi")}
        </FooterAnchor>
      </Stack>
    </Box>
  );
});

export default Footer;
