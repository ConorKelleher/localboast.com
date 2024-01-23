import { Anchor, Box, Stack, Text } from "@mantine/core";
import PatreonLogo from "/src/assets/patreon_logo.svg?react";
import TwitchLogo from "/src/assets/twitch_logo.svg?react";
import KoFiLogo from "/src/assets/ko-fi_logo.svg?react";
import styles from "./styles.module.sass";
import React, { forwardRef } from "react";

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
        <FooterAnchor href="mailto:localboast@outlook.com">Email</FooterAnchor>
        <FooterAnchor href="https://discord.gg/3pT3w7DT">Discord</FooterAnchor>
      </Stack>
      <Stack>
        <Text size="md" fw="700">
          Ts&Cs
        </Text>
        <FooterAnchor>To-Do</FooterAnchor>
        <FooterAnchor>I swear</FooterAnchor>
        <FooterAnchor>Don't @ me</FooterAnchor>
      </Stack>
      <Stack>
        <Text size="md" fw="700">
          Other Resources
        </Text>
        <FooterAnchor href="https://github.com/ConorKelleher/localboast">GitHub - Library</FooterAnchor>
        <FooterAnchor href="https://github.com/ConorKelleher/localboast.com">GitHub - Website</FooterAnchor>
        <FooterAnchor href="https://www.youtube.com/channel/UCt-IaL4qQsOU6_rbS7zky1Q/live">YouTube</FooterAnchor>
        <FooterAnchor href="https://twitch.tv/Localboast1">Twitch</FooterAnchor>
      </Stack>
      <Stack>
        <Text size="md" fw="700">
          Support This Project
        </Text>
        <FooterAnchor href="https://www.patreon.com/LocalBoast">
          <PatreonLogo />
          Become a Patron
        </FooterAnchor>
        <FooterAnchor href="https://streamelements.com/localboast1/tip">
          <TwitchLogo />
          Tip Me Live on Stream!
        </FooterAnchor>
        <FooterAnchor href="https://ko-fi.com/localboast">
          <KoFiLogo />
          Buy Me a Ko-Fi
        </FooterAnchor>
      </Stack>
    </Box>
  );
});

export default Footer;
