import { Anchor, Center, Stack, Text, Title } from "@mantine/core";
import styles from "./styles.module.sass";
import * as LINKS from "constants/lbLinks";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatedText, useUpdatingRef } from "localboast";
import Paths from "Paths";
import usePageTitle from "temp/usePageTitle";

const TITLE_TEXTS = [
  { title: "Work in progress.", time: 2500 },
  { title: "Work-in-progress.", time: 3500 },
  { title: "Work-in-progress?", time: 4000 },
  { title: "Work In Progress.", time: 4000 },
  { title: "Work-In Progress.", time: 1000 },
  { title: "Work-In-Progress.", time: 1000 },
  { title: "Work In-Progress.", time: 2000 },
  { title: "This site isn't done.", time: 8000 },
];

const useInterval = (func: () => void, ms: number) => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const funcRef = useUpdatingRef(func);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      funcRef.current();
    }, ms);
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
  }, [funcRef, ms]);
};

const externalAnchorProps = {
  target: "_blank",
  rel: "noopener noreferrer",
};

const HomePage = () => {
  const [titleTextIndex, setTitleTextIndex] = useState(0);
  usePageTitle("Making Web Development Harder for Myself | LocalBoast");

  useInterval(
    () => setTitleTextIndex((oldIndex) => (oldIndex + 1) % TITLE_TEXTS.length),
    TITLE_TEXTS[titleTextIndex].time
  );

  return (
    <Center w="100%" h="100%">
      <Stack justify="center" align="center" className={styles.homeWrapper} maw={1000}>
        <Title size={100}>
          <AnimatedText msPerChar={60}>{TITLE_TEXTS[titleTextIndex].title}</AnimatedText>
        </Title>
        <Text size="xl" ta="center">
          Thrilled to have you here. You seem nice.
          <br />
          <br />
          As you can see, this site is a little bare.
          <br />
          It's supposed to eventually serve as showcase (and dumping ground) for{" "}
          <Anchor component={Link} to={Paths.StorybookPage}>
            Examples and Documentation
          </Anchor>{" "}
          for the{" "}
          <Anchor {...externalAnchorProps} href={LINKS.LIB_REPO}>
            LocalBoast React Library
          </Anchor>
          , as well as some of the utilities I've built using it{" "}
          <Anchor component={Link} to={Paths.EtChatSketch}>
            (see sneak-peek)
          </Anchor>
          .
          <br />
          <br />
          I'm constantly working to extend this library and this site and I'm documenting the process through
          live-streams on{" "}
          <Anchor {...externalAnchorProps} href={LINKS.TWITCH}>
            Twitch
          </Anchor>{" "}
          and <Anchor href={LINKS.YOUTUBE}>YouTube</Anchor> and my{" "}
          <Anchor {...externalAnchorProps} href={LINKS.DISCORD}>
            Discord Community
          </Anchor>
          .
          <br />
          <br />
          Follow my progress at the links above to see this develop and consider supporting my project by{" "}
          <Anchor {...externalAnchorProps} href={LINKS.KO_FI}>
            Buying me a coffee
          </Anchor>
          ,{" "}
          <Anchor {...externalAnchorProps} href={LINKS.SE_TIP}>
            Tipping me live on stream
          </Anchor>
          , or{" "}
          <Anchor {...externalAnchorProps} href={LINKS.PATREON}>
            becoming a recurring Patron
          </Anchor>
          .
        </Text>
      </Stack>
    </Center>
  );
};

export default HomePage;
