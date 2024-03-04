import Code from "localboast/components/Code";
import useAnimatedText from "localboast/hooks/useAnimatedText";
import { useComputedColorScheme } from "@mantine/core";
import React from "react";
import { DEFAULT_COLOR_SCHEME } from "constants/preferences";

const CodeBubble = (props: React.PropsWithChildren) => {
  const animatedText = useAnimatedText(props.children as string);
  const computedColorScheme = useComputedColorScheme(DEFAULT_COLOR_SCHEME);

  return (
    <Code
      colorScheme={computedColorScheme}
      style={{
        width: 300,
        borderRadius: 15,
        overflow: "hidden",
        boxShadow: "rgba(0, 0, 255, 0.2) 5px 6px 8px 2px",
        transition: "box-shadow 0.2s ease",
      }}
    >
      {animatedText}
    </Code>
  );
};

export default CodeBubble;
