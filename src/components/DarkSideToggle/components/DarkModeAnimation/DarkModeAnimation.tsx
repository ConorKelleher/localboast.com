import { Portal, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSize, useUpdatingRef } from "localboast";

type ToFromColours = {
  to: string;
  from: string;
};

const SVG_START_TRANSITION = "transform 1s 0s ease";
const CONTAINER_START_TRANSITION = "backdrop-filter 0.5s 0s ease, opacity 0.5s 0.5s ease";

// const getBackdropFilter = (blurPx: number) => `invert() blur(${blurPx}px)`;

const container = document.createElement("div");

const resetContainerStyles = () => {
  // container.style.backdropFilter = getBackdropFilter(0);
  // container.style.opacity = "1";
};
container.style.position = "absolute";
container.style.inset = "0";
container.style.pointerEvents = "none";
// container.style.clipPath = "url(#lbDarkModeClipPath)";
// container.style.transition = CONTAINER_START_TRANSITION;

type Shape = "circle" | "rect";
let shape: Shape = "circle";

shape = "rect";

const DarkModeAnimation = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const lightBg = "white";
  const { size, setRef: setSizeRef } = useSize();
  const sizeRef = useUpdatingRef(size);
  const clipPathRef = useRef<SVGElement | null>(null);
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
    document.querySelector("html")!.appendChild(container);
    // const oldTransitionDelay = document.body.style.transitionDelay;
    // document.body.style.transitionDelay = "0.5s";
    return () => {
      document.querySelector("html")!.removeChild(container);
      // document.body.style.transitionDelay = oldTransitionDelay;
    };
  }, []);

  const animate = useCallback(() => {
    if (!clipPathRef.current || !sizeRef.current) {
      return;
    }
    // const containerTransitionValue = container.style.transition;
    const clipPathTransitionValue = clipPathRef.current.style.transition;

    // container.style.transition = "";
    clipPathRef.current.style.transition = "";

    const positionRect = positionDivRef.current!.getBoundingClientRect();
    // for rect
    let maskInsetAmount = 0;
    if (shape === "rect") {
      maskInsetAmount = Math.min(sizeRef.current.height, sizeRef.current.width) / 2;
    }
    const newTranslate = `translate(${positionRect.left - maskInsetAmount}px, ${positionRect.top - maskInsetAmount}px)`;
    clipPathRef.current.style.transform = `${newTranslate} scale(0)`;
    resetContainerStyles();
    setTimeout(() => {
      if (clipPathRef.current && sizeRef.current) {
        clipPathRef.current.style.transition = clipPathTransitionValue;
        clipPathRef.current.style.transform =
          clipPathRef.current.style.transform.replace(/scale\([^)]\)/, "") +
          `scale(${
            2 *
            (Math.max(sizeRef.current.height, sizeRef.current.width) /
              Math.min(sizeRef.current.height, sizeRef.current.width))
          })`;
      }
      // container.style.transition = containerTransitionValue;

      // container.style.opacity = "0";
      // container.style.backdropFilter = getBackdropFilter(5);
    });
  }, [sizeRef]);

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
        <div ref={(ref) => ref && setSizeRef(ref)} style={{ height: "100vh", width: "100vw" }}>
          <svg
            version="1.1"
            width="100%"
            height="100%"
            // viewBox="0 0 100 100"
            viewBox={`0 0 ${size?.width || 100} ${size?.height || 100}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="lbDarkModeClipPath">
                {/* 75% radius enough to completely fill viewport */}
                {/* <circle cx="50%" cy="50%" r="50%" /> */}
                {shape === "rect" && (
                  <rect
                    ref={(ref) => (clipPathRef.current = ref)}
                    style={{
                      transformOrigin: "center",
                      transformBox: "fill-box",
                      transition: SVG_START_TRANSITION,
                    }}
                    width={!size ? 100 : Math.min(size.height, size.width)}
                    height={!size ? 100 : Math.min(size.height, size.width)}
                  />
                )}
                {shape === "circle" && (
                  <circle
                    ref={(ref) => (clipPathRef.current = ref)}
                    style={{
                      // transformOrigin: "center",
                      transformBox: "fill-box",
                      transition: SVG_START_TRANSITION,
                    }}
                    r={!size ? 50 : Math.min(size.height, size.width) / 2}
                  />
                )}
              </clipPath>
            </defs>
            {/* <circle cx="50%" cy="50%" r="50%" fill="blue" opacity={0.1} /> */}
          </svg>
        </div>
      </Portal>
    </>
  );
};

export default DarkModeAnimation;
