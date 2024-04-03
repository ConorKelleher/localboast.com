import { Image, useComputedColorScheme, useMantineTheme } from "@mantine/core";
import cx from "localboast/utils/cx";
import generateRandomId from "localboast/utils/generateRandomId";
import { merge } from "localboast/utils/objectHelpers";
import styles from "./styles.module.sass";
import { TEXT_SEGMENT_DEFAULT_PROPS, TextSegmentProps, TextSegmentLayout } from "./constants";
import { ComponentTheme, LB_THEMES } from "theme";
import Haptic from "localboast/components/Haptic";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

const useTextSegmentLayout = (chosenLayout: TextSegmentLayout) => {
  const mantineTheme = useMantineTheme();
  const isWideLayout = useMediaQuery(`(min-width: ${mantineTheme.breakpoints.lg})`);
  const isNarrowLayout = useMediaQuery(`(max-width: ${mantineTheme.breakpoints.sm})`);
  let layout = TextSegmentLayout.hybrid;
  if (chosenLayout !== TextSegmentLayout.auto) {
    layout = chosenLayout;
  } else {
    const isMediumLayout = !(isWideLayout || isNarrowLayout);
    switch (true) {
      case isWideLayout:
        layout = TextSegmentLayout.horizontal;
        break;
      case isMediumLayout:
        layout = TextSegmentLayout.hybrid;
        break;
      case isNarrowLayout:
        layout = TextSegmentLayout.vertical;
        break;
    }
  }
  return layout;
};

const TextSegment = (props: TextSegmentProps) => {
  const { body, layout: propsLayout, imgSrc, title, theme, link } = merge(TEXT_SEGMENT_DEFAULT_PROPS, props);
  const layout = useTextSegmentLayout(propsLayout);
  const colorScheme = useComputedColorScheme("dark");
  const activeTheme = LB_THEMES[theme as ComponentTheme];
  const color = activeTheme[colorScheme];
  const id = generateRandomId();
  const imgTag = imgSrc ? (
    <Image fit="contain" src={imgSrc} className={styles.image} style={{ borderColor: color, backgroundColor: color }} />
  ) : null;
  const bodyTag = body ? <p style={{ color }}>{body}</p> : null;
  const verticalText = layout === TextSegmentLayout.hybrid;
  const titleTag = title ? (
    <svg
      width={verticalText ? "45px" : "calc(100% - 20px)"}
      height={verticalText ? "100%" : "45px"}
      viewBox={verticalText ? "0 0 45 360" : "0 0 360 45"}
      className={styles.title}
    >
      <defs>
        <filter id={`drop-shadow-${id}`}>
          <feFlood floodColor={color} />

          <feComposite operator="out" in2="SourceGraphic" />

          <feMorphology operator="dilate" radius={colorScheme === "light" ? "1.5" : "0"} />
          <feGaussianBlur stdDeviation="2" />

          <feComposite operator="atop" in2="SourceGraphic" />
        </filter>
      </defs>
      <text
        x="50%"
        y="50%"
        stroke={color}
        filter={`url(#drop-shadow-${id})`}
        style={{
          transform: verticalText ? `translate(197px, 155px) rotate(90deg)` : undefined,
        }}
      >
        {title}
      </text>
    </svg>
  ) : null;
  const titleShouldBeBundledWithBody = title && layout !== TextSegmentLayout.hybrid;
  const titleShouldBeBundledWithImage = title && layout === TextSegmentLayout.hybrid;
  const bodyWrapper = (body || titleShouldBeBundledWithBody) && (
    <div>
      {titleShouldBeBundledWithBody && titleTag}
      {bodyTag}
    </div>
  );
  const imageWrapper = (imgTag || titleShouldBeBundledWithImage) && (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        display: layout === TextSegmentLayout.horizontal ? "contents" : "flex",
        flexDirection: layout === TextSegmentLayout.hybrid ? "row-reverse" : "row",
      }}
    >
      {titleShouldBeBundledWithImage && titleTag}
      {imgTag}
    </div>
  );

  const content = (
    <div
      className={cx(styles.layout, styles[layout], {
        [styles.layout_dark]: colorScheme === "dark",
        [styles.layout_light]: colorScheme === "light",
      })}
      style={{ borderColor: color }}
    >
      {imageWrapper}
      {bodyWrapper}
    </div>
  );

  // return link ? (
  //   <Haptic focusScaleMultiplier={0.15} clickScaleMultiplier={0.15} component={Link} to={link}>
  //     {content}
  //   </Haptic>
  // ) : (
  //   content
  // );
  return link ? (
    // <Haptic focusScaleMultiplier={0.15} clickScaleMultiplier={0.15}>
    //   <Link to={link}>{content}</Link>
    // </Haptic>
    <Haptic focusScaleMultiplier={0.15} clickScaleMultiplier={0.15} component={Link} to={link}>
      {content}
    </Haptic>
  ) : (
    content
  );
};

export default TextSegment;
