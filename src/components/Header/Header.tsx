import { Button, Group, Menu, rgba, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import DarkSideToggle from "components/DarkSideToggle";
import HomeIcon from "components/HomeIcon";
import { Link } from "react-router-dom";
import styles from "./styles.module.sass";
import { useSize, useUpdatingRef } from "localboast";
import { useCallback, useEffect, useRef, useState } from "react";

type OnScroll = (e: Event) => void;

const useScrollDetection = (onScroll: OnScroll) => {
  const scrollListenedRef = useRef<HTMLElement | null>(null);
  const [listenerIndex, setListenerIndex] = useState(0);
  const onScrollRef = useUpdatingRef(onScroll);

  const handleScroll = useCallback(
    (e: Event) => {
      onScrollRef.current(e);
    },
    [onScrollRef]
  );

  useEffect(() => {
    const listenedElement = scrollListenedRef.current;
    if (listenedElement) {
      listenedElement.addEventListener("scroll", handleScroll);

      return () => {
        listenedElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [listenerIndex, handleScroll]);

  return useCallback((newRef: HTMLElement | null) => {
    if (newRef) {
      scrollListenedRef.current = newRef;
      // Update index to trigger new effect run
      setListenerIndex((oldIndex) => oldIndex + 1);
    }
  }, []);
};

const Header = () => {
  const { size, setRef } = useSize();
  const headerHeight = size?.height;
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  // Need to know header height so body can adjust to fit it
  useEffect(() => {
    if (headerHeight) {
      document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
    }
  }, [headerHeight]);

  const setScrollableRef = useScrollDetection((e) => {
    let currentColor = colorScheme === "dark" ? theme.colors.dark[7] : "#ffffff";
    const offset = (e.target as HTMLElement | null)?.scrollTop || 0;
    let alpha = 0;
    if (headerHeight && offset < headerHeight) {
      alpha = (headerHeight - offset) / headerHeight;
    }
    const newColor = rgba(currentColor, alpha);
    document.documentElement.style.setProperty("--header-bg-color", newColor);
  });

  useEffect(() => {
    setScrollableRef(document.getElementById("root"));
  }, [setScrollableRef]);

  return (
    <Group id="page-header" ref={(ref) => ref && setRef(ref)} className={styles.header}>
      <Link to="/">
        <HomeIcon />
      </Link>
      <DarkSideToggle />
      <Link to="/">Home</Link>
      <Link to="/docs">Docs</Link>
      <Menu trigger="hover" openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Link to="/live">Live</Link>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <Link to="/live/Twitch">Twitch</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/live/YouTube">YouTube</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/live/Utils">Util</Link>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default Header;
