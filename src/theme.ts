import { Anchor, MantineColorsTuple, Menu, createTheme } from "@mantine/core";

export const LB_COLORS: { [color: string]: string } = {
  boastfulYellow: "#ffca43",
  boastfulBlue: "#278fa1",
  boastfulGreen: "#8fd7b1",
  boastfulRed: "#e85f5c",
  boastfulPurple: "#3b1e51",
};
LB_COLORS.lightIcons = LB_COLORS.boastfulPurple;
LB_COLORS.darkIcons = LB_COLORS.boastfulYellow;

// All generated from the base branding colour scheme with https://mantine.dev/colors-generator
const LB_COLOR_PALETTES: { [color: string]: MantineColorsTuple } = {
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
    // "#f5f0f9",
    // "#e7ddee",
    "#ceb8de",
    "#b490ce",
    "#9e6fc2",
    "#9159ba",
    "#8a4fb7",
    "#7740a1",
    "#6a3890",
    "#3b1e51",
    "#3b1e51",
    "#3b1e51",
  ],
};

const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: "Urbanist",
  primaryColor: "boastful-blue",
  cursorType: "pointer",
  colors: {
    "boastful-blue": LB_COLOR_PALETTES.blue,
    "boastful-yellow": LB_COLOR_PALETTES.yellow,
    "boastful-green": LB_COLOR_PALETTES.green,
    "boastful-red": LB_COLOR_PALETTES.red,
    "boastful-purple": LB_COLOR_PALETTES.purple,
    dark: LB_COLOR_PALETTES.purple,
  },
  components: {
    Anchor: Anchor.extend({
      defaultProps: {
        underline: "never",
      },
    }),
    "Menu.Dropdown": Menu.Dropdown.extend({
      defaultProps: {
        style: {
          backgroundColor: "var(--mantine-color-gray-9)",
        },
      },
    }),
  },
});

export default theme;
