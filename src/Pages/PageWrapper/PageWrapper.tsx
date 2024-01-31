import Footer from "components/Footer/Footer";
import Body from "components/Body";
import Header from "components/Header";
import React, { useState } from "react";
import { ScrollArea } from "@mantine/core";
import styles from "./styles.module.sass";

const PageWrapper = (props: React.PropsWithChildren) => {
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });
  return (
    <>
      <ScrollArea.Autosize mah="100%" maw="100%" className={styles.scrollArea} onScrollPositionChange={setScrollPos}>
        <Header scrollTop={scrollPos.y} />
        <Body>{props.children}</Body>
        <Footer />
      </ScrollArea.Autosize>
    </>
  );
};

export default PageWrapper;
