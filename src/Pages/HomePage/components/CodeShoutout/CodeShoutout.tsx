import CodeBubble from "components/CodeBubble";
import useInterval from "localboast/hooks/useInterval";
import { useState } from "react";

const CODE_STATES = [
  {
    text: `import { Code, useAnimatedText } from "localboast";
import { Button, Stack } from "@mantine/core";
import React from "react";

const CodeBubble = (props: React.PropsWithChildren) => {
  return <Code>{props.children}</Code>;
};

export default CodeBubble;
`,
    time: 5000,
  },
  {
    text: `import { Code, useAnimatedText } from "localboast";
import { Button, Stack } from "@mantine/core";
import React from "react";

const CodeBubble = (props: React.PropsWithChildren) => {
  const animatedText = useAnimatedText(props.children as string);

  return <Code>{animatedText}</Code>;
};

export default CodeBubble;
`,
    time: 5000,
  },
];

const CodeShoutout = () => {
  const [textIndex, setTextIndex] = useState(0);

  useInterval(() => setTextIndex((oldIndex) => (oldIndex + 1) % CODE_STATES.length), CODE_STATES[textIndex].time);

  return <CodeBubble>{CODE_STATES[textIndex].text}</CodeBubble>;
};

export default CodeShoutout;
