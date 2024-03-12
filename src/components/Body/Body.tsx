import { Box, lighten, useMantineColorScheme } from "@mantine/core";
import { PropsWithChildren } from "react";
import styles from "./styles.module.sass";
import { LB_COLORS } from "theme";

const Body = (props: PropsWithChildren) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Box
      id="page-body"
      className={styles.body_box}
      style={{ backgroundColor: colorScheme === "dark" ? LB_COLORS.dark : lighten(LB_COLORS.light, 0.75) }}
    >
      {props.children}
    </Box>
  );
};

export default Body;
