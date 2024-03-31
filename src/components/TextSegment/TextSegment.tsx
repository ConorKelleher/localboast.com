import { Image, useComputedColorScheme } from "@mantine/core";
import cx from "localboast/utils/cx";
import generateRandomId from "localboast/utils/generateRandomId";
import { merge } from "localboast/utils/objectHelpers";
import styles from "./styles.module.sass";
import { TEXT_SEGMENT_DEFAULT_PROPS, TextSegmentProps, TextSegmentLayout } from "./constants";
import { ComponentTheme, LB_THEMES } from "theme";
import Haptic from "localboast/components/Haptic";
import { Link } from "react-router-dom";

const TextSegment = (props: TextSegmentProps) => {
  const { body, layout, imgSrc, title, theme, link } = merge(TEXT_SEGMENT_DEFAULT_PROPS, props);
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
      width={verticalText ? 45 : "100%"}
      height={verticalText ? "calc(100% - 20px)" : 45}
      viewBox={verticalText ? "0 0 45 360" : "0 0 360 45"}
      className={styles.title}
    >
      <defs>
        <filter id={`drop-shadow-${id}`}>
          <feFlood flood-color={color} />

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
        transform={verticalText ? "translate(197, -10) rotate(90)" : undefined}
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

  return link ? (
    <Haptic focusScale={0.15} clickScale={0.15}>
      <Link to={link} style={{ height: "fit-content", width: "fit-content" }}>
        {content}
      </Link>
    </Haptic>
  ) : (
    content
  );
};

export default TextSegment;
