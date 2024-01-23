import { Box } from "@mantine/core";
import { PropsWithChildren } from "react";
import styles from "./styles.module.sass";

const Body = (props: PropsWithChildren) => {
  return (
    <Box id="page-body" className={styles.body_box}>
      {props.children}
    </Box>
  );
};

export default Body;
