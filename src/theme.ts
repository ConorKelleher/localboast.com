import { MantineColorsTuple, createTheme } from "@mantine/core";

// All generated from the base branding colour scheme with https://mantine.dev/colors-generator
const LB_COLOURS: { [colour: string]: MantineColorsTuple } = {
  blue: ["#e8fbfe", "#d9f1f6", "#b3e2eb", "#8ad2df", "#6ac5d5", "#55bccf", "#47b8cd", "#36a1b5", "#2790a2", "#007d8f"],
  yellow: [
    "#fff9e0",
    "#fff2ca",
    "#ffe399",
    "#ffd362",
    "#ffc636",
    "#ffbe18",
    "#ffba02",
    "#e4a300",
    "#ca9100",
    "#af7c00",
  ],
  green: ["#e7fdf2", "#d8f4e6", "#b5e5cc", "#8dd6b0", "#6dca99", "#57c289", "#4abe81", "#3aa76d", "#2e9560", "#1d8150"],
  red: ["#ffe9e9", "#ffd4d3", "#f5a8a7", "#ed7977", "#e6524e", "#e23835", "#e22a27", "#c81c1a", "#b41416", "#9d060f"],
  purple: [
    "#f5f0f9",
    "#e7ddee",
    "#ceb8de",
    "#b490ce",
    "#9e6fc2",
    "#9159ba",
    "#8a4fb7",
    "#7740a1",
    "#6a3890",
    "#5c2f7f",
  ],
};

const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: "Urbanist",
  primaryColor: "boastful-blue",
  colors: {
    // dark: LB_COLOURS.blue,
    // light: LB_COLOURS.yellow,
    "boastful-blue": LB_COLOURS.blue,
    "boastful-yellow": LB_COLOURS.yellow,
    "boastful-green": LB_COLOURS.green,
    "boastful-red": LB_COLOURS.red,
    "boastful-purple": LB_COLOURS.purple,
  },
});

export default theme;