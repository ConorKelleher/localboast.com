import { ImageProps } from "@mantine/core";
import { ComponentTheme } from "theme";

export enum TextSegmentLayout {
  vertical = "vertical",
  horizontal = "horizontal",
  hybrid = "hybrid",
}
export interface TextSegmentProps {
  theme?: ComponentTheme | keyof typeof ComponentTheme;
  title?: string;
  body?: string;
  imgSrc?: ImageProps["src"];
  layout?: TextSegmentLayout | keyof typeof TextSegmentLayout;
  link?: string;
}

export const TEXT_SEGMENT_DEFAULT_PROPS = {
  layout: TextSegmentLayout.horizontal,
  theme: ComponentTheme.primary,
};
