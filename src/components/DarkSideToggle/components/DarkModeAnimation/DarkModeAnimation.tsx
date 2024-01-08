import { Portal, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.sass";

type ToFromColours = {
  to: string;
  from: string;
};

const getBackdropFilter = (blurPx: number) => `invert() blur(${blurPx}px)`;

const container = document.createElement("div");

// Todo - rewrite into localboast
// https://stackoverflow.com/a/8876069
const getViewportDimensions = () => ({
  width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
  height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
});

const resetContainerStyles = () => {
  container.style.backdropFilter = getBackdropFilter(0);
  container.style.opacity = "1";
};
container.style.position = "absolute";
container.style.inset = "0";
container.style.pointerEvents = "none";
container.style.clipPath = "url(#lbDarkModeClipPath)";
container.style.transition = "transform 2s 0s ease, backdrop-filter 0.5s 0s ease, opacity 0.5s 0.5s ease";

const DarkModeAnimation = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const lightBg = "white";
  const darkBg = theme.colors.dark[7];
  const toFromColours: ToFromColours = useMemo(
    () => ({
      to: colorScheme !== "dark" ? darkBg : lightBg,
      from: colorScheme !== "dark" ? lightBg : darkBg,
    }),
    [colorScheme, darkBg, lightBg]
  );
  const previousColoursRef = useRef(toFromColours);
  const positionDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.appendChild(container);
    const oldTransitionDelay = document.body.style.transitionDelay;
    document.body.style.transitionDelay = "0.5s";
    return () => {
      document.body.removeChild(container);
      document.body.style.transitionDelay = oldTransitionDelay;
    };
  }, []);

  const animate = useCallback(() => {
    const containerTransitionValue = container.style.transition;
    container.style.transition = "";
    const positionRect = positionDivRef.current!.getBoundingClientRect();
    const viewportDimensions = getViewportDimensions();
    const newTranslate = `translate(${positionRect.left - viewportDimensions.width / 2}px, ${
      positionRect.top - viewportDimensions.height / 2
    }px)`;
    container.style.transform = `${newTranslate} scale(0)`;
    resetContainerStyles();
    setTimeout(() => {
      container.style.transition = containerTransitionValue;
      container.style.backdropFilter = getBackdropFilter(5);
      container.style.opacity = "0";
      container.style.transform = container.style.transform.replace(/scale\([^)]\)/, "") + "scale(4)";
    });
  }, []);

  useEffect(() => {
    if (previousColoursRef.current.from !== toFromColours.from || previousColoursRef.current.to !== toFromColours.to) {
      animate();
      previousColoursRef.current = toFromColours;
    }
  }, [toFromColours, animate]);

  return (
    <>
      <div ref={(ref) => (positionDivRef.current = ref)} />
      <Portal target={container}>
        <svg
          version="1.1"
          width="100vw"
          height="100vh"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id="lbDarkModeClipPath" clipPathUnits="objectBoundingBox">
              <circle cx="0.5" cy="0.5" r="0.49" />
            </clipPath>
          </defs>
        </svg>
      </Portal>
    </>
  );
};

export default DarkModeAnimation;
